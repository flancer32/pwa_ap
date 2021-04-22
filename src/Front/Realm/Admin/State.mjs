/**
 * Aggregated state for default realm.
 *
 * @param {TeqFw_Di_SpecProxy} spec
 * @return {Object}
 */
function Fl32_Ap_Front_Realm_Admin_State(spec) {
    /** @type {Fl32_Ap_User_Front_State} */
    // const user = spec['Fl32_Ap_User_Front_State$'];   // singleton object

    return {
        namespaced: true,
        state: {
            lang: 'en-US',
            title: 'TeqFW App',
        },
        // modules: {user},
    };
}

// We should place function separately to allow JSDoc & IDEA hints & navigation.
export default Fl32_Ap_Front_Realm_Admin_State;
