/**
 *  Default values for text attributes (w/o i18n).
 */
class Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Text {
    value;
    value_ref;
}

// table name and columns names (entity and attributes) to use in queries to RDb
Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Text.A_VALUE_REF = 'value_ref';
Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Text.A_VALUE = 'value';
Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Text.ENTITY = 'attr_value_text';

// freeze class to deny attributes changes and export
Object.freeze(Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Text);
export default Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Text;
