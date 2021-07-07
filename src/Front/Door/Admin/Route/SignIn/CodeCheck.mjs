/**
 * Route widget for user's sign in with one-time code.
 *
 * @namespace Fl32_Ap_Front_Door_Admin_Route_SignIn_CodeCheck
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Door_Admin_Route_SignIn_CodeCheck';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Door_Admin_Route_SignIn_CodeCheck
 * @returns {Fl32_Ap_Front_Door_Admin_Route_SignIn_CodeCheck.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {TeqFw_Web_Front_Api_Dto_Config} */
    const config = spec['TeqFw_Web_Front_Api_Dto_Config$'];
    /** @type {Fl32_Ap_User_Front_Model_Session} */
    const session = spec['Fl32_Ap_User_Front_Model_Session$'];
    /** @type {TeqFw_Web_Front_Service_Gate} */
    const gate = spec['TeqFw_Web_Front_Service_Gate$'];
    /** @type {Fl32_Ap_User_Shared_Service_Route_SignIn_Code_Check.Factory} */
    const route = spec['Fl32_Ap_User_Shared_Service_Route_SignIn_Code_Check#Factory$'];

    // DEFINE WORKING VARS
    const template = `
<layout-centered>
    <div class="t-grid rows gutter-md" style="padding: var(--padding-grid);">
        <div style="text-align: center">{{$t('admin.route.signIn.code.check.title')}}</div>
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
     * @memberOf Fl32_Ap_Front_Door_Admin_Route_SignIn_CodeCheck
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
            const req = route.createReq();
            req.code = this.code;
            req.door = config.door;
            // noinspection JSValidateTypes
            /** @type {Fl32_Ap_User_Shared_Service_Route_SignIn_Code_Check.Response} */
            const res = await gate.send(req, route);
            if (res) {
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
