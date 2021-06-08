/**
 * Service to get list of sale orders.
 *
 * @namespace Fl32_Ap_Back_Service_Sale_List
 */
// MODULE'S IMPORT
import {constants as H2} from 'http2';

// MODULE'S VARS
const NS = 'Fl32_Ap_Back_Service_Sale_List';

/**
 * @implements TeqFw_Http2_Api_Back_Service_Factory
 */
class Fl32_Ap_Back_Service_Sale_List {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Defaults} */
        const DEF = spec['Fl32_Ap_Defaults$']; // instance singleton
        /** @type {TeqFw_Core_App_Db_Connector} */
        const rdb = spec['TeqFw_Core_App_Db_Connector$'];  // instance singleton
        /** @type {typeof TeqFw_Http2_Plugin_Handler_Service.Result} */
        const ApiResult = spec['TeqFw_Http2_Plugin_Handler_Service#Result']; // class
        const {
            /** @type {typeof Fl32_Ap_Shared_Service_Route_Sale_List.Request} */
            Request,
            /** @type {typeof Fl32_Ap_Shared_Service_Route_Sale_List.Response} */
            Response
        } = spec['Fl32_Ap_Shared_Service_Route_Sale_List']; // ES6 module
        /** @type {Fl32_Ap_Back_Store_RDb_Query_Sale_List} */
        const qbSaleList = spec['Fl32_Ap_Back_Store_RDb_Query_Sale_List$']; // instance singleton
        /** @type {Fl32_Ap_Back_Store_RDb_Query_Sale_Item_List} */
        const qbSaleItemList = spec['Fl32_Ap_Back_Store_RDb_Query_Sale_Item_List$']; // instance singleton
        /** @type {Fl32_Ap_Shared_Service_Dto_Sale.Factory} */
        const fSale = spec['Fl32_Ap_Shared_Service_Dto_Sale#Factory$']; // instance singleton
        /** @type {Fl32_Ap_Shared_Service_Dto_Sale_Item.Factory} */
        const fSaleItem = spec['Fl32_Ap_Shared_Service_Dto_Sale_Item#Factory$']; // instance singleton

        // DEFINE INSTANCE METHODS

        this.getRoute = () => DEF.SERV_sale_list;

        /**
         * Factory to create function to validate and structure incoming data.
         * @returns {function(TeqFw_Http2_Back_Server_Stream_Context): Fl32_Ap_Shared_Service_Route_Sale_List.Request}
         */
        this.createInputParser = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Http2_Back_Server_Stream_Context} context
             * @returns {Fl32_Ap_Shared_Service_Route_Sale_List.Request}
             * @memberOf Fl32_Ap_Back_Service_Sale_List
             */
            function parse(context) {
                const body = JSON.parse(context.body);
                return Object.assign(new Request(), body.data);
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
             * @memberOf Fl32_Ap_Back_Service_Sale_List
             */
            async function service(apiCtx) {
                // DEFINE INNER FUNCTIONS

                async function selectItems(trx) {
                    const registry = {};
                    // select sales data and compose DTO for response
                    const querySale = qbSaleList.build({trx});
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
                const result = new ApiResult();
                const response = new Response();
                result.response = response;
                /** @type {Fl32_Ap_Shared_Service_Route_Sale_List.Request} */
                    // const apiReq = apiCtx.request;
                const shared = apiCtx.sharedContext;
                /** @type {Fl32_Ap_User_Shared_Service_Data_User} */
                const user = shared[DEF.MOD_USER.HTTP_SHARED_CTX_USER];
                if (user) {
                    // don't start transaction if not required
                    const trx = await rdb.startTransaction();
                    try {
                        response.items = await selectItems(trx);
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

export default Fl32_Ap_Back_Service_Sale_List;
