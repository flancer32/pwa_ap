/**
 * Widget to display item data in shopping cart.
 *
 * @namespace Fl32_Ap_Front_Area_Pub_Widget_Cart_Item
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Area_Pub_Widget_Cart_Item';

// MODULE'S CLASSES

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Area_Pub_Widget_Cart_Item
 * @returns {Fl32_Ap_Front_Area_Pub_Widget_Cart_Item.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Defaults} */
    const DEF = spec['Fl32_Ap_Defaults$']; // instance singleton
    /** @type {Fl32_Ap_Front_Area_Pub_Model_Cart} */
    const mCart = spec['Fl32_Ap_Front_Area_Pub_Model_Cart$']; // instance singleton
    /** @type {Fl32_Ap_Front_Area_Shared_Model_Catalog} */
    const mCatalog = spec['Fl32_Ap_Front_Area_Shared_Model_Catalog$']; // instance singleton

    // DEFINE WORKING VARS
    const template = `
<q-card>
    <q-card-section>
        <div class="t-grid cols" style="grid-template-columns: auto 1fr auto">
            <q-avatar size="50px">
                <img :src="imageUrl">
            </q-avatar>
            <div class="t-grid rows">
                <div style="font-size: larger; color: var(--color-darker); padding-left: 10px;">{{ card?.attrs?.name }}</div>
                <div style="padding-left: 10px;">({{ volume }} L / {{ price }}) x {{ count}} </div>
            </div>
            <div class="t-grid cols gutter-sm">
                <q-avatar 
                    color="primary" 
                    icon="remove"
                    text-color="secondary"
                    v-on:click="removeUnit" 
                />
                <q-avatar 
                    color="primary" 
                    icon="add"
                    text-color="secondary" 
                    v-on:click="addUnit"
                />
            </div>
        </div>
    </q-card-section>
</q-card>
`;

    // DEFINE INNER FUNCTIONS

    // MAIN FUNCTIONALITY

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Area_Pub_Widget_Cart_Item
     */
    return {
        name: NS,
        template,
        components: {},
        data() {
            return {};
        },
        props: {
            /** @type {Fl32_Ap_Front_Area_Pub_Dto_Cart_Item} */
            item: null,

        },
        computed: {
            imageUrl() {
                let result = './img/product/card/placeholder.png';
                const card = this.card;
                if (card) result = './img/product/card/' + card?.attrs?.image;
                return result;
            },
            card() {
                const cardId = this.item?.unit?.cardId;
                return mCatalog.getCardData(cardId);
            },
            count() {
                return this.item.count;
            },
            price() {
                const val = this.item?.unit?.price?.value;
                const cur = this.item?.unit?.price?.currency;
                const formatted = Number.parseFloat(val).toFixed(2);
                return `${formatted} ${cur}`;
            },
            volume() {
                const val = this.item?.unit?.attrs[DEF.ATTR.PROD.UNIT.VOLUME];
                return Number.parseFloat(val).toFixed(1);
            },
        },
        methods: {
            addUnit() {
                mCart.unitAdd(this.item.unit);
            },
            removeUnit() {
                mCart.unitRemove(this.item.unit);
            },
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
