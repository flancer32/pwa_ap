/**
 * Route widget for app configuration in 'pub' realm.
 *
 * @namespace Fl32_Ap_Front_Area_Pub_Route_Cfg
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Area_Pub_Route_Cfg';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Area_Pub_Route_Cfg
 * @returns {Fl32_Ap_Front_Area_Pub_Route_Cfg.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS

    // DEFINE WORKING VARS
    const template = `
<layout-base >
    <div class="q-pa-xs q-gutter-xs">
        LOGOUT
    </div>
</layout-base>
`;

    // DEFINE INNER FUNCTIONS

    // MAIN FUNCTIONALITY

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Area_Pub_Route_Cfg
     */
    return {
        name: NS,
        template,
        components: {},
        data: function () {
            return {};
        },
        computed: {
            sales() { }
        },
        methods: {},
        async created() { },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
