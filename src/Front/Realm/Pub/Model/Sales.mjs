/**
 * Model object for sales list in 'pub' realm.
 *
 * @namespace Fl32_Ap_Front_Realm_Pub_Model_Sales
 */

// MODULE'S CLASSES
class Fl32_Ap_Front_Realm_Pub_Model_Sales {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Defaults} */
        const DEF = spec['Fl32_Ap_Defaults$'];
        const {reactive} = spec[DEF.MOD_VUE.DI_VUE]; // named singleton destructuring
        /** @type {TeqFw_Core_App_Logger} */
        const logger = spec['TeqFw_Core_App_Logger$'];  // instance singleton
        /** @type {Fl32_Ap_Front_Realm_Pub_DataSource_Sales} */
        const ds = spec['Fl32_Ap_Front_Realm_Pub_DataSource_Sales$']; // instance singleton
        /** @type {Fl32_Ap_Front_Realm_Pub_Dto_Sale.Factory} */
        const fSale = spec['Fl32_Ap_Front_Realm_Pub_Dto_Sale#Factory$']; // instance singleton
        /** @type {Fl32_Ap_Front_Realm_Pub_Dto_Sale_Item.Factory} */
        const fSaleItem = spec['Fl32_Ap_Front_Realm_Pub_Dto_Sale_Item#Factory$']; // instance singleton

        // DEFINE WORKING VARS
        /** @type {Object<number, Fl32_Ap_Front_Realm_Pub_Dto_Sale>} */
        let modelData = reactive({});

        // DEFINE INSTANCE METHODS
        /**
         * Return model data (reactive DTO).
         *
         * @return {Object<number, Fl32_Ap_Front_Realm_Pub_Dto_Sale>}
         */
        this.getData = function () {
            return modelData;
        }
        /**
         * Convert service DTO to model DTO and make it reactive.
         *
         * @param {Fl32_Ap_Shared_Service_Route_Sale_List.Response} data
         */
        this.parseDataSource = function (data) {
            for (const sSale of data.items) {
                const mSale = fSale.create();
                mSale.id = sSale.id;
                mSale.state = sSale.state;
                mSale.dateCreated = new Date(sSale.dateCreated);
                mSale.dateReceiving = new Date(sSale.dateReceiving);
                const mTotals = mSale.totals;
                mTotals.amount = sSale.amountTotal;
                mTotals.currency = sSale.currency;
                modelData[mSale.id] = reactive(mSale);
                // TODO: should we have reactivity here???
                const mItems = reactive({});
                for (const sItem of sSale.items) {
                    const mItem = fSaleItem.create();
                    mItem.id = sItem.id;
                    mItem.saleId = sItem.saleId;
                    mItem.qty = sItem.qty;
                    mItem.unitId = sItem.unitId;
                    mItem.unitPrice = sItem.unitPrice;
                    mItem.amountTotal = sItem.amountTotal;
                    mItems[mItem.id] = mItem;
                }
                mSale.items = mItems;
            }
        }

        this.reload = async function () {
            const res = await ds.loadData({});
            this.parseDataSource(res);
        }
        // MAIN FUNCTIONALITY
        // init as empty model then load data from DataSource
        this.reload().catch(function (e) {
            debugger
            logger.error('Cannot reload sales list: ' + e);
        });
    }
}

// MODULE'S EXPORT
export default Fl32_Ap_Front_Realm_Pub_Model_Sales;
