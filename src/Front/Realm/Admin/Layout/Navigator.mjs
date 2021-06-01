/**
 * Navigator for admin base layout.
 *
 * @namespace Fl32_Ap_Front_Realm_Admin_Layout_Navigator
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Realm_Admin_Layout_Navigator';

// MODULE'S CLASSES

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Realm_Admin_Layout_Navigator
 * @returns {Fl32_Ap_Front_Realm_Admin_Layout_Navigator.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS

    // DEFINE WORKING VARS
    const template = `
<div class="t-grid rows gutter-md" style="margin: var(--grid-gap-md);">
    <div class="t-grid cols gutter-md" style="justify-items: center;">
        <div><q-btn flat round icon="settings" /></div>
        <div><q-btn flat round icon="logout" /></div>
    </div>
    <div class="t-grid rows">
         <router-link to="/user/invite">Invite User</router-link>
         <router-link to="/sale/list">Sales</router-link>
    </div>
</div>
`;

    // DEFINE INNER FUNCTIONS

    // MAIN FUNCTIONALITY

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Realm_Admin_Layout_Navigator
     */
    return {
        name: NS,
        template,
        components: {},
        data() {
            return {};
        },
        computed: {},
        methods: {},
        watch: {},
        emits: {},
        setup(props, context) {},
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
