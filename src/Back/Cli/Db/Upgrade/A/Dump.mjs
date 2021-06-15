/**
 * Action to dump all DB data.
 *
 * @namespace Fl32_Ap_Back_Cli_Db_Upgrade_A_Dump
 */
// DEFINE WORKING VARS
const NS = 'Fl32_Ap_Back_Cli_Db_Upgrade_A_Dump';

// DEFINE MODULE'S FUNCTIONS
/**
 * Factory to setup execution context and to create the action.
 *
 * @param {TeqFw_Di_SpecProxy} spec
 * @constructor
 * @memberOf Fl32_Ap_Back_Cli_Db_Upgrade_A_Dump
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {TeqFw_Core_App_Db_Connector} */
    const connector = spec['TeqFw_Core_App_Db_Connector$']; // instance singleton
    /** @type {TeqFw_Core_App_Logger} */
    const logger = spec['TeqFw_Core_App_Logger$'];  // instance singleton
    /** @type {Function|TeqFw_Core_App_Back_Util_RDb.serialsGet} */
    const serialsGet = spec['TeqFw_Core_App_Back_Util_RDb#serialsGet']; // function
    /** @type {Function|TeqFw_Core_App_Back_Util_RDb.getTables} */
    const getTables = spec['TeqFw_Core_App_Back_Util_RDb#getTables']; // function
    /** @type {Function|TeqFw_Core_App_Back_Util_RDb.isPostgres} */
    const isPostgres = spec['TeqFw_Core_App_Back_Util_RDb#isPostgres']; // function
    /** @type {Function|TeqFw_Core_App_Back_Util_RDb.itemsSelect} */
    const itemsSelect = spec['TeqFw_Core_App_Back_Util_RDb#itemsSelect']; // function
    // APP Entities
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr} */
    const EAttr = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr#']; // class
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value} */
    const EAttrVal = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value#']; // class
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Datetime} */
    const EAttrValDatetime = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Datetime#']; // class
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Dec} */
    const EAttrValDec = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Dec#']; // class
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Int} */
    const EAttrValInt = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Int#']; // class
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Text} */
    const EAttrValText = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Text#']; // class
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Text_I18n} */
    const EAttrValTextI18n = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Text_I18n#']; // class
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Price_List} */
    const EPriceList = spec['Fl32_Ap_Back_Store_RDb_Schema_Price_List#']; // class
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Product_Card} */
    const EProdCard = spec['Fl32_Ap_Back_Store_RDb_Schema_Product_Card#']; // class
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Product_Card_Attr_Value} */
    const EProdCardAttrVal = spec['Fl32_Ap_Back_Store_RDb_Schema_Product_Card_Attr_Value#']; // class
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Product_Unit} */
    const EProdUnit = spec['Fl32_Ap_Back_Store_RDb_Schema_Product_Unit#']; // class
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Attr_Value} */
    const EProdUnitAttrVal = spec['Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Attr_Value#']; // class
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Price} */
    const EProdUnitPrice = spec['Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Price#']; // class
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Sale} */
    const ESale = spec['Fl32_Ap_Back_Store_RDb_Schema_Sale#']; // class
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Sale_Item} */
    const ESaleItem = spec['Fl32_Ap_Back_Store_RDb_Schema_Sale_Item#']; // class
    // USER entities
    /** @type {typeof Fl32_Ap_User_Back_Store_RDb_Schema_Id_Email} */
    const EUserIdEmail = spec['Fl32_Ap_User_Back_Store_RDb_Schema_Id_Email#']; // class
    /** @type {typeof Fl32_Ap_User_Back_Store_RDb_Schema_Id_Phone} */
    const EUserIdPhone = spec['Fl32_Ap_User_Back_Store_RDb_Schema_Id_Phone#']; // class
    /** @type {typeof Fl32_Ap_User_Back_Store_RDb_Schema_Session} */
    const EUserSession = spec['Fl32_Ap_User_Back_Store_RDb_Schema_Session#']; // class
    /** @type {typeof Fl32_Ap_User_Back_Store_RDb_Schema_Signin} */
    const EUserSignin = spec['Fl32_Ap_User_Back_Store_RDb_Schema_Signin#']; // class
    /** @type {typeof Fl32_Ap_User_Back_Store_RDb_Schema_Signup} */
    const EUserSignup = spec['Fl32_Ap_User_Back_Store_RDb_Schema_Signup#']; // class
    /** @type {typeof Fl32_Ap_User_Back_Store_RDb_Schema_Tree} */
    const EUserTree = spec['Fl32_Ap_User_Back_Store_RDb_Schema_Tree#']; // class
    /** @type {typeof Fl32_Ap_User_Back_Store_RDb_Schema_User} */
    const EUser = spec['Fl32_Ap_User_Back_Store_RDb_Schema_User#']; // class

    // DEFINE INNER FUNCTIONS
    /**
     * Action to dump all DB data.
     * @returns {Promise<null|Object>}
     * @memberOf Fl32_Ap_Back_Cli_Db_Upgrade_A_Dump
     */
    async function action() {
        const trx = await connector.startTransaction();
        try {
            const result = {};
            const tables = await getTables(trx);
            // app data
            result[EAttr.ENTITY] = await itemsSelect(trx, tables, EAttr.ENTITY);
            result[EAttrVal.ENTITY] = await itemsSelect(trx, tables, EAttrVal.ENTITY);
            result[EAttrValDatetime.ENTITY] = await itemsSelect(trx, tables, EAttrValDatetime.ENTITY);
            result[EAttrValDec.ENTITY] = await itemsSelect(trx, tables, EAttrValDec.ENTITY);
            result[EAttrValInt.ENTITY] = await itemsSelect(trx, tables, EAttrValInt.ENTITY);
            result[EAttrValText.ENTITY] = await itemsSelect(trx, tables, EAttrValText.ENTITY);
            result[EAttrValTextI18n.ENTITY] = await itemsSelect(trx, tables, EAttrValTextI18n.ENTITY);
            result[EPriceList.ENTITY] = await itemsSelect(trx, tables, EPriceList.ENTITY);
            result[EProdCard.ENTITY] = await itemsSelect(trx, tables, EProdCard.ENTITY);
            result[EProdCardAttrVal.ENTITY] = await itemsSelect(trx, tables, EProdCardAttrVal.ENTITY);
            result[EProdUnit.ENTITY] = await itemsSelect(trx, tables, EProdUnit.ENTITY);
            result[EProdUnitAttrVal.ENTITY] = await itemsSelect(trx, tables, EProdUnitAttrVal.ENTITY);
            result[EProdUnitPrice.ENTITY] = await itemsSelect(trx, tables, EProdUnitPrice.ENTITY);
            result[ESale.ENTITY] = await itemsSelect(trx, tables, ESale.ENTITY);
            result[ESaleItem.ENTITY] = await itemsSelect(trx, tables, ESaleItem.ENTITY);
            // user data
            result[EUserIdEmail.ENTITY] = await itemsSelect(trx, tables, EUserIdEmail.ENTITY);
            result[EUserIdPhone.ENTITY] = await itemsSelect(trx, tables, EUserIdPhone.ENTITY);
            result[EUserSession.ENTITY] = await itemsSelect(trx, tables, EUserSession.ENTITY);
            result[EUserSignin.ENTITY] = await itemsSelect(trx, tables, EUserSignin.ENTITY);
            result[EUserSignup.ENTITY] = await itemsSelect(trx, tables, EUserSignup.ENTITY);
            result[EUserTree.ENTITY] = await itemsSelect(trx, tables, EUserTree.ENTITY);
            result[EUser.ENTITY] = await itemsSelect(trx, tables, EUser.ENTITY);
            // serials for Postgres
            const isPg = isPostgres(trx.client);
            if (!isPg) {
                const knex = await connector.getKnex();
                const schema = knex.schema;
                const serials = [
                    `${EAttr.ENTITY}_id_seq`,
                    `${EAttrVal.ENTITY}_id_seq`,
                    `${EPriceList.ENTITY}_id_seq`,
                    `${EProdCard.ENTITY}_id_seq`,
                    `${ESale.ENTITY}_id_seq`,
                    `${ESaleItem.ENTITY}_id_seq`,
                    `${EUser.ENTITY}_id_seq`,
                ];
                result.serials = await serialsGet(schema, serials);
            }
            // perform queries to insert data and commit changes
            trx.commit();
            logger.info('All data is dumped.');
            return result;
        } catch (e) {
            trx.rollback();
            logger.error(`${e.toString()}`);
            return null;
        }
    }

    // MAIN FUNCTIONALITY
    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});

    // COMPOSE RESULT
    return action;
}


// MODULE'S FUNCTIONALITY
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

// MODULE'S EXPORT
export default Factory;