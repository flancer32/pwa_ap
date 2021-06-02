/**
 * Sale order DTO for the 'pub' realm.
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Realm_Pub_Dto_Sale';

// MODULE'S CLASSES
class Fl32_Ap_Front_Realm_Pub_Dto_Sale {
    /** @type {Object.<number, Fl32_Ap_Front_Realm_Pub_Dto_Sale_Item>} */
    items;
}

// attributes names
Fl32_Ap_Front_Realm_Pub_Dto_Sale.ITEMS = 'items';

/**
 * Factory to create new DTOs.
 * @memberOf Fl32_Ap_Front_Realm_Pub_Dto_Sale
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Front_Realm_Pub_Dto_Sale_Totals.Factory} */
        const fTotals = spec['Fl32_Ap_Front_Realm_Pub_Dto_Sale_Totals#Factory$']; // instance singleton

        /**
         * @return {Fl32_Ap_Front_Realm_Pub_Dto_Sale}
         */
        this.create = function () {
            const result = new Fl32_Ap_Front_Realm_Pub_Dto_Sale();
            result.items = {};
            result.totals = fTotals.create();
            return result;
        }
    }

}

// freeze class to deny attributes changes then export class
Object.freeze(Fl32_Ap_Front_Realm_Pub_Dto_Sale);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

export {
    Fl32_Ap_Front_Realm_Pub_Dto_Sale as default,
    Factory
} ;
