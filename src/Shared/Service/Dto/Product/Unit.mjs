/**
 * Product unit DTO in Service API.
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Shared_Service_Dto_Product_Unit';

// MODULE'S CLASSES
class Fl32_Ap_Shared_Service_Dto_Product_Unit {
    /** @type {Object<string, *>} */
    attrs;
    /** @type {number} */
    cardId;
    /**
     * Internal id for the card. Can be omitted for new entities (not saved yet).
     * @type {number}
     */
    id;
    /** @type {Fl32_Ap_Shared_Service_Dto_Price} */
    price;
    /** @type {string} */
    sku;
}

// attributes names to use as aliases in queries to RDb
Fl32_Ap_Shared_Service_Dto_Product_Unit.ATTRS = 'attrs';
Fl32_Ap_Shared_Service_Dto_Product_Unit.CARD_ID = 'cardId';
Fl32_Ap_Shared_Service_Dto_Product_Unit.ID = 'id';
Fl32_Ap_Shared_Service_Dto_Product_Unit.SKU = 'sku';

/**
 * Factory to create new DTOs.
 * @memberOf Fl32_Ap_Shared_Service_Dto_Product_Unit
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Shared_Service_Dto_Price.Factory} */
        const fPrice = spec['Fl32_Ap_Shared_Service_Dto_Price#Factory$']; // instance singleton
        /**
         * @return {Fl32_Ap_Shared_Service_Dto_Product_Unit}
         */
        this.create = function () {
            const result = new Fl32_Ap_Shared_Service_Dto_Product_Unit();
            result.attrs = {};
            result.price = fPrice.create();
            return result;
        }
    }
}

// freeze class to deny attributes changes then export class
Object.freeze(Fl32_Ap_Shared_Service_Dto_Product_Unit);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export {
    Fl32_Ap_Shared_Service_Dto_Product_Unit as default,
    Factory
} ;
