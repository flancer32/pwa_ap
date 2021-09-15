/**
 * Action to re-create database structure (drop-create tables).
 *
 * @namespace Fl32_Ap_Back_Cli_Db_Z_Restruct
 */
const NS = 'Fl32_Ap_Back_Cli_Db_Z_Restruct';

/**
 * Factory to setup context and to create the action.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @constructor
 * @memberOf Fl32_Ap_Back_Cli_Db_Z_Restruct
 */
export default function Factory(spec) {
    // PARSE INPUT & DEFINE WORKING VARS
    /** @type {TeqFw_Db_Back_Api_RDb_IConnect} */
    const conn = spec['TeqFw_Db_Back_Api_RDb_IConnect$'];
    /** @type {TeqFw_Core_Shared_Logger} */
    const logger = spec['TeqFw_Core_Shared_Logger$'];
    /** @type {TeqFw_Core_Back_Config} */
    const config = spec['TeqFw_Core_Back_Config$'];
    /** @type {TeqFw_Db_Back_Api_RDb_ISchema} */
    const dbSchema = spec['TeqFw_Db_Back_Api_RDb_ISchema$'];

    // DEFINE INNER FUNCTIONS
    /**
     * Action to re-create database structure (drop-create tables).
     * @returns {Promise<void>}
     * @memberOf Fl32_Ap_Back_Cli_Db_Z_Restruct
     */
    async function action() {
        // load DEMs then drop/create all tables
        const path = config.getBoot().projectRoot;
        await dbSchema.loadDem({path});
        await dbSchema.dropAllTables({conn});
        await dbSchema.createAllTables({conn});
        logger.info('Database structure is recreated.');
    }

    // COMPOSE RESULT
    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});
    return action;
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
