/**
 * New form of Vue component template.
 * Component template is created using class constructor.
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Door_Admin_Widget_Sale_Edit_Item';

const template = `
<div>
    <div class="t-grid cols" style="grid-template-columns: auto 4fr 1fr 1fr">
        <q-avatar size="50px">
            <img :src="imageUrl">
        </q-avatar>
        <div>{{card?.attrs?.name}}</div>
        <div>{{volume}} L</div>
        <div>{{item.qty}} </div>
    </div>
</div>
`;

export default class Fl32_Ap_Front_Door_Admin_Widget_Sale_Edit_Item {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Front_Defaults} */
        const DEF = spec['Fl32_Ap_Front_Defaults$'];
        /** @type {Fl32_Ap_Front_Door_Shared_Model_Catalog} */
        const mCatalog = spec['Fl32_Ap_Front_Door_Shared_Model_Catalog$'];

        // COMPOSE RESULT (template for component's new instances)
        return {
            teq: {package: DEF.SHARED.NAME},
            name: NS,
            template,
            data() {
                return {}
            },
            props: {
                /** @type {Fl32_Ap_Front_Door_Admin_Dto_Sale_Item} */
                item: null,
            },
            computed: {
                card() {
                    /** @type {Fl32_Ap_Front_Door_Shared_Dto_Product_Unit} */
                    const unit = this.unit;
                    const cardId = unit.cardId;
                    return mCatalog?.getCardData(cardId);
                },
                imageUrl() {
                    /** @type {Fl32_Ap_Front_Door_Shared_Dto_Product_Card} */
                    const card = this.card;
                    const door = DEF.SHARED.DOOR_PUB;
                    const img = card?.attrs[DEF.SHARED.ATTR.PROD.CARD.IMAGE];
                    return `../${door}/img/product/card/${img}`;
                },
                unit() {
                    const unitId = this.item?.unitId;
                    return mCatalog?.getUnitData(unitId);
                },
                volume() {
                    const val = this.unit?.attrs[DEF.SHARED.ATTR.PROD.UNIT.VOLUME];
                    return Number.parseFloat(val).toFixed(1);
                }
            },
            methods: {},
            watch: {},
        };
    }

};
