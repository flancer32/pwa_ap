/**
 * Service to update user profile.
 *
 * @namespace Fl32_Ap_Back_Service_Profile_Update
 */
// MODULE'S IMPORT
import {constants as H2} from 'http2';

// MODULE'S VARS
const NS = 'Fl32_Ap_Back_Service_Profile_Update';

/**
 * @implements TeqFw_Http2_Api_Back_Service_Factory
 */
class Fl32_Ap_Back_Service_Profile_Update {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Back_Defaults} */
        const DEF = spec['Fl32_Ap_Back_Defaults$']; // instance singleton
        /** @type {TeqFw_Core_Back_RDb_Connector} */
        const rdb = spec['TeqFw_Core_Back_RDb_Connector$'];  // instance singleton
        /** @type {typeof TeqFw_Http2_Plugin_Handler_Service.Result} */
        const ApiResult = spec['TeqFw_Http2_Plugin_Handler_Service#Result']; // class
        /** @type {Fl32_Ap_Shared_Service_Route_Profile_Update.Factory} */
        const factRoute = spec['Fl32_Ap_Shared_Service_Route_Profile_Update#Factory$']; // instance singleton
        /** @type {typeof Fl32_Ap_User_Back_Store_RDb_Schema_User} */
        const EUser = spec['Fl32_Ap_User_Back_Store_RDb_Schema_User#']; // class
        /** @type {typeof Fl32_Ap_User_Back_Store_RDb_Schema_Id_Email} */
        const EUserEmail = spec['Fl32_Ap_User_Back_Store_RDb_Schema_Id_Email#']; // class

        // DEFINE INSTANCE METHODS

        this.getRoute = () => DEF.SERV_profile_update;

        /**
         * Factory to create function to validate and structure incoming data.
         * @returns {function(TeqFw_Http2_Back_Server_Stream_Context): Fl32_Ap_Shared_Service_Route_Profile_Update.Request}
         */
        this.createInputParser = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Http2_Back_Server_Stream_Context} context
             * @returns {Fl32_Ap_Shared_Service_Route_Profile_Update.Request}
             * @memberOf Fl32_Ap_Back_Service_Profile_Update
             */
            function parse(context) {
                const body = JSON.parse(context.body);
                return factRoute.createReq(body.data);
            }

            // COMPOSE RESULT
            Object.defineProperty(parse, 'name', {value: `${NS}.${parse.name}`});
            return parse;
        };

        /**
         * Factory to create service (handler to process HTTP API request).
         * @returns {function(TeqFw_Http2_Plugin_Handler_Service.Context): TeqFw_Http2_Plugin_Handler_Service.Result}
         */
        this.createService = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Http2_Plugin_Handler_Service.Context} apiCtx
             * @returns {Promise<TeqFw_Http2_Plugin_Handler_Service.Result>}
             * @memberOf Fl32_Ap_Back_Service_Profile_Update
             */
            async function service(apiCtx) {

                // DEFINE INNER FUNCTIONS

                /**
                 * @param {Object} trx
                 * @param {number} userId
                 * @param {string} email
                 * @return {Promise<void>}
                 */
                async function updateUserEmail(trx, userId, email) {
                    const qSelect = trx.from(EUserEmail.ENTITY);
                    qSelect.select([EUserEmail.A_EMAIL]);
                    qSelect.where(EUserEmail.A_USER_REF, userId);
                    const rs = await qSelect;
                    if (rs.length === 1) {
                        // update existing email
                        const qUpdate = trx(EUserEmail.ENTITY)
                            .update({
                                [EUserEmail.A_EMAIL]: email.trim().toLowerCase(),
                            })
                            .where({[EUserEmail.A_USER_REF]: userId});
                        await qUpdate;
                    } else if (rs.length === 0) {
                        // insert new email
                        const qInsert = trx(EUserEmail.ENTITY)
                            .insert({
                                [EUserEmail.A_USER_REF]: userId,
                                [EUserEmail.A_EMAIL]: email.trim().toLowerCase(),
                            });
                        await qInsert;
                    } // do nothing otherwise
                }

                /**
                 * @param {Object} trx
                 * @param {number} userId
                 * @param {string} name
                 * @return {Promise<boolean>}
                 */
                async function updateUserName(trx, userId, name) {
                    const query = trx(EUser.ENTITY)
                        .update({
                            [EUser.A_NAME]: name.trim(),
                        })
                        .where({[EUser.A_ID]: userId});
                    const updated = await query;
                    return (updated === 1);
                }

                // MAIN FUNCTIONALITY
                const result = new ApiResult();
                const response = factRoute.createRes();
                result.response = response;
                /** @type {Fl32_Ap_Shared_Service_Route_Profile_Update.Request} */
                const apiReq = apiCtx.request;
                const shared = apiCtx.sharedContext;
                /** @type {Fl32_Ap_User_Shared_Service_Data_User} */
                const user = shared[DEF.MOD_USER.HTTP_SHARED_CTX_USER];
                if (user) {
                    // don't start transaction if not required
                    const trx = await rdb.startTransaction();
                    try {
                        if (apiReq.profile.name) {
                            await updateUserName(trx, user.id, apiReq.profile.name);
                            user.name = apiReq.profile.name;
                        }
                        if (apiReq.profile.email) {
                            await updateUserEmail(trx, user.id, apiReq.profile.email);
                            user.emails[0] = apiReq.profile.email
                        }
                        response.success = true;
                        await trx.commit();
                    } catch (error) {
                        await trx.rollback();
                        throw error;
                    }
                } else {
                    result.headers[H2.HTTP2_HEADER_STATUS] = H2.HTTP_STATUS_UNAUTHORIZED;
                }
                return result;
            }

            // COMPOSE RESULT
            Object.defineProperty(service, 'name', {value: `${NS}.${service.name}`});
            return service;
        };
    }

    // DEFINE PROTO METHODS
}

export default Fl32_Ap_Back_Service_Profile_Update;
