/**
 * Command to backup data, drop-create tables then restore data.
 * @namespace Fl32_Ap_Back_Cli_Db_Upgrade
 */
// DEFINE WORKING VARS
const NS = 'Fl32_Ap_Back_Cli_Db_Upgrade';

// DEFINE MODULE'S FUNCTIONS
/**
 * Factory to create CLI command.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @returns {TeqFw_Core_Back_Api_Dto_Command}
 * @constructor
 * @memberOf Fl32_Ap_Back_Cli_Db_Upgrade
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Back_Defaults} */
    const DEF = spec['Fl32_Ap_Back_Defaults$'];
    /** @type {Function|TeqFw_Core_Back_Api_Dto_Command.Factory} */
    const fCommand = spec['TeqFw_Core_Back_Api_Dto_Command#Factory$']; // singleton
    /** @type {TeqFw_Db_Back_Api_IConnect} */
    const connector = spec['TeqFw_Db_Back_Api_IConnect$'];
    /** @type {TeqFw_Core_Shared_Logger} */
    const logger = spec['TeqFw_Core_Shared_Logger$'];
    /** @type {Function|Fl32_Ap_Back_Cli_Db_Upgrade_A_Restore.action} */
    const actRestore = spec['Fl32_Ap_Back_Cli_Db_Upgrade_A_Restore$'];
    /** @type {Function|Fl32_Ap_Back_Cli_Db_Upgrade_A_Dump.action} */
    const actDump = spec['Fl32_Ap_Back_Cli_Db_Upgrade_A_Dump$'];
    /** @type {Function|Fl32_Ap_Back_Cli_Db_Z_Restruct.action} */
    const actRestruct = spec['Fl32_Ap_Back_Cli_Db_Z_Restruct$'];

    // DEFINE INNER FUNCTIONS

    /**
     * Command action.
     * @returns {Promise<void>}
     * @memberOf Fl32_Ap_Back_Cli_Db_Upgrade
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

    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});

    // COMPOSE RESULT
    const result = fCommand.create();
    result.realm = DEF.CLI_PREFIX;
    result.name = 'db-upgrade';
    result.desc = 'Backup data, drop-create tables then restore data.';
    result.action = action;
    return result;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
