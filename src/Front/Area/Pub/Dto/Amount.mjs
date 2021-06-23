/**
 * Amount (price, total, ...) DTO for the 'pub' realm.
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Area_Pub_Dto_Amount';

// MODULE'S CLASSES
class Fl32_Ap_Front_Area_Pub_Dto_Amount {
    /** @type {string} */
    currency;
    /** @type {number} */
    value;
}

// attributes names
Fl32_Ap_Front_Area_Pub_Dto_Amount.CURRENCY = 'currency';
Fl32_Ap_Front_Area_Pub_Dto_Amount.VALUE = 'value';

/**
 * Factory to create new DTOs.
 * @memberOf Fl32_Ap_Front_Area_Pub_Dto_Amount
 */
class Factory {
    constructor() {
        /**
         * @return {Fl32_Ap_Front_Area_Pub_Dto_Amount}
         */
        this.create = () => new Fl32_Ap_Front_Area_Pub_Dto_Amount();
    }

}

// freeze class to deny attributes changes then export class
Object.freeze(Fl32_Ap_Front_Area_Pub_Dto_Amount);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});

export {
    Fl32_Ap_Front_Area_Pub_Dto_Amount as default,
    Factory
} ;
