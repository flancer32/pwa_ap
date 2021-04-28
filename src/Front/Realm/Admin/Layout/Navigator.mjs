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
    /** @type {Fl32_Ap_Defaults} */
    const DEF = spec['Fl32_Ap_Defaults$'];
    /** @type {TeqFw_Di_Container} */
    const container = spec[DEF.MOD_CORE.DI_CONTAINER]; // named singleton
    const i18next = spec[DEF.MOD_CORE.DI_I18N]; // named singleton
    const {ref} = spec[DEF.MOD_VUE.DI_VUE];    // named singleton destructuring

    // DEFINE WORKING VARS
    const template = `
<div class="t-grid rows gutter-md" style="margin: var(--grid-gap-md);">
    <div class="t-grid cols gutter-md" style="justify-items: center;">
        <div><q-btn flat round icon="settings" /></div>
        <div><q-btn flat round icon="logout" /></div>
    </div>
    <div>
         <router-link to="/user/invite">Invite User</router-link>
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
