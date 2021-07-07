/**
 * Model object for Shopping Cart in 'pub' realm.
 * Model should initiate data by itself.
 *
 * @namespace Fl32_Ap_Front_Door_Pub_Model_Cart
 */

// MODULE'S CLASSES
class Fl32_Ap_Front_Door_Pub_Model_Cart {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Front_Defaults} */
        const DEF = spec['Fl32_Ap_Front_Defaults$'];
        /** @type {TeqFw_Di_Container} */
        const container = spec['TeqFw_Di_Container$'];
        const {reactive} = spec[DEF.MOD_VUE.DI_VUE];
        /** @type {TeqFw_Core_Logger} */
        const logger = spec['TeqFw_Core_Logger$'];
        /** @type {Fl32_Ap_Front_Door_Pub_Dto_Cart.Factory} */
        const fCart = spec['Fl32_Ap_Front_Door_Pub_Dto_Cart#Factory$'];
        /** @type {Fl32_Ap_Front_Door_Pub_Dto_Cart_Item.Factory} */
        const fItem = spec['Fl32_Ap_Front_Door_Pub_Dto_Cart_Item#Factory$'];
        /** @type {Fl32_Ap_Front_Door_Pub_DataSource_Cart} */
        const ds = spec['Fl32_Ap_Front_Door_Pub_DataSource_Cart$'];

        // DEFINE WORKING VARS
        /** @type {Fl32_Ap_Front_Door_Pub_Dto_Cart} */
        let modelData = reactive({});

        // DEFINE INNER FUNCTIONS

        // DEFINE INSTANCE METHODS
        /**
         * Return model data as DTO.
         *
         * @return {Fl32_Ap_Front_Door_Pub_Dto_Cart}
         */
        this.getData = function () {
            return modelData;
        }

        /**
         * Set DTO to model and make it reactive.
         *
         * @param {Fl32_Ap_Front_Door_Pub_Dto_Cart} data
         */
        this.setData = function (data) {
            const cartDto = fCart.create();
            modelData = reactive(cartDto);
            // reactivate 'totals'
            const totalsDto = Object.assign(cartDto.totals, data?.totals);
            modelData.totals = reactive(totalsDto);
            // reactivate 'items'
            const items = reactive({});
            if (typeof data?.items === 'object') {
                for (const key of Object.keys(data.items)) {
                    const itemDto = Object.assign(fItem.create(), data.items[key]);
                    items[key] = reactive(itemDto);
                }
            }
            modelData.items = items;
        }

        this.idbGet = async function () {
            const dto = await ds.getData();
            this.setData(dto);
        }
        /**
         * @param {Fl32_Ap_Shared_Service_Dto_Product_Unit} unit
         * @return {boolean}
         */
        this.hasUnit = function (unit) {
            const unitId = unit.id;
            return !!(modelData.items[unitId]);
        }
        /**
         * Clean current cart.
         */
        this.clean = async function () {
            const keys = Object.keys(modelData.items);
            for (const key of keys) delete modelData.items[key];
            modelData.totals.liters = 0;
            modelData.totals.amount = 0;
            await ds.putData(modelData);
        }
        /**
         * @param {Fl32_Ap_Shared_Service_Dto_Product_Unit} unit
         */
        this.unitAdd = function (unit) {
            const items = modelData.items;
            const totals = modelData.totals;
            const unitId = unit.id;
            if (!items[unitId]) {
                items[unitId] = fItem.create();
                items[unitId].unit = unit;
                items[unitId].count = 1;
            } else {
                items[unitId].count += 1;
            }
            totals.liters += Number.parseFloat(unit.attrs[DEF.SHARED.ATTR.PROD.UNIT.VOLUME]);
            totals.amount += Number.parseFloat(unit.price.value);
            ds.putData(modelData).catch((e) => logger.error('Cannot save cart to IDB on unitAdd: ' + e));
        }
        /**
         * @param {Fl32_Ap_Shared_Service_Dto_Product_Unit} unit
         */
        this.unitRemove = function (unit) {
            const items = modelData.items;
            const totals = modelData.totals;
            const unitId = unit.id;
            if (items[unitId]) {
                if ((items[unitId].count) <= 1) {
                    delete items[unitId];
                } else {
                    items[unitId].count -= 1;
                }
                totals.liters -= Number.parseFloat(unit.attrs[DEF.SHARED.ATTR.PROD.UNIT.VOLUME]);
                totals.amount -= Number.parseFloat(unit.price.value);
                // prevent "-0.00"
                if (totals.liters < 0.000001) totals.liters = 0;
                if (totals.amount < 0.000001) totals.amount = 0;
                ds.putData(modelData).catch((e) => logger.error('Cannot save cart to IDB on unitAdd: ' + e));
            }
        }

        // MAIN FUNCTIONALITY
        // init as empty model then load data from IDB
        container
            .get('Fl32_Ap_Front_Door_Pub_Dto_Cart$$')
            .then((dto) => {
                this.setData(dto);
                this.idbGet();
            });
    }
}

// MODULE'S EXPORT
export default Fl32_Ap_Front_Door_Pub_Model_Cart;
