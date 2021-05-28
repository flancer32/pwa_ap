/**
 * Aggregated state for 'pub' realm.
 *
 * @param {TeqFw_Di_SpecProxy} spec
 * @return {Object}
 */
function Fl32_Ap_Front_Realm_Pub_State(spec) {


    return {
        namespaced: true,
        state: {
            lang: 'en-US',
            title: 'TeqFW App',
            cart: {},
        },
        // modules: {user},
    };
}

// We should place function separately to allow JSDoc & IDEA hints & navigation.
export default Fl32_Ap_Front_Realm_Pub_State;
