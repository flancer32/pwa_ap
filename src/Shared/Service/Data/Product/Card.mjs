/**
 * Product card data in Service API.
 */
class Fl32_Ap_Shared_Service_Data_Product_Card {
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
    /** @type {Object<number, Fl32_Ap_Shared_Service_Data_Product_Unit>} */
    units;
}

// attributes names to use in queries to RDb
Fl32_Ap_Shared_Service_Data_Product_Card.A_ATTRS = 'attrs';
Fl32_Ap_Shared_Service_Data_Product_Card.A_DATE_CREATED = 'dateCreated';
Fl32_Ap_Shared_Service_Data_Product_Card.A_ID = 'id';
Fl32_Ap_Shared_Service_Data_Product_Card.A_TYPE = 'type';
Fl32_Ap_Shared_Service_Data_Product_Card.A_UNITS = 'units';

// freeze class to deny attributes changes then export class
Object.freeze(Fl32_Ap_Shared_Service_Data_Product_Card);
export default Fl32_Ap_Shared_Service_Data_Product_Card;
