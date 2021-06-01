/**
 * Route widget for sales listing in 'admin' realm.
 *
 * @namespace Fl32_Ap_Front_Realm_Admin_Route_Sale_List
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Realm_Admin_Route_Sale_List';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Realm_Admin_Route_Sale_List
 * @returns {Fl32_Ap_Front_Realm_Admin_Route_Sale_List.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Defaults} */
    const DEF = spec['Fl32_Ap_Defaults$']; // instance singleton
    /** @type {Fl32_Ap_User_Front_Model_Session} */
    const session = spec[DEF.MOD_USER.DI_SESSION]; // named singleton
    /** @type {Fl32_Ap_Front_Realm_Admin_Widget_Sale_List.vueCompTmpl} */
    const saleList = spec['Fl32_Ap_Front_Realm_Admin_Widget_Sale_List$']; // vue comp tmpl

    // DEFINE WORKING VARS
    const template = `
<layout-base>
    <div>ACTIONS & FILTERS</div>
    <sale-list></sale-list>
</layout-base>
`;

    // DEFINE INNER FUNCTIONS

    // MAIN FUNCTIONALITY

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Realm_Admin_Route_Sale_List
     */
    return {
        name: NS,
        template,
        components: {saleList},
        data: function () {
            return {};
        },
        computed: {},
        methods: {},
        beforeCreate() {
            // redirect anonymous to sign-in route
            session.checkUserAuthenticated(this.$router);
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
