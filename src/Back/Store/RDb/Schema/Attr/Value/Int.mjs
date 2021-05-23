/**
 *  Values for integer attributes.
 */
class Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Int {
    value;
    value_ref;
}

// table name and columns names (entity and attributes) to use in queries to RDb
Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Int.A_VALUE_REF = 'value_ref';
Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Int.A_VALUE = 'value';
Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Int.ENTITY = 'attr_value_int';

// freeze class to deny attributes changes and export
Object.freeze(Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Int);
export default Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Int;
