/**
 * Route widget to clean up application state.
 *
 * @namespace Fl32_Ap_Front_Realm_Pub_Route_Cfg_Clean
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Realm_Pub_Route_Cfg_Clean';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Realm_Pub_Route_Cfg_Clean
 * @returns {Fl32_Ap_Front_Realm_Pub_Route_Cfg_Clean.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Front_Idb} */
    const idb = spec['Fl32_Ap_Front_Idb$']; // instance singleton

    // DEFINE WORKING VARS
    const template = `
<layout-base>
    <div>Application state is cleared.</div>
</layout-base>
`;

    // DEFINE INNER FUNCTIONS

    // MAIN FUNCTIONALITY

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Realm_Pub_Route_Cfg_Clean
     */
    return {
        name: NS,
        template,
        async mounted() {
            await idb.delete();
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
