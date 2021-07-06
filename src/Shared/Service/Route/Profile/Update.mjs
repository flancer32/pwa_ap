/**
 * Request and response for service to update user profile.
 *
 * @namespace Fl32_Ap_Shared_Service_Route_Profile_Update
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Shared_Service_Route_Profile_Update';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Ap_Shared_Service_Route_Profile_Update
 */
class Request {
    /** @type {Fl32_Ap_Shared_Service_Dto_Profile} */
    profile;
}

/**
 * @memberOf Fl32_Ap_Shared_Service_Route_Profile_Update
 */
class Response {
    /** @type {boolean} */
    success;
}

/**
 * Factory to create new DTOs.
 * @memberOf Fl32_Ap_Shared_Service_Route_Profile_Update
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Shared_Service_Dto_Profile.Factory} */
        const fProfile = spec['Fl32_Ap_Shared_Service_Dto_Profile#Factory$'];

        /**
         * @param {Object|null} data
         * @return {Fl32_Ap_Shared_Service_Route_Profile_Update.Request}
         */
        this.createReq = function (data = null) {
            const result = new Request();
            result.profile = fProfile.create(data?.profile);
            return result;
        }
        /**
         * @param {Object|null} data
         * @return {Fl32_Ap_Shared_Service_Route_Profile_Update.Response}
         */
        this.createRes = function (data = null) {
            const result = new Response();
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
