/**
 * Route widget to view shopping cart.
 *
 * @namespace Fl32_Ap_Front_Realm_Pub_Route_Cart
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Realm_Pub_Route_Cart';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Realm_Pub_Route_Cart
 * @returns {Fl32_Ap_Front_Realm_Pub_Route_Cart.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Defaults} */
    const DEF = spec['Fl32_Ap_Defaults$']; // instance singleton
    const i18n = spec[DEF.MOD_CORE.DI_I18N]; // named singleton
    /** @type {Fl32_Ap_Front_DataSource_Product_Cards} */
    const dsProd = spec['Fl32_Ap_Front_DataSource_Product_Cards$']; // instance singleton
    /** @type {Fl32_Ap_Front_Realm_Pub_Model_Cart} */
    const mCart = spec['Fl32_Ap_Front_Realm_Pub_Model_Cart$']; // instance singleton
    /** @type {Fl32_Ap_Front_Realm_Pub_Widget_Cart_Item.vueCompTmpl} */
    const cartItem = spec['Fl32_Ap_Front_Realm_Pub_Widget_Cart_Item$']; // vue comp tmpl

    // DEFINE WORKING VARS
    const template = `
<layout-base>
    <div class="q-pa-xs q-gutter-xs">
        <q-card>
            <q-card-section>
                <q-card-actions align="center">
                    <q-btn 
                        color="primary"
                        v-on:click="onClean"
                    >{{$t('btn.clean')}}</q-btn>
                    <q-btn 
                        color="primary"
                        v-on:click="onSubmit"
                    >{{$t('btn.submit')}}</q-btn>
                </q-card-actions>
            </q-card-section>
        </q-card>
        <cart-item v-for="item in cart?.items"
            :item="item"
        />
    </div>
</layout-base>
`;

    // DEFINE INNER FUNCTIONS

    // MAIN FUNCTIONALITY

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Realm_Pub_Route_Cart
     */
    return {
        name: NS,
        template,
        components: {cartItem},
        data: function () {
            return {
                products: null,
                cart: null,
            };
        },
        computed: {},
        methods: {
            onClean() {
                mCart.clean();
            },
            onSubmit() {},
        },
        async created() {
            const lang = i18n.language;
            await dsProd.getData({lang}); // load product data to use in items widgets
            this.cart = mCart.getData();
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
