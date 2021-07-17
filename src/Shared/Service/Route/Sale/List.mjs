/**
 * Route data for service to get list of sale orders.
 *
 * @namespace Fl32_Ap_Shared_Service_Route_Sale_List
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Shared_Service_Route_Sale_List';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Ap_Shared_Service_Route_Sale_List
 */
class Request {}

/**
 * @memberOf Fl32_Ap_Shared_Service_Route_Sale_List
 */
class Response {
    /** @type {Fl32_Ap_Shared_Service_Dto_Sale[]} */
    items;
}

/**
 * Factory to create new DTOs and get route address.
 * @implements TeqFw_Web_Back_Api_Service_IRoute
 * @memberOf Fl32_Ap_Shared_Service_Route_Sale_List
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Shared_Defaults} */
        const DEF = spec['Fl32_Ap_Shared_Defaults$'];
        /** @type {typeof Fl32_Ap_Shared_Service_Dto_Sale} */
        const DSale = spec['Fl32_Ap_Shared_Service_Dto_Sale#'];
        /** @type {Fl32_Ap_Shared_Service_Dto_Sale.Factory} */
        const fSale = spec['Fl32_Ap_Shared_Service_Dto_Sale#Factory$'];

        // DEFINE INSTANCE METHODS
        this.getRoute = () => `/${DEF.NAME}${DEF.WEB_SALE_LIST}`;

        /**
         * @param {Fl32_Ap_Shared_Service_Route_Sale_List.Request|null} data
         * @return {Fl32_Ap_Shared_Service_Route_Sale_List.Request}
         */
        this.createReq = function (data = null) {
            return new Request();
        }
        /**
         * @param {Fl32_Ap_Shared_Service_Route_Sale_List.Response|null} data
         * @return {Fl32_Ap_Shared_Service_Route_Sale_List.Response}
         */
        this.createRes = function (data = null) {
            const result = new Response();
            result.items = Array.isArray(data?.items)
                ? data.items.map((one) => (one instanceof DSale) ? one : fSale.create(one))
                : [];
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
