/**
 * Widget to display shopping cart status on the header.
 *
 * @namespace Fl32_Ap_Front_Area_Pub_Widget_Cart_Mini
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Area_Pub_Widget_Cart_Mini';

// MODULE'S CLASSES

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Area_Pub_Widget_Cart_Mini
 * @returns {Fl32_Ap_Front_Area_Pub_Widget_Cart_Mini.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Back_Defaults} */
    const DEF = spec['Fl32_Ap_Back_Defaults$'];
    /** @type {Fl32_Ap_Front_Area_Pub_Model_Cart} */
    const mCart = spec['Fl32_Ap_Front_Area_Pub_Model_Cart$'];

    // DEFINE WORKING VARS
    const template = `
<q-chip icon="shopping_cart"
    clickable
    @click="gotoCart"
    color="secondary"
    style="left: 50%; transform: translate(-50%, 0);"
    text-color="primary"
>
    {{totalLiters}} / {{totalAmount}}
</q-chip>
`;

    // DEFINE INNER FUNCTIONS

    // MAIN FUNCTIONALITY

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Area_Pub_Widget_Cart_Mini
     */
    return {
        name: NS,
        template,
        components: {},
        data() {
            return {};
        },
        props: {},
        computed: {
            totalAmount() {
                const cart = mCart.getData();
                const val = cart.totals.amount;
                const cur = cart.totals.currency;
                const formatted = Number.parseFloat(val).toFixed(2);
                return `${formatted} ${cur}`;
            },

            totalLiters() {
                const cart = mCart.getData();
                const val = cart.totals.liters;
                const formatted = Number.parseFloat(val).toFixed(1);
                return `${formatted} L`;
            }
        },
        methods: {
            gotoCart() {
                this.$router.push(DEF.REALM_PUB_ROUTE_cart);
            }
        },
        mounted() { },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
