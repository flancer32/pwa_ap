/**
 *  Registry for attributes.
 */
class Fl32_Ap_Back_Store_RDb_Schema_Attr {
    code;
    date_created;
    id;
    type;
}

// table name and columns names (entity and attributes) to use in queries to RDb
Fl32_Ap_Back_Store_RDb_Schema_Attr.A_CODE = 'code';
Fl32_Ap_Back_Store_RDb_Schema_Attr.A_DATE_CREATED = 'date_created';
Fl32_Ap_Back_Store_RDb_Schema_Attr.A_ID = 'id';
Fl32_Ap_Back_Store_RDb_Schema_Attr.A_TYPE = 'type';
Fl32_Ap_Back_Store_RDb_Schema_Attr.DATA_TYPE_DATETIME = 'datetime';
Fl32_Ap_Back_Store_RDb_Schema_Attr.DATA_TYPE_DECIMAL = 'decimal';
Fl32_Ap_Back_Store_RDb_Schema_Attr.DATA_TYPE_INTEGER = 'integer';
Fl32_Ap_Back_Store_RDb_Schema_Attr.DATA_TYPE_OPTION = 'option';
Fl32_Ap_Back_Store_RDb_Schema_Attr.DATA_TYPE_TEXT = 'text';
Fl32_Ap_Back_Store_RDb_Schema_Attr.ENTITY = 'attr';

// freeze class to deny attributes changes and export
Object.freeze(Fl32_Ap_Back_Store_RDb_Schema_Attr);
export default Fl32_Ap_Back_Store_RDb_Schema_Attr;
