/**
 * Sale order item DTO for the 'pub' realm'.
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Door_Pub_Dto_Sale_Item';

class Fl32_Ap_Front_Door_Pub_Dto_Sale_Item {
    /** @type {number} */
    amountTotal;
    /** @type {number} */
    id;
    /** @type {number} */
    qty = 0;
    /** @type {number} */
    saleId;
    /** @type {number} */
    unitId;
    /** @type {number} */
    unitPrice;
}

// attributes names
Fl32_Ap_Front_Door_Pub_Dto_Sale_Item.AMOUNT_TOTAL = 'amountTotal';
Fl32_Ap_Front_Door_Pub_Dto_Sale_Item.ID = 'id';
Fl32_Ap_Front_Door_Pub_Dto_Sale_Item.QTY = 'qty';
Fl32_Ap_Front_Door_Pub_Dto_Sale_Item.SALE_ID = 'saleId';
Fl32_Ap_Front_Door_Pub_Dto_Sale_Item.UNIT_ID = 'unitId';
Fl32_Ap_Front_Door_Pub_Dto_Sale_Item.UNIT_PRICE = 'unitPrice';

/**
 * Factory to create new DTOs.
 * @memberOf Fl32_Ap_Front_Door_Pub_Dto_Sale_Item
 */
class Factory {
    constructor() {
        /**
         * @return {Fl32_Ap_Front_Door_Pub_Dto_Sale_Item}
         */
        this.create = () => new Fl32_Ap_Front_Door_Pub_Dto_Sale_Item();
    }

}

// freeze class to deny attributes changes then export class
Object.freeze(Fl32_Ap_Front_Door_Pub_Dto_Sale_Item);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});

export {
    Fl32_Ap_Front_Door_Pub_Dto_Sale_Item as default,
    Factory
} ;
