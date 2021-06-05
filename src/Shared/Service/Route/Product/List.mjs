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
    /** @type {Object<number, Fl32_Ap_Shared_Service_Data_Product_Card>} */
    cards;
}

// MODULE'S EXPORT
Object.defineProperty(Request, 'name', {value: `${NS}.${Request.name}`});
Object.defineProperty(Response, 'name', {value: `${NS}.${Response.name}`});
export {
    Request,
    Response,
};
