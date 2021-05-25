/**
 * Product unit data in Service API.
 */
class Fl32_Ap_Shared_Service_Data_Product_Unit {
    /** @type {Object.<string, *>} */
    attrs;
    /** @type {number} */
    cardId;
    /**
     * Internal id for the card. Can be omitted for new entities (not saved yet).
     * @type {number}
     */
    id;
    /** @type {string} */
    sku;
}

// attributes names to use in queries to RDb
Fl32_Ap_Shared_Service_Data_Product_Unit.A_ATTRS = 'attrs';
Fl32_Ap_Shared_Service_Data_Product_Unit.A_CARD_ID = 'cardId';
Fl32_Ap_Shared_Service_Data_Product_Unit.A_ID = 'id';
Fl32_Ap_Shared_Service_Data_Product_Unit.A_SKU = 'sku';

// freeze class to deny attributes changes then export class
Object.freeze(Fl32_Ap_Shared_Service_Data_Product_Unit);
export default Fl32_Ap_Shared_Service_Data_Product_Unit;
