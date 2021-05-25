/**
 * Functions to generate test data for attributes.
 *
 * @namespace Fl32_Ap_Back_Cli_Db_Reset_A_Attrs
 */
// DEFINE WORKING VARS
const NS = 'Fl32_Ap_Back_Cli_Db_Reset_A_Attrs';

function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Defaults} */
    const DEF = spec['Fl32_Ap_Defaults$']; // instance singleton
    const {isPostgres} = spec['TeqFw_Core_App_Back_Util_RDb']; // ES6 destruct
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr} */
    const EAttr = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr#']; // class
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value} */
    const EAttrVal = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value#']; // class
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Text} */
    const EAttrValTxt = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Text#']; // class
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Text_I18n} */
    const EAttrValTxtI18n = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Text_I18n#']; // class

    async function addAttributes({trx}) {
        // PARSE INPUT & DEFINE WORKING VARS
        const isPg = isPostgres(trx.client);
        const ATTR = DEF.ATTR.PROD; // link to product attributes codes
        const DATA = DEF.DATA.PROD.TYPE; // link to test data
        const RU = DEF.I18N.LOCALE.RU; // link to language code

        // DEFINE INNER FUNCTIONS
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

        async function addValueTxt(trx, attrId, value, i18n) {
            // register new value and get value ID
            const qReg = trx(EAttrVal.ENTITY)
                .insert({[EAttrVal.A_ATTR_REF]: attrId});
            if (isPg) qReg.returning(EAttrVal.A_ID);
            const rs = await qReg;
            const [valueId] = rs;
            // save default value
            const qVal = trx(EAttrValTxt.ENTITY)
                .insert({[EAttrValTxt.A_VALUE_REF]: valueId, [EAttrValTxt.A_VALUE]: value});
            await qVal;
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
        }

        // MAIN FUNCTIONALITY

        // add attributes to the registry
        await trx(EAttr.ENTITY)
            .insert([
                {[EAttr.A_CODE]: ATTR.CARD.ALCOHOL_PERCENT, [EAttr.A_TYPE]: EAttr.DATA_TYPE_DECIMAL},
                {[EAttr.A_CODE]: ATTR.CARD.BEAR_TYPE, [EAttr.A_TYPE]: EAttr.DATA_TYPE_OPTION},
                {[EAttr.A_CODE]: ATTR.CARD.LIQUID_TYPE, [EAttr.A_TYPE]: EAttr.DATA_TYPE_OPTION},
                {[EAttr.A_CODE]: ATTR.CARD.NAME, [EAttr.A_TYPE]: EAttr.DATA_TYPE_TEXT},
                {[EAttr.A_CODE]: ATTR.UNIT.VOLUME, [EAttr.A_TYPE]: EAttr.DATA_TYPE_DECIMAL},
            ]);
        // get attrs codifier
        const attrs = await loadAttrIds(trx);
        // add values for bear types
        const bearTypeId = attrs[ATTR.CARD.BEAR_TYPE];
        await addValueTxt(trx, bearTypeId, DATA.BEAR.LIGHT, {[RU]: 'светлое'});
        await addValueTxt(trx, bearTypeId, DATA.BEAR.DARK, {[RU]: 'тёмное'});
        // add values for liquid types
        const liquidTypeId = attrs[ATTR.CARD.LIQUID_TYPE];
        await addValueTxt(trx, liquidTypeId, DATA.LIQUID.BEAR, {[RU]: 'пиво'});
        await addValueTxt(trx, liquidTypeId, DATA.LIQUID.VINE, {[RU]: 'вино'});
        await addValueTxt(trx, liquidTypeId, DATA.LIQUID.KVAS, {[RU]: 'квас'});
    }

    // MAIN FUNCTIONALITY
    Object.defineProperty(addAttributes, 'name', {value: `${NS}.${addAttributes.name}`});
    return {
        addAttributes
    };
}


// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
