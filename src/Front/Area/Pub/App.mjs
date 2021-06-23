/**
 * Frontend application for 'pub' realm.
 *
 * @namespace Fl32_Ap_Front_Area_Pub_App
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Area_Pub_App';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Area_Pub_App
 * @returns {Fl32_Ap_Front_Area_Pub_App.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Defaults} */
    const DEF = spec['Fl32_Ap_Defaults$'];    // instance singleton
    /** @type {TeqFw_Di_Container} */
    const container = spec[DEF.MOD_CORE.DI_CONTAINER]; // named singleton
    const router = spec[DEF.MOD_VUE.DI_ROUTER];  // named singleton
    const app = spec[DEF.MOD_VUE.DI_APP];  // named singleton
    /** @type {TeqFw_Core_Front_Widget_Layout_Centered} */
    const layoutCentered = spec['TeqFw_Core_Front_Widget_Layout_Centered$']; // vue comp tmpl
    /** @type {Fl32_Ap_Front_Area_Pub_Widget_Layout_Base} */
    const layoutBase = spec['Fl32_Ap_Front_Area_Pub_Widget_Layout_Base$']; // vue comp tmpl
    /** @type {Fl32_Ap_Front_Area_Shared_Widget_Layout_Blank} */
    const layoutBlank = spec['Fl32_Ap_Front_Area_Shared_Widget_Layout_Blank$']; // vue comp tmpl

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
        component: () => container.get('Fl32_Ap_Front_Area_Pub_Route_Cart$'),
        path: DEF.REALM_PUB_ROUTE_cart,
    });
    router.addRoute({
        component: () => container.get('Fl32_Ap_Front_Area_Pub_Route_Cfg$'),
        path: DEF.REALM_PUB_ROUTE_cfg,
    });
    router.addRoute({
        component: () => container.get('Fl32_Ap_Front_Area_Pub_Route_Home$'),
        path: DEF.REALM_PUB_ROUTE_home,
    });
    router.addRoute({
        component: () => container.get('Fl32_Ap_Front_Area_Pub_Route_Logout$'),
        path: DEF.REALM_PUB_ROUTE_logout,
    });
    router.addRoute({
        component: () => container.get('Fl32_Ap_Front_Area_Pub_Route_Sales$'),
        path: DEF.REALM_PUB_ROUTE_sales,
    });
    router.addRoute({
        component: () => container.get('Fl32_Ap_Front_Area_Pub_Route_SignIn_CodeCheck$'),
        path: DEF.REALM_PUB_ROUTE_signIn_codeCheck,
        props: true,
    });
    router.addRoute({
        component: () => container.get('Fl32_Ap_Front_Area_Pub_Route_SignIn_CodeGet$'),
        path: DEF.REALM_PUB_ROUTE_signIn_emailGet,
    });
    router.addRoute({
        component: () => container.get('Fl32_Ap_Front_Area_Pub_Route_SignUp_CodeCheck$'),
        path: DEF.REALM_PUB_ROUTE_signUp_codeCheck,
        props: true,
    });
    // add routes before this line
    app.use(router);

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Area_Pub_App
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
        setup(props, context) {
        },
    }
}


// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
