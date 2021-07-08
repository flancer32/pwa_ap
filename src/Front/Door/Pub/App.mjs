/**
 * Frontend application for 'pub' realm.
 *
 * @namespace Fl32_Ap_Front_Door_Pub_App
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Door_Pub_App';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Door_Pub_App
 * @returns {Fl32_Ap_Front_Door_Pub_App.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Front_Defaults} */
    const DEF = spec['Fl32_Ap_Front_Defaults$'];
    /** @type {TeqFw_Di_Shared_Container} */
    const container = spec['TeqFw_Di_Shared_Container$']; // singleton
    const router = spec[DEF.MOD_VUE.DI_ROUTER];
    const app = spec[DEF.MOD_VUE.DI_APP];
    /** @type {TeqFw_Core_Front_Widget_Layout_Centered} */
    const layoutCentered = spec['TeqFw_Core_Front_Widget_Layout_Centered$']; // vue comp tmpl
    /** @type {Fl32_Ap_Front_Door_Pub_Widget_Layout_Base} */
    const layoutBase = spec['Fl32_Ap_Front_Door_Pub_Widget_Layout_Base$']; // vue comp tmpl
    /** @type {Fl32_Ap_Front_Door_Shared_Widget_Layout_Blank} */
    const layoutBlank = spec['Fl32_Ap_Front_Door_Shared_Widget_Layout_Blank$']; // vue comp tmpl

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
        component: () => container.get('Fl32_Ap_Front_Door_Pub_Route_Cart$'),
        path: DEF.DOOR_PUB_ROUTE_CART,
    });
    router.addRoute({
        component: () => container.get('Fl32_Ap_Front_Door_Pub_Route_Cfg$'),
        path: DEF.DOOR_PUB_ROUTE_CFG,
    });
    router.addRoute({
        component: () => container.get('Fl32_Ap_Front_Door_Pub_Route_Home$'),
        path: DEF.DOOR_PUB_ROUTE_HOME,
    });
    router.addRoute({
        component: () => container.get('Fl32_Ap_Front_Door_Pub_Route_Logout$'),
        path: DEF.DOOR_PUB_ROUTE_LOGOUT,
    });
    router.addRoute({
        component: () => container.get('Fl32_Ap_Front_Door_Pub_Route_Sales$'),
        path: DEF.DOOR_PUB_ROUTE_SALES,
    });
    router.addRoute({
        component: () => container.get('Fl32_Ap_Front_Door_Pub_Route_SignIn_CodeCheck$'),
        path: DEF.DOOR_PUB_ROUTE_SIGN_IN_CODE_CHECK,
        props: true,
    });
    router.addRoute({
        component: () => container.get('Fl32_Ap_Front_Door_Pub_Route_SignIn_CodeGet$'),
        path: DEF.DOOR_PUB_ROUTE_SIGN_IN_EMAIL_GET,
    });
    router.addRoute({
        component: () => container.get('Fl32_Ap_Front_Door_Pub_Route_SignUp_CodeCheck$'),
        path: DEF.DOOR_PUB_ROUTE_sign_Up_code_Check,
        props: true,
    });
    // add routes before this line
    app.use(router);

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Door_Pub_App
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
