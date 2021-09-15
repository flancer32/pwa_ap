/**
 * Navigator for admin base layout.
 *
 * @namespace Fl32_Ap_Front_Door_Admin_Layout_Navigator
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Door_Admin_Layout_Navigator';

// MODULE'S CLASSES

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Door_Admin_Layout_Navigator
 * @returns {Fl32_Ap_Front_Door_Admin_Layout_Navigator.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Front_Defaults} */
    const DEF = spec['Fl32_Ap_Front_Defaults$'];

    // DEFINE WORKING VARS
    const template = `
<div class="t-grid rows gutter-md" style="margin: var(--grid-gap-md);">
    
    <div class="t-grid cols gutter-md" style="justify-items: center;">
        <div>
            <q-btn flat round icon="home" to="/" />
        </div>
        <div>
            <q-btn flat round icon="settings"/>
        </div>
        <div>
            <q-btn flat round icon="power_settings_new"/>
        </div>
    </div>
    
    <q-list bordered padding class="rounded-borders text-primary">

        <q-item to="/user/invite"
                clickable
                v-ripple
                active-class="bg-primary text-white"
        >
            <q-item-section avatar>
                <q-icon name="shopping_cart"/>
            </q-item-section>
            <q-item-section>{{$t('admin.navig.invite')}}</q-item-section>
        </q-item>

        <q-item to="/sale/list"
                clickable
                v-ripple
                active-class="bg-primary text-white"
        >
            <q-item-section avatar>
                <q-icon name="shopping_bag"/>
            </q-item-section>
            <q-item-section>{{$t('admin.navig.sales')}}</q-item-section>
        </q-item>

    </q-list>    

</div>
`;

    // DEFINE INNER FUNCTIONS

    // MAIN FUNCTIONALITY

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Door_Admin_Layout_Navigator
     */
    return {
        teq: {package: DEF.SHARED.NAME},
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
