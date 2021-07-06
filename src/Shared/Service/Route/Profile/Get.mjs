/**
 * Route data for service to get user profile.
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
 * Factory to create new DTOs and get route address.
 * @implements TeqFw_Web_Back_Api_Service_Factory_IRoute
 * @memberOf Fl32_Ap_Shared_Service_Route_Profile_Get
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Shared_Defaults} */
        const DEF = spec['Fl32_Ap_Shared_Defaults$'];
        /** @type {Fl32_Ap_Shared_Service_Dto_Profile.Factory} */
        const fProfile = spec['Fl32_Ap_Shared_Service_Dto_Profile#Factory$'];

        // DEFINE INSTANCE METHODS
        this.getRoute = () => `/${DEF.NAME}${DEF.SERV_profile_get}`;

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
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
Object.defineProperty(Request, 'name', {value: `${NS}.${Request.constructor.name}`});
Object.defineProperty(Response, 'name', {value: `${NS}.${Response.constructor.name}`});
export {
    Factory,
    Request,
    Response,
};
