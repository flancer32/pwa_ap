/**
 * Frontend gate to service to get list of products.
 *
 * @namespace Fl32_Ap_Front_Gate_Product_List
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Gate_Product_List';

/**
 * Factory to create frontend gate.
 * @return function(Fl32_Ap_Shared_Service_Route_Product_List.Request): boolean
 * @memberOf Fl32_Ap_Front_Gate_Product_List
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Defaults} */
    const DEF = spec['Fl32_Ap_Defaults$']; // instance singleton
    /** @type {TeqFw_Core_App_Front_Gate_Connect} */
    const backConnect = spec['TeqFw_Core_App_Front_Gate_Connect$']; // instance singleton
    /** @type {typeof Fl32_Ap_Shared_Service_Route_Product_List.Response} */
    const Response = spec['Fl32_Ap_Shared_Service_Route_Product_List#Response']; // class

    // DEFINE INNER FUNCTIONS
    /**
     * @param {Fl32_Ap_Shared_Service_Route_Product_List.Request} data
     * @returns {Promise<Fl32_Ap_Shared_Service_Route_Product_List.Response|boolean>}
     * @memberOf Fl32_Ap_Front_Gate_Product_List
     */
    async function gate(data) {
        let result = false;
        const res = await backConnect.send(data, DEF.BACK_REALM, DEF.SERV_product_list);
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
