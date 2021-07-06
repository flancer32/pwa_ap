/**
 * Functions to generate test data for products.
 *
 * @namespace Fl32_Ap_Back_Cli_Db_Reset_A_Prods
 */
// DEFINE WORKING VARS
const NS = 'Fl32_Ap_Back_Cli_Db_Reset_A_Prods';

function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Back_Defaults} */
    const DEF = spec['Fl32_Ap_Back_Defaults$'];
    const {isPostgres} = spec['TeqFw_Core_Back_Util_RDb']; // ES6 destruct
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr} */
    const EAttr = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value} */
    const EAttrVal = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Dec} */
    const EAttrValDec = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Dec#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Text} */
    const EAttrValTxt = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Text#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Product_Card} */
    const EProdCard = spec['Fl32_Ap_Back_Store_RDb_Schema_Product_Card#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Product_Card_Attr_Value} */
    const EProdCardAttrValue = spec['Fl32_Ap_Back_Store_RDb_Schema_Product_Card_Attr_Value#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Product_Unit} */
    const EProdUnit = spec['Fl32_Ap_Back_Store_RDb_Schema_Product_Unit#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Attr_Value} */
    const EProdUnitAttrValue = spec['Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Attr_Value#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Price} */
    const EProdUnitPrice = spec['Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Price#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Price_List} */
    const EPriceList = spec['Fl32_Ap_Back_Store_RDb_Schema_Price_List#'];


    async function addProducts({trx}) {
        // PARSE INPUT & DEFINE WORKING VARS
        const isPg = isPostgres(trx.client);
        const ATTR = DEF.ATTR.PROD; // link to product attributes codes
        const TYPE = DEF.DATA.PROD.TYPE; // link to test data (product types)
        let attrs; // attributes code-to-id map
        let options; // options code-to-object map
        let priceListId;

        // DEFINE INNER FUNCTIONS
        async function addPriceList(trx) {
            const query = trx(EPriceList.ENTITY)
                .insert({
                    [EPriceList.A_NAME]: DEF.DATA.PRICE.LIST.DEFAULT,
                    [EPriceList.A_CURRENCY]: 'EUR',
                });
            if (isPg) query.returning(EPriceList.A_ID);
            const rs = await query;
            const [result] = rs;
            return result;
        }

        async function loadAttrIds(trx) {
            const result = {};
            const rs = await trx.from(EAttr.ENTITY);
            for (const one of rs) {
                const id = one[EAttr.A_ID];
                const code = one[EAttr.A_CODE];
                result[code] = id;
            }
            return result;
        }

        async function loadOptions(trx) {
            // PARSE INPUT & DEFINE WORKING VARS
            const A_ATTR_CODE = 'attrCode';
            const A_DEFAULT = 'default';
            const A_VALUE_ID = 'valueId';
            const T_A = 'a';
            const T_D = 'd';
            const T_V = 'v';

            // DEFINE INNER FUNCTIONS
            function buildQuery(trx) {
                // select from attr
                const query = trx.from({[T_A]: EAttr.ENTITY});
                query.select([
                    {[A_ATTR_CODE]: `${T_A}.${EAttr.A_CODE}`},
                ]);
                // left join attr_value
                query.leftOuterJoin(
                    {[T_V]: EAttrVal.ENTITY},
                    `${T_V}.${EAttrVal.A_ATTR_REF}`,
                    `${T_A}.${EAttr.A_ID}`);
                query.select([{[A_VALUE_ID]: `${T_V}.${EAttrVal.A_ID}`}]);
                // left join attr_value_text
                query.leftOuterJoin(
                    {[T_D]: EAttrValTxt.ENTITY},
                    `${T_D}.${EAttrValTxt.A_VALUE_REF}`,
                    `${T_V}.${EAttrVal.A_ID}`);
                query.select([{[A_DEFAULT]: `${T_D}.${EAttrValTxt.A_VALUE}`}]);
                // WHERE
                query.where(`${T_A}.${EAttr.A_TYPE}`, EAttr.DATA_TYPE_OPTION);
                return query;
            }

            // MAIN FUNCTIONALITY
            const result = {};
            const queryValues = buildQuery(trx);
            const values = await queryValues;
            for (const one of values) {
                const valueId = one[A_VALUE_ID];
                const attrCode = one[A_ATTR_CODE];
                const valueDef = one[A_DEFAULT];
                if (!result[attrCode]) result[attrCode] = {};
                result[attrCode][valueDef] = valueId;
            }
            return result;
        }

        async function addValueDec(trx, attrId, value) {
            // register new value and get value ID
            const qReg = trx(EAttrVal.ENTITY)
                .insert({[EAttrVal.A_ATTR_REF]: attrId});
            if (isPg) qReg.returning(EAttrVal.A_ID);
            const rs = await qReg;
            const [valueId] = rs;
            // save value
            await trx(EAttrValDec.ENTITY)
                .insert({[EAttrValDec.A_VALUE_REF]: valueId, [EAttrValDec.A_VALUE]: value});
            return valueId;
        }

        async function addValueTxt(trx, attrId, value, i18n) {
            // register new value and get value ID
            const qReg = trx(EAttrVal.ENTITY)
                .insert({[EAttrVal.A_ATTR_REF]: attrId});
            if (isPg) qReg.returning(EAttrVal.A_ID);
            const rs = await qReg;
            const [valueId] = rs;
            // save default value
            await trx(EAttrValTxt.ENTITY)
                .insert({[EAttrValTxt.A_VALUE_REF]: valueId, [EAttrValTxt.A_VALUE]: value});
            // save i18n if exist
            if (typeof i18n === 'object') {
                for (const lang of Object.keys(i18n)) {
                    await trx(EAttrValTxtI18n.ENTITY)
                        .insert({
                            [EAttrValTxtI18n.A_VALUE_REF]: valueId,
                            [EAttrValTxtI18n.A_LANG]: lang,
                            [EAttrValTxtI18n.A_TRANSLATION]: i18n[lang]
                        });
                }
            }
            return valueId;
        }

        async function addProductCard(trx, name, img, liquidType, beerType, alcohol) {
            const qReg = trx(EProdCard.ENTITY)
                .insert({
                    [EProdCard.A_TYPE]: EProdCard.DATA_TYPE_DRAFT
                });
            if (isPg) qReg.returning(EProdCard.A_ID);
            const rs = await qReg;
            const [cardId] = rs;
            // add 'name' attribute
            const attrIdName = attrs[ATTR.CARD.NAME];
            const valueIdName = await addValueTxt(trx, attrIdName, name);
            await trx(EProdCardAttrValue.ENTITY)
                .insert({
                    [EProdCardAttrValue.A_CARD_REF]: cardId,
                    [EProdCardAttrValue.A_VALUE_REF]: valueIdName,
                });
            // add 'image' attribute
            const attrIdImg = attrs[ATTR.CARD.IMAGE];
            const valueIdImg = await addValueTxt(trx, attrIdImg, img);
            await trx(EProdCardAttrValue.ENTITY)
                .insert({
                    [EProdCardAttrValue.A_CARD_REF]: cardId,
                    [EProdCardAttrValue.A_VALUE_REF]: valueIdImg,
                });
            // add liquid type
            await trx(EProdCardAttrValue.ENTITY)
                .insert({
                    [EProdCardAttrValue.A_CARD_REF]: cardId,
                    [EProdCardAttrValue.A_VALUE_REF]: options[ATTR.CARD.LIQUID_TYPE][liquidType],
                });
            // add beer type
            if (beerType) {
                await trx(EProdCardAttrValue.ENTITY)
                    .insert({
                        [EProdCardAttrValue.A_CARD_REF]: cardId,
                        [EProdCardAttrValue.A_VALUE_REF]: options[ATTR.CARD.BEER_TYPE][beerType],
                    });
            }
            // add alcohol
            if (alcohol) {
                const attrIdAlco = attrs[ATTR.CARD.ALCOHOL_PERCENT];
                const valueIdAlco = await addValueDec(trx, attrIdAlco, alcohol);
                await trx(EProdCardAttrValue.ENTITY)
                    .insert({
                        [EProdCardAttrValue.A_CARD_REF]: cardId,
                        [EProdCardAttrValue.A_VALUE_REF]: valueIdAlco,
                    });
            }
            return cardId;
        }

        async function addProductUnit(trx, cardId, sku, volume, price) {
            const qReg = trx(EProdUnit.ENTITY)
                .insert({[EProdUnit.A_CARD_REF]: cardId, [EProdUnit.A_SKU]: sku});
            if (isPg) qReg.returning(EProdUnit.A_ID);
            const rs = await qReg;
            const [unitId] = rs;
            // add 'volume' attribute
            const attrIdVolume = attrs[ATTR.UNIT.VOLUME];
            const valueIdVolume = await addValueDec(trx, attrIdVolume, volume);
            await trx(EProdUnitAttrValue.ENTITY)
                .insert({
                    [EProdUnitAttrValue.A_UNIT_REF]: unitId,
                    [EProdUnitAttrValue.A_VALUE_REF]: valueIdVolume,
                });
            // add price
            await trx(EProdUnitPrice.ENTITY)
                .insert({
                    [EProdUnitPrice.A_LIST_REF]: priceListId,
                    [EProdUnitPrice.A_UNIT_REF]: unitId,
                    [EProdUnitPrice.A_PRICE]: price,
                });
            return unitId;
        }

        // MAIN FUNCTIONALITY
        attrs = await loadAttrIds(trx);
        options = await loadOptions(trx);
        priceListId = await addPriceList(trx);
        //
        let cardId = await addProductCard(trx, 'Valmiermuiža gaišais', 'vml.png', TYPE.LIQUID.BEER, TYPE.BEER.LIGHT, 5.2);
        await addProductUnit(trx, cardId, 'VML_10', 1.0, 4.31);
        await addProductUnit(trx, cardId, 'VML_15', 1.5, 6.38);
        await addProductUnit(trx, cardId, 'VML_20', 2.0, 7.50);
        await addProductUnit(trx, cardId, 'VML_30', 3.0, 11.25);
        //
        cardId = await addProductCard(trx, 'Piebalga', 'pbl.png', TYPE.LIQUID.BEER, TYPE.BEER.LIGHT, 5.7);
        await addProductUnit(trx, cardId, 'PBL_10', 1.0, 2.47);
        await addProductUnit(trx, cardId, 'PBL_15', 1.5, 3.66);
        await addProductUnit(trx, cardId, 'PBL_20', 2.0, 4.30);
        await addProductUnit(trx, cardId, 'PBL_30', 3.0, 6.45);
        //
        cardId = await addProductCard(trx, 'Cesvaines tumšais alus', 'cst.png', TYPE.LIQUID.BEER, TYPE.BEER.DARK, 5.2);
        await addProductUnit(trx, cardId, 'CST_10', 1.0, 3.05);
        await addProductUnit(trx, cardId, 'CST_15', 1.5, 4.51);
        await addProductUnit(trx, cardId, 'CST_20', 2.0, 5.30);
        await addProductUnit(trx, cardId, 'CST_30', 3.0, 7.95);
        //
        cardId = await addProductCard(trx, 'Krāslavas gaišais', 'krl.png', TYPE.LIQUID.BEER, TYPE.BEER.LIGHT, 4.8);
        await addProductUnit(trx, cardId, 'KRL_10', 1.0, 2.19);
        await addProductUnit(trx, cardId, 'KRL_15', 1.5, 3.32);
        await addProductUnit(trx, cardId, 'KRL_20', 2.0, 3.80);
        await addProductUnit(trx, cardId, 'KRL_30', 3.0, 5.70);
        //
        cardId = await addProductCard(trx, 'Iļguciema kvass', 'ick.png', TYPE.LIQUID.KVAS);
        await addProductUnit(trx, cardId, 'ICK_10', 1.0, 1.31);
        await addProductUnit(trx, cardId, 'ICK_15', 1.5, 1.94);
        await addProductUnit(trx, cardId, 'ICK_20', 2.0, 2.28);
        await addProductUnit(trx, cardId, 'ICK_30', 3.0, 3.42);
        //
        cardId = await addProductCard(trx, 'Sidrs Westons Premium Irish Style', 'swpis.png', TYPE.LIQUID.CIDER, null, 4.5);
        await addProductUnit(trx, cardId, 'SWPIS_10', 1.0, 5.94);
        await addProductUnit(trx, cardId, 'SWPIS_15', 1.5, 8.64);
        await addProductUnit(trx, cardId, 'SWPIS_20', 2.0, 10.80);
        await addProductUnit(trx, cardId, 'SWPIS_30', 3.0, 16.20);
    }

    // MAIN FUNCTIONALITY
    Object.defineProperty(addProducts, 'name', {value: `${NS}.${addProducts.name}`});
    return {
        addProducts
    };
}


// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
