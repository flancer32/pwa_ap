/**
 * Route data for service to add new sale order.
 *
 * @namespace Fl32_Ap_Shared_Service_Route_Sale_Add
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Shared_Service_Route_Sale_Add';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Ap_Shared_Service_Route_Sale_Add
 */
class Request {
    /** @type {Fl32_Ap_Shared_Service_Dto_Sale} */
    sale;
}

/**
 * @memberOf Fl32_Ap_Shared_Service_Route_Sale_Add
 */
class Response {
    /**
     * Cause of the failure if error is occurred.
     * @type {string}
     */
    failureCause;
    /** @type {boolean} */
    success = false;
}

/**
 * Factory to create new DTOs and get route address.
 * @implements TeqFw_Web_Back_Api_Service_IRoute
 * @memberOf Fl32_Ap_Shared_Service_Route_Sale_Add
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Shared_Defaults} */
        const DEF = spec['Fl32_Ap_Shared_Defaults$'];
        /** @type {Fl32_Ap_Shared_Service_Dto_Sale.Factory} */
        const fSale = spec['Fl32_Ap_Shared_Service_Dto_Sale#Factory$'];

        // DEFINE INSTANCE METHODS
        this.getRoute = () => `/${DEF.NAME}${DEF.WEB_SALE_ADD}`;

        /**
         * @param {Fl32_Ap_Shared_Service_Route_Sale_Add.Request|null} data
         * @return {Fl32_Ap_Shared_Service_Route_Sale_Add.Request}
         */
        this.createReq = function (data = null) {
            const result = new Request();
            result.sale = fSale.create(data?.sale);
            return result;
        }
        /**
         * @param {Fl32_Ap_Shared_Service_Route_Sale_Add.Response|null} data
         * @return {Fl32_Ap_Shared_Service_Route_Sale_Add.Response}
         */
        this.createRes = function (data = null) {
            const result = new Response();
            result.failureCause = data?.failureCause;
            result.success = data?.success;
            return result;
        }
    }
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
Object.defineProperty(Request, 'name', {value: `${NS}.${Request.constructor.name}`});
Object.defineProperty(Response, 'name', {value: `${NS}.${Response.constructor.name}`});
export {
    Factory,
    Request,
    Response,
};
