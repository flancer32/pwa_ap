/**
 * Frontend gate to service to update user profile.
 *
 * @namespace Fl32_Ap_Front_Gate_Profile_Update
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Gate_Profile_Update';

/**
 * Factory to create frontend gate.
 * @return function(Fl32_Ap_Shared_Service_Route_Profile_Update.Request): boolean
 * @memberOf Fl32_Ap_Front_Gate_Profile_Update
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Defaults} */
    const DEF = spec['Fl32_Ap_Defaults$']; // instance singleton
    /** @type {TeqFw_Core_App_Front_Gate_Connect} */
    const conn = spec['TeqFw_Core_App_Front_Gate_Connect$']; // instance singleton
    /** @type {Fl32_Ap_Shared_Service_Route_Profile_Update.Factory} */
    const factory = spec['Fl32_Ap_Shared_Service_Route_Profile_Update#Factory$']; // instance singleton

    // DEFINE INNER FUNCTIONS
    /**
     * @param {Fl32_Ap_Shared_Service_Route_Profile_Update.Request} data
     * @returns {Promise<Fl32_Ap_Shared_Service_Route_Profile_Update.Response|boolean>}
     * @memberOf Fl32_Ap_Front_Gate_Profile_Update
     */
    async function gate(data) {
        let result = false;
        const res = await conn.send(data, DEF.BACK_REALM, DEF.SERV_profile_update);
        if (res) result = factory.createRes(res);
        return result;
    }

    // COMPOSE RESULT
    Object.defineProperty(gate, 'name', {value: `${NS}.${gate.name}`});
    return gate;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;