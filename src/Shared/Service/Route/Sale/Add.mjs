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
    /** @type {Fl32_Ap_Shared_Service_Data_Sale} */
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

// MODULE'S EXPORT
Object.defineProperty(Request, 'name', {value: `${NS}.${Request.name}`});
Object.defineProperty(Response, 'name', {value: `${NS}.${Response.name}`});
export {
    Request,
    Response,
};
