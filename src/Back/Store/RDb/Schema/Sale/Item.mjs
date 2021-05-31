/**
 *  Sale order items.
 */
class Fl32_Ap_Back_Store_RDb_Schema_Sale_Item {
    amount_total;
    id;
    qty;
    sale_ref;
    unit_price;
    unit_ref;
}

// table name and columns names (entity and attributes) to use in queries to RDb
Fl32_Ap_Back_Store_RDb_Schema_Sale_Item.A_AMOUNT_TOTAL = 'amount_total';
Fl32_Ap_Back_Store_RDb_Schema_Sale_Item.A_ID = 'id';
Fl32_Ap_Back_Store_RDb_Schema_Sale_Item.A_QTY = 'qty';
Fl32_Ap_Back_Store_RDb_Schema_Sale_Item.A_SALE_REF = 'sale_ref';
Fl32_Ap_Back_Store_RDb_Schema_Sale_Item.A_UNIT_PRICE = 'unit_price';
Fl32_Ap_Back_Store_RDb_Schema_Sale_Item.A_UNIT_REF = 'unit_ref';
Fl32_Ap_Back_Store_RDb_Schema_Sale_Item.ENTITY = 'sale_item';

// freeze class to deny attributes changes and export
Object.freeze(Fl32_Ap_Back_Store_RDb_Schema_Sale_Item);
export default Fl32_Ap_Back_Store_RDb_Schema_Sale_Item;
