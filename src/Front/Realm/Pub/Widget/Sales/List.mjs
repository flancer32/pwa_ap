/**
 * Widget to display list of sales in 'pub' realm.
 *
 * @namespace Fl32_Ap_Front_Realm_Pub_Widget_Sales_List
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Realm_Pub_Widget_Sales_List';

// MODULE'S CLASSES

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Realm_Pub_Widget_Sales_List
 * @returns {Fl32_Ap_Front_Realm_Pub_Widget_Sales_List.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Front_Realm_Admin_Widget_Sale_List_Sale.vueCompTmpl} */
    const listSale = spec['Fl32_Ap_Front_Realm_Admin_Widget_Sale_List_Sale$']; // vue comp tmpl

    // DEFINE WORKING VARS
    const template = `
<div class="t-grid rows gutter-xs">
    <div v-for="sale of sales">
        <div>ID: {{sale.id}} / {{sale.state}}</div>
        <div>Totals: {{sale.totals.amount}} {{sale.totals.currency}}</div>
        <div>Created: {{sale.dateCreated}}</div>
        <div>Receiving: {{sale.dateReceiving}}</div>
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
     * @memberOf Fl32_Ap_Front_Realm_Pub_Widget_Sales_List
     */
    return {
        name: NS,
        template,
        components: {listSale},
        data() {
            return {};
        },
        props: {
            sales: Array,
        },
        computed: {},
        methods: {},
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
