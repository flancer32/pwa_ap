/**
 * Sale order item DTO for the 'pub' realm'.
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Realm_Pub_Dto_Sale_Item';

class Fl32_Ap_Front_Realm_Pub_Dto_Sale_Item {
    /** @type {number} */
    amountTotal;
    /** @type {number} */
    id;
    /** @type {number} */
    qty = 0;
    /**
     * TODO: should we have sale id here? We have sale id in the parent DTO.
     * @type {number}
     */
    saleId;
    /** @type {Fl32_Ap_Front_Realm_Pub_Dto_Product_Unit} */
    unit;
    /** @type {number} */
    unitPrice;
}

// attributes names
Fl32_Ap_Front_Realm_Pub_Dto_Sale_Item.AMOUNT_TOTAL = 'amountTotal';
Fl32_Ap_Front_Realm_Pub_Dto_Sale_Item.ID = 'id';
Fl32_Ap_Front_Realm_Pub_Dto_Sale_Item.QTY = 'qty';
Fl32_Ap_Front_Realm_Pub_Dto_Sale_Item.SALE_ID = 'saleId';
Fl32_Ap_Front_Realm_Pub_Dto_Sale_Item.UNIT = 'unit';
Fl32_Ap_Front_Realm_Pub_Dto_Sale_Item.UNIT_PRICE = 'unitPrice';

/**
 * Factory to create new DTOs.
 * @memberOf Fl32_Ap_Front_Realm_Pub_Dto_Sale_Item
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Front_Realm_Pub_Dto_Product_Unit.Factory} */
        const fUnit = spec['Fl32_Ap_Front_Realm_Pub_Dto_Product_Unit#Factory$']; // class

        /**
         * @return {Fl32_Ap_Front_Realm_Pub_Dto_Sale_Item}
         */
        this.create = function () {
            const result = new Fl32_Ap_Front_Realm_Pub_Dto_Sale_Item();
            result.unit = fUnit.create();
            return result;
        }
    }

}

// freeze class to deny attributes changes then export class
Object.freeze(Fl32_Ap_Front_Realm_Pub_Dto_Sale_Item);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

export {
    Fl32_Ap_Front_Realm_Pub_Dto_Sale_Item as default,
    Factory
} ;
