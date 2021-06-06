/**
 * Request and response for service to get list of products.
 *
 * @namespace Fl32_Ap_Shared_Service_Route_Product_List
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Shared_Service_Route_Product_List';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Ap_Shared_Service_Route_Product_List
 */
class Request {
    /** @type {string} 'ru', 'ru-RU', ... */
    lang;
}

/**
 * @memberOf Fl32_Ap_Shared_Service_Route_Product_List
 */
class Response {
    /** @type {Fl32_Ap_Shared_Service_Dto_Product_Card[]} */
    cards;
}

/**
 * Factory to create new DTOs.
 * @memberOf Fl32_Ap_Shared_Service_Dto_Sale
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Shared_Service_Dto_Price.Factory} */
        const fPrice = spec['Fl32_Ap_Shared_Service_Dto_Price#Factory$']; // instance singleton
        /**
         * @return {Fl32_Ap_Shared_Service_Route_Product_List.Request}
         */
        this.createReq = () => new Request();

        this.createRes = function () {
            const result = new Response();
            result.cards = [];
            return result;
        }
    }
}
// MODULE'S EXPORT
Object.defineProperty(Request, 'name', {value: `${NS}.${Request.name}`});
Object.defineProperty(Response, 'name', {value: `${NS}.${Response.name}`});
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export {
    Request,
    Response,
    Factory,
};
