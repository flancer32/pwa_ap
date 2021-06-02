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
    /** @type {Fl32_Ap_Defaults} */
    const DEF = spec['Fl32_Ap_Defaults$']; // instance singleton
    const i18n = spec[DEF.MOD_CORE.DI_I18N]; // named singleton
    /** @type {Fl32_Ap_Front_Realm_Pub_DataSource_Sales} */
    const dsSales = spec['Fl32_Ap_Front_Realm_Pub_DataSource_Sales$']; // instance singleton
    /** @type {Fl32_Ap_Front_Realm_Pub_Widget_Sales_List.vueCompTmpl} */
    const salesList = spec['Fl32_Ap_Front_Realm_Pub_Widget_Sales_List$']; // vue comp tmpl

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
                sales: [],
            };
        },
        computed: {},
        methods: {},
        async created() {
            const lang = i18n.language;
            await dsSales.loadData({lang});
            this.sales.push(1);
            this.sales.push(1);
            this.sales.push(1);
            this.sales.push(1);
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
