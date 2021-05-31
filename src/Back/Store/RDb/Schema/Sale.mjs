/**
 *  Registry for sales orders.
 */
class Fl32_Ap_Back_Store_RDb_Schema_Sale {
    amount_total;
    currency;
    date_created;
    date_receiving;
    id;
    state;
    user_ref;
}

// table name and columns names (entity and attributes) to use in queries to RDb
Fl32_Ap_Back_Store_RDb_Schema_Sale.A_AMOUNT_TOTAL = 'amount_total';
Fl32_Ap_Back_Store_RDb_Schema_Sale.A_CURRENCY = 'currency';
Fl32_Ap_Back_Store_RDb_Schema_Sale.A_DATE_CREATED = 'date_created';
Fl32_Ap_Back_Store_RDb_Schema_Sale.A_DATE_RECEIVING = 'date_receiving';
Fl32_Ap_Back_Store_RDb_Schema_Sale.A_ID = 'id';
Fl32_Ap_Back_Store_RDb_Schema_Sale.A_STATE = 'state';
Fl32_Ap_Back_Store_RDb_Schema_Sale.A_USER_REF = 'user_ref';
Fl32_Ap_Back_Store_RDb_Schema_Sale.DATA_STATE_CANCELLED = 'cancelled';
Fl32_Ap_Back_Store_RDb_Schema_Sale.DATA_STATE_COLLECTED = 'collected';
Fl32_Ap_Back_Store_RDb_Schema_Sale.DATA_STATE_COMPLETE = 'complete';
Fl32_Ap_Back_Store_RDb_Schema_Sale.DATA_STATE_NEW = 'new';
Fl32_Ap_Back_Store_RDb_Schema_Sale.ENTITY = 'sale';

// freeze class to deny attributes changes and export
Object.freeze(Fl32_Ap_Back_Store_RDb_Schema_Sale);
export default Fl32_Ap_Back_Store_RDb_Schema_Sale;
