/**
 * Widget to display list of sales in 'admin' realm.
 *
 * @namespace Fl32_Ap_Front_Realm_Admin_Widget_Sale_List
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Realm_Admin_Widget_Sale_List';

// MODULE'S CLASSES

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Realm_Admin_Widget_Sale_List
 * @returns {Fl32_Ap_Front_Realm_Admin_Widget_Sale_List.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @function {@type Fl32_Ap_Front_Gate_Sale_List.gate} */
    const gateList = spec['Fl32_Ap_Front_Gate_Sale_List$']; // function singleton
    /** @type {typeof Fl32_Ap_Shared_Service_Route_Sale_List.Request} */
    const ReqList = spec['Fl32_Ap_Shared_Service_Route_Sale_List#Request']; // class
    /** @type {Fl32_Ap_Front_Realm_Admin_Widget_Sale_List_Sale.vueCompTmpl} */
    const listSale = spec['Fl32_Ap_Front_Realm_Admin_Widget_Sale_List_Sale$']; // vue comp tmpl

    // DEFINE WORKING VARS
    const template = `
<div class="t-grid rows gutter-xs">
    <list-sale v-for="sale of sales"
        :sale="sale"
    ></list-sale>
</div>
`;

    // DEFINE INNER FUNCTIONS

    // MAIN FUNCTIONALITY

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Realm_Admin_Widget_Sale_List
     */
    return {
        name: NS,
        template,
        components: {listSale},
        data() {
            return {
                sales: [],
            };
        },
        props: {},
        computed: {},
        methods: {},
        async created() {
            const req = new ReqList();
            /** @type {Fl32_Ap_Shared_Service_Route_Sale_List.Response} */
            const res = await gateList(req);
            if (res) {
                // order sales descending by saleId.
                this.sales = res.items.sort((a, b) => b.id - a.id);
            }

        }
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
