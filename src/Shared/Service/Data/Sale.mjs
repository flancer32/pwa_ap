/**
 * Sale order data in Service API.
 */
class Fl32_Ap_Shared_Service_Data_Sale {
    /** @type {number} */
    amountTotal;
    /** @type {string} */
    currency;
    /** @type {Date} */
    dateCreated;
    /** @type {Date} */
    dateReceiving;
    /** @type {number} */
    id;
    /** @type {Fl32_Ap_Shared_Service_Data_Sale_Item[]} */
    items;
    /** @type {string} */
    state;
    /** @type {number} */
    userId;
}

// attributes names to use in queries to RDb
Fl32_Ap_Shared_Service_Data_Sale.A_AMOUNT_TOTAL = 'amountTotal';
Fl32_Ap_Shared_Service_Data_Sale.A_CURRENCY = 'currency';
Fl32_Ap_Shared_Service_Data_Sale.A_DATE_CREATED = 'dateCreated';
Fl32_Ap_Shared_Service_Data_Sale.A_DATE_RECEIVING = 'dateReceiving';
Fl32_Ap_Shared_Service_Data_Sale.A_ID = 'id';
Fl32_Ap_Shared_Service_Data_Sale.A_ITEMS = 'items';
Fl32_Ap_Shared_Service_Data_Sale.A_STATE = 'state';
Fl32_Ap_Shared_Service_Data_Sale.A_USER_ID = 'userId';

// freeze class to deny attributes changes then export class
Object.freeze(Fl32_Ap_Shared_Service_Data_Sale);
export default Fl32_Ap_Shared_Service_Data_Sale;
