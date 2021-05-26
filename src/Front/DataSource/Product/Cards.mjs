/**
 * Data source for products cards.
 *
 * @namespace Fl32_Ap_Front_DataSource_Product_Cards
 */
class Fl32_Ap_Front_DataSource_Product_Cards {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Front_Idb} */
        const idb = spec['Fl32_Ap_Front_Idb$']; // instance singleton
        /** @function {@type Fl32_Ap_Front_Gate_Product_List.gate} */
        const gate = spec['Fl32_Ap_Front_Gate_Product_List$']; // function singleton
        /** @type {typeof Fl32_Ap_Shared_Service_Route_Product_List.Request} */
        const Req = spec['Fl32_Ap_Shared_Service_Route_Product_List#Request']; // class
        /** @type {typeof Fl32_Ap_Front_Idb_Store_DataSource} */
        const EDataSource = spec['Fl32_Ap_Front_Idb_Store_DataSource#']; // class

        // DEFINE WORKING VARS
        const TYPE = Fl32_Ap_Front_DataSource_Product_Cards.TYPE;

        // DEFINE INSTANCE METHODS

        this.clearData = async function ({}) {
            // delete data from IDB
            return {}
        }
        /**
         * Get data from IDB or load it from remote server.
         * @param {string} lang
         * @return {Promise<Fl32_Ap_Shared_Service_Route_Product_List.Response>}
         */
        this.getData = async function ({lang}) {
            let result;
            const trn = await idb.transaction([EDataSource.ENTITY], "readonly");
            const store = trn.getStore(EDataSource.ENTITY);
            const found = await store.getByKey(TYPE);
            if (found && (found.request.lang === lang)) {
                result = found.data;
            } else {
                result = await this.loadData({lang});
            }
            return result;
        }

        /**
         * Load data from remote server then save it to IDB.
         *
         * @param {string} lang
         * @return {Promise<Fl32_Ap_Shared_Service_Route_Product_List.Response>}
         */
        this.loadData = async function ({lang}) {
            // load data from remote server
            const req = new Req();
            req.lang = lang;
            const res = await gate(req);
            // save data to IDB
            const trn = await idb.transaction([EDataSource.ENTITY], "readwrite");
            const store = trn.getStore(EDataSource.ENTITY);
            const item = new EDataSource();
            item.type = TYPE;
            item.data = res;
            item.request = {lang};
            await store.put(item);
            // return data from the source
            return res;
        }
    }
}

Fl32_Ap_Front_DataSource_Product_Cards.TYPE = 'product/card';

// MODULE'S EXPORT
export default Fl32_Ap_Front_DataSource_Product_Cards;
