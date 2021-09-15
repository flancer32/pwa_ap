/**
 * Route widget for sales listing.
 *
 * @namespace Fl32_Ap_Front_Door_Pub_Route_Sales
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Door_Pub_Route_Sales';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Door_Pub_Route_Sales
 * @returns {Fl32_Ap_Front_Door_Pub_Route_Sales.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Front_Defaults} */
    const DEF = spec['Fl32_Ap_Front_Defaults$'];
    /** @type {Fl32_Ap_Front_Door_Pub_Widget_Sales_Item.vueCompTmpl} */
    const saleItem = spec['Fl32_Ap_Front_Door_Pub_Widget_Sales_Item$'];
    /** @type {Fl32_Ap_Front_Door_Pub_Model_Sales} */
    const mSaleList = spec['Fl32_Ap_Front_Door_Pub_Model_Sales$'];

    // DEFINE WORKING VARS
    const template = `
<layout-base >
    <div class="q-pa-xs q-gutter-xs">
        <q-card>
            <q-card-section>
                <q-card-actions align="center">
                    <q-btn 
                        color="primary"
                        v-on:click="onRefresh"
                    >{{$t('btn.refresh')}}</q-btn>
                </q-card-actions>
            </q-card-section>
        </q-card>
        <sale-item v-for="sale in sales"
                :sale="sale"
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
     * @memberOf Fl32_Ap_Front_Door_Pub_Route_Sales
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {saleItem},
        data: function () {
            return {
                saleList: {}, // reactive DTO from model
            };
        },
        computed: {
            sales() {
                /** @type {Fl32_Ap_Front_Door_Pub_Dto_Sale[]} */
                const items = Object.values(this.saleList);
                // sort items by date receiving desc
                items.sort((a, b) => b.dateReceiving - a.dateReceiving);
                return items;
            }
        },
        methods: {
            async onRefresh() {
                await mSaleList.reload();
            },
        },
        async created() {
            // connect reactive DTO from model to the widget
            this.saleList = mSaleList.getData();
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
