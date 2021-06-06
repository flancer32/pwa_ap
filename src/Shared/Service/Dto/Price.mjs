/**
 * Price DTO in Service API.
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Shared_Service_Dto_Price';

// MODULE'S CLASSES
class Fl32_Ap_Shared_Service_Dto_Price {
    /** @type {string} */
    currency;
    /** @type {number} */
    value;
}

// attributes names to use as aliases in queries to RDb
Fl32_Ap_Shared_Service_Dto_Price.CURRENCY = 'currency';
Fl32_Ap_Shared_Service_Dto_Price.VALUE = 'value';

/**
 * Factory to create new DTOs.
 * @memberOf Fl32_Ap_Shared_Service_Dto_Price
 */
class Factory {
    constructor() {
        /**
         * @param {Object|null} data
         * @return {Fl32_Ap_Shared_Service_Dto_Price}
         */
        this.create = function (data = null) {
            const result = new Fl32_Ap_Shared_Service_Dto_Price();
            result.currency = data?.currency;
            result.value = data?.value;
        }
    }
}

// freeze class to deny attributes changes then export class
Object.freeze(Fl32_Ap_Shared_Service_Dto_Price);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export {
    Fl32_Ap_Shared_Service_Dto_Price as default,
    Factory
} ;
