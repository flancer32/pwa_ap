/**
 *  Simple product with unique SKU.
 */
class Fl32_Ap_Back_Store_RDb_Schema_Product_Unit {
    card_ref;
    id;
    sku;
}

// table name and columns names (entity and attributes) to use in queries to RDb
Fl32_Ap_Back_Store_RDb_Schema_Product_Unit.A_CARD_REF = 'card_ref';
Fl32_Ap_Back_Store_RDb_Schema_Product_Unit.A_ID = 'id';
Fl32_Ap_Back_Store_RDb_Schema_Product_Unit.A_SKU = 'sku';
Fl32_Ap_Back_Store_RDb_Schema_Product_Unit.ENTITY = 'prod_unit';

// freeze class to deny attributes changes and export
Object.freeze(Fl32_Ap_Back_Store_RDb_Schema_Product_Unit);
export default Fl32_Ap_Back_Store_RDb_Schema_Product_Unit;
