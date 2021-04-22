/**
 * Frontend application for 'admin' realm.
 *
 * @namespace Fl32_Ap_Front_Realm_Admin_App
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Realm_Admin_App';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Realm_Admin_App
 * @returns {Fl32_Ap_Front_Realm_Admin_App.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Defaults} */
    const DEF = spec['Fl32_Ap_Defaults$'];    // instance singleton
    /** @type {TeqFw_Di_Container} */
    const container = spec[DEF.MOD_CORE.DI_CONTAINER]; // named singleton
    /** @type {Fl32_Ap_User_Front_Model_Session} */
    const session = spec[DEF.MOD_USER.DI_SESSION]; // named singleton
    const router = spec[DEF.MOD_VUE.DI_ROUTER];  // named singleton
    const app = spec[DEF.MOD_VUE.DI_APP];  // named singleton
    /** @type {TeqFw_Core_App_Front_Widget_Layout_Centered} */
    const layoutCentered = spec['TeqFw_Core_App_Front_Widget_Layout_Centered$']; // vue comp tmpl
    /** @type {Fl32_Ap_Front_Layout_Base} */
    const layoutBase = spec['Fl32_Ap_Front_Layout_Base$']; // vue comp tmpl
    /** @type {Fl32_Ap_Front_Layout_Blank} */
    const layoutBlank = spec['Fl32_Ap_Front_Layout_Blank$']; // vue comp tmpl
    const {mapMutations, mapState} = spec[DEF.MOD_VUE.DI_VUEX];

    // DEFINE WORKING VARS
    const template = `
<router-view></router-view>
`;

    // MAIN FUNCTIONALITY

    // add global available components
    app.component('LayoutBase', layoutBase);
    app.component('LayoutBlank', layoutBlank);
    app.component('LayoutCentered', layoutCentered);

    // setup application routes
    router.addRoute({
        component: () => container.get('Fl32_Ap_Front_Realm_Admin_Route_Home$'),
        path: DEF.REALM_ADM_ROUTE_home,
    });
    router.addRoute({
        component: () => container.get('Fl32_Ap_Front_Realm_Admin_Route_SignIn_CodeCheck$'),
        path: DEF.REALM_ADM_ROUTE_signIn_codeCheck,
        props: true,
    });
    router.addRoute({
        component: () => container.get('Fl32_Ap_Front_Realm_Admin_Route_SignIn_EmailGet$'),
        path: DEF.REALM_ADM_ROUTE_signIn_emailGet,
    });
    app.use(router);

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Realm_Admin_App
     */
    return {
        name: NS,
        template,
        components: {},
        data: function () {
            return {};
        },
        computed: {},
        methods: {},
        mounted() {
        },
    }
}


// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
