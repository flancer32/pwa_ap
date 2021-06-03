/**
 * Shopping cart totals DTO for the 'pub' realm'.
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Realm_Pub_Dto_Cart_Totals';

class Fl32_Ap_Front_Realm_Pub_Dto_Cart_Totals {
    /** @type {number} */
    amount = 0;
    /** @type {string} */
    currency = 'EUR';
    /** @type {number} */
    liters = 0;
}

// attributes names
Fl32_Ap_Front_Realm_Pub_Dto_Cart_Totals.AMOUNT = 'amount';
Fl32_Ap_Front_Realm_Pub_Dto_Cart_Totals.CURRENCY = 'currency';
Fl32_Ap_Front_Realm_Pub_Dto_Cart_Totals.LITERS = 'liters';

/**
 * Factory to create new DTOs.
 * @memberOf Fl32_Ap_Front_Realm_Pub_Dto_Cart_Totals
 */
class Factory {
    constructor() {
        /**
         * @return {Fl32_Ap_Front_Realm_Pub_Dto_Cart_Totals}
         */
        this.create = () => new Fl32_Ap_Front_Realm_Pub_Dto_Cart_Totals();
    }

}

// freeze class to deny attributes changes then export class
Object.freeze(Fl32_Ap_Front_Realm_Pub_Dto_Cart_Totals);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

export {
    Fl32_Ap_Front_Realm_Pub_Dto_Cart_Totals as default,
    Factory
} ;
