/**
 * Test service to check route params.
 *
 * @namespace Fl32_Ap_Back_Service_Test_Get_Id
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Back_Service_Test_Get_Id';

/**
 * @implements TeqFw_Web_Back_Api_Service_IFactory
 */
export default class Fl32_Ap_Back_Service_Test_Get_Id {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Shared_Service_Route_Test_Get_Id.Factory} */
        const route = spec['Fl32_Ap_Shared_Service_Route_Test_Get_Id#Factory$'];

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
                /** @type {Fl32_Ap_Shared_Service_Route_Test_Get_Id.Request} */
                // const req = context.getInData();
                /** @type {Fl32_Ap_Shared_Service_Route_Test_Get_Id.Response} */
                const res = context.getOutData();
                // const shared = context.getHandlersShare();
                const params = context.getRouteParams();
                //
                const data = {id: params?.id};
                Object.assign(res, data);
            }

            // MAIN FUNCTIONALITY
            Object.defineProperty(service, 'name', {value: `${NS}.${service.name}`});
            return service;
        }

    }
}
