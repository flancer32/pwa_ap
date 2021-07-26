/**
 * New form of Vue component template.
 * Component template is created using class constructor.
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Door_Admin_Widget_Sale_Edit';
const EVT_HIDE = 'onHide';

const template = `
<q-dialog :model-value="display" @hide="$emit('${EVT_HIDE}');">
    <q-card style="min-width: 350px">
        <q-card-section>
            <q-card-actions align="center">
                <q-btn :label="$t('btn.close')" v-close-popup color="primary"/>
                <q-btn :label="$t('btn.picked')" v-close-popup @click="submit" color="primary"/>
            </q-card-actions>
        </q-card-section>
        <q-card-section class="t-grid rows">
            <div class="t-grid cols">
                <q-input v-model="sale.id"
                         :label="$t('admin.wg.sale.edit.saleId')"
                         borderless
                         input-style="font-size: larger; color: var(--color-darker)"
                         readonly
                />
                <q-input v-model="dateReceiving"
                         :label="$t('admin.wg.sale.edit.dateReceiving')"
                         borderless
                         input-style="font-size: larger; color: var(--color-darker)"
                         readonly
                />
            </div>
            <div class="t-grid cols">
                <q-input v-model="amount"
                         :label="$t('admin.wg.sale.edit.totalAmount')"
                         borderless
                         input-style="font-size: larger; color: var(--color-darker)"
                         readonly
                />
                <q-input v-model="info"
                         :label="$t('admin.wg.sale.edit.info')"
                         borderless
                         input-style="font-size: larger; color: var(--color-darker)"
                         readonly
                />
            </div>
            <sale-item v-for="item in sale?.items" :item="item"/>
        </q-card-section>
    </q-card>
</q-dialog>
`;

export default class Fl32_Ap_Front_Door_Admin_Widget_Sale_Edit {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Front_Defaults} */
        const DEF = spec['Fl32_Ap_Front_Defaults$'];
        const {formatAmount, formatDateTime} = spec['TeqFw_Core_Shared_Util']; // ES6 destruct
        /** @type {Fl32_Ap_Front_Door_Admin_Widget_Sale_Edit_Item} */
        const saleItem = spec['Fl32_Ap_Front_Door_Admin_Widget_Sale_Edit_Item$'];
        /** @type {Fl32_Ap_Front_Door_Shared_Model_Catalog} */
        const mCatalog = spec['Fl32_Ap_Front_Door_Shared_Model_Catalog$'];
        /** @type {Fl32_Ap_Front_Door_Admin_Model_Sales} */
        const mSales = spec['Fl32_Ap_Front_Door_Admin_Model_Sales$'];

        // COMPOSE RESULT (template for component's new instances)
        return {
            teq: {package: DEF.SHARED.NAME},
            name: NS,
            template,
            components: {saleItem},
            data() {
                return {
                    /** @type {Fl32_Ap_Front_Door_Admin_Dto_Sale} */
                    sale: null,
                }
            },
            props: {
                display: Boolean, // control hide/display the widget from parent
                saleId: Number,
            },
            computed: {
                amount() {
                    /** @type {Fl32_Ap_Front_Door_Shared_Dto_Amount} */
                    const amount = this.sale.totals;
                    return formatAmount(amount.value, amount.currency);
                },
                dateCreated() {
                    return formatDateTime(this.sale.dateCreated, false);
                },
                dateReceiving() {
                    return formatDateTime(this.sale.dateReceiving, false);
                },
                info() {
                    return `${this.totalItems} / ${this.totalLiters} / ${this.totalBottles}`;
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
            methods: {
                submit() {
                    debugger;
                }
            },
            watch: {
                saleId(current) {
                    this.sale = mSales?.getSale(current);
                },
            },
        };
    }

};
