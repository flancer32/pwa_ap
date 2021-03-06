/**
 * Route widget for sales listing in 'admin' realm.
 *
 * @namespace Fl32_Ap_Front_Door_Admin_Route_Sale_List
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Door_Admin_Route_Sale_List';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Door_Admin_Route_Sale_List
 * @returns {Fl32_Ap_Front_Door_Admin_Route_Sale_List.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Front_Defaults} */
    const DEF = spec['Fl32_Ap_Front_Defaults$'];
    /** @type {Fl32_Ap_User_Front_Model_Session} */
    const session = spec['Fl32_Ap_User_Front_Model_Session$'];
    /** @type {Fl32_Ap_Front_Door_Admin_Widget_Sale_List_Item.vueCompTmpl} */
    const saleItem = spec['Fl32_Ap_Front_Door_Admin_Widget_Sale_List_Item$'];
    /** @type {Fl32_Ap_Front_Door_Admin_Widget_Sale_Edit} */
    const saleEdit = spec['Fl32_Ap_Front_Door_Admin_Widget_Sale_Edit$'];
    /** @type {Fl32_Ap_Front_Door_Admin_Model_Sales} */
    const mSales = spec['Fl32_Ap_Front_Door_Admin_Model_Sales$'];

    // DEFINE WORKING VARS
    const template = `
<layout-base>
    <div class="q-pa-xs q-gutter-xs">
        <q-card>
            <q-card-section>
                <q-card-actions align="center">
                    <q-btn
                            color="primary"
                            @click="onRefresh"
                    >{{$t('btn.refresh')}}</q-btn>
                </q-card-actions>
            </q-card-section>
        </q-card>
        <sale-item v-for="sale in sales" :sale="sale" @edit="onCardEdit" />
    </div>
    <sale-edit
         :display="dialogEditDisplay" 
         :saleId="dialogEditSaleId"
          @onHide="dialogEditDisplay=false"
    />
</layout-base>
`;

    // DEFINE INNER FUNCTIONS

    // MAIN FUNCTIONALITY

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Door_Admin_Route_Sale_List
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {saleItem, saleEdit},
        data: function () {
            return {
                saleList: {}, // reactive DTO from model
                dialogEditDisplay: false,
                dialogEditSaleId: null,
            };
        },
        computed: {
            sales() {
                /** @type {Fl32_Ap_Front_Door_Admin_Dto_Sale[]} */
                const items = Object.values(this.saleList);
                // sort items by ID desc
                items.sort((a, b) => b.id - a.id);
                return items;
            }
        },
        methods: {
            async onRefresh() {
                await mSales.reload();
            },
            async onCardEdit(sale) {
                this.dialogEditDisplay = true;
                this.dialogEditSaleId = sale.id;

            }
        },
        beforeCreate() {
            // redirect anonymous to sign-in route
            session.checkUserAuthenticated(this.$router);
        },
        async created() {
            // connect reactive DTO from model to the widget
            this.saleList = mSales.getData();
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
