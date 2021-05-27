/**
 * Route widget for app home.
 *
 * @namespace Fl32_Ap_Front_Realm_Pub_Route_Home
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Realm_Pub_Route_Home';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Realm_Pub_Route_Home
 * @returns {Fl32_Ap_Front_Realm_Pub_Route_Home.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Defaults} */
    const DEF = spec['Fl32_Ap_Defaults$']; // instance singleton
    const i18n = spec[DEF.MOD_CORE.DI_I18N]; // named singleton
    /** @type {Fl32_Ap_Front_DataSource_Product_Cards} */
    const ds = spec['Fl32_Ap_Front_DataSource_Product_Cards$']; // instance singleton
    /** @type {Fl32_Ap_Front_Realm_Pub_Widget_Product_Card.vueCompTmpl} */
    const productCard = spec['Fl32_Ap_Front_Realm_Pub_Widget_Product_Card$']; // vue comp tmpl

    // DEFINE WORKING VARS
    const template = `
<layout-base>
    <div class="q-pa-xs q-gutter-xs">
        <product-card v-for="card in cards"
            :card="card"
        ></product-card>
    </div>
</layout-base>
`;

    // DEFINE INNER FUNCTIONS

    // MAIN FUNCTIONALITY

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Realm_Pub_Route_Home
     */
    return {
        name: NS,
        template,
        components: {productCard},
        data: function () {
            return {
                cards: [],
            };
        },
        computed: {},
        methods: {},
        async created() {
            const lang = i18n.language;
            /** @type {Fl32_Ap_Shared_Service_Route_Product_List.Response} */
            const products = await ds.getData({lang});
            this.cards = Object.values(products.cards);
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
