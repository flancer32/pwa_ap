/**
 * Data source for products catalog.
 *
 * @namespace Fl32_Ap_Front_Area_Shared_DataSource_Catalog
 */
export default class Fl32_Ap_Front_Area_Shared_DataSource_Catalog {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Back_Defaults} */
        const DEF = spec['Fl32_Ap_Back_Defaults$'];
        const i18n = spec[DEF.MOD_I18N.DI.I18N];
        /** @type {Fl32_Ap_Front_Area_Shared_Idb} */
        const idb = spec['Fl32_Ap_Front_Area_Shared_Idb$'];
        /** @type {TeqFw_Web_Front_Service_Gate} */
        const gate = spec['TeqFw_Web_Front_Service_Gate$'];
        /** @type {Fl32_Ap_Shared_Service_Route_Product_List.Factory} */
        const route = spec['Fl32_Ap_Shared_Service_Route_Product_List#Factory$'];
        /** @type {typeof Fl32_Ap_Front_Area_Shared_Idb_Store_DataSource} */
        const EDataSource = spec['Fl32_Ap_Front_Area_Shared_Idb_Store_DataSource#'];

        // DEFINE WORKING VARS
        const TYPE = Fl32_Ap_Front_Area_Shared_DataSource_Catalog.TYPE;

        // DEFINE INSTANCE METHODS

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
            const req = route.createReq();
            req.lang = lang;
            // noinspection JSValidateTypes
            /** @type {Fl32_Ap_Shared_Service_Route_Product_List.Response} */
            const res = await gate.send(req, route);
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

Fl32_Ap_Front_Area_Shared_DataSource_Catalog.TYPE = 'shared/catalog';
