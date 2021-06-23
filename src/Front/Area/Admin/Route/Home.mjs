/**
 * Route widget for app home.
 *
 * @namespace Fl32_Ap_Front_Area_Admin_Route_Home
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Area_Admin_Route_Home';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Area_Admin_Route_Home
 * @returns {Fl32_Ap_Front_Area_Admin_Route_Home.vueCompTmpl}
 */
function Factory() {
    // EXTRACT DEPS

    // DEFINE WORKING VARS
    const template = `
<layout-base>HOME</layout-base>
`;

    // DEFINE INNER FUNCTIONS

    // MAIN FUNCTIONALITY

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Area_Admin_Route_Home
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
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
