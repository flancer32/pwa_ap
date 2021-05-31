/**
 * Sale order item data in Service API.
 */
class Fl32_Ap_Shared_Service_Data_Sale_Item {
    /** @type {number} */
    amountTotal;
    /** @type {number} */
    id;
    /** @type {number} */
    qty;
    /** @type {number} */
    saleId;
    /** @type {number} */
    unitId;
    /** @type {number} */
    unitPrice;
}

// attributes names to use in queries to RDb
Fl32_Ap_Shared_Service_Data_Sale_Item.A_AMOUNT_TOTAL = 'amountTotal';
Fl32_Ap_Shared_Service_Data_Sale_Item.A_ID = 'id';
Fl32_Ap_Shared_Service_Data_Sale_Item.A_QTY = 'qty';
Fl32_Ap_Shared_Service_Data_Sale_Item.A_SALE_ID = 'saleId';
Fl32_Ap_Shared_Service_Data_Sale_Item.A_UNIT_ID = 'unitId';
Fl32_Ap_Shared_Service_Data_Sale_Item.A_UNIT_PRICE = 'unitPrice';

// freeze class to deny attributes changes then export class
Object.freeze(Fl32_Ap_Shared_Service_Data_Sale_Item);
export default Fl32_Ap_Shared_Service_Data_Sale_Item;
