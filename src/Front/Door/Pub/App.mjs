/**
 * Admin application.
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Door_Pub_App';

export default class Fl32_Ap_Front_Door_Pub_App {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Front_Defaults} */
        const DEF = spec['Fl32_Ap_Front_Defaults$'];
        /** @type {TeqFw_Vue_Front_Lib} */
        const VueLib = spec['TeqFw_Vue_Front_Lib$'];
        /** @type {TeqFw_I18n_Front_Lib} */
        const I18nLib = spec['TeqFw_I18n_Front_Lib$'];
        /** @type {TeqFw_Ui_Quasar_Front_Lib} */
        const QuasarLib = spec['TeqFw_Ui_Quasar_Front_Lib$'];
        /** @type {TeqFw_Di_Shared_Container} */
        const container = spec['TeqFw_Di_Shared_Container$'];
        /** @type {Fl32_Ap_Front_Door_Shared_Widget_Layout_Centered} */
        const layoutCentered = spec['Fl32_Ap_Front_Door_Shared_Widget_Layout_Centered$'];
        /** @type {Fl32_Ap_Front_Door_Pub_Widget_Layout_Base} */
        const layoutBase = spec['Fl32_Ap_Front_Door_Pub_Widget_Layout_Base$'];
        /** @type {Fl32_Ap_Front_Door_Shared_Widget_Layout_Blank} */
        const layoutBlank = spec['Fl32_Ap_Front_Door_Shared_Widget_Layout_Blank$'];
        /** @type {TeqFw_Web_Front_Model_Config} */
        const config = spec['TeqFw_Web_Front_Model_Config$'];
        /** @type {Fl32_Ap_User_Front_Model_Session} */
        const session = spec['Fl32_Ap_User_Front_Model_Session$'];

        // DEFINE WORKING VARS
        /** @type {{createApp}} */
        const Vue = VueLib.getVue();
        /** @type {{createRouter, createWebHashHistory}} */
        const Router = VueLib.getRouter();
        let root; // root component for the application

        const template = `
<router-view></router-view>
`;

        // DEFINE INNER FUNCTIONS


        // DEFINE INSTANCE METHODS
        /**
         * Initialize application.
         *
         * @return {Promise<void>}
         */
        this.init = async function () {
            // DEFINE INNER FUNCTIONS

            async function initI18n(app) {
                await I18nLib.init(['lv', 'ru'], 'ru');
                const appProps = app.config.globalProperties;
                const i18n = I18nLib.getI18n();
                appProps.$t = function (key, options) {
                    // add package name if namespace is omitted in the key
                    const ns = this.$options.teq?.package;
                    if (ns && key.indexOf(':') <= 0) key = `${ns}:${key}`;
                    return i18n.t(key, options);
                }
            }

            function initQuasarUi(app) {
                const quasar = QuasarLib.getQuasar()
                app.use(quasar, {config: {}});
                quasar.iconSet.set(quasar.iconSet.svgMaterialIcons);
            }

            function initRouter() {
                /** @type {{addRoute}} */
                const router = Router.createRouter({
                    history: Router.createWebHashHistory(),
                    routes: [],
                });

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
                root.use(router);
            }

            async function initSession() {
                session.setRouteToSignIn(DEF.DOOR_PUB_ROUTE_SIGN_IN_EMAIL_GET);
                await session.init();
            }

            // MAIN FUNCTIONALITY

            // create root component
            root = Vue.createApp({
                teq: {package: DEF.SHARED.NAME},
                name: NS,
                template,
            });

            // ... and add global available components
            root.component('LayoutBase', layoutBase);
            root.component('LayoutBlank', layoutBlank);
            root.component('LayoutCentered', layoutCentered);

            // other initialization
            await config.init({door: DEF.SHARED.DOOR_ADMIN});
            await Promise.all([
                initI18n(root),
                initSession()
            ]);
            initQuasarUi(root);
            initRouter();
        }

        /**
         * Mount root component of the application to DOM element.
         *
         * @see https://v3.vuejs.org/api/application-api.html#mount
         *
         * @param {Element|string} rootContainer
         * @return {Object} the root component instance
         */
        this.mount = function (rootContainer) {
            return root.mount(rootContainer);
        }

    }
}
