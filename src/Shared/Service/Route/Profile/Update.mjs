/**
 * Route data for service to update user profile.
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
 * Factory to create new DTOs and get route address.
 * @implements TeqFw_Web_Back_Api_Service_IRoute
 * @memberOf Fl32_Ap_Shared_Service_Route_Profile_Update
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Shared_Defaults} */
        const DEF = spec['Fl32_Ap_Shared_Defaults$'];
        /** @type {Fl32_Ap_Shared_Service_Dto_Profile.Factory} */
        const fProfile = spec['Fl32_Ap_Shared_Service_Dto_Profile#Factory$'];

        // DEFINE INSTANCE METHODS
        this.getRoute = () => `/${DEF.NAME}${DEF.WEB_PROFILE_UPDATE}`;

        /**
         * @param {Fl32_Ap_Shared_Service_Route_Profile_Update.Request|null} data
         * @return {Fl32_Ap_Shared_Service_Route_Profile_Update.Request}
         */
        this.createReq = function (data = null) {
            const result = new Request();
            result.profile = fProfile.create(data?.profile);
            return result;
        }
        /**
         * @param {Fl32_Ap_Shared_Service_Route_Profile_Update.Response|null} data
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
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
Object.defineProperty(Request, 'name', {value: `${NS}.${Request.constructor.name}`});
Object.defineProperty(Response, 'name', {value: `${NS}.${Response.constructor.name}`});
export {
    Factory,
    Request,
    Response,
};
