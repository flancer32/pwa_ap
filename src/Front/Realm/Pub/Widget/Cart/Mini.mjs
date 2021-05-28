/**
 * Widget to display shopping cart status on the header.
 *
 * @namespace Fl32_Ap_Front_Realm_Pub_Widget_Cart_Mini
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Realm_Pub_Widget_Cart_Mini';

// MODULE'S CLASSES

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Realm_Pub_Widget_Cart_Mini
 * @returns {Fl32_Ap_Front_Realm_Pub_Widget_Cart_Mini.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Front_Model_Cart} */
    const mCart = spec['Fl32_Ap_Front_Model_Cart$']; // instance singleton

    // DEFINE WORKING VARS
    const template = `
<q-chip icon="shopping_cart"
    text-color="primary"
    color="secondary"
    style="left: 50%; transform: translate(-50%, 0);"
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
     * @memberOf Fl32_Ap_Front_Realm_Pub_Widget_Cart_Mini
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
                const formatted = Number.parseFloat(val).toFixed(2);
                return `${formatted} EUR`;
            },

            totalLiters() {
                const cart = mCart.getData();
                const val = cart.totals.liters;
                const formatted = Number.parseFloat(val).toFixed(1);
                return `${formatted} L`;
            }
        },
        methods: {},
        mounted() { },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
