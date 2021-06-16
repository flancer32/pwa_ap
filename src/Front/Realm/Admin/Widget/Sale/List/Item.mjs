/**
 * Widget to display one item in the list of sales in 'admin' realm.
 *
 * @namespace Fl32_Ap_Front_Realm_Admin_Widget_Sale_List_Item
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Realm_Admin_Widget_Sale_List_Item';
const EVT_EDIT = 'edit';

// MODULE'S CLASSES

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Realm_Admin_Widget_Sale_List_Item
 * @returns {Fl32_Ap_Front_Realm_Admin_Widget_Sale_List_Item.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    const {formatAmount, formatDateTime} = spec['TeqFw_Core_App_Shared_Util']; // ES6 destruct
    /** @type {Fl32_Ap_Front_Realm_Pub_Model_Catalog} */
    const mCatalog = spec['Fl32_Ap_Front_Realm_Pub_Model_Catalog$']; // instance singleton

    // DEFINE WORKING VARS
    const template = `
<q-card @click="$emit('${EVT_EDIT}', sale)">
    <q-card-section class="t-grid rows">
        <div class="t-grid cols">
            <q-input v-model="sale.id"
                :label="$t('admin.wg.sale.list.item.saleId')"
                borderless
                input-style="font-size: larger; color: var(--color-darker)"
                readonly
            />
            <q-input v-model="dateReceiving"
                :label="$t('admin.wg.sale.list.item.dateReceiving')"
                borderless
                input-style="font-size: larger; color: var(--color-darker)"
                readonly
            />
        </div>
        <div class="t-grid cols">
            <q-input v-model="amount"
                :label="$t('admin.wg.sale.list.item.totalAmount')"
                borderless
                input-style="font-size: larger; color: var(--color-darker)"
                readonly
            />
            <q-input v-model="totalItems"
                :label="$t('admin.wg.sale.list.item.itemsTotal')"
                borderless
                input-style="font-size: larger; color: var(--color-darker); text-align:center;"
                readonly
            />
            <q-input v-model="totalLiters"
                :label="$t('admin.wg.sale.list.item.totalLiters')"
                borderless
                input-style="font-size: larger; color: var(--color-darker); text-align:center;"
                readonly
            />
            <q-input v-model="totalBottles"
                :label="$t('admin.wg.sale.list.item.totalBottles')"
                borderless
                input-style="font-size: larger; color: var(--color-darker); text-align:center;"
                readonly
            />
        </div>
        <div class="t-grid cols" style="grid-template-columns: 1fr 1fr auto;">
            <q-input v-model="sale.state"
                :label="$t('admin.wg.sale.list.item.state')"
                borderless
                input-style="font-size: larger; color: var(--color-darker)"
                readonly
            />
            <q-input v-model="sale.userId"
                :label="$t('admin.wg.sale.list.item.user')"
                borderless
                input-style="font-size: larger; color: var(--color-darker)"
                readonly
            />
            <q-input v-model="dateCreated"
                :label="$t('admin.wg.sale.list.item.dateCreated')"
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
     * @memberOf Fl32_Ap_Front_Realm_Admin_Widget_Sale_List_Item
     */
    return {
        name: NS,
        template,
        components: {},
        data() {
            return {};
        },
        props: {
            /** @type {Fl32_Ap_Front_Realm_Admin_Dto_Sale} */
            sale: null,
        },
        computed: {
            amount() {
                /** @type {Fl32_Ap_Front_Realm_Shared_Dto_Amount} */
                const amount = this.sale.totals;
                return formatAmount(amount.value, amount.currency);
            },
            dateCreated() {
                return formatDateTime(this.sale.dateCreated, false);
            },
            dateReceiving() {
                return formatDateTime(this.sale.dateReceiving, false);
            },
            totalBottles() {
                let result = 0;
                const items = Object.values(this.sale.items);
                items.forEach((one) => result += one.qty);
                return result;
            },
            totalItems() {
                return Object.values(this.sale.items).length;
            },
            totalLiters() {
                let result = 0;
                const items = Object.values(this.sale.items);
                items.forEach((item) => {
                    const unit = mCatalog.getUnitData(item.unitId);
                    if (unit.attrs?.volume) result += (unit.attrs?.volume * item.qty);
                });
                result = Number.parseFloat(result).toFixed(1);
                return `${result} L`
            },
        },
        emits: {
            [EVT_EDIT]: () => true, // event with validation function (use 'null' if no function)
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
