/**
 * Request and response for service to get list of sale orders.
 *
 * @namespace Fl32_Ap_Shared_Service_Route_Sale_List
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Shared_Service_Route_Sale_List';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Ap_Shared_Service_Route_Sale_List
 */
class Request {

}

/**
 * @memberOf Fl32_Ap_Shared_Service_Route_Sale_List
 */
class Response {
    /** @type {Fl32_Ap_Shared_Service_Dto_Sale[]} */
    items;
}

// MODULE'S EXPORT
Object.defineProperty(Request, 'name', {value: `${NS}.${Request.name}`});
Object.defineProperty(Response, 'name', {value: `${NS}.${Response.name}`});
export {
    Request,
    Response,
};
