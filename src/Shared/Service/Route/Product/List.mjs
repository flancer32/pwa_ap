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
 * @memberOf Fl32_Ap_Shared_Service_Route_Product_List
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {typeof Fl32_Ap_Shared_Service_Dto_Product_Card} */
        const DCard = spec['Fl32_Ap_Shared_Service_Dto_Product_Card#']; // class
        /** @type {Fl32_Ap_Shared_Service_Dto_Product_Card.Factory} */
        const fCard = spec['Fl32_Ap_Shared_Service_Dto_Product_Card#Factory$']; // instance singleton

        /**
         * @param {Object|null} data
         * @return {Fl32_Ap_Shared_Service_Route_Product_List.Request}
         */
        this.createReq = function (data = null) {
            const result = new Request();
            result.lang = data?.lang;
            return result;
        }
        /**
         * @param {Object|null} data
         * @return {Fl32_Ap_Shared_Service_Route_Product_List.Response}
         */
        this.createRes = function (data = null) {
            const result = new Response();
            result.cards = Array.isArray(data?.cards)
                ? data.cards.map((one) => (one instanceof DCard) ? one : fCard.create(one))
                : [];
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
