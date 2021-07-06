/**
 * Add new sale order.
 *
 * @namespace Fl32_Ap_Back_Service_Sale_Add
 */
// MODULE'S IMPORT
import {constants as H2} from 'http2';

// MODULE'S VARS
const NS = 'Fl32_Ap_Back_Service_Sale_Add';

/**
 * @implements TeqFw_Web_Back_Api_Service_IFactory
 */
export default class Fl32_Ap_Back_Service_Sale_Add {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Back_Defaults} */
        const DEF = spec['Fl32_Ap_Back_Defaults$'];
        /** @type {TeqFw_Core_Back_RDb_Connector} */
        const rdb = spec['TeqFw_Core_Back_RDb_Connector$'];
        const {isPostgres} = spec['TeqFw_Core_Back_Util_RDb'];
        /** @type {Fl32_Ap_Shared_Service_Route_Sale_Add.Factory} */
        const route = spec['Fl32_Ap_Shared_Service_Route_Sale_Add#Factory$'];
        /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Sale} */
        const ESale = spec['Fl32_Ap_Back_Store_RDb_Schema_Sale#'];
        /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Sale_Item} */
        const ESaleItem = spec['Fl32_Ap_Back_Store_RDb_Schema_Sale_Item#'];

        // DEFINE INSTANCE METHODS

        this.getRouteFactory = () => route;

        this.getService = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Web_Back_Api_Service_IContext} context
             * @return Promise<void>
             */
            async function service(context) {
                // DEFINE INNER FUNCTIONS

                /**
                 * @param trx
                 * @param {Fl32_Ap_Shared_Service_Dto_Sale} sale
                 * @param {boolean} isPg
                 * @return {Promise<number>}
                 */
                async function insertSale(trx, sale, isPg) {
                    const query = trx(ESale.ENTITY)
                        .insert({
                            [ESale.A_AMOUNT_TOTAL]: sale.amountTotal,
                            [ESale.A_CURRENCY]: sale.currency,
                            [ESale.A_DATE_CREATED]: sale.dateCreated,
                            [ESale.A_DATE_RECEIVING]: sale.dateReceiving,
                            [ESale.A_STATE]: sale.state,
                            [ESale.A_USER_REF]: sale.userId,
                        });
                    if (isPg) query.returning(ESale.A_ID);
                    const rs = await query;
                    const [result] = rs;
                    return result;
                }

                /**
                 * @param trx
                 * @param {Fl32_Ap_Shared_Service_Dto_Sale_Item} item
                 * @param {boolean} isPg
                 * @return {Promise<number>}
                 */
                async function insertSaleItem(trx, item, isPg) {
                    const query = trx(ESaleItem.ENTITY)
                        .insert({
                            [ESaleItem.A_AMOUNT_TOTAL]: item.amountTotal,
                            [ESaleItem.A_QTY]: item.qty,
                            [ESaleItem.A_SALE_REF]: item.saleId,
                            [ESaleItem.A_UNIT_REF]: item.unitId,
                            [ESaleItem.A_UNIT_PRICE]: item.unitPrice,
                        });
                    if (isPg) query.returning(ESaleItem.A_ID);
                    const rs = await query;
                    const [result] = rs;
                    return result;
                }

                // MAIN FUNCTIONALITY
                /** @type {Fl32_Ap_Shared_Service_Route_Sale_Add.Request} */
                const req = context.getInData();
                /** @type {Fl32_Ap_Shared_Service_Route_Sale_Add.Response} */
                const res = context.getOutData();
                const shared = context.getHandlersShare();
                //
                /** @type {Fl32_Ap_User_Shared_Service_Data_User} */
                const user = shared[DEF.MOD_USER.HTTP_SHARE_CTX_USER];
                if (user) {
                    // don't start transaction if not required
                    const trx = await rdb.startTransaction();
                    try {
                        const sale = req.sale;
                        sale.userId = user.id;
                        sale.state = ESale.DATA_STATE_NEW;
                        const isPg = isPostgres(trx.client);
                        const saleId = await insertSale(trx, sale, isPg);
                        for (const item of sale.items) {
                            item.saleId = saleId;
                            await insertSaleItem(trx, item, isPg);
                        }
                        res.success = true;
                        await trx.commit();
                    } catch (error) {
                        await trx.rollback();
                        throw error;
                    }
                } else {
                    context.setOutHeader(DEF.MOD_WEB.HTTP.HEADER.STATUS, H2.HTTP_STATUS_UNAUTHORIZED);
                }
            }

            // MAIN FUNCTIONALITY
            Object.defineProperty(service, 'name', {value: `${NS}.${service.name}`});
            return service;
        }
    }
}
