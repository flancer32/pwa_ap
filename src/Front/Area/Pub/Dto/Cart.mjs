/**
 * Shopping cart DTO for the 'pub' realm.
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Area_Pub_Dto_Cart';

// MODULE'S CLASSES
class Fl32_Ap_Front_Area_Pub_Dto_Cart {
    /** @type {Object<number, Fl32_Ap_Front_Area_Pub_Dto_Cart_Item>} */
    items;
    /** @type {Fl32_Ap_Front_Area_Pub_Dto_Cart_Totals} */
    totals;
}

// attributes names
Fl32_Ap_Front_Area_Pub_Dto_Cart.ITEMS = 'items';
Fl32_Ap_Front_Area_Pub_Dto_Cart.TOTALS = 'totals';

/**
 * Factory to create new DTOs.
 * @memberOf Fl32_Ap_Front_Area_Pub_Dto_Cart
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Front_Area_Pub_Dto_Cart_Totals.Factory} */
        const fTotals = spec['Fl32_Ap_Front_Area_Pub_Dto_Cart_Totals#Factory$']; // instance singleton

        /**
         * @return {Fl32_Ap_Front_Area_Pub_Dto_Cart}
         */
        this.create = function () {
            const result = new Fl32_Ap_Front_Area_Pub_Dto_Cart();
            result.items = {};
            result.totals = fTotals.create();
            return result;
        }
    }

}

// freeze class to deny attributes changes then export class
Object.freeze(Fl32_Ap_Front_Area_Pub_Dto_Cart);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

export {
    Fl32_Ap_Front_Area_Pub_Dto_Cart as default,
    Factory
} ;
