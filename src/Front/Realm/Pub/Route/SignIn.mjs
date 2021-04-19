/**
 * Route widget for sign in.
 *
 * @namespace Fl32_Ap_Front_Realm_Pub_Route_SignIn
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Realm_Pub_Route_SignIn';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Realm_Pub_Route_SignIn
 * @returns {Fl32_Ap_Front_Realm_Pub_Route_SignIn.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Defaults} */
    const DEF = spec['Fl32_Ap_Defaults$']; // instance singleton

    const {mapMutations, mapState} = spec[DEF.MOD_VUE.DI_VUEX];

    // DEFINE WORKING VARS
    const template = `
<div>SIGN IN</div>
`;

    // DEFINE INNER FUNCTIONS

    // MAIN FUNCTIONALITY

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Realm_Pub_Route_SignIn
     */
    return {
        name: NS,
        template,
        components: {},
        data: function () {
            return {
                displayMsg: false,
                fldEmail: null,
                loading: false,
                msg: null,
            };
        },
        computed: {},
        methods: {},
        created() {

        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
