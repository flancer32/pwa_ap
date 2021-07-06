/**
 * Product unit DTO used on the front (all realms).
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Area_Shared_Dto_Product_Unit';

// MODULE'S CLASSES
class Fl32_Ap_Front_Area_Shared_Dto_Product_Unit {
    /** @type {Object<string, *>} */
    attrs = {};
    /** @type {number} */
    cardId;
    /** @type {number} */
    id;
    /** @type {Fl32_Ap_Front_Area_Pub_Dto_Amount} */
    price;
    /** @type {string} */
    sku;
}

// attributes names
Fl32_Ap_Front_Area_Shared_Dto_Product_Unit.ATTRS = 'attrs';
Fl32_Ap_Front_Area_Shared_Dto_Product_Unit.CARD_ID = 'cardId';
Fl32_Ap_Front_Area_Shared_Dto_Product_Unit.ID = 'id';
Fl32_Ap_Front_Area_Shared_Dto_Product_Unit.PRICE = 'price';
Fl32_Ap_Front_Area_Shared_Dto_Product_Unit.SKU = 'sku';

/**
 * Factory to create new DTOs.
 * @memberOf Fl32_Ap_Front_Area_Shared_Dto_Product_Unit
 */
class Factory {
    constructor(spec) {
        /** @type {Fl32_Ap_Front_Area_Pub_Dto_Amount.Factory} */
        const fAmount = spec['Fl32_Ap_Front_Area_Pub_Dto_Amount#Factory$'];
        /**
         * @return {Fl32_Ap_Front_Area_Shared_Dto_Product_Unit}
         */
        this.create = () => {
            const result = new Fl32_Ap_Front_Area_Shared_Dto_Product_Unit();
            result.price = fAmount.create();
            return result;
        };
    }

}

// freeze class to deny attributes changes then export class
Object.freeze(Fl32_Ap_Front_Area_Shared_Dto_Product_Unit);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});

export {
    Fl32_Ap_Front_Area_Shared_Dto_Product_Unit as default,
    Factory
} ;
