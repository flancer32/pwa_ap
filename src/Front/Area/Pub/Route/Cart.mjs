/**
 * Route widget to view shopping cart.
 *
 * @namespace Fl32_Ap_Front_Area_Pub_Route_Cart
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Area_Pub_Route_Cart';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Area_Pub_Route_Cart
 * @returns {Fl32_Ap_Front_Area_Pub_Route_Cart.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Defaults} */
    const DEF = spec['Fl32_Ap_Defaults$']; // instance singleton
    const i18n = spec[DEF.MOD_CORE.DI_I18N]; // named singleton
    const {round} = spec['TeqFw_Core_Shared_Util']; // ES6 destruct
    /** @type {Fl32_Ap_Front_Area_Shared_DataSource_Catalog} */
    const dsProd = spec['Fl32_Ap_Front_Area_Shared_DataSource_Catalog$']; // instance singleton
    /** @type {Fl32_Ap_Front_Area_Pub_Model_Cart} */
    const mCart = spec['Fl32_Ap_Front_Area_Pub_Model_Cart$']; // instance singleton
    /** @type {Fl32_Ap_Front_Area_Pub_Model_Sales} */
    const mSales = spec['Fl32_Ap_Front_Area_Pub_Model_Sales$']; // instance singleton
    /** @type {Fl32_Ap_Front_Area_Pub_Widget_Cart_Item.vueCompTmpl} */
    const cartItem = spec['Fl32_Ap_Front_Area_Pub_Widget_Cart_Item$']; // vue comp tmpl
    /** @type {Fl32_Ap_Front_Area_Pub_Widget_Cart_Submit.vueCompTmpl} */
    const dialogSubmit = spec['Fl32_Ap_Front_Area_Pub_Widget_Cart_Submit$']; // vue comp tmpl
    /** @type {Function|Fl32_Ap_Front_Gate_Sale_Add.gate} */
    const gateAdd = spec['Fl32_Ap_Front_Gate_Sale_Add$']; // function singleton
    /** @type {typeof Fl32_Ap_Shared_Service_Route_Sale_Add.Request} */
    const ReqAdd = spec['Fl32_Ap_Shared_Service_Route_Sale_Add#Request']; // class
    /** @type {typeof Fl32_Ap_Shared_Service_Dto_Sale} */
    const DSale = spec['Fl32_Ap_Shared_Service_Dto_Sale#']; // class
    /** @type {typeof Fl32_Ap_Shared_Service_Dto_Sale_Item} */
    const DSaleItem = spec['Fl32_Ap_Shared_Service_Dto_Sale_Item#']; // class

    // DEFINE WORKING VARS
    const template = `
<layout-base>
    <div class="q-pa-xs q-gutter-xs">
        <q-card>
            <q-card-section>
                <div v-if="emptyCart" style="text-align: center">{{$t('pub.route.cart.empty')}}</div>
                <q-card-actions align="center" v-if="!emptyCart">
                    <q-btn 
                        color="primary"
                        v-on:click="onClean"
                    >{{$t('btn.clean')}}</q-btn>
                    <q-btn 
                        color="primary"
                        v-on:click="dialogSubmitDisplay=true"
                    >{{$t('btn.submit')}}</q-btn>
                </q-card-actions>
            </q-card-section>
        </q-card>
        <cart-item v-for="item in cart?.items"
            :item="item"
        />
    </div>
    <dialog-submit
        :display="dialogSubmitDisplay"
        @onHide="dialogSubmitDisplay=false"
        @onSubmit="onDialogSubmit"
    ></dialog-submit>
</layout-base>
`;

    // DEFINE INNER FUNCTIONS

    // MAIN FUNCTIONALITY

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Area_Pub_Route_Cart
     */
    return {
        name: NS,
        template,
        components: {cartItem, dialogSubmit},
        data: function () {
            return {
                cart: null,
                dialogSubmitDisplay: false,
                products: null,
            };
        },
        computed: {
            emptyCart() {
                const items = this.cart?.items;
                const result = !((typeof items === 'object') && (Object.values(items).length > 0));
                return result;
            },
        },
        methods: {
            async onClean() {
                await mCart.clean();
            },
            async onDialogSubmit(date) {
                const cart = mCart.getData();
                const req = new ReqAdd();
                const sale = new DSale();
                sale.dateReceiving = date;
                sale.currency = cart.totals.currency;
                sale.amountTotal = round(cart.totals.amount, 2);
                const items = [];
                for (
                    /** @type {Fl32_Ap_Front_Area_Pub_Dto_Cart_Item} */
                    const one of Object.values(cart.items)
                    ) {
                    const item = new DSaleItem();
                    item.qty = one.count;
                    item.unitId = one.unit.id;
                    item.unitPrice = one.unit.price.value;
                    item.amountTotal = round(item.qty * item.unitPrice, 2);
                    items.push(item);
                }
                sale.items = items;
                req.sale = sale;
                /** @type {Fl32_Ap_Shared_Service_Route_Sale_Add.Response} */
                const res = await gateAdd(req);
                if (res.success) {
                    await mCart.clean();
                    await mSales.reload();
                    this.$router.push(DEF.REALM_PUB_ROUTE_sales);
                }
            },
        },
        async created() {
            const lang = i18n.language;
            await dsProd.getData({lang}); // load product data to use in items widgets
            this.cart = mCart.getData();
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
