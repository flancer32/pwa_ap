/**
 * Update user profile.
 *
 * @namespace Fl32_Ap_Back_Service_Profile_Update
 */
// MODULE'S IMPORT
import {constants as H2} from 'http2';

// MODULE'S VARS
const NS = 'Fl32_Ap_Back_Service_Profile_Update';

/**
 * @implements TeqFw_Web_Back_Api_Service_IFactory
 */
export default class Fl32_Ap_Back_Service_Profile_Update {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Back_Defaults} */
        const DEF = spec['Fl32_Ap_Back_Defaults$'];
        /** @type {TeqFw_Db_Back_Api_RDb_IConnect} */
        const rdb = spec['TeqFw_Db_Back_Api_RDb_IConnect$'];
        /** @type {Fl32_Ap_Shared_Service_Route_Profile_Update.Factory} */
        const route = spec['Fl32_Ap_Shared_Service_Route_Profile_Update#Factory$'];
        /** @type {typeof Fl32_Ap_User_Back_Store_RDb_Schema_User} */
        const EUser = spec['Fl32_Ap_User_Back_Store_RDb_Schema_User#'];
        /** @type {typeof Fl32_Ap_User_Back_Store_RDb_Schema_Id_Email} */
        const EUserEmail = spec['Fl32_Ap_User_Back_Store_RDb_Schema_Id_Email#'];

        // DEFINE INSTANCE METHODS

        this.getRouteFactory = () => route;

        this.getService = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Web_Back_Api_Service_Context} context
             * @return Promise<void>
             */
            async function service(context) {
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
                /** @type {Fl32_Ap_Shared_Service_Route_Profile_Update.Request} */
                const req = context.getInData();
                /** @type {Fl32_Ap_Shared_Service_Route_Profile_Update.Response} */
                const res = context.getOutData();
                const shared = context.getHandlersShare();
                //
                /** @type {Fl32_Ap_User_Shared_Service_Data_User} */
                const user = shared[DEF.MOD_USER.HTTP_SHARE_CTX_USER];
                if (user) {
                    // don't start transaction if not required
                    const trx = await rdb.startTransaction();
                    try {
                        if (req.profile.name) {
                            await updateUserName(trx, user.id, req.profile.name);
                            user.name = req.profile.name;
                        }
                        if (req.profile.email) {
                            await updateUserEmail(trx, user.id, req.profile.email);
                            user.emails[0] = req.profile.email
                        }
                        res.success = true;
                        await trx.commit();
                    } catch (error) {
                        await trx.rollback();
                        throw error;
                    }
                } else {
                    context.setOutHeader(DEF.MOD_WEB.HTTP.HEADER.STATUS, H2.HTTP_STATUS_UNAUTHORIZED);
                }
            }

            // MAIN FUNCTIONALITY
            Object.defineProperty(service, 'name', {value: `${NS}.${service.name}`});
            return service;
        }
    }
}
