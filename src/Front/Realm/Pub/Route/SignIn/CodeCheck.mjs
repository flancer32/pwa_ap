/**
 * Route widget for user's sign-in with one-time code.
 *
 * @namespace Fl32_Ap_Front_Realm_Pub_Route_SignIn_CodeCheck
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Realm_Pub_Route_SignIn_CodeCheck';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Realm_Pub_Route_SignIn_CodeCheck
 * @returns {Fl32_Ap_Front_Realm_Pub_Route_SignIn_CodeCheck.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Defaults} */
    const DEF = spec['Fl32_Ap_Defaults$']; // instance singleton
    /** @type {TeqFw_Core_App_Front_Data_Config} */
    const config = spec[DEF.MOD_CORE.DI_CONFIG]; // instance singleton
    /** @type {Fl32_Ap_User_Front_Model_Session} */
    const session = spec[DEF.MOD_USER.DI_SESSION]; // named singleton
    /** @type {Function|Fl32_Ap_User_Front_Gate_SignIn_Code_Check.gate} */
    const gate = spec['Fl32_Ap_User_Front_Gate_SignIn_Code_Check$']; // function singleton
    /** @type {typeof Fl32_Ap_User_Shared_Service_Route_SignIn_Code_Check.Request} */
    const Request = spec['Fl32_Ap_User_Shared_Service_Route_SignIn_Code_Check#Request']; // class

    // DEFINE WORKING VARS
    const template = `
<layout-centered>
    <div class="t-grid rows gutter-md" style="padding: var(--padding-grid);">
        <div style="text-align: center">{{$t('pub.route.signIn.code.check.title')}}</div>
        <div style="text-align: center" v-show="error">{{error}}</div>
    </div>
</layout-centered>
`;

    // DEFINE INNER FUNCTIONS

    // MAIN FUNCTIONALITY

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Realm_Pub_Route_SignIn_CodeCheck
     */
    return {
        name: NS,
        template,
        components: {},
        data: function () {
            return {
                error: null
            };
        },
        props: {
            code: String,
        },
        async mounted() {
            const req = new Request();
            req.code = this.code;
            req.realm = config.realm;
            /** @type {Fl32_Ap_User_Shared_Service_Route_SignIn_Code_Check.Response} */
            const res = await gate(req);
            if (res.constructor.name === 'TeqFw_Core_App_Front_Gate_Response_Error') {
                this.error = res.message;
            } else {
                await session.init();
                const route = session.getRouteToRedirect();
                this.$router.push(route);
            }
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
