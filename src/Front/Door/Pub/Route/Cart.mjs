/**
 * Route widget to view shopping cart.
 *
 * @namespace Fl32_Ap_Front_Door_Pub_Route_Cart
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Door_Pub_Route_Cart';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Door_Pub_Route_Cart
 * @returns {Fl32_Ap_Front_Door_Pub_Route_Cart.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Front_Defaults} */
    const DEF = spec['Fl32_Ap_Front_Defaults$'];
    const {round} = spec['TeqFw_Core_Shared_Util']; // ES6 destruct
    /** @type {TeqFw_I18n_Front_Lib} */
    const i18n = spec['TeqFw_I18n_Front_Lib$'];
    /** @type {Fl32_Ap_Front_Door_Shared_DataSource_Catalog} */
    const dsProd = spec['Fl32_Ap_Front_Door_Shared_DataSource_Catalog$'];
    /** @type {Fl32_Ap_Front_Door_Pub_Model_Cart} */
    const mCart = spec['Fl32_Ap_Front_Door_Pub_Model_Cart$'];
    /** @type {Fl32_Ap_Front_Door_Pub_Model_Sales} */
    const mSales = spec['Fl32_Ap_Front_Door_Pub_Model_Sales$'];
    /** @type {Fl32_Ap_Front_Door_Pub_Widget_Cart_Item.vueCompTmpl} */
    const cartItem = spec['Fl32_Ap_Front_Door_Pub_Widget_Cart_Item$'];
    /** @type {Fl32_Ap_Front_Door_Pub_Widget_Cart_Submit.vueCompTmpl} */
    const dialogSubmit = spec['Fl32_Ap_Front_Door_Pub_Widget_Cart_Submit$'];
    /** @type {TeqFw_Web_Front_Service_Gate} */
    const gate = spec['TeqFw_Web_Front_Service_Gate$'];
    /** @type {Fl32_Ap_Shared_Service_Route_Sale_Add.Factory} */
    const route = spec['Fl32_Ap_Shared_Service_Route_Sale_Add#Factory$'];
    /** @type {typeof Fl32_Ap_Shared_Service_Dto_Sale} */
    const DSale = spec['Fl32_Ap_Shared_Service_Dto_Sale#'];
    /** @type {typeof Fl32_Ap_Shared_Service_Dto_Sale_Item} */
    const DSaleItem = spec['Fl32_Ap_Shared_Service_Dto_Sale_Item#'];

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

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Door_Pub_Route_Cart
     */
    return {
        teq: {package: DEF.SHARED.NAME},
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
                const req = route.createReq();
                const sale = new DSale();
                sale.dateReceiving = date;
                sale.currency = cart.totals.currency;
                sale.amountTotal = round(cart.totals.amount, 2);
                const items = [];
                for (
                    /** @type {Fl32_Ap_Front_Door_Pub_Dto_Cart_Item} */
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
                // noinspection JSValidateTypes
                /** @type {Fl32_Ap_Shared_Service_Route_Sale_Add.Response} */
                const res = await gate.send(req, route);
                if (res.success) {
                    await mCart.clean();
                    await mSales.reload();
                    this.$router.push(DEF.DOOR_PUB_ROUTE_SALES);
                }
            },
        },
        async created() {
            const lang = i18n.getLang();
            await dsProd.getData({lang}); // load product data to use in items widgets
            this.cart = mCart.getData();
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
