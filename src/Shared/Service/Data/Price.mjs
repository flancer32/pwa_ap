/**
 * Price data in Service API.
 */
class Fl32_Ap_Shared_Service_Data_Price {
    /** @type {string} */
    currency;
    /** @type {number} */
    value;
}

// attributes names to use in queries to RDb
Fl32_Ap_Shared_Service_Data_Price.A_CURRENCY = 'currency';
Fl32_Ap_Shared_Service_Data_Price.A_VALUE = 'value';

// freeze class to deny attributes changes then export class
Object.freeze(Fl32_Ap_Shared_Service_Data_Price);
export default Fl32_Ap_Shared_Service_Data_Price;
