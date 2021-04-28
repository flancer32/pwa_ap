/**
 * Route widget to invite new user.
 *
 * @namespace Fl32_Ap_Front_Realm_Admin_Route_User_Invite
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Realm_Admin_Route_User_Invite';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Realm_Admin_Route_User_Invite
 * @returns {Fl32_Ap_Front_Realm_Admin_Route_User_Invite.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Defaults} */
    const DEF = spec['Fl32_Ap_Defaults$']; // instance singleton
    /** @type {Fl32_Ap_User_Front_Model_Session} */
    const session = spec[DEF.MOD_USER.DI_SESSION]; // named singleton

    // DEFINE WORKING VARS
    const template = `
<layout-base>
    <div>invite new user</div>
</layout-base>
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Realm_Admin_Route_User_Invite
     */
    return {
        name: NS,
        template,
        beforeCreate() {
            session.checkUserAuthenticated(this.$router);
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
