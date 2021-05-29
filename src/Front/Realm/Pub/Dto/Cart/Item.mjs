/**
 * Shopping cart item DTO for the 'pub' realm'.
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Realm_Pub_Dto_Cart_Item';

class Fl32_Ap_Front_Realm_Pub_Dto_Cart_Item {
    /** @type {number} */
    count = 0;
    /** @type {Fl32_Ap_Shared_Service_Data_Product_Unit} */
    unit;
}

// attributes names
Fl32_Ap_Front_Realm_Pub_Dto_Cart_Item.A_COUNT = 'count';
Fl32_Ap_Front_Realm_Pub_Dto_Cart_Item.A_UNIT = 'unit';

/**
 * Factory to create new DTOs.
 * @memberOf Fl32_Ap_Front_Realm_Pub_Dto_Cart_Item
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        const DUnit = spec['Fl32_Ap_Shared_Service_Data_Product_Unit#']; // class

        /**
         * @return {Fl32_Ap_Front_Realm_Pub_Dto_Cart_Item}
         */
        this.create = function () {
            const result = new Fl32_Ap_Front_Realm_Pub_Dto_Cart_Item();
            result.unit = new DUnit();
            return result;
        }
    }

}

// freeze class to deny attributes changes then export class
Object.freeze(Fl32_Ap_Front_Realm_Pub_Dto_Cart_Item);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

export {
    Fl32_Ap_Front_Realm_Pub_Dto_Cart_Item as default,
    Factory
} ;
