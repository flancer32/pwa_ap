/**
 * Recreate database structure and fill it with demo data.
 * @namespace Fl32_Ap_Back_Cli_Db_Reset
 */
// DEFINE WORKING VARS
const NS = 'Fl32_Ap_Back_Cli_Db_Reset';

// DEFINE MODULE'S FUNCTIONS
/**
 * Factory to create CLI command.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @returns {TeqFw_Core_Back_Api_Dto_Command}
 * @constructor
 * @memberOf Fl32_Ap_Back_Cli_Db_Reset
 */
export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Back_Defaults} */
    const DEF = spec['Fl32_Ap_Back_Defaults$'];
    /** @type {Function|TeqFw_Core_Back_Api_Dto_Command.Factory} */
    const fCommand = spec['TeqFw_Core_Back_Api_Dto_Command#Factory$'];
    /** @type {TeqFw_Db_Back_Api_RDb_IConnect} */
    const connector = spec['TeqFw_Db_Back_Api_RDb_IConnect$'];
    /** @type {TeqFw_Core_Shared_Logger} */
    const logger = spec['TeqFw_Core_Shared_Logger$'];
    /** @type {TeqFw_Core_Back_App} */
    const app = spec['TeqFw_Core_Back_App$'];
    const {isPostgres} = spec['TeqFw_Db_Back_Api_Util'];
    /** @type {Function|Fl32_Ap_Back_Cli_Db_Z_Restruct.action} */
    const actRestruct = spec['Fl32_Ap_Back_Cli_Db_Z_Restruct$'];
    /** @type {typeof Fl32_Ap_User_Back_Store_RDb_Schema_Id_Email} */
    const EIdEmail = spec['Fl32_Ap_User_Back_Store_RDb_Schema_Id_Email#'];
    /** @type {typeof Fl32_Ap_User_Back_Store_RDb_Schema_Session} */
    const ESession = spec['Fl32_Ap_User_Back_Store_RDb_Schema_Session#'];
    /** @type {typeof Fl32_Ap_User_Back_Store_RDb_Schema_Tree} */
    const ETree = spec['Fl32_Ap_User_Back_Store_RDb_Schema_Tree#'];
    /** @type {typeof Fl32_Ap_User_Back_Store_RDb_Schema_User} */
    const EUser = spec['Fl32_Ap_User_Back_Store_RDb_Schema_User#'];

    const {addAttributes} = spec['Fl32_Ap_Back_Cli_Db_Reset_A_Attrs$'];
    const {addProducts} = spec['Fl32_Ap_Back_Cli_Db_Reset_A_Prods$'];

    // DEFINE INNER FUNCTIONS

    /**
     * Command action.
     * @returns {Promise<void>}
     * @memberOf Fl32_Ap_Back_Cli_Db_Reset
     */
    async function action() {
        // DEFINE INNER FUNCTIONS
        /**
         * Compose queries to insert data into the tables.
         * @param trx
         */
        async function populateWithData(trx) {
            // PARSE INPUT & DEFINE WORKING VARS
            const isPg = isPostgres(trx.client);

            // DEFINE INNER FUNCTIONS

            async function insertUsers(trx) {
                // user
                await trx(EUser.ENTITY).insert([
                    {
                        [EUser.A_ID]: isPg ? undefined : DEF.DATA_USER_ADMIN_ID,
                        [EUser.A_IS_ADMIN]: true,
                        [EUser.A_NAME]: DEF.DATA_USER_ADMIN_NAME
                    },
                ]);
                // user_id_email
                await trx(EIdEmail.ENTITY).insert({
                    [EIdEmail.A_EMAIL]: DEF.DATA_USER_ADMIN_EMAIL,
                    [EIdEmail.A_USER_REF]: DEF.DATA_USER_ADMIN_ID,
                });
                // user_tree
                await trx(ETree.ENTITY).insert([
                    {
                        [ETree.A_USER_REF]: DEF.DATA_USER_ADMIN_ID,
                        [ETree.A_PARENT_REF]: DEF.DATA_USER_ADMIN_ID,
                    }
                ]);
                // user_session
                await trx(ESession.ENTITY).insert([
                    {
                        [ESession.A_USER_REF]: DEF.DATA_USER_ADMIN_ID,
                        [ESession.A_SESSION_ID]: DEF.DATA_USER_ADMIN_SESS_ID,
                    }
                ]);
            }

            // MAIN FUNCTIONALITY
            await insertUsers(trx);
            await addAttributes({trx});
            await addProducts({trx});
        }

        // MAIN FUNCTIONALITY
        const trx = await connector.startTransaction();
        try {
            logger.pause(false);
            // recreate DB structure
            await actRestruct();
            // perform queries to insert data into created tables
            await populateWithData(trx);
            // perform queries to insert data and commit changes
            trx.commit();
        } catch (e) {
            trx.rollback();
            logger.error(`${e.toString()}`);
        }
        await app.stop();
    }

    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});

    // COMPOSE RESULT
    const result = fCommand.create();
    result.realm = DEF.CLI_PREFIX;
    result.name = 'db-reset';
    result.desc = 'Reset database structures and initialize test data.';
    result.action = action;
    return result;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
