/**
 * Model object for Shopping Cart.
 *
 * @namespace Fl32_Ap_Front_Model_Cart
 */

// MODULE'S CLASSES
class Item {
    /** @type {number} */
    count;
    /** @type {Fl32_Ap_Shared_Service_Data_Product_Unit} */
    unit;
}

/**
 * Data source for products cards.
 */
class Fl32_Ap_Front_Model_Cart {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Defaults} */
        const DEF = spec['Fl32_Ap_Defaults$'];
        const {reactive} = spec[DEF.MOD_VUE.DI_VUE]; // named singleton destructuring

        // DEFINE WORKING VARS
        const items = reactive({});
        const totals = reactive({liters: 0, amount: 0});
        const cart = reactive({items, totals});

        // DEFINE INNER FUNCTIONS

        // DEFINE INSTANCE METHODS
        this.getData = function () {
            return cart;
        }

        /**
         * @param {Fl32_Ap_Shared_Service_Data_Product_Unit} unit
         * @return {boolean}
         */
        this.hasUnit = function (unit) {
            const unitId = unit.id;
            return !!(items[unitId]);
        }

        /**
         * @param {Fl32_Ap_Shared_Service_Data_Product_Unit} unit
         */
        this.unitAdd = function (unit) {
            const unitId = unit.id;
            if (!items[unitId]) {
                items[unitId] = new Item();
                items[unitId].unit = unit;
                items[unitId].count = 1;
            } else {
                items[unitId].count += 1;
            }
            totals.liters += Number.parseFloat(unit.attrs[DEF.ATTR.PROD.UNIT.VOLUME]);
            totals.amount += Number.parseFloat(unit.price.value);
        }

        /**
         * @param {Fl32_Ap_Shared_Service_Data_Product_Unit} unit
         */
        this.unitRemove = function (unit) {
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
            }

        }

    }
}

// MODULE'S EXPORT
export default Fl32_Ap_Front_Model_Cart;
