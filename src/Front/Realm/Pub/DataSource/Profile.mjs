/**
 * Data source for user profile in 'pub' realm.
 * Load service DTO from the server and save it to IDB.
 *
 * @namespace Fl32_Ap_Front_Realm_Pub_DataSource_Profile
 */
class Fl32_Ap_Front_Realm_Pub_DataSource_Profile {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Front_Realm_Shared_Idb} */
        const idb = spec['Fl32_Ap_Front_Realm_Shared_Idb$']; // instance singleton
        /** @type {typeof Fl32_Ap_Front_Realm_Shared_Idb_Store_DataSource} */
        const EDataSource = spec['Fl32_Ap_Front_Realm_Shared_Idb_Store_DataSource#']; // class
        /** @type {Fl32_Ap_Front_Realm_Pub_Dto_Profile.Factory} */
        const fProfile = spec['Fl32_Ap_Front_Realm_Pub_Dto_Profile#Factory$']; // instance singleton
        /** @function {@type Fl32_Ap_Front_Gate_Profile_Get.gate} */
        const gateGet = spec['Fl32_Ap_Front_Gate_Profile_Get$']; // function singleton
        /** @type {Fl32_Ap_Shared_Service_Route_Profile_Get.Factory} */
        const fRouteGet = spec['Fl32_Ap_Shared_Service_Route_Profile_Get#Factory$']; // instance singleton
        /** @function {@type Fl32_Ap_Front_Gate_Profile_Update.gate} */
        const gateUpdate = spec['Fl32_Ap_Front_Gate_Profile_Update$']; // function singleton
        /** @type {Fl32_Ap_Shared_Service_Route_Profile_Update.Factory} */
        const fRouteUpdate = spec['Fl32_Ap_Shared_Service_Route_Profile_Update#Factory$']; // instance singleton

        // DEFINE WORKING VARS
        const TYPE = Fl32_Ap_Front_Realm_Pub_DataSource_Profile.TYPE;

        // DEFINE INSTANCE METHODS

        /**
         * Get data from IDB or create new empty record.
         * @return {Promise<Fl32_Ap_Front_Realm_Pub_Dto_Profile>}
         */
        this.getData = async function () {
            let result;
            const store = await idb.store(EDataSource.ENTITY);
            const found = await store.getByKey(TYPE);
            if (found) {
                result = found.data;
            } else {
                // create new on and put to IDB
                result = fProfile.create();
                await this.putData(result);
            }
            return result;
        }

        this.putData = async function (data, request = null) {
            // save data to IDB
            const store = await idb.store(EDataSource.ENTITY);
            const item = new EDataSource();
            item.type = TYPE;
            item.data = data;
            item.request = request;
            await store.put(item);
        }

        /**
         * Load data from remote server then save it to IDB.
         *
         * @param {*} opts
         * @return {Promise<Fl32_Ap_Shared_Service_Route_Profile_Get.Response>}
         */
        this.loadData = async function (opts = null) {
            // load data from the server
            const req = fRouteGet.createReq();
            const res = await gateGet(req);
            // save data to IDB
            await this.putData(res, opts);
            // return data from the server
            return res;
        }

        this.saveData = async function (data) {
            const req = fRouteUpdate.createReq();
            req.profile = data;
            await gateUpdate(req);
        }
    }
}

Fl32_Ap_Front_Realm_Pub_DataSource_Profile.TYPE = 'pub/profile';

// MODULE'S EXPORT
export default Fl32_Ap_Front_Realm_Pub_DataSource_Profile;
