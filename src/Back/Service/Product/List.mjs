/**
 * Service to get list of products.
 *
 * @namespace Fl32_Ap_Back_Service_Product_List
 */
// MODULE'S IMPORT

// MODULE'S VARS
const NS = 'Fl32_Ap_Back_Service_Product_List';

/**
 * @implements TeqFw_Http2_Api_Back_Service_Factory
 */
class Fl32_Ap_Back_Service_Product_List {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Defaults} */
        const DEF = spec['Fl32_Ap_Defaults$']; // instance singleton
        /** @type {TeqFw_Core_App_Db_Connector} */
        const rdb = spec['TeqFw_Core_App_Db_Connector$'];  // instance singleton
        /** @type {typeof TeqFw_Http2_Plugin_Handler_Service.Result} */
        const ApiResult = spec['TeqFw_Http2_Plugin_Handler_Service#Result']; // class
        const {
            /** @type {typeof Fl32_Ap_Shared_Service_Route_Product_List.Request} */
            Request,
            /** @type {typeof Fl32_Ap_Shared_Service_Route_Product_List.Response} */
            Response
        } = spec['Fl32_Ap_Shared_Service_Route_Product_List']; // ES6 module
        /** @function {@type Fl32_Ap_Back_Store_RDb_Query_Product_Card_Attr_List.queryBuilder} */
        const qProdCardList = spec['Fl32_Ap_Back_Store_RDb_Query_Product_Card_Attr_List$']; // function singleton
        /** @function {@type Fl32_Ap_Back_Store_RDb_Query_Product_Unit_Attr_List.queryBuilder} */
        const qProdUnitList = spec['Fl32_Ap_Back_Store_RDb_Query_Product_Unit_Attr_List$']; // function singleton
        /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr} */
        const EAttr = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr#']; // class
        /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Price_List} */
        const EPriceList = spec['Fl32_Ap_Back_Store_RDb_Schema_Price_List#']; // class
        /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Price} */
        const EUnitPrice = spec['Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Price#']; // class
        /** @type {typeof Fl32_Ap_Shared_Service_Data_Product_Card} */
        const DCard = spec['Fl32_Ap_Shared_Service_Data_Product_Card#']; // class
        /** @type {typeof Fl32_Ap_Shared_Service_Data_Product_Unit} */
        const DUnit = spec['Fl32_Ap_Shared_Service_Data_Product_Unit#']; // class
        /** @type {typeof Fl32_Ap_Shared_Service_Data_Price} */
        const DPrice = spec['Fl32_Ap_Shared_Service_Data_Price#']; // class

        // DEFINE INNER FUNCTIONS

        // DEFINE INSTANCE METHODS

        this.getRoute = () => DEF.SERV_product_list;

        /**
         * Factory to create function to validate and structure incoming data.
         * @returns {function(TeqFw_Http2_Back_Server_Stream_Context): Fl32_Ap_Shared_Service_Route_Product_List.Request}
         */
        this.createInputParser = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Http2_Back_Server_Stream_Context} context
             * @returns {Fl32_Ap_Shared_Service_Route_Product_List.Request}
             * @memberOf Fl32_Ap_Back_Service_Product_List
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
             * @memberOf Fl32_Ap_Back_Service_Product_List
             */
            async function service(apiCtx) {

                // DEFINE INNER FUNCTIONS
                /**
                 * @param trx
                 * @param {string} lang
                 * @return {Promise<Object.<number, Fl32_Ap_Shared_Service_Data_Product_Card>>}
                 */
                async function selectCards(trx, lang) {
                    const result = {};
                    const query = qProdCardList({trx, lang});
                    const rs = await query;
                    for (const one of rs) {
                        const id = one[qProdCardList.A_CARD_ID];
                        if (!result[id]) {
                            const item = new DCard();
                            item.id = one[qProdCardList.A_CARD_ID];
                            item.dateCreated = new Date(one[qProdCardList.A_DATE_CREATED]);
                            item.type = one[qProdCardList.A_TYPE];
                            item.attrs = {};
                            result[id] = item;
                        }
                        const attrCode = one[qProdCardList.A_ATTR_CODE];
                        const attrType = one[qProdCardList.A_ATTR_TYPE];
                        switch (attrType) {
                            case EAttr.DATA_TYPE_TEXT:
                            case EAttr.DATA_TYPE_OPTION:
                                result[id].attrs[attrCode] = one[qProdCardList.A_VALUE_TXT_LNG]
                                    ?? one[qProdCardList.A_VALUE_TXT];
                                break;
                            case EAttr.DATA_TYPE_INTEGER:
                                result[id].attrs[attrCode] = Number.parseInt(one[qProdCardList.A_VALUE_INT]);
                                break;
                            case EAttr.DATA_TYPE_DECIMAL:
                                result[id].attrs[attrCode] = Number.parseFloat(one[qProdCardList.A_VALUE_DEC]);
                                break;
                            case EAttr.DATA_TYPE_DATETIME:
                                result[id].attrs[attrCode] = new Date(one[qProdCardList.A_VALUE_DATETIME]);
                                break;
                        }

                    }
                    return result;
                }

                /**
                 * @param trx
                 * @return {Promise<Object.<number, Fl32_Ap_Shared_Service_Data_Price>>}
                 */
                async function selectPrices(trx) {
                    // PARSE INPUT & DEFINE WORKING VARS
                    const AS_UNIT_ID = 'unitId';
                    const AS_PRICE = 'price';
                    const AS_CURRENCY = 'currency';
                    const T_PL = 'pl';
                    const T_UP = 'up';

                    // MAIN FUNCTIONALITY
                    const result = {};
                    // select from main table
                    const query = trx.from({[T_PL]: EPriceList.ENTITY});
                    query.select([
                        {[AS_CURRENCY]: `${T_PL}.${EPriceList.A_CURRENCY}`},
                    ]);
                    // join prod_unit_price
                    query.leftOuterJoin(
                        {[T_UP]: EUnitPrice.ENTITY},
                        `${T_UP}.${EUnitPrice.A_LIST_REF}`,
                        `${T_PL}.${EPriceList.A_ID}`);
                    query.select([
                        {[AS_UNIT_ID]: `${T_UP}.${EUnitPrice.A_UNIT_REF}`},
                        {[AS_PRICE]: `${T_UP}.${EUnitPrice.A_PRICE}`},
                    ]);
                    // WHERE
                    query.where(`${T_PL}.${EPriceList.A_NAME}`, DEF.DATA.PRICE.LIST.DEFAULT);
                    //
                    /** @type {Array} */
                    const rs = await query;
                    for (const one of rs) {
                        const item = new DPrice();
                        item.value = Number.parseFloat(one[AS_PRICE]);
                        item.currency = one[AS_CURRENCY];
                        result[one[AS_UNIT_ID]] = item;
                    }
                    return result;
                }

                /**
                 * @param trx
                 * @param {string} lang
                 * @return {Promise<Object.<number, Fl32_Ap_Shared_Service_Data_Product_Unit>>}
                 */
                async function selectUnits(trx, lang) {
                    const result = {};
                    const query = qProdUnitList({trx, lang});
                    const rs = await query;
                    for (const one of rs) {
                        const id = one[qProdUnitList.A_UNIT_ID];
                        if (!result[id]) {
                            const item = new DUnit();
                            item.id = one[qProdUnitList.A_UNIT_ID];
                            item.cardId = one[qProdUnitList.A_CARD_ID];
                            item.sku = one[qProdUnitList.A_SKU];
                            item.attrs = {};
                            result[id] = item;
                        }
                        const attrCode = one[qProdUnitList.A_ATTR_CODE];
                        const attrType = one[qProdUnitList.A_ATTR_TYPE];
                        switch (attrType) {
                            case EAttr.DATA_TYPE_TEXT:
                            case EAttr.DATA_TYPE_OPTION:
                                result[id].attrs[attrCode] = one[qProdUnitList.A_VALUE_TXT_LNG]
                                    ?? one[qProdUnitList.A_VALUE_TXT];
                                break;
                            case EAttr.DATA_TYPE_INTEGER:
                                result[id].attrs[attrCode] = Number.parseInt(one[qProdUnitList.A_VALUE_INT]);
                                break;
                            case EAttr.DATA_TYPE_DECIMAL:
                                result[id].attrs[attrCode] = Number.parseFloat(one[qProdUnitList.A_VALUE_DEC]);
                                break;
                            case EAttr.DATA_TYPE_DATETIME:
                                result[id].attrs[attrCode] = new Date(one[qProdUnitList.A_VALUE_DATETIME]);
                                break;
                        }

                    }
                    return result;
                }

                /**
                 * Modify 'cards', put 'units' inside.
                 *
                 * @param {Object.<number, Fl32_Ap_Shared_Service_Data_Product_Card>} cards
                 * @param {Object.<number, Fl32_Ap_Shared_Service_Data_Product_Unit>} units
                 * @param {Object.<number, Fl32_Ap_Shared_Service_Data_Price>} prices
                 * @return {Object.<number, Fl32_Ap_Shared_Service_Data_Product_Card>}
                 */
                function placeUnitsToCards(cards, units, prices) {
                    for (
                        /** @type {Fl32_Ap_Shared_Service_Data_Product_Unit} */
                        const unit of Object.values(units)
                        ) {
                        const cardId = unit.cardId;
                        const unitId = unit.id;
                        unit.price = prices[unitId];
                        if (!cards[cardId].units) cards[cardId].units = {}
                        cards[cardId].units[unitId] = unit;
                    }
                    return cards;
                }

                // MAIN FUNCTIONALITY
                const result = new ApiResult();
                const response = new Response();
                result.response = response;
                /** @type {Fl32_Ap_Shared_Service_Route_Product_List.Request} */
                const apiReq = apiCtx.request;
                // const shared = apiCtx.sharedContext;
                // don't start transaction if not required
                const trx = await rdb.startTransaction();
                try {
                    const lang = apiReq.lang;
                    const cards = await selectCards(trx, lang);
                    const units = await selectUnits(trx, lang);
                    const prices = await selectPrices(trx);
                    response.cards = placeUnitsToCards(cards, units, prices);
                    await trx.commit();
                } catch (error) {
                    await trx.rollback();
                    throw error;
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

export default Fl32_Ap_Back_Service_Product_List;