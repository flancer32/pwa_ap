/**
 * Widget to display one item in the list of sales in 'admin' realm.
 *
 * @namespace Fl32_Ap_Front_Realm_Admin_Widget_Sale_List_Sale
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Realm_Admin_Widget_Sale_List_Sale';

// MODULE'S CLASSES

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Realm_Admin_Widget_Sale_List_Sale
 * @returns {Fl32_Ap_Front_Realm_Admin_Widget_Sale_List_Sale.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    const {formatAmount, formatDateTime} = spec['TeqFw_Core_App_Shared_Util']; // ES6 destruct

    // DEFINE WORKING VARS
    const template = `
<q-card>
    <q-card-section class="t-grid rows">
        <div class="t-grid cols">
            <q-input v-model="sale.id"
                :label="$t('admin.wg.sale.list.sale.saleId')"
                borderless
                input-style="font-size: larger; color: var(--color-darker)"
                readonly
            />
            <q-input v-model="dateReceiving"
                :label="$t('admin.wg.sale.list.sale.dateReceiving')"
                borderless
                input-style="font-size: larger; color: var(--color-darker)"
                readonly
            />
        </div>
        <div class="t-grid cols">
            <q-input v-model="amount"
                :label="$t('admin.wg.sale.list.sale.amountTotal')"
                borderless
                input-style="font-size: larger; color: var(--color-darker)"
                readonly
            />
            <q-input v-model="totalItems"
                :label="$t('admin.wg.sale.list.sale.itemsTotal')"
                borderless
                input-style="font-size: larger; color: var(--color-darker)"
                readonly
            />
        </div>
        <div class="t-grid cols" style="grid-template-columns: 1fr 1fr auto;">
            <q-input v-model="sale.state"
                :label="$t('admin.wg.sale.list.sale.state')"
                borderless
                input-style="font-size: larger; color: var(--color-darker)"
                readonly
            />
            <q-input v-model="sale.userId"
                :label="$t('admin.wg.sale.list.sale.user')"
                borderless
                input-style="font-size: larger; color: var(--color-darker)"
                readonly
            />
            <q-input v-model="dateCreated"
                :label="$t('admin.wg.sale.list.sale.dateCreated')"
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
     * @memberOf Fl32_Ap_Front_Realm_Admin_Widget_Sale_List_Sale
     */
    return {
        name: NS,
        template,
        components: {},
        data() {
            return {};
        },
        props: {
            /** @type {Fl32_Ap_Shared_Service_Dto_Sale} */
            sale: null,
        },
        computed: {
            amount() {
                return formatAmount(this.sale.amountTotal, this.sale.currency);
            },
            dateCreated() {
                return formatDateTime(this.sale.dateCreated, false);
            },
            dateReceiving() {
                return formatDateTime(this.sale.dateReceiving, false);
            },
            totalItems() {
                return this.sale.items.length;
            },
        },
        methods: {},
        async created() {
        }
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
