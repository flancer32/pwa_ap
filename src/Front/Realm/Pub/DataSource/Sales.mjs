/**
 * Data source for customer sales in 'pub' realm.
 *
 * @namespace Fl32_Ap_Front_Realm_Pub_DataSource_Sales
 */
class Fl32_Ap_Front_Realm_Pub_DataSource_Sales {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Front_Idb} */
        const idb = spec['Fl32_Ap_Front_Idb$']; // instance singleton
        /** @type {typeof Fl32_Ap_Front_Idb_Store_DataSource} */
        const EDataSource = spec['Fl32_Ap_Front_Idb_Store_DataSource#']; // class
        /** @type {Fl32_Ap_Front_Realm_Pub_Dto_Cart.Factory} */
        const fCart = spec['Fl32_Ap_Front_Realm_Pub_Dto_Cart#Factory$']; // instance singleton
        /** @type {Function|Fl32_Ap_Front_Gate_Sale_List.gate} */
        const gateList = spec['Fl32_Ap_Front_Gate_Sale_List$']; // function singleton
        /** @type {typeof Fl32_Ap_Shared_Service_Route_Sale_List.Request} */
        const ReqList = spec['Fl32_Ap_Shared_Service_Route_Sale_List#Request']; // class

        // DEFINE WORKING VARS
        const TYPE = Fl32_Ap_Front_Realm_Pub_DataSource_Sales.TYPE;

        // DEFINE INSTANCE METHODS

        /**
         * Get data from IDB or create new empty record.
         * @return {Promise<Fl32_Ap_Front_Realm_Pub_Dto_Cart>}
         */
        this.getData = async function () {
            let result;
            const store = await idb.store(EDataSource.ENTITY);
            const found = await store.getByKey(TYPE);
            if (found) {
                result = found.data;
            } else {
                // create new on and put to IDB
                result = fCart.create();
                await this.putData(result);
            }
            return result;
        }

        this.putData = async function (data) {
            // save data to IDB
            const store = await idb.store(EDataSource.ENTITY);
            const item = new EDataSource();
            item.type = TYPE;
            item.data = data;
            item.request = {};
            await store.put(item);
        }

        /**
         * Load data from remote server then save it to IDB.
         *
         * @return {Promise<Fl32_Ap_Shared_Service_Route_Sale_List.Response>}
         */
        this.loadData = async function ({}) {
            // load data from remote server
            const req = new ReqList();
            /** @type {Fl32_Ap_Shared_Service_Route_Sale_List.Response} */
            const res = await gateList(req);
            // save data to IDB
            // TODO: remove 'await' someday
            await this.putData(res);
            // const trn = await idb.transaction([EDataSource.ENTITY], "readwrite");
            // const store = trn.getStore(EDataSource.ENTITY);
            // const item = new EDataSource();
            // item.type = TYPE;
            // item.data = res;
            // item.request = {};
            // await store.put(item);
            // return data from the source
            return res;
        }
    }
}

Fl32_Ap_Front_Realm_Pub_DataSource_Sales.TYPE = 'sales';

// MODULE'S EXPORT
export default Fl32_Ap_Front_Realm_Pub_DataSource_Sales;
