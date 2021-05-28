/**
 * Shopping cart data for the 'pub' realm'.
 */
class Fl32_Ap_Front_Realm_Pub_Data_Cart {
    /** @type {number} */
    totalLi;
}

// attributes names to use in queries to RDb
Fl32_Ap_Front_Realm_Pub_Data_Cart.A_DATE_CREATED = 'dateCreated';
Fl32_Ap_Front_Realm_Pub_Data_Cart.A_ID = 'id';
Fl32_Ap_Front_Realm_Pub_Data_Cart.A_NAME = 'name';

// freeze class to deny attributes changes then export class
Object.freeze(Fl32_Ap_Front_Realm_Pub_Data_Cart);
export default Fl32_Ap_Front_Realm_Pub_Data_Cart;
