/**
 * Application level connector to Indexed DB. Contains code to upgrade IDB stores.
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
        /** @type {TeqFw_Core_App_Front_Idb_Connect} */
        const conn = spec['TeqFw_Core_App_Front_Idb_Connect$$']; // new instance
        /** @type {typeof Fl32_Ap_Front_Idb_Store_DataSource} */
        const EDataSource = spec['Fl32_Ap_Front_Idb_Store_DataSource#']; // class

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
         * Wrapper to open (and upgrade) DB on transaction request.
         *
         * @param stores
         * @param {string} type transaction type (readonly, readwrite, )
         * @return {Promise<TeqFw_Core_App_Front_Idb_Connect.Transaction>}
         */
        this.transaction = async function (stores, type) {
            if (!conn.isConnected()) await open();
            return conn.trans(stores, type);
        }

        this.delete = async function () {
            await conn.delete(IDB_NAME);
            await open();
        }

    }
}

// MODULE'S EXPORT
export default Fl32_Ap_Front_Idb;
