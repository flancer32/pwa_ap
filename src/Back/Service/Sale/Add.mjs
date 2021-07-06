/**
 * Service to add new sale order.
 *
 * @namespace Fl32_Ap_Back_Service_Sale_Add
 */
// MODULE'S IMPORT
import {constants as H2} from 'http2';

// MODULE'S VARS
const NS = 'Fl32_Ap_Back_Service_Sale_Add';

/**
 * @implements TeqFw_Http2_Api_Back_Service_Factory
 */
class Fl32_Ap_Back_Service_Sale_Add {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Back_Defaults} */
        const DEF = spec['Fl32_Ap_Back_Defaults$'];
        /** @type {TeqFw_Core_Back_RDb_Connector} */
        const rdb = spec['TeqFw_Core_Back_RDb_Connector$'];
        const {isPostgres} = spec['TeqFw_Core_Back_Util_RDb']; // ES6 destruct
        /** @type {typeof TeqFw_Http2_Plugin_Handler_Service.Result} */
        const ApiResult = spec['TeqFw_Http2_Plugin_Handler_Service#Result'];
        const {
            /** @type {typeof Fl32_Ap_Shared_Service_Route_Sale_Add.Request} */
            Request,
            /** @type {typeof Fl32_Ap_Shared_Service_Route_Sale_Add.Response} */
            Response
        } = spec['Fl32_Ap_Shared_Service_Route_Sale_Add']; // ES6 module
        /** @type {Fl32_Ap_Shared_Service_Dto_Sale.Factory} */
        const fSale = spec['Fl32_Ap_Shared_Service_Dto_Sale#Factory$'];
        /** @type {Fl32_Ap_Shared_Service_Dto_Sale_Item.Factory} */
        const fSaleItem = spec['Fl32_Ap_Shared_Service_Dto_Sale_Item#Factory$'];
        /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Sale} */
        const ESale = spec['Fl32_Ap_Back_Store_RDb_Schema_Sale#'];
        /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Sale_Item} */
        const ESaleItem = spec['Fl32_Ap_Back_Store_RDb_Schema_Sale_Item#'];

        // DEFINE INNER FUNCTIONS

        // DEFINE INSTANCE METHODS

        this.getRoute = () => DEF.SERV_sale_add;

        /**
         * Factory to create function to validate and structure incoming data.
         * @returns {function(TeqFw_Http2_Back_Server_Stream_Context): Fl32_Ap_Shared_Service_Route_Sale_Add.Request}
         */
        this.createInputParser = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Http2_Back_Server_Stream_Context} context
             * @returns {Fl32_Ap_Shared_Service_Route_Sale_Add.Request}
             * @memberOf Fl32_Ap_Back_Service_Sale_Add
             */
            function parse(context) {
                const body = JSON.parse(context.body);
                // clone HTTP body into API request object and cast nested objects
                /** @type {Fl32_Ap_Shared_Service_Route_Sale_Add.Request} */
                const result = Object.assign(new Request(), body.data);
                result.sale = fSale.create(result.sale);
                result.sale.dateCreated = (result.sale.dateCreated)
                    ? new Date(result.sale.dateCreated)
                    : new Date();
                result.sale.dateReceiving = new Date(result.sale.dateReceiving);
                const items = [];
                if (Array.isArray(result.sale.items)) {
                    for (const one of result.sale.items) {
                        const item = fSaleItem.create(one);
                        items.push(item);
                    }
                } else {
                    result.sale.items = items;
                }
                return result;
            }

            // COMPOSE RESULT
            Object.defineProperty(parse, 'name', {value: `${NS}.${parse.name}`});
            return parse;
        };

        /**
         * Factory to create service (handler to process HTTP API request).
         * @returns {function(TeqFw_Http2_Plugin_Handler_Service.Context): TeqFw_Http2_Plugin_Handler_Service.Result}
         */
        this.createService = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Http2_Plugin_Handler_Service.Context} apiCtx
             * @returns {Promise<TeqFw_Http2_Plugin_Handler_Service.Result>}
             * @memberOf Fl32_Ap_Back_Service_Sale_Add
             */
            async function service(apiCtx) {
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
                const result = new ApiResult();
                const response = new Response();
                result.response = response;
                /** @type {Fl32_Ap_Shared_Service_Route_Sale_Add.Request} */
                const apiReq = apiCtx.request;
                const shared = apiCtx.sharedContext;
                /** @type {Fl32_Ap_User_Shared_Service_Data_User} */
                const user = shared[DEF.MOD_USER.HTTP_SHARED_CTX_USER];
                if (user) {
                    // don't start transaction if not required
                    const trx = await rdb.startTransaction();
                    try {
                        const sale = apiReq.sale;
                        sale.userId = user.id;
                        sale.state = ESale.DATA_STATE_NEW;
                        const isPg = isPostgres(trx.client);
                        const saleId = await insertSale(trx, sale, isPg);
                        for (const item of sale.items) {
                            item.saleId = saleId;
                            await insertSaleItem(trx, item, isPg);
                        }
                        response.success = true;
                        await trx.commit();
                    } catch (error) {
                        await trx.rollback();
                        throw error;
                    }
                } else {
                    result.headers[H2.HTTP2_HEADER_STATUS] = H2.HTTP_STATUS_UNAUTHORIZED;
                }
                return result;
            }

            // COMPOSE RESULT
            Object.defineProperty(service, 'name', {value: `${NS}.${service.name}`});
            return service;
        };
    }

    // DEFINE PROTO METHODS
}

export default Fl32_Ap_Back_Service_Sale_Add;
