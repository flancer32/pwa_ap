/**
 * Model object for products catalog in 'pub' realm.
 *
 * @namespace Fl32_Ap_Front_Realm_Pub_Model_Catalog
 */

// MODULE'S CLASSES
class Fl32_Ap_Front_Realm_Pub_Model_Catalog {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Defaults} */
        const DEF = spec['Fl32_Ap_Defaults$'];
        const {reactive} = spec[DEF.MOD_VUE.DI_VUE]; // named singleton destructuring
        /** @type {Fl32_Ap_Front_Realm_Pub_Dto_Product_Card.Factory} */
        const fCard = spec['Fl32_Ap_Front_Realm_Pub_Dto_Product_Card#Factory$']; // instance singleton
        /** @type {Fl32_Ap_Front_Realm_Pub_Dto_Product_Unit.Factory} */
        const fUnit = spec['Fl32_Ap_Front_Realm_Pub_Dto_Product_Unit#Factory$']; // instance singleton
        /** @type {Fl32_Ap_Front_Realm_Pub_DataSource_Catalog} */
        const ds = spec['Fl32_Ap_Front_Realm_Pub_DataSource_Catalog$']; // instance singleton

        // DEFINE WORKING VARS
        /** @type {Object.<number, Fl32_Ap_Front_Realm_Pub_Dto_Cart>} */
        let modelData = reactive({});
        const me = this;

        // DEFINE INNER FUNCTIONS
        async function init() {
            const res = await ds.loadData({});
            me.parseDataSource(res);
        }

        // DEFINE INSTANCE METHODS
        /**
         * Return model data as DTO.
         *
         * @return {Fl32_Ap_Front_Realm_Pub_Dto_Cart}
         */
        this.getData = function () {
            return modelData;
        }
        /**
         * Set DTO to model and make it reactive.
         *
         * @param {Fl32_Ap_Front_Realm_Pub_Dto_Cart} data
         */
        this.setData = function (data) {

        }

        /**
         * Convert service DTO to model DTO and make it reactive.
         *
         * @param {Fl32_Ap_Shared_Service_Route_Product_List.Response} data
         */
        this.parseDataSource = function (data) {
            /** @type {Fl32_Ap_Shared_Service_Data_Product_Card[]} */
            const cards = Array.isArray(data.cards) ? data.cards : Object.values(data.cards);
            for (const sCard of cards) {
                const mCard = fCard.create();
                mCard.id = sCard.id;
                mCard.type = sCard.type;
                mCard.dateCreated = new Date(sCard.dateCreated);
                mCard.attrs = sCard.attrs;
                // TODO: should we have reactivity here???
                const mUnits = reactive({});
                /** @type {Fl32_Ap_Shared_Service_Data_Product_Unit[]} */
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
                }
                mCard.units = mUnits;
                //
                modelData[mCard.id] = reactive(mCard);
            }
        }

        // MAIN FUNCTIONALITY
        // init as empty model then load data from DataSource
        init();
    }
}

// MODULE'S EXPORT
export default Fl32_Ap_Front_Realm_Pub_Model_Catalog;
