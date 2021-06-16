/**
 * User profile DTO in Service API (the same for customer & admin).
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Shared_Service_Dto_Profile';

// MODULE'S CLASSES
class Fl32_Ap_Shared_Service_Dto_Profile {
    /** @type {string} */
    email;
    /** @type {string} */
    name;
}

// attributes names to use as aliases in queries to RDb
Fl32_Ap_Shared_Service_Dto_Profile.EMAIL = 'email';
Fl32_Ap_Shared_Service_Dto_Profile.NAME = 'name';

/**
 * Factory to create new DTOs.
 * @memberOf Fl32_Ap_Shared_Service_Dto_Profile
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS

        /**
         * @param {Object|null} data
         * @return {Fl32_Ap_Shared_Service_Dto_Profile}
         */
        this.create = function (data = null) {
            const result = new Fl32_Ap_Shared_Service_Dto_Profile();
            result.email = data?.email;
            result.name = data?.name;
            return result;
        }
    }
}

// freeze class to deny attributes changes then export class
Object.freeze(Fl32_Ap_Shared_Service_Dto_Profile);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export {
    Fl32_Ap_Shared_Service_Dto_Profile as default,
    Factory
} ;
