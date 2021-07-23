/**
 * Model object for products catalog in 'pub' realm.
 *
 * @namespace Fl32_Ap_Front_Door_Shared_Model_Catalog
 */

// MODULE'S CLASSES
class Fl32_Ap_Front_Door_Shared_Model_Catalog {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Front_Defaults} */
        const DEF = spec['Fl32_Ap_Front_Defaults$'];
        const {reactive} = spec[DEF.MOD_VUE.DI_VUE];
        /** @type {TeqFw_I18n_Front_Model} */
        const i18n = spec['TeqFw_I18n_Front_Model$'];
        /** @type {Fl32_Ap_Front_Door_Shared_Dto_Product_Card.Factory} */
        const fCard = spec['Fl32_Ap_Front_Door_Shared_Dto_Product_Card#Factory$'];
        /** @type {Fl32_Ap_Front_Door_Shared_Dto_Product_Unit.Factory} */
        const fUnit = spec['Fl32_Ap_Front_Door_Shared_Dto_Product_Unit#Factory$'];
        /** @type {Fl32_Ap_Front_Door_Shared_DataSource_Catalog} */
        const ds = spec['Fl32_Ap_Front_Door_Shared_DataSource_Catalog$'];

        // DEFINE WORKING VARS
        /** @type {Object<number, Fl32_Ap_Front_Door_Shared_Dto_Product_Card>} */
        let modelData = reactive({});
        /** @type {Object<number, Fl32_Ap_Front_Door_Shared_Dto_Product_Unit>} */
        let mapUnits = {};
        const me = this;

        // DEFINE INNER FUNCTIONS
        async function init() {
            const lang = i18n.getLang();
            const res = await ds.loadData({lang});
            me.parseDataSource(res);
        }

        // DEFINE INSTANCE METHODS
        /**
         * Return model data as reactive DTO.
         *
         * @return {Object<number, Fl32_Ap_Front_Door_Shared_Dto_Product_Card>}
         */
        this.getData = function () {
            return modelData;
        }

        /**
         * Convert service response DTO to model DTO and make it reactive.
         *
         * @param {Fl32_Ap_Shared_Service_Route_Product_List.Response} data
         */
        this.parseDataSource = function (data) {
            /** @type {Fl32_Ap_Shared_Service_Dto_Product_Card[]} */
            const cards = Array.isArray(data.cards) ? data.cards : Object.values(data.cards);
            const mapUnitsTmp = {};
            for (const sCard of cards) {
                const mCard = fCard.create();
                mCard.id = sCard.id;
                mCard.type = sCard.type;
                mCard.dateCreated = new Date(sCard.dateCreated);
                mCard.attrs = sCard.attrs;
                // TODO: should we have reactivity here???
                const mUnits = reactive({});
                /** @type {Fl32_Ap_Shared_Service_Dto_Product_Unit[]} */
                const units = Array.isArray(sCard.units) ? sCard.units : Object.values(sCard.units);
                for (const sUnit of units) {
                    const mUnit = fUnit.create();
                    mUnit.id = sUnit.id;
                    mUnit.cardId = sUnit.cardId;
                    mUnit.price.value = sUnit.price.value;
                    mUnit.price.currency = sUnit.price.currency;
                    mUnit.sku = sUnit.sku;
                    mUnit.attrs = sUnit.attrs;
                    mUnits[mUnit.id] = mUnit;
                    // put unit to "id-to-unit" map
                    mapUnitsTmp[mUnit.id] = mUnit;
                }
                mCard.units = mUnits;
                // set data to model
                modelData[mCard.id] = reactive(mCard);
                mapUnits = mapUnitsTmp;
            }
        }

        /**
         * @param {number} cardId
         * @return {Fl32_Ap_Front_Door_Shared_Dto_Product_Card}
         */
        this.getCardData = function (cardId) {
            return modelData[cardId];
        }

        /**
         * @param {number} unitId
         * @return {Fl32_Ap_Front_Door_Shared_Dto_Product_Unit}
         */
        this.getUnitData = function (unitId) {
            return mapUnits[unitId];
        }

        // MAIN FUNCTIONALITY
        // init as empty model then load data from DataSource
        init();
    }
}

// MODULE'S EXPORT
export default Fl32_Ap_Front_Door_Shared_Model_Catalog;
