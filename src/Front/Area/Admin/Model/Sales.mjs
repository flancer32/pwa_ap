/**
 * Model object for sales list in 'admin' realm.
 * This model does not use DataSource and get data directly from the server using service gate.
 *
 * @namespace Fl32_Ap_Front_Area_Admin_Model_Sales
 */

// MODULE'S CLASSES
class Fl32_Ap_Front_Area_Admin_Model_Sales {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Defaults} */
        const DEF = spec['Fl32_Ap_Defaults$'];
        const {reactive} = spec[DEF.MOD_VUE.DI_VUE]; // named singleton destructuring
        /** @type {TeqFw_Core_Logger} */
        const logger = spec['TeqFw_Core_Logger$'];  // instance singleton
        /** @type {Function|Fl32_Ap_Front_Gate_Sale_List.gate} */
        const gateList = spec['Fl32_Ap_Front_Gate_Sale_List$']; // function singleton
        /** @type {typeof Fl32_Ap_Shared_Service_Route_Sale_List.Request} */
        const ReqList = spec['Fl32_Ap_Shared_Service_Route_Sale_List#Request']; // class
        /** @type {Fl32_Ap_Front_Area_Admin_Dto_Sale.Factory} */
        const fSale = spec['Fl32_Ap_Front_Area_Admin_Dto_Sale#Factory$']; // instance singleton
        /** @type {Fl32_Ap_Front_Area_Admin_Dto_Sale_Item.Factory} */
        const fSaleItem = spec['Fl32_Ap_Front_Area_Admin_Dto_Sale_Item#Factory$']; // instance singleton

        // DEFINE WORKING VARS
        /** @type {Object<number, Fl32_Ap_Front_Area_Admin_Dto_Sale>} */
        let modelData = reactive({});

        // DEFINE INSTANCE METHODS
        /**
         * Return model data (reactive DTO).
         *
         * @return {Object<number, Fl32_Ap_Front_Area_Admin_Dto_Sale>}
         */
        this.getData = function () {
            return modelData;
        }
        /**
         * @param {number} saleId
         * @return {Fl32_Ap_Front_Area_Admin_Dto_Sale}
         */
        this.getSale = function (saleId) {
            return modelData[saleId];
        }

        /**
         * Convert service response DTO to model DTO and make it reactive.
         *
         * @param {Fl32_Ap_Shared_Service_Route_Sale_List.Response} data
         */
        this.parseDataSource = function (data) {
            for (const sSale of data.items) {
                const mSale = fSale.create();
                mSale.id = sSale.id;
                mSale.userId = sSale.userId;
                mSale.state = sSale.state;
                mSale.dateCreated = new Date(sSale.dateCreated);
                mSale.dateReceiving = new Date(sSale.dateReceiving);
                mSale.totals.value = sSale.amountTotal;
                mSale.totals.currency = sSale.currency;
                const mItems = {};
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
                // make sale model reactive and add to the sales list
                modelData[mSale.id] = reactive(mSale);
            }
        }

        this.reload = async function () {
            const req = new ReqList();
            /** @type {Fl32_Ap_Shared_Service_Route_Sale_List.Response} */
            const res = await gateList(req);
            if (res) {
                // order sales descending by saleId.
                this.sales = res.items.sort((a, b) => b.id - a.id);
                this.parseDataSource(res);
            }
        }
        // MAIN FUNCTIONALITY
        // init as empty model then load data from DataSource
        this.reload().catch(function (e) {
            logger.error('Cannot reload sales list: ' + e);
        });
    }
}

// MODULE'S EXPORT
export default Fl32_Ap_Front_Area_Admin_Model_Sales;
