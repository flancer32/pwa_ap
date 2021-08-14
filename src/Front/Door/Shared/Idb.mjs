/**
 * Application level connector to Indexed DB. Contains db name and version and code to upgrade IDB stores.
 * The same IDB structure is used both for admin & pub realms.
 *
 * @namespace Fl32_Ap_Front_Door_Shared_Idb
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Door_Shared_Idb';
const IDB_NAME = NS;
const IDB_VERSION = 1;

// MODULE'S CLASSES
class Fl32_Ap_Front_Door_Shared_Idb {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Db_Front_Idb_Connect} */
        const conn = spec['TeqFw_Db_Front_Idb_Connect$$']; // new instance
        /** @type {typeof Fl32_Ap_Front_Door_Shared_Idb_Store_DataSource} */
        const EDataSource = spec['Fl32_Ap_Front_Door_Shared_Idb_Store_DataSource#'];

        // DEFINE INNER FUNCTIONS

        /**
         * Connect to IDB if not connected yet, upgrade DB structure if not upgraded yet.
         * @return {Promise<void>}
         */
        async function open() {
            // DEFINE INNER FUNCTIONS
            /**
             * Function to run on 'IDBOpenDBRequest.onupgradeneeded'
             */
            function fnUpgrade() {
                /** @type {IDBOpenDBRequest} */
                const me = this;
                const db = me.result;
                if (!db.objectStoreNames.contains(EDataSource.ENTITY)) {
                    db.createObjectStore(EDataSource.ENTITY, {keyPath: EDataSource.KEY});
                }
            }

            // MAIN FUNCTIONALITY
            await conn.openDb(IDB_NAME, IDB_VERSION, fnUpgrade);
        }

        // DEFINE INSTANCE METHODS
        /**
         * Connect to IDB if not connected, return Store object to handle data (get, put).
         * @param {string} name
         * @return {Promise<TeqFw_Db_Front_Idb_Connect.Store>}
         */
        this.store = async function (name) {
            await this.connect();
            return conn.store(name);
        }

        /**
         * Connect to IDB if not connected then return connection.
         * @return {Promise<TeqFw_Db_Front_Idb_Connect>}
         */
        this.connect = async function () {
            if (!conn.isConnected()) await open();
            return conn;
        }

        /**
         * Delete database then re-open it with data upgrade.
         * @return {Promise<void>}
         */
        this.delete = async function () {
            await conn.delete(IDB_NAME);
            await open();
        }

    }
}

// MODULE'S EXPORT
export default Fl32_Ap_Front_Door_Shared_Idb;
