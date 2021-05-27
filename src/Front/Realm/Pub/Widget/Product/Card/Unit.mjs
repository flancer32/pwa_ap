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

    // DEFINE WORKING VARS
    const template = `
<div class="t-grid cols" style="grid-template-columns: 1fr 1fr auto; margin-top: 5px;">
    <div style="text-align: center">{{volume}} L</div>
    <div>{{price}}</div>
    <div>
        <q-avatar text-color="secondary" color="primary" icon="add"/>
    </div>
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
        methods: {},
        watch: {},
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
