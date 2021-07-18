/**
 * Sale order totals DTO for the 'pub' realm'.
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Door_Pub_Dto_Sale_Totals';

class Fl32_Ap_Front_Door_Pub_Dto_Sale_Totals {
    /** @type {number} */
    amount = 0;
    /** @type {string} */
    currency = 'EUR';
}

// attributes names
Fl32_Ap_Front_Door_Pub_Dto_Sale_Totals.AMOUNT = 'amount';
Fl32_Ap_Front_Door_Pub_Dto_Sale_Totals.CURRENCY = 'currency';

/**
 * Factory to create new DTOs.
 * @memberOf Fl32_Ap_Front_Door_Pub_Dto_Sale_Totals
 */
class Factory {
    constructor() {
        /**
         * @return {Fl32_Ap_Front_Door_Pub_Dto_Sale_Totals}
         */
        this.create = () => new Fl32_Ap_Front_Door_Pub_Dto_Sale_Totals();
    }

}

// finalize code components for this es6-module
Object.freeze(Fl32_Ap_Front_Door_Pub_Dto_Sale_Totals);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});

export {
    Fl32_Ap_Front_Door_Pub_Dto_Sale_Totals as default,
    Factory
} ;
