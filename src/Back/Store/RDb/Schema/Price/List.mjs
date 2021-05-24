/**
 *  Price list can be bound to group, store, date range, etc.
 */
class Fl32_Ap_Back_Store_RDb_Schema_Price_List {
    id;
    name;
    currency;
}

// table name and columns names (entity and attributes) to use in queries to RDb
Fl32_Ap_Back_Store_RDb_Schema_Price_List.A_ID = 'id';
Fl32_Ap_Back_Store_RDb_Schema_Price_List.A_NAME = 'name';
Fl32_Ap_Back_Store_RDb_Schema_Price_List.A_CURRENCY = 'currency';
Fl32_Ap_Back_Store_RDb_Schema_Price_List.ENTITY = 'price_list';

// freeze class to deny attributes changes
Object.freeze(Fl32_Ap_Back_Store_RDb_Schema_Price_List);

// MODULE'S EXPORT
export default Fl32_Ap_Back_Store_RDb_Schema_Price_List;
