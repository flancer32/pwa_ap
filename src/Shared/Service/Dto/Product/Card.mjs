/**
 * Product card DTO in Service API.
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Shared_Service_Dto_Product_Card';

// MODULE'S CLASSES
class Fl32_Ap_Shared_Service_Dto_Product_Card {
    /** @type {Object<string, *>} */
    attrs;
    /** @type {Date} */
    dateCreated;
    /**
     * Internal id for the card. Can be omitted for new entities (not saved yet).
     * @type {number}
     */
    id;
    /** @type {string} */
    type;
    /** @type {Fl32_Ap_Shared_Service_Dto_Product_Unit[]} */
    units;
}

// attributes names to use as aliases in queries to RDb
Fl32_Ap_Shared_Service_Dto_Product_Card.ATTRS = 'attrs';
Fl32_Ap_Shared_Service_Dto_Product_Card.DATE_CREATED = 'dateCreated';
Fl32_Ap_Shared_Service_Dto_Product_Card.ID = 'id';
Fl32_Ap_Shared_Service_Dto_Product_Card.TYPE = 'type';
Fl32_Ap_Shared_Service_Dto_Product_Card.UNITS = 'units';

/**
 * Factory to create new DTOs.
 * @memberOf Fl32_Ap_Shared_Service_Dto_Product_Card
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {typeof Fl32_Ap_Shared_Service_Dto_Product_Unit} */
        const DUnit = spec['Fl32_Ap_Shared_Service_Dto_Product_Unit#']; // class
        /** @type {Fl32_Ap_Shared_Service_Dto_Product_Unit.Factory} */
        const fUnit = spec['Fl32_Ap_Shared_Service_Dto_Product_Unit#Factory$']; // instance singleton

        /**
         * @param {Object|null} data
         * @return {Fl32_Ap_Shared_Service_Dto_Product_Card}
         */
        this.create = function (data = null) {
            const result = new Fl32_Ap_Shared_Service_Dto_Product_Card();
            result.attrs = data?.attrs ?? {};
            result.dateCreated = data?.dateCreated
                ? (data.dateCreated instanceof Date) ? data.dateCreated : new Date(data.dateCreated)
                : null;
            result.id = data?.id;
            result.type = data?.type;
            result.units = Array.isArray(data?.units)
                ? data.units.map((one) => (one instanceof DUnit) ? one : fUnit.create(one))
                : [];
            return result;
        }
    }
}

// freeze class to deny attributes changes then export class
Object.freeze(Fl32_Ap_Shared_Service_Dto_Product_Card);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export {
    Fl32_Ap_Shared_Service_Dto_Product_Card as default,
    Factory
} ;
