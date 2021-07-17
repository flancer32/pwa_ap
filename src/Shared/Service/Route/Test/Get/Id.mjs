/**
 * Route data for service to emulate GET request with ID param.
 *
 * @namespace Fl32_Ap_Shared_Service_Route_Test_Get_Id
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Shared_Service_Route_Test_Get_Id';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Ap_Shared_Service_Route_Test_Get_Id
 */
export class Request {}

/**
 * @memberOf Fl32_Ap_Shared_Service_Route_Test_Get_Id
 */
export class Response {
    /** @type {string} */
    id;
}

/**
 * Factory to create new DTOs and get route address.
 * @implements TeqFw_Web_Back_Api_Service_IRoute
 * @memberOf Fl32_Ap_Shared_Service_Route_Test_Get_Id
 */
export class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Shared_Defaults} */
        const DEF = spec['Fl32_Ap_Shared_Defaults$'];

        // DEFINE INSTANCE METHODS
        this.getRoute = () => `/${DEF.NAME}${DEF.WEB_TEST_GET_BY_ID}`;

        /**
         * @param {Request|null} data
         * @return {Fl32_Ap_Shared_Service_Route_Test_Get_Id.Request}
         */
        this.createReq = function (data = null) {
            return new Request();
        }

        /**
         * @param {Response|null} data
         * @return {Fl32_Ap_Shared_Service_Route_Test_Get_Id.Response}
         */
        this.createRes = function (data = null) {
            const res = new Response();
            res.id = data?.id;
            return res;
        }
    }
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
Object.defineProperty(Request, 'name', {value: `${NS}.${Request.constructor.name}`});
Object.defineProperty(Response, 'name', {value: `${NS}.${Response.constructor.name}`});
