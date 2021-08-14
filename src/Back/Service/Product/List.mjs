/**
 * Get list of products.
 *
 * @namespace Fl32_Ap_Back_Service_Product_List
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Back_Service_Product_List';

/**
 * @implements TeqFw_Web_Back_Api_Service_IFactory
 */
export default class Fl32_Ap_Back_Service_Product_List {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_Back_Defaults} */
        const DEF = spec['Fl32_Ap_Back_Defaults$'];
        /** @type {TeqFw_Db_Back_RDb_Connect} */
        const rdb = spec['TeqFw_Db_Back_RDb_Connect$'];
        /** @type {Fl32_Ap_Shared_Service_Route_Product_List.Factory} */
        const route = spec['Fl32_Ap_Shared_Service_Route_Product_List#Factory$'];
        /** @type {Function|Fl32_Ap_Back_Store_RDb_Query_Product_Card_Attr_List.queryBuilder} */
        const qProdCardList = spec['Fl32_Ap_Back_Store_RDb_Query_Product_Card_Attr_List$'];
        /** @type {Function|Fl32_Ap_Back_Store_RDb_Query_Product_Unit_Attr_List.queryBuilder} */
        const qProdUnitList = spec['Fl32_Ap_Back_Store_RDb_Query_Product_Unit_Attr_List$'];
        /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr} */
        const EAttr = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr#'];
        /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Price_List} */
        const EPriceList = spec['Fl32_Ap_Back_Store_RDb_Schema_Price_List#'];
        /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Price} */
        const EUnitPrice = spec['Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Price#'];
        /** @type {Fl32_Ap_Shared_Service_Dto_Product_Card.Factory} */
        const fCard = spec['Fl32_Ap_Shared_Service_Dto_Product_Card#Factory$'];
        /** @type {Fl32_Ap_Shared_Service_Dto_Product_Unit.Factory} */
        const fUnit = spec['Fl32_Ap_Shared_Service_Dto_Product_Unit#Factory$'];
        /** @type {Fl32_Ap_Shared_Service_Dto_Price.Factory} */
        const fPrice = spec['Fl32_Ap_Shared_Service_Dto_Price#Factory$'];

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
                 * @param {string} lang
                 * @return {Promise<Object<number, Fl32_Ap_Shared_Service_Dto_Product_Card>>}
                 */
                async function selectCards(trx, lang) {
                    const result = {};
                    const query = qProdCardList({trx, lang});
                    const rs = await query;
                    for (const one of rs) {
                        const id = one[qProdCardList.A_CARD_ID];
                        if (!result[id]) {
                            const item = fCard.create();
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
                 * @return {Promise<Object<number, Fl32_Ap_Shared_Service_Dto_Price>>}
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
                    query.where(`${T_PL}.${EPriceList.A_NAME}`, DEF.DATA_PRICE_LIST_DEFAULT);
                    //
                    /** @type {Array} */
                    const rs = await query;
                    for (const one of rs) {
                        const item = fPrice.create();
                        item.value = Number.parseFloat(one[AS_PRICE]);
                        item.currency = one[AS_CURRENCY];
                        result[one[AS_UNIT_ID]] = item;
                    }
                    return result;
                }

                /**
                 * @param trx
                 * @param {string} lang
                 * @return {Promise<Object<number, Fl32_Ap_Shared_Service_Dto_Product_Unit>>}
                 */
                async function selectUnits(trx, lang) {
                    const result = {};
                    const query = qProdUnitList({trx, lang});
                    const rs = await query;
                    for (const one of rs) {
                        const id = one[qProdUnitList.A_UNIT_ID];
                        if (!result[id]) {
                            const item = fUnit.create();
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
                 * @param {Object<number, Fl32_Ap_Shared_Service_Dto_Product_Card>} cards
                 * @param {Object<number, Fl32_Ap_Shared_Service_Dto_Product_Unit>} units
                 * @param {Object<number, Fl32_Ap_Shared_Service_Dto_Price>} prices
                 * @return {Fl32_Ap_Shared_Service_Dto_Product_Card[]}
                 */
                function placeUnitsToCards(cards, units, prices) {
                    for (
                        /** @type {Fl32_Ap_Shared_Service_Dto_Product_Unit} */
                        const unit of Object.values(units)
                        ) {
                        const cardId = unit.cardId;
                        const unitId = unit.id;
                        unit.price = prices[unitId];
                        if (!cards[cardId].units) cards[cardId].units = [];
                        cards[cardId].units.push(unit);
                    }
                    return Object.values(cards);
                }

                // MAIN FUNCTIONALITY
                /** @type {Fl32_Ap_Shared_Service_Route_Product_List.Request} */
                const req = context.getInData();
                /** @type {Fl32_Ap_Shared_Service_Route_Product_List.Response} */
                const res = context.getOutData();
                // const shared = context.getHandlersShare();
                //
                const trx = await rdb.startTransaction();
                try {
                    const lang = req.lang;
                    const cards = await selectCards(trx, lang);
                    const units = await selectUnits(trx, lang);
                    const prices = await selectPrices(trx);
                    res.cards = placeUnitsToCards(cards, units, prices);
                    await trx.commit();
                } catch (error) {
                    await trx.rollback();
                    throw error;
                }
            }

            // MAIN FUNCTIONALITY
            Object.defineProperty(service, 'name', {value: `${NS}.${service.name}`});
            return service;
        }
    }
}
