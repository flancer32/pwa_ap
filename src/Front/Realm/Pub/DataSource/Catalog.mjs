/**
 * Data source for products catalog.
 *
 * @namespace Fl32_Ap_Front_Realm_Pub_DataSource_Catalog
 */
class Fl32_Ap_Front_Realm_Pub_DataSource_Catalog {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Defaults} */
        const DEF = spec['Fl32_Ap_Defaults$']; // instance singleton
        const i18n = spec[DEF.MOD_CORE.DI_I18N]; // named singleton
        /** @type {Fl32_Ap_Front_Idb} */
        const idb = spec['Fl32_Ap_Front_Idb$']; // instance singleton
        /** @function {@type Fl32_Ap_Front_Gate_Product_List.gate} */
        const gate = spec['Fl32_Ap_Front_Gate_Product_List$']; // function singleton
        /** @type {typeof Fl32_Ap_Shared_Service_Route_Product_List.Request} */
        const Req = spec['Fl32_Ap_Shared_Service_Route_Product_List#Request']; // class
        /** @type {typeof Fl32_Ap_Front_Idb_Store_DataSource} */
        const EDataSource = spec['Fl32_Ap_Front_Idb_Store_DataSource#']; // class

        // DEFINE WORKING VARS
        const TYPE = Fl32_Ap_Front_Realm_Pub_DataSource_Catalog.TYPE;

        // DEFINE INSTANCE METHODS

        this.clearCache = async function ({}) {
            // delete cached data from IDB
            return {}
        }
        /**
         * Get data from IDB or load it from remote server.
         * @param {string} lang
         * @return {Promise<Fl32_Ap_Shared_Service_Route_Product_List.Response>}
         */
        this.getData = async function ({lang}) {
            let result;
            if (!lang) lang = i18n.language;
            const store = await idb.store(EDataSource.ENTITY);
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
            const store = await idb.store(EDataSource.ENTITY);
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

Fl32_Ap_Front_Realm_Pub_DataSource_Catalog.TYPE = 'product/card';

// MODULE'S EXPORT
export default Fl32_Ap_Front_Realm_Pub_DataSource_Catalog;
