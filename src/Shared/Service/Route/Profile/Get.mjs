/**
 * Request and response for service to get list of sale orders.
 *
 * @namespace Fl32_Ap_Shared_Service_Route_Profile_Get
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Shared_Service_Route_Profile_Get';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Ap_Shared_Service_Route_Profile_Get
 */
class Request {}

/**
 * @memberOf Fl32_Ap_Shared_Service_Route_Profile_Get
 */
class Response {
    /** @type {Fl32_Ap_Shared_Service_Dto_Profile} */
    profile;
}

/**
 * Factory to create new DTOs.
 * @memberOf Fl32_Ap_Shared_Service_Route_Profile_Get
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Shared_Service_Dto_Profile.Factory} */
        const fProfile = spec['Fl32_Ap_Shared_Service_Dto_Profile#Factory$']; // instance singleton

        /**
         * @param {Object|null} data
         * @return {Fl32_Ap_Shared_Service_Route_Profile_Get.Request}
         */
        this.createReq = function (data = null) {
            return new Request();
        }
        /**
         * @param {Object|null} data
         * @return {Fl32_Ap_Shared_Service_Route_Profile_Get.Response}
         */
        this.createRes = function (data = null) {
            const result = new Response();
            result.profile = fProfile.create(data?.profile);
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
