/**
 * Command to backup data, drop-create tables then restore data.
 * @namespace Fl32_Ap_Back_Cli_Db_Upgrade
 */
// DEFINE WORKING VARS
const NS = 'Fl32_Ap_Back_Cli_Db_Upgrade';

// DEFINE MODULE'S FUNCTIONS
/**
 * Factory class to create CLI command to reset database structures and initialize test data.
 *
 * @param {TeqFw_Di_SpecProxy} spec
 * @returns {TeqFw_Core_Back_Cli_Command_Data}
 * @constructor
 * @memberOf Fl32_Ap_Back_Cli_Db_Upgrade
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Defaults} */
    const DEF = spec['Fl32_Ap_Defaults$'];   // instance singleton
    /** @type {typeof TeqFw_Core_Back_Cli_Command_Data} */
    const DCommand = spec['TeqFw_Core_Back_Cli_Command#Data'];    // class constructor
    /** @type {TeqFw_Core_Back_RDb_Connector} */
    const connector = spec['TeqFw_Core_Back_RDb_Connector$']; // instance singleton
    /** @type {TeqFw_Core_Logger} */
    const logger = spec['TeqFw_Core_Logger$'];  // instance singleton
    /** @type {Function|Fl32_Ap_Back_Cli_Db_Upgrade_A_Restore.action} */
    const actRestore = spec['Fl32_Ap_Back_Cli_Db_Upgrade_A_Restore$']; // instance singleton
    /** @type {Function|Fl32_Ap_Back_Cli_Db_Upgrade_A_Dump.action} */
    const actDump = spec['Fl32_Ap_Back_Cli_Db_Upgrade_A_Dump$']; // instance singleton
    /** @type {Function|Fl32_Ap_Back_Cli_Db_Z_Restruct.action} */
    const actRestruct = spec['Fl32_Ap_Back_Cli_Db_Z_Restruct$']; // instance singleton

    // DEFINE INNER FUNCTIONS

    /**
     * @see TeqFw_Core_Back_Cli_Command.create
     * @return {Promise<TeqFw_Core_Back_Cli_Command_Data>}
     */
    async function action() {
        // dump data
        const dump = await actDump();
        if (dump) {
            // recreate DB structure
            await actRestruct();
            // restore data from dump
            await actRestore(dump);
            logger.info('Upgrade actions are done.');
        } else {
            logger.info('Dump is failed. Abort action.');
        }
        // close DB connections
        await connector.disconnect();
    }

    // COMPOSE RESULT
    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});
    const result = new DCommand();
    result.ns = DEF.BACK_REALM;
    result.name = 'db-upgrade';
    result.desc = 'Backup data, drop-create tables then restore data.';
    result.action = action;
    return result;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
