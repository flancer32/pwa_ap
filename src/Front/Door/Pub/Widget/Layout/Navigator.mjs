/**
 * Layout widget for base navigator in 'pub' realm.
 *
 * @namespace Fl32_Ap_Front_Door_Pub_Widget_Layout_Navigator
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Door_Pub_Widget_Layout_Navigator';

// MODULE'S CLASSES

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Door_Pub_Widget_Layout_Navigator
 * @returns {Fl32_Ap_Front_Door_Pub_Widget_Layout_Navigator.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS

    // DEFINE WORKING VARS
    const template = `
<div class="t-grid rows gutter-md" style="margin: var(--grid-gap-md);">
    <div class="t-grid cols gutter-md" style="justify-items: center;">
        <div>
            <q-btn flat round icon="home" to="/" />
        </div>
        <div>
            <q-btn flat round icon="settings" to="/cfg" />
        </div>
        <div>
            <q-btn flat round icon="power_settings_new" to="/logout" />
        </div>
    </div>
    <q-list bordered padding class="rounded-borders text-primary">

        <q-item to="/cart"
                active-class="bg-primary text-white"
                clickable
                v-ripple
        >
            <q-item-section avatar>
                <q-icon name="shopping_cart"/>
            </q-item-section>
            <q-item-section>{{$t('pub.navig.cart')}}</q-item-section>
        </q-item>

        <q-item to="/sales"
                active-class="bg-primary text-white"
                clickable
                v-ripple
        >
            <q-item-section avatar>
                <q-icon name="shopping_bag"/>
            </q-item-section>
            <q-item-section>{{$t('pub.navig.sales')}}</q-item-section>
        </q-item>

    </q-list>
</div>
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Door_Pub_Widget_Layout_Navigator
     */
    return {
        name: NS,
        template,
        data() {
            return {};
        },
        computed: {},
        setup(props, context) {},
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
