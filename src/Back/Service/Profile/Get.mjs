/**
 * Get user profile.
 *
 * @namespace Fl32_Ap_Back_Service_Profile_Get
 */
// MODULE'S IMPORT
import {constants as H2} from 'http2';

// MODULE'S VARS
const NS = 'Fl32_Ap_Back_Service_Profile_Get';

/**
 * @implements TeqFw_Web_Back_Api_Service_IFactory
 */
export default class Fl32_Ap_Back_Service_Profile_Get {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Back_Defaults} */
        const DEF = spec['Fl32_Ap_Back_Defaults$'];
        /** @type {TeqFw_Db_Back_Api_RDb_IConnect} */
        const rdb = spec['TeqFw_Db_Back_Api_RDb_IConnect$'];
        /** @type {Fl32_Ap_Shared_Service_Route_Profile_Get.Factory} */
        const route = spec['Fl32_Ap_Shared_Service_Route_Profile_Get#Factory$'];

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

                // MAIN FUNCTIONALITY
                /** @type {Fl32_Ap_Shared_Service_Route_Profile_Get.Request} */
                // const req = context.getInData();
                /** @type {Fl32_Ap_Shared_Service_Route_Profile_Get.Response} */
                const res = context.getOutData();
                const shared = context.getHandlersShare();
                //
                /** @type {Fl32_Ap_User_Shared_Service_Data_User} */
                const user = shared[DEF.MOD_USER.HTTP_SHARE_CTX_USER];
                if (user) {
                    const trx = await rdb.startTransaction();
                    try {
                        res.profile.name = user.name;
                        if (Array.isArray(user.emails)) {
                            const [first] = user.emails;
                            res.profile.email = first;
                        }
                        await trx.commit();
                    } catch (error) {
                        await trx.rollback();
                        throw error;
                    }
                } else {
                    context.setOutHeader(DEF.MOD.WEB.HTTP.HEADER.STATUS, H2.HTTP_STATUS_UNAUTHORIZED);
                }
            }

            // MAIN FUNCTIONALITY
            Object.defineProperty(service, 'name', {value: `${NS}.${service.name}`});
            return service;
        }
    }
}
