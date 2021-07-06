/**
 * Base layout widget (requires user authentication).
 *
 * @namespace Fl32_Ap_Front_Area_Pub_Widget_Layout_Base
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Area_Pub_Widget_Layout_Base';

// MODULE'S CLASSES

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Area_Pub_Widget_Layout_Base
 * @returns {Fl32_Ap_Front_Area_Pub_Widget_Layout_Base.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Back_Defaults} */
    const DEF = spec['Fl32_Ap_Back_Defaults$'];
    /** @type {Fl32_Ap_User_Front_Model_Session} */
    const session = spec[DEF.MOD_USER.DI_SESSION];
    const {ref} = spec[DEF.MOD_VUE.DI_VUE];
    destructuring
    /** @type {Fl32_Ap_Front_Area_Pub_Widget_Cart_Mini.vueCompTmpl} */
    const miniCart = spec['Fl32_Ap_Front_Area_Pub_Widget_Cart_Mini$']; // vue comp tmpl
    /** @type {Fl32_Ap_Front_Area_Pub_Widget_Layout_Navigator.vueCompTmpl} */
    const navigator = spec['Fl32_Ap_Front_Area_Pub_Widget_Layout_Navigator$']; // vue comp tmpl

    // DEFINE WORKING VARS
    const template = `
<q-layout view="hHh lpR fFf" v-if="isAuthenticated">

    <q-header elevated class="bg-primary text-white">
        <q-toolbar>
            <q-avatar v-on:click="$router.push('/')">
                <img src="favicon-192x192.png" alt="logo">
            </q-avatar>
            <q-toolbar-title>
                <mini-cart/>
            </q-toolbar-title>
            <q-btn dense flat round icon="menu" @click="toggleRightDrawer"/>
        </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay behavior="mobile" bordered>
        <navigator/>
    </q-drawer>

    <q-page-container>
        <slot/>
    </q-page-container>

</q-layout>
`;

    // DEFINE INNER FUNCTIONS

    // MAIN FUNCTIONALITY

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Area_Pub_Widget_Layout_Base
     */
    return {
        name: NS,
        template,
        components: {miniCart, navigator},
        data() {
            return {
                isAuthenticated: false,
            };
        },
        async created() {
            this.isAuthenticated = await session.checkUserAuthenticated(this.$router);
        },
        setup() {
            const rightDrawerOpen = ref(false)

            return {
                rightDrawerOpen,
                toggleRightDrawer() {
                    rightDrawerOpen.value = !rightDrawerOpen.value
                }
            }
        }
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
