/**
 * Model object for Shopping Cart in 'pub' realm.
 * Model should initiate data by itself.
 *
 * @namespace Fl32_Ap_Front_Realm_Pub_Model_Cart
 */

// MODULE'S CLASSES
class Fl32_Ap_Front_Realm_Pub_Model_Cart {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Defaults} */
        const DEF = spec['Fl32_Ap_Defaults$'];
        /** @type {TeqFw_Di_Container} */
        const container = spec[DEF.MOD_CORE.DI_CONTAINER]; // named singleton
        const {reactive} = spec[DEF.MOD_VUE.DI_VUE]; // named singleton destructuring
        /** @type {Fl32_Ap_Front_Realm_Pub_Dto_Cart.Factory} */
        const fCart = spec['Fl32_Ap_Front_Realm_Pub_Dto_Cart#Factory$']; // instance singleton
        /** @type {Fl32_Ap_Front_Realm_Pub_Dto_Cart_Item.Factory} */
        const fItem = spec['Fl32_Ap_Front_Realm_Pub_Dto_Cart_Item#Factory$']; // instance singleton
        /** @type {Fl32_Ap_Front_Realm_Pub_DataSource_Cart} */
        const ds = spec['Fl32_Ap_Front_Realm_Pub_DataSource_Cart$']; // instance singleton

        // DEFINE WORKING VARS
        /** @type {Fl32_Ap_Front_Realm_Pub_Dto_Cart} */
        let cart;

        // DEFINE INNER FUNCTIONS

        // DEFINE INSTANCE METHODS
        /**
         * Return model data as DTO.
         *
         * @return {Fl32_Ap_Front_Realm_Pub_Dto_Cart}
         */
        this.getData = function () {
            return cart;
        }
        /**
         * Set DTO to model and make it reactive.
         *
         * @param {Fl32_Ap_Front_Realm_Pub_Dto_Cart} data
         */
        this.setData = function (data) {
            const cartDto = fCart.create();
            cart = reactive(cartDto);
            // reactivate 'totals'
            const totalsDto = Object.assign(cartDto.totals, data?.totals);
            cart.totals = reactive(totalsDto);
            // reactivate 'items'
            const items = reactive({});
            if (typeof data?.items === 'object') {
                for (const key of Object.keys(data.items)) {
                    const itemDto = Object.assign(fItem.create(), data.items[key]);
                    items[key] = reactive(itemDto);
                }
            }
            cart.items = items;
        }

        this.idbGet = async function () {
            const dto = await ds.getData();
            this.setData(dto);
        }
        /**
         * @param {Fl32_Ap_Shared_Service_Data_Product_Unit} unit
         * @return {boolean}
         */
        this.hasUnit = function (unit) {
            const unitId = unit.id;
            return !!(cart.items[unitId]);
        }
        /**
         * Clean current cart.
         */
        this.clean = async function () {
            const keys = Object.keys(cart.items);
            for (const key of keys) delete cart.items[key];
            cart.totals.liters = 0;
            cart.totals.amount = 0;
        }
        /**
         * @param {Fl32_Ap_Shared_Service_Data_Product_Unit} unit
         */
        this.unitAdd = function (unit) {
            const items = cart.items;
            const totals = cart.totals;
            const unitId = unit.id;
            if (!items[unitId]) {
                items[unitId] = fItem.create();
                items[unitId].unit = unit;
                items[unitId].count = 1;
            } else {
                items[unitId].count += 1;
            }
            totals.liters += Number.parseFloat(unit.attrs[DEF.ATTR.PROD.UNIT.VOLUME]);
            totals.amount += Number.parseFloat(unit.price.value);
            ds.putData(cart);
        }
        /**
         * @param {Fl32_Ap_Shared_Service_Data_Product_Unit} unit
         */
        this.unitRemove = function (unit) {
            const items = cart.items;
            const totals = cart.totals;
            const unitId = unit.id;
            if (items[unitId]) {
                if ((items[unitId].count) <= 1) {
                    delete items[unitId];
                } else {
                    items[unitId].count -= 1;
                }
                totals.liters -= Number.parseFloat(unit.attrs[DEF.ATTR.PROD.UNIT.VOLUME]);
                totals.amount -= Number.parseFloat(unit.price.value);
                // prevent "-0.00"
                if (totals.liters < 0.000001) totals.liters = 0;
                if (totals.amount < 0.000001) totals.amount = 0;
                ds.putData(cart);
            }
        }

        // MAIN FUNCTIONALITY
        // init as empty model then load data from IDB
        container
            .get('Fl32_Ap_Front_Realm_Pub_Dto_Cart$$')
            .then((dto) => {
                this.setData(dto);
                this.idbGet();
            });
    }
}

// MODULE'S EXPORT
export default Fl32_Ap_Front_Realm_Pub_Model_Cart;
