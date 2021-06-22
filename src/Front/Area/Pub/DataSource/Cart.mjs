/**
 * Data source for shopping cart in 'pub' realm.
 *
 * @namespace Fl32_Ap_Front_Area_Pub_DataSource_Cart
 */
class Fl32_Ap_Front_Area_Pub_DataSource_Cart {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Front_Area_Shared_Idb} */
        const idb = spec['Fl32_Ap_Front_Area_Shared_Idb$']; // instance singleton
        /** @type {typeof Fl32_Ap_Front_Area_Shared_Idb_Store_DataSource} */
        const EDataSource = spec['Fl32_Ap_Front_Area_Shared_Idb_Store_DataSource#']; // class
        /** @type {Fl32_Ap_Front_Area_Pub_Dto_Cart.Factory} */
        const fCart = spec['Fl32_Ap_Front_Area_Pub_Dto_Cart#Factory$']; // instance singleton

        // DEFINE WORKING VARS
        const TYPE = Fl32_Ap_Front_Area_Pub_DataSource_Cart.TYPE;

        // DEFINE INSTANCE METHODS

        /**
         * Get data from IDB or create new empty record.
         * @return {Promise<Fl32_Ap_Front_Area_Pub_Dto_Cart>}
         */
        this.getData = async function () {
            let result;
            // const trn = await idb.transaction([EDataSource.ENTITY], "readonly");
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

Fl32_Ap_Front_Area_Pub_DataSource_Cart.TYPE = 'pub/cart';

// MODULE'S EXPORT
export default Fl32_Ap_Front_Area_Pub_DataSource_Cart;
