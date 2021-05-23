/**
 *  Relations between product card and it's attributes values.
 */
class Fl32_Ap_Back_Store_RDb_Schema_Product_Card_Attr_Value {
    card_ref;
    value_ref;
}

// table name and columns names (entity and attributes) to use in queries to RDb
Fl32_Ap_Back_Store_RDb_Schema_Product_Card_Attr_Value.A_CARD_REF = 'card_ref';
Fl32_Ap_Back_Store_RDb_Schema_Product_Card_Attr_Value.A_VALUE_REF = 'value_ref';
Fl32_Ap_Back_Store_RDb_Schema_Product_Card_Attr_Value.ENTITY = 'product_card_attr_value';

// freeze class to deny attributes changes and export
Object.freeze(Fl32_Ap_Back_Store_RDb_Schema_Product_Card_Attr_Value);
export default Fl32_Ap_Back_Store_RDb_Schema_Product_Card_Attr_Value;
