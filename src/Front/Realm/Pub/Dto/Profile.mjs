/**
 * User profile DTO used in the 'pub' realm.
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Realm_Pub_Dto_Profile';

// MODULE'S CLASSES
class Fl32_Ap_Front_Realm_Pub_Dto_Profile {
    /** @type {string} */
    email;
    /** @type {string} */
    name;
}

// attributes names to use as aliases in queries to RDb
Fl32_Ap_Front_Realm_Pub_Dto_Profile.EMAIL = 'email';
Fl32_Ap_Front_Realm_Pub_Dto_Profile.NAME = 'name';

/**
 * Factory to create new DTO instances.
 * @memberOf Fl32_Ap_Front_Realm_Pub_Dto_Profile
 */
class Factory {
    constructor() {
        /**
         * @param {Object|null} data
         * @return {Fl32_Ap_Front_Realm_Pub_Dto_Profile}
         */
        this.create = function (data = null) {
            const res = new Fl32_Ap_Front_Realm_Pub_Dto_Profile();
            res.email = data?.email;
            res.name = data?.name;
            return res;
        }
    }
}

// freeze class to deny attributes changes then export class
Object.freeze(Fl32_Ap_Front_Realm_Pub_Dto_Profile);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export {
    Fl32_Ap_Front_Realm_Pub_Dto_Profile as default,
    Factory
} ;
