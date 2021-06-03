/**
 * Route widget for sales listing.
 *
 * @namespace Fl32_Ap_Front_Realm_Pub_Route_Sales
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Realm_Pub_Route_Sales';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Realm_Pub_Route_Sales
 * @returns {Fl32_Ap_Front_Realm_Pub_Route_Sales.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Front_Realm_Pub_Widget_Sales_List.vueCompTmpl} */
    const salesList = spec['Fl32_Ap_Front_Realm_Pub_Widget_Sales_List$']; // vue comp tmpl
    /** @type {Fl32_Ap_Front_Realm_Pub_Model_Sales} */
    const mSaleList = spec['Fl32_Ap_Front_Realm_Pub_Model_Sales$']; // instance singleton

    // DEFINE WORKING VARS
    const template = `
<layout-base>
    <div>ACTIONS & FILTERS</div>
    <sales-list :sales="sales"></sales-list>
</layout-base>
`;

    // DEFINE INNER FUNCTIONS

    // MAIN FUNCTIONALITY

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Realm_Pub_Route_Sales
     */
    return {
        name: NS,
        template,
        components: {salesList},
        data: function () {
            return {
                saleList: {},
            };
        },
        computed: {
            sales() {
                return Object.values(this.saleList);
            }
        },
        methods: {},
        async created() {
            // connect reactive DTO from model to the widget
            this.saleList = mSaleList.getData();
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
