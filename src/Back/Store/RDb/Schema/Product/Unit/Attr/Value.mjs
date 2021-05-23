/**
 *  Relations between product unit and it's attributes values.
 */
class Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Attr_Value {
    unit_ref;
    value_ref;
}

// table name and columns names (entity and attributes) to use in queries to RDb
Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Attr_Value.A_UNIT_REF = 'unit_ref';
Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Attr_Value.A_VALUE_REF = 'value_ref';
Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Attr_Value.ENTITY = 'product_unit_attr_value';

// freeze class to deny attributes changes and export
Object.freeze(Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Attr_Value);
export default Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Attr_Value;
