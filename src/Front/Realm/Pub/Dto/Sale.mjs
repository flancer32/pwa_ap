/**
 * Sale order DTO for the 'pub' realm.
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Realm_Pub_Dto_Sale';

// MODULE'S CLASSES
class Fl32_Ap_Front_Realm_Pub_Dto_Sale {
    /** @type {Date} */
    dateCreated;
    /** @type {Date} */
    dateReceiving;
    /** @type {number} */
    id;
    /** @type {Object.<number, Fl32_Ap_Front_Realm_Pub_Dto_Sale_Item>} */
    items;
    /** @type {string} */
    state;
    /** @type {Fl32_Ap_Front_Realm_Pub_Dto_Sale_Totals} */
    totals;
}

// attributes names
Fl32_Ap_Front_Realm_Pub_Dto_Sale.DATE_CREATED = 'dateCreated';
Fl32_Ap_Front_Realm_Pub_Dto_Sale.DATE_RECEIVING = 'dateReceiving';
Fl32_Ap_Front_Realm_Pub_Dto_Sale.ID = 'id';
Fl32_Ap_Front_Realm_Pub_Dto_Sale.ITEMS = 'items';
Fl32_Ap_Front_Realm_Pub_Dto_Sale.STATE = 'state';
Fl32_Ap_Front_Realm_Pub_Dto_Sale.TOTALS = 'totals';

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
