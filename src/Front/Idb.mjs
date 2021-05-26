/**
 * Connector to Indexed DB.
 *
 * @namespace Fl32_Ap_Front_Idb
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Idb';
const IDB_NAME = NS;
const IDB_VERSION = 1;

// MODULE'S CLASSES
/**
 * Data source for products cards.
 */
class Fl32_Ap_Front_Idb {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {typeof Fl32_Ap_Front_Idb_Store_DataSource} */
        const EDataSource = spec['Fl32_Ap_Front_Idb_Store_DataSource#']; // class

        this.open = function () {
            return new Promise(function (resolve, reject) {
                const openRequest = indexedDB.open(IDB_NAME, IDB_VERSION);

                openRequest.onupgradeneeded = function () {
                    const db = openRequest.result;
                    if (!db.objectStoreNames.contains(EDataSource.ENTITY)) {
                        db.createObjectStore(EDataSource.ENTITY, {keyPath: EDataSource.KEY});
                    }
                };

                openRequest.onerror = function () {
                    console.error("Error", openRequest.error);
                    reject(openRequest.error);
                };

                openRequest.onsuccess = function () {
                    resolve(openRequest.result);
                };
            });
        }

        this.put = function (store, value, key) {
            return new Promise(function (resolve, reject) {
                const request = store.put(value, key);
                request.onerror = function () {
                    reject(request.error);
                };
                request.onsuccess = function () {
                    resolve(request.result);
                };
            });
        }

        this.getByKey = function (store, key) {
            return new Promise(function (resolve, reject) {
                const request = store.get(key);
                request.onerror = function () {
                    reject(request.error);
                };
                request.onsuccess = function () {
                    resolve(request.result);
                };
            });
        }
    }
}

// MODULE'S EXPORT
export default Fl32_Ap_Front_Idb;
