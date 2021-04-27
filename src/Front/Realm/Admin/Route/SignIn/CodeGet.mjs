/**
 * Route widget to enter email to get one-time link for sign-in.
 *
 * @namespace Fl32_Ap_Front_Realm_Admin_Route_SignIn_CodeGet
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Realm_Admin_Route_SignIn_CodeGet';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Realm_Admin_Route_SignIn_CodeGet
 * @returns {Fl32_Ap_Front_Realm_Admin_Route_SignIn_CodeGet.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Defaults} */
    const DEF = spec['Fl32_Ap_Defaults$']; // instance singleton
    /** @type {TeqFw_Core_App_Front_Data_Config} */
    const config = spec[DEF.MOD_CORE.DI_CONFIG]; // instance singleton
    /** @type {Fl32_Ap_User_Front_Model_Session} */
    const session = spec[DEF.MOD_USER.DI_SESSION]; // named singleton
    /** @type {Fl32_Ap_Front_Widget_Sign_In_Code_Get.vueCompTmpl} */
    const codeGet = spec['Fl32_Ap_Front_Widget_Sign_In_Code_Get$']; // vue comp tmpl

    // DEFINE WORKING VARS
    const template = `
<layout-blank>
    <code-get></code-get>
</layout-blank>
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Realm_Admin_Route_SignIn_CodeGet
     */
    return {
        name: NS,
        template,
        components: {codeGet},
        beforeCreate() {
            // redirect to home route if user is authenticated
            if (session.getUser() !== null) {
                const route = (config.realm === DEF.REALM_ADM)
                    ? DEF.REALM_ADM_ROUTE_home
                    : DEF.REALM_PUB_ROUTE_home;
                this.$router.push(route);
            }
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
