/**
 * Product card DTO used on the front (all realms).
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Door_Shared_Dto_Product_Card';

// MODULE'S CLASSES
class Fl32_Ap_Front_Door_Shared_Dto_Product_Card {
    /** @type {Object<string, *>} */
    attrs = {};
    /** @type {Date} */
    dateCreated;
    /** @type {number} */
    id;
    /** @type {string} */
    type;
    /** @type {Object<number, Fl32_Ap_Front_Door_Shared_Dto_Product_Unit>} */
    units = {};
}

// attributes names
Fl32_Ap_Front_Door_Shared_Dto_Product_Card.ATTRS = 'attrs';
Fl32_Ap_Front_Door_Shared_Dto_Product_Card.DATE_CREATED = 'dateCreated';
Fl32_Ap_Front_Door_Shared_Dto_Product_Card.ID = 'id';
Fl32_Ap_Front_Door_Shared_Dto_Product_Card.TYPE = 'type';
Fl32_Ap_Front_Door_Shared_Dto_Product_Card.UNITS = 'units';

/**
 * Factory to create new DTOs.
 * @memberOf Fl32_Ap_Front_Door_Shared_Dto_Product_Card
 */
class Factory {
    constructor() {
        /**
         * @return {Fl32_Ap_Front_Door_Shared_Dto_Product_Card}
         */
        this.create = () => new Fl32_Ap_Front_Door_Shared_Dto_Product_Card();
    }

}

// freeze class to deny attributes changes then export class
Object.freeze(Fl32_Ap_Front_Door_Shared_Dto_Product_Card);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});

export {
    Fl32_Ap_Front_Door_Shared_Dto_Product_Card as default,
    Factory
} ;
