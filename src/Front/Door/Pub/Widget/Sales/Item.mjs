/**
 * Widget to display one sale in the list of sales in 'pub' realm.
 *
 * @namespace Fl32_Ap_Front_Door_Pub_Widget_Sales_Item
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Door_Pub_Widget_Sales_Item';

// MODULE'S CLASSES

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Door_Pub_Widget_Sales_Item
 * @returns {Fl32_Ap_Front_Door_Pub_Widget_Sales_Item.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    const {formatAmount, formatDateTime} = spec['TeqFw_Core_Shared_Util']; // ES6 destruct
    /** @type {Fl32_Ap_Front_Door_Shared_Model_Catalog} */
    const mCatalog = spec['Fl32_Ap_Front_Door_Shared_Model_Catalog$'];

    // DEFINE WORKING VARS
    const template = `
<q-card>
    <q-card-section class="t-grid rows">
        <div class="t-grid cols" style="grid-template-columns: 1fr 1fr 3fr">
            <q-input v-model="sale.id"
                :label="$t('pub.wg.sales.item.saleId')"
                borderless
                input-style="font-size: larger; color: var(--color-darker)"
                readonly
            />
            <q-input v-model="sale.state"
                :label="$t('pub.wg.sales.item.state')"
                borderless
                input-style="font-size: larger; color: var(--color-darker)"
                readonly
            />
            <q-input v-model="dateReceiving"
                :label="$t('pub.wg.sales.item.dateReceiving')"
                borderless
                input-style="font-size: larger; color: var(--color-darker)"
                readonly
            />
        </div>
        <div class="t-grid cols" style="grid-template-columns: 1fr 1fr 1fr">
            <q-input v-model="amount"
                :label="$t('pub.wg.sales.item.amount')"
                borderless
                input-style="font-size: larger; color: var(--color-darker)"
                readonly
            />
            <q-input v-model="unitsLiters"
                :label="$t('pub.wg.sales.item.liters')"
                borderless
                input-style="font-size: larger; color: var(--color-darker)"
                readonly
            />
            <q-input v-model="unitsCount"
                :label="$t('pub.wg.sales.item.items')"
                borderless
                input-style="font-size: larger; color: var(--color-darker)"
                readonly
            />
        </div>
    </q-card-section>
</q-card>
`;

    // DEFINE INNER FUNCTIONS

    // MAIN FUNCTIONALITY

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Door_Pub_Widget_Sales_Item
     */
    return {
        name: NS,
        template,
        components: {},
        data() {
            return {};
        },
        props: {
            /** @type {Fl32_Ap_Front_Door_Pub_Dto_Sale} */
            sale: null,
        },
        computed: {
            amount() {
                return formatAmount(this.sale.totals.amount, this.sale.totals.currency);
            },
            dateReceiving() {
                return formatDateTime(this.sale.dateReceiving, false);
            },
            unitsCount() {
                let result = 0;
                if (typeof this.sale?.items === 'object') {
                    result = Object.values(this.sale.items).length;
                }
                return result;
            },
            unitsLiters() {
                let result = 0;
                if (typeof this.sale?.items === 'object') {
                    for (const item of Object.values(this.sale.items)) {
                        const unit = mCatalog.getUnitData(item.unitId);
                        result += unit?.attrs?.volume ?? 0;
                    }
                }
                return Number.parseFloat(result).toFixed(1);
            }
        },
        methods: {},
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
