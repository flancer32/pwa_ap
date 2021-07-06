/**
 * Request and response for service to add new sale order.
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
 * Factory to create new DTOs.
 * @memberOf Fl32_Ap_Shared_Service_Route_Sale_Add
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Shared_Service_Dto_Sale.Factory} */
        const fSale = spec['Fl32_Ap_Shared_Service_Dto_Sale#Factory$'];

        /**
         * @param {Object|null} data
         * @return {Fl32_Ap_Shared_Service_Route_Sale_Add.Request}
         */
        this.createReq = function (data = null) {
            const result = new Request();
            result.sale = fSale.create(data?.sale);
            return result;
        }
        /**
         * @param {Object|null} data
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
Object.defineProperty(Request, 'name', {value: `${NS}.${Request.constructor.name}`});
Object.defineProperty(Response, 'name', {value: `${NS}.${Response.constructor.name}`});
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export {
    Request,
    Response,
    Factory,
};
