/**
 * Action to restore all DB data from dump.
 *
 * @namespace Fl32_Ap_Back_Cli_Db_Upgrade_A_Restore
 */
// DEFINE WORKING VARS
const NS = 'Fl32_Ap_Back_Cli_Db_Upgrade_A_Restore';

// DEFINE MODULE'S FUNCTIONS
/**
 * Factory to setup execution context and to create the action.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @constructor
 * @memberOf Fl32_Ap_Back_Cli_Db_Upgrade_A_Restore
 */
function Factory(spec) {
    // PARSE INPUT & DEFINE WORKING VARS
    /** @type {TeqFw_Db_Back_Api_IConnect} */
    const connector = spec['TeqFw_Db_Back_Api_IConnect$'];
    /** @type {TeqFw_Core_Shared_Logger} */
    const logger = spec['TeqFw_Core_Shared_Logger$'];
    /** @type {Function|TeqFw_Db_Back_Util.serialsSet} */
    const serialsSet = spec['TeqFw_Db_Back_Util#serialsSet']; // function
    /** @type {Function|TeqFw_Db_Back_Util.isPostgres} */
    const isPostgres = spec['TeqFw_Db_Back_Util#isPostgres']; // function
    /** @type {Function|TeqFw_Db_Back_Util.itemsInsert} */
    const itemsInsert = spec['TeqFw_Db_Back_Util#itemsInsert']; // function
    // APP Entities
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr} */
    const EAttr = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value} */
    const EAttrVal = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Datetime} */
    const EAttrValDatetime = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Datetime#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Dec} */
    const EAttrValDec = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Dec#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Int} */
    const EAttrValInt = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Int#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Text} */
    const EAttrValText = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Text#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Text_I18n} */
    const EAttrValTextI18n = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Text_I18n#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Price_List} */
    const EPriceList = spec['Fl32_Ap_Back_Store_RDb_Schema_Price_List#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Product_Card} */
    const EProdCard = spec['Fl32_Ap_Back_Store_RDb_Schema_Product_Card#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Product_Card_Attr_Value} */
    const EProdCardAttrVal = spec['Fl32_Ap_Back_Store_RDb_Schema_Product_Card_Attr_Value#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Product_Unit} */
    const EProdUnit = spec['Fl32_Ap_Back_Store_RDb_Schema_Product_Unit#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Attr_Value} */
    const EProdUnitAttrVal = spec['Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Attr_Value#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Price} */
    const EProdUnitPrice = spec['Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Price#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Sale} */
    const ESale = spec['Fl32_Ap_Back_Store_RDb_Schema_Sale#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Sale_Item} */
    const ESaleItem = spec['Fl32_Ap_Back_Store_RDb_Schema_Sale_Item#'];
    // USER entities
    /** @type {typeof Fl32_Ap_User_Back_Store_RDb_Schema_Id_Email} */
    const EUserIdEmail = spec['Fl32_Ap_User_Back_Store_RDb_Schema_Id_Email#'];
    /** @type {typeof Fl32_Ap_User_Back_Store_RDb_Schema_Id_Phone} */
    const EUserIdPhone = spec['Fl32_Ap_User_Back_Store_RDb_Schema_Id_Phone#'];
    /** @type {typeof Fl32_Ap_User_Back_Store_RDb_Schema_Session} */
    const EUserSession = spec['Fl32_Ap_User_Back_Store_RDb_Schema_Session#'];
    /** @type {typeof Fl32_Ap_User_Back_Store_RDb_Schema_Signin} */
    const EUserSignin = spec['Fl32_Ap_User_Back_Store_RDb_Schema_Signin#'];
    /** @type {typeof Fl32_Ap_User_Back_Store_RDb_Schema_Signup} */
    const EUserSignup = spec['Fl32_Ap_User_Back_Store_RDb_Schema_Signup#'];
    /** @type {typeof Fl32_Ap_User_Back_Store_RDb_Schema_Tree} */
    const EUserTree = spec['Fl32_Ap_User_Back_Store_RDb_Schema_Tree#'];
    /** @type {typeof Fl32_Ap_User_Back_Store_RDb_Schema_User} */
    const EUser = spec['Fl32_Ap_User_Back_Store_RDb_Schema_User#'];


    // DEFINE INNER FUNCTIONS
    /**
     * Action to restore all DB data from dump.
     * @param {Object} dump
     * @returns {Promise<void>}
     * @memberOf Fl32_Ap_Back_Cli_Db_Upgrade_A_Restore
     */
    async function action(dump) {
        const trx = await connector.startTransaction();
        try {
            // user
            await itemsInsert(trx, dump, EUser.ENTITY);
            await itemsInsert(trx, dump, EUserIdEmail.ENTITY);
            await itemsInsert(trx, dump, EUserIdPhone.ENTITY);
            await itemsInsert(trx, dump, EUserSession.ENTITY);
            await itemsInsert(trx, dump, EUserSignin.ENTITY);
            await itemsInsert(trx, dump, EUserSignup.ENTITY);
            await itemsInsert(trx, dump, EUserTree.ENTITY);

            // app
            await itemsInsert(trx, dump, EAttr.ENTITY);
            await itemsInsert(trx, dump, EProdCard.ENTITY);
            await itemsInsert(trx, dump, ESale.ENTITY);
            await itemsInsert(trx, dump, EAttrVal.ENTITY);
            await itemsInsert(trx, dump, EPriceList.ENTITY);
            await itemsInsert(trx, dump, EProdUnit.ENTITY);
            await itemsInsert(trx, dump, EProdUnitPrice.ENTITY);
            await itemsInsert(trx, dump, ESaleItem.ENTITY);
            await itemsInsert(trx, dump, EProdUnitAttrVal.ENTITY);
            await itemsInsert(trx, dump, EProdCardAttrVal.ENTITY);
            await itemsInsert(trx, dump, EAttrValText.ENTITY);
            await itemsInsert(trx, dump, EAttrValDatetime.ENTITY);
            await itemsInsert(trx, dump, EAttrValDec.ENTITY);
            await itemsInsert(trx, dump, EAttrValInt.ENTITY);
            await itemsInsert(trx, dump, EAttrValTextI18n.ENTITY);

            // serials for Postgres
            const isPg = isPostgres(trx.client);
            if (isPg && dump.serials) {
                const knex = await connector.getKnex();
                const schema = knex.schema;
                await serialsSet(schema, dump.serials);
            }
            trx.commit();
            logger.info('Data is restored from the dump.');
        } catch (e) {
            trx.rollback();
            logger.error(`${e.toString()}`);
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
