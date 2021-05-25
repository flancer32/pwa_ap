/**
 *  Product card in the catalog.
 */
class Fl32_Ap_Back_Store_RDb_Schema_Product_Card {
    date_created;
    id;
    type; // simple, grouped or configurable
}

// table name and columns names (entity and attributes) to use in queries to RDb
Fl32_Ap_Back_Store_RDb_Schema_Product_Card.A_DATE_CREATED = 'date_created';
Fl32_Ap_Back_Store_RDb_Schema_Product_Card.A_ID = 'id';
Fl32_Ap_Back_Store_RDb_Schema_Product_Card.A_TYPE = 'type';
Fl32_Ap_Back_Store_RDb_Schema_Product_Card.DATA_TYPE_SIMPLE = 'simple';
Fl32_Ap_Back_Store_RDb_Schema_Product_Card.DATA_TYPE_DRAFT = 'draft';
Fl32_Ap_Back_Store_RDb_Schema_Product_Card.ENTITY = 'prod_card';

// freeze class to deny attributes changes
Object.freeze(Fl32_Ap_Back_Store_RDb_Schema_Product_Card);

// MODULE'S EXPORT
export default Fl32_Ap_Back_Store_RDb_Schema_Product_Card;
