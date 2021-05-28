/**
 * Product card widget for catalog/homepage.
 *
 * @namespace Fl32_Ap_Front_Realm_Pub_Widget_Product_Card
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Realm_Pub_Widget_Product_Card';

// MODULE'S CLASSES

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Realm_Pub_Widget_Product_Card
 * @returns {Fl32_Ap_Front_Realm_Pub_Widget_Product_Card.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Front_Realm_Pub_Widget_Product_Card_Unit.vueCompTmpl} */
    const unit = spec['Fl32_Ap_Front_Realm_Pub_Widget_Product_Card_Unit$']; // vue comp tmpl

    // DEFINE WORKING VARS
    const template = `
<q-card class="">
    <q-card-section>
        <div class="t-grid cols" style="grid-template-columns: auto 1fr auto">
            <q-avatar size="50px">
                <img :src="imageUrl">
            </q-avatar>
            <div class="t-grid rows">
                <div style="font-size: larger; color: var(--color-darker); padding-left: 10px;">{{ card?.attrs?.name }}</div>
                <div>
                    <q-chip color="secondary" v-if="card?.attrs?.liquidType">{{ card?.attrs?.liquidType }}</q-chip>
                    <q-chip color="secondary" v-if="card?.attrs?.bearType">{{ card?.attrs?.bearType }}</q-chip>
                    <q-chip color="secondary" v-if="card?.attrs?.alcoholPercent">{{ card?.attrs?.alcoholPercent }}%</q-chip>
                </div>    
            </div>
            <q-avatar v-if="!displayUnits" v-on:click="displayUnits=!displayUnits"
                size="50px" text-color="secondary" 
                color="primary" icon="sports_bar"
            />
            <q-avatar v-if="displayUnits" v-on:click="displayUnits=!displayUnits"
                size="50px" text-color="secondary"
                color="primary" icon="open_in_browser"
            />
        </div>
    </q-card-section>
    <q-card-section v-if="displayUnits">
        <unit v-for="unit in card?.units"
            :unit="unit"
        ></unit>
    </q-card-section>
</q-card>
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Realm_Pub_Widget_Product_Card
     */
    return {
        name: NS,
        template,
        components: {unit},
        data() {
            return {
                displayUnits: false,
            };
        },
        props: {
            /** @type {Fl32_Ap_Shared_Service_Data_Product_Card} */
            card: null,
        },
        computed: {
            imageUrl() {
                return './img/product/card/' + this.card?.attrs?.image;
            }
        },
        methods: {},
        watch: {},
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
