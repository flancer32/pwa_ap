/**
 * Data source for customer sales in 'pub' realm.
 *
 * @namespace Fl32_Ap_Front_Door_Pub_DataSource_Sales
 */
class Fl32_Ap_Front_Door_Pub_DataSource_Sales {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Front_Door_Shared_Idb} */
        const idb = spec['Fl32_Ap_Front_Door_Shared_Idb$'];
        /** @type {typeof Fl32_Ap_Front_Door_Shared_Idb_Store_DataSource} */
        const EDataSource = spec['Fl32_Ap_Front_Door_Shared_Idb_Store_DataSource#'];
        /** @type {Fl32_Ap_Front_Door_Pub_Dto_Cart.Factory} */
        const fCart = spec['Fl32_Ap_Front_Door_Pub_Dto_Cart#Factory$'];
        /** @type {TeqFw_Web_Front_Service_Gate} */
        const gate = spec['TeqFw_Web_Front_Service_Gate$'];
        /** @type {Fl32_Ap_Shared_Service_Route_Sale_List.Factory} */
        const route = spec['Fl32_Ap_Shared_Service_Route_Sale_List#Factory$'];

        // DEFINE WORKING VARS
        const TYPE = Fl32_Ap_Front_Door_Pub_DataSource_Sales.TYPE;

        // DEFINE INSTANCE METHODS

        /**
         * Get data from IDB or create new empty record.
         * @return {Promise<Fl32_Ap_Front_Door_Pub_Dto_Cart>}
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
            // noinspection JSValidateTypes
            /** @type {Fl32_Ap_Shared_Service_Route_Sale_List.Response} */
            const res = await gate.send(route.createReq(), route);
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

Fl32_Ap_Front_Door_Pub_DataSource_Sales.TYPE = 'pub/sales';

// MODULE'S EXPORT
export default Fl32_Ap_Front_Door_Pub_DataSource_Sales;
