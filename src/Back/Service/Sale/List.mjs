/**
 * Get list of sale orders.
 *
 * @namespace Fl32_Ap_Back_Service_Sale_List
 */
// MODULE'S IMPORT
import {constants as H2} from 'http2';

// MODULE'S VARS
const NS = 'Fl32_Ap_Back_Service_Sale_List';

/**
 * @implements TeqFw_Web_Back_Api_Service_IFactory
 */
export default class Fl32_Ap_Back_Service_Sale_List {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Back_Defaults} */
        const DEF = spec['Fl32_Ap_Back_Defaults$'];
        /** @type {TeqFw_Db_Back_RDb_Connect} */
        const rdb = spec['TeqFw_Db_Back_RDb_Connect$'];
        /** @type {Fl32_Ap_Shared_Service_Route_Sale_List.Factory} */
        const route = spec['Fl32_Ap_Shared_Service_Route_Sale_List#Factory$'];
        /** @type {Fl32_Ap_Back_Store_RDb_Query_Sale_List} */
        const qbSaleList = spec['Fl32_Ap_Back_Store_RDb_Query_Sale_List$'];
        /** @type {Fl32_Ap_Back_Store_RDb_Query_Sale_Item_List} */
        const qbSaleItemList = spec['Fl32_Ap_Back_Store_RDb_Query_Sale_Item_List$'];
        /** @type {Fl32_Ap_Shared_Service_Dto_Sale.Factory} */
        const fSale = spec['Fl32_Ap_Shared_Service_Dto_Sale#Factory$'];
        /** @type {Fl32_Ap_Shared_Service_Dto_Sale_Item.Factory} */
        const fSaleItem = spec['Fl32_Ap_Shared_Service_Dto_Sale_Item#Factory$'];
        /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Sale} */
        const ESale = spec['Fl32_Ap_Back_Store_RDb_Schema_Sale#'];

        // DEFINE INSTANCE METHODS

        this.getRouteFactory = () => route;

        this.getService = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Web_Back_Api_Service_Context} context
             * @return Promise<void>
             */
            async function service(context) {
                // DEFINE INNER FUNCTIONS

                /**
                 * @param trx
                 * @param {number} userId
                 * @param {boolean} isAdmin
                 * @return {Promise<Fl32_Ap_Shared_Service_Dto_Sale[]>}
                 */
                async function selectItems(trx, userId, isAdmin = false) {
                    const registry = {};
                    // select sales data and compose DTO for response
                    const querySale = qbSaleList.build({trx});
                    if (!isAdmin) {
                        querySale.where(`${qbSaleList.T_S}.${ESale.A_USER_REF}`, userId);
                    }
                    const rsSales = await querySale;
                    for (const one of rsSales) {
                        const sale = fSale.create();
                        sale.amountTotal = one[qbSaleList.A_AMOUNT_TOTAL];
                        sale.currency = one[qbSaleList.A_CURRENCY];
                        sale.dateCreated = new Date(one[qbSaleList.A_DATE_CREATED]);
                        sale.dateReceiving = new Date(one[qbSaleList.A_DATE_RECEIVING]);
                        sale.id = one[qbSaleList.A_SALE_ID];
                        sale.items = [];
                        sale.state = one[qbSaleList.A_STATE];
                        sale.userId = one[qbSaleList.A_USER_ID];
                        registry[sale.id] = sale;
                    }
                    // select sales items data and put it into DTO for response
                    const queryItem = qbSaleItemList.build({trx});
                    if (!isAdmin) {
                        queryItem.where(`${qbSaleItemList.T_S}.${ESale.A_USER_REF}`, userId);
                    }
                    const rsItems = await queryItem;
                    for (const one of rsItems) {
                        const item = fSaleItem.create();
                        item.amountTotal = one[qbSaleItemList.A_AMOUNT_TOTAL];
                        item.id = one[qbSaleItemList.A_ITEM_ID];
                        item.qty = one[qbSaleItemList.A_QTY];
                        item.saleId = one[qbSaleItemList.A_SALE_ID];
                        item.unitId = one[qbSaleItemList.A_UNIT_ID];
                        item.unitPrice = one[qbSaleItemList.A_UNIT_PRICE];
                        registry[item.saleId].items.push(item);
                    }
                    // COMPOSE RESULT
                    return Object.values(registry);
                }

                // MAIN FUNCTIONALITY
                /** @type {Fl32_Ap_Shared_Service_Route_Sale_List.Request} */
                // const req = context.getInData();
                /** @type {Fl32_Ap_Shared_Service_Route_Sale_List.Response} */
                const res = context.getOutData();
                const shared = context.getHandlersShare();
                //
                const user = shared[DEF.MOD_USER.HTTP_SHARE_CTX_USER];
                if (user) {
                    // don't start transaction if not required
                    const trx = await rdb.startTransaction();
                    try {
                        res.items = await selectItems(trx, user.id, user.isAdmin);
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
