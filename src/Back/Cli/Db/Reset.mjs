/**
 * @namespace Fl32_Ap_Back_Cli_Db_Reset
 */
// MODULE'S IMPORT

// DEFINE WORKING VARS
const NS = 'Fl32_Ap_Back_Cli_Db_Reset';

// DEFINE MODULE'S FUNCTIONS
/**
 * Factory class to create CLI command to reset database structures and initialize test data.
 *
 * @param {TeqFw_Di_SpecProxy} spec
 * @returns {TeqFw_Core_App_Cli_Command_Data}
 * @constructor
 * @memberOf Fl32_Ap_Back_Cli_Db_Reset
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Defaults} */
    const DEF = spec['Fl32_Ap_Defaults$'];   // instance singleton
    /** @type {typeof TeqFw_Core_App_Cli_Command_Data} */
    const DCommand = spec['TeqFw_Core_App_Cli_Command#Data'];    // class constructor
    /** @type {TeqFw_Core_App_Db_Connector} */
    const connector = spec['TeqFw_Core_App_Db_Connector$']; // instance singleton
    /** @type {TeqFw_Core_App_Logger} */
    const logger = spec['TeqFw_Core_App_Logger$'];  // instance singleton
    const {isPostgres} = spec['TeqFw_Core_App_Back_Util_RDb']; // ES6 destruct
    /** @type {Fl32_Ap_Plugin_Store_RDb_Setup} */
    const setupApp = spec['Fl32_Ap_Plugin_Store_RDb_Setup$']; // instance singleton
    /** @type {Fl32_Ap_User_Plugin_Store_RDb_Setup} */
    const setupUser = spec['Fl32_Ap_User_Plugin_Store_RDb_Setup$']; // instance singleton
    /** @type {typeof Fl32_Ap_User_Back_Store_RDb_Schema_Id_Email} */
    const EIdEmail = spec['Fl32_Ap_User_Back_Store_RDb_Schema_Id_Email#']; // class
    /** @type {typeof Fl32_Ap_User_Back_Store_RDb_Schema_Session} */
    const ESession = spec['Fl32_Ap_User_Back_Store_RDb_Schema_Session#']; // class
    /** @type {typeof Fl32_Ap_User_Back_Store_RDb_Schema_Tree} */
    const ETree = spec['Fl32_Ap_User_Back_Store_RDb_Schema_Tree#']; // class
    /** @type {typeof Fl32_Ap_User_Back_Store_RDb_Schema_User} */
    const EUser = spec['Fl32_Ap_User_Back_Store_RDb_Schema_User#']; // class

    const {addAttributes} = spec['Fl32_Ap_Back_Cli_Db_Reset_A_Attrs$']; // destruct of factory's returned result
    const {addProducts} = spec['Fl32_Ap_Back_Cli_Db_Reset_A_Prods$']; // destruct of factory's returned result

    // DEFINE INNER FUNCTIONS

    /**
     * @see TeqFw_Core_App_Cli_Command.create
     * @return {Promise<TeqFw_Core_App_Cli_Command_Data>}
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
        const knex = await connector.getKnex();
        const trx = await connector.startTransaction();
        try {
            // compose queries to recreate DB structure
            /** @type {SchemaBuilder} */
            const builder = connector.getSchemaBuilder();

            // drop tables considering relations (1) then drop base registries (0)
            setupApp.dropTables1(builder);
            setupUser.dropTables1(builder);
            //
            setupApp.dropTables0(builder);
            setupUser.dropTables0(builder);
            // create tables
            setupUser.createStructure(knex, builder);
            setupApp.createStructure(knex, builder);
            // perform queries to recreate DB structure
            await builder;

            // perform queries to insert data into created tables
            await populateWithData(trx);
            // perform queries to insert data and commit changes
            trx.commit();
        } catch (e) {
            trx.rollback();
            logger.error(`${e.toString()}`);
        }
        await connector.disconnect();
    }

    // COMPOSE RESULT
    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});
    const result = new DCommand();
    result.ns = DEF.BACK_REALM;
    result.name = 'db-reset';
    result.desc = 'Reset database structures and initialize test data.';
    result.action = action;
    return result;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
