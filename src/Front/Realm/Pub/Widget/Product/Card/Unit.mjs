/**
 * Product card unit widget for catalog/homepage.
 *
 * @namespace Fl32_Ap_Front_Realm_Pub_Widget_Product_Card_Unit
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Realm_Pub_Widget_Product_Card_Unit';

// MODULE'S CLASSES

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Realm_Pub_Widget_Product_Card_Unit
 * @returns {Fl32_Ap_Front_Realm_Pub_Widget_Product_Card_Unit.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Defaults} */
    const DEF = spec['Fl32_Ap_Defaults$']; // instance singleton
    /** @type {Fl32_Ap_Front_Realm_Pub_Model_Cart} */
    const mCart = spec['Fl32_Ap_Front_Realm_Pub_Model_Cart$']; // instance singleton

    // DEFINE WORKING VARS
    const template = `
<div class="t-grid cols gutter-sm"
     style="grid-template-columns: 1fr 1fr auto auto; margin-top: 5px; align-items: center;">
    <div style="text-align: right; font-size: larger;">{{volume}} L</div>
    <div style="text-align: right; font-size: larger; padding-right: 10px;">{{price}}</div>
    <q-avatar
            :disabled="disabledRemove"
            color="primary"
            icon="remove"
            text-color="secondary"
            v-on:click="removeUnit"
    />

    <q-avatar
            :disabled="disabledAdd"
            color="primary"
            icon="add"
            text-color="secondary"
            v-on:click="addUnit"
    />

</div>
`;

    // DEFINE INNER FUNCTIONS

    // MAIN FUNCTIONALITY

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Realm_Pub_Widget_Product_Card_Unit
     */
    return {
        name: NS,
        template,
        data() {
            return {};
        },
        props: {
            /** @type {Fl32_Ap_Shared_Service_Data_Product_Unit} */
            unit: null,
        },
        computed: {
            disabledRemove() {
                return mCart.hasUnit(this.unit) && null;
            },
            disabledAdd() {
                return null; // always enabled
            },
            price() {
                const val = this.unit?.price?.value;
                const cur = this.unit?.price?.currency;
                const formatted = Number.parseFloat(val).toFixed(2);
                return `${formatted} ${cur}`;
            },

            volume() {
                const val = this.unit?.attrs[DEF.ATTR.PROD.UNIT.VOLUME];
                return Number.parseFloat(val).toFixed(1);
            }
        },
        methods: {
            addUnit() {
                mCart.unitAdd(this.unit);
            },
            removeUnit() {
                mCart.unitRemove(this.unit);
            }
        },
        watch: {},
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
