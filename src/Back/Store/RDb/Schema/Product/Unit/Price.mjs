/**
 *  Price for the product unit in the list of prices.
 *  Price list can be bound to group, store, date range, etc.
 */
class Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Price {
    list_ref;
    price;
    unit_ref;
}

// table name and columns names (entity and attributes) to use in queries to RDb
Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Price.A_LIST_REF = 'list_ref';
Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Price.A_PRICE = 'price';
Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Price.A_UNIT_REF = 'unit_ref';
Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Price.ENTITY = 'prod_unit_price';

// freeze class to deny attributes changes
Object.freeze(Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Price);

// MODULE'S EXPORT
export default Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Price;
