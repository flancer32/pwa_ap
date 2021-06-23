/**
 * Amount DTO used on the front (all realms).
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Area_Shared_Dto_Amount';

class Fl32_Ap_Front_Area_Shared_Dto_Amount {
    /** @type {string} */
    currency;
    /** @type {number} */
    value;
}

// attributes names
Fl32_Ap_Front_Area_Shared_Dto_Amount.CURRENCY = 'currency';
Fl32_Ap_Front_Area_Shared_Dto_Amount.VALUE = 'value';

/**
 * Factory to create new DTOs.
 * @memberOf Fl32_Ap_Front_Area_Shared_Dto_Amount
 */
class Factory {
    constructor() {
        /**
         * @param {Object|null} data
         * @return {Fl32_Ap_Front_Area_Shared_Dto_Amount}
         */
        this.create = function (data = null) {
            const result = new Fl32_Ap_Front_Area_Shared_Dto_Amount();
            result.currency = data?.currency ?? 'EUR';
            result.value = data?.value ?? 0;
            return result;
        }
    }
}

// freeze class to deny attributes changes then export class
Object.freeze(Fl32_Ap_Front_Area_Shared_Dto_Amount);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});

export {
    Fl32_Ap_Front_Area_Shared_Dto_Amount as default,
    Factory
} ;
