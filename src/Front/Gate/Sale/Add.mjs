/**
 * Frontend gate to service to add new sale order.
 *
 * @namespace Fl32_Ap_Front_Gate_Sale_Add
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Gate_Sale_Add';

/**
 * Factory to create frontend gate.
 * @return function(Fl32_Ap_Shared_Service_Route_Sale_Add.Request): boolean
 * @memberOf Fl32_Ap_Front_Gate_Sale_Add
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Defaults} */
    const DEF = spec['Fl32_Ap_Defaults$']; // instance singleton
    /** @type {TeqFw_Core_App_Front_Gate_Connect} */
    const backConnect = spec['TeqFw_Core_App_Front_Gate_Connect$']; // instance singleton
    /** @type {typeof Fl32_Ap_Shared_Service_Route_Sale_Add.Response} */
    const Response = spec['Fl32_Ap_Shared_Service_Route_Sale_Add#Response']; // class

    // DEFINE INNER FUNCTIONS
    /**
     * @param {Fl32_Ap_Shared_Service_Route_Sale_Add.Request} data
     * @returns {Promise<Fl32_Ap_Shared_Service_Route_Sale_Add.Response|boolean>}
     * @memberOf Fl32_Ap_Front_Gate_Sale_Add
     */
    async function gate(data) {
        let result = false;
        const res = await backConnect.send(data, DEF.BACK_REALM, DEF.SERV_sale_add);
        if (res) {
            result = Object.assign(new Response(), res);
        }
        return result;
    }

    // COMPOSE RESULT
    Object.defineProperty(gate, 'name', {value: `${NS}.${gate.name}`});
    return gate;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;