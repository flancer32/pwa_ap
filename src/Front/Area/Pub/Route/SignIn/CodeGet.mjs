/**
 * Route widget to enter email to get one-time link for sign-in.
 *
 * @namespace Fl32_Ap_Front_Area_Pub_Route_SignIn_CodeGet
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Area_Pub_Route_SignIn_CodeGet';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Area_Pub_Route_SignIn_CodeGet
 * @returns {Fl32_Ap_Front_Area_Pub_Route_SignIn_CodeGet.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Front_Defaults} */
    const DEF = spec['Fl32_Ap_Front_Defaults$'];
    /** @type {TeqFw_Web_Front_Api_Dto_Config} */
    const config = spec['TeqFw_Web_Front_Api_Dto_Config$'];
    /** @type {Fl32_Ap_User_Front_Model_Session} */
    const session = spec['Fl32_Ap_User_Front_Model_Session$'];
    /** @type {Fl32_Ap_Front_Area_Shared_Widget_Sign_In_Code_Get.vueCompTmpl} */
    const codeGet = spec['Fl32_Ap_Front_Area_Shared_Widget_Sign_In_Code_Get$']; // vue comp tmpl

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
     * @memberOf Fl32_Ap_Front_Area_Pub_Route_SignIn_CodeGet
     */
    return {
        name: NS,
        template,
        components: {codeGet},
        beforeCreate() {
            // redirect to home route if user is authenticated
            if (session.getUser() !== null) {
                const route = (config.door === DEF.SHARED.DOOR_ADMIN)
                    ? DEF.DOOR_ADM_ROUTE_HOME
                    : DEF.DOOR_PUB_ROUTE_HOME;
                this.$router.push(route);
            }
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
