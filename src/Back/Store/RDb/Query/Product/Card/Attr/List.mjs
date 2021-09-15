/**
 * Query to get list of products cards.
 *
 * @namespace Fl32_Ap_Back_Store_RDb_Query_Product_Card_Attr_List
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Back_Store_RDb_Query_Product_Card_Attr_List';

/**
 * Factory to create builder to get queries.
 *
 * @memberOf Fl32_Ap_Back_Store_RDb_Query_Product_Card_Attr_List
 * @returns {function(*): *}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr} */
    const EAttr = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value} */
    const EAttrVal = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Dec} */
    const EValDec = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Dec#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Datetime} */
    const EValDt = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Datetime#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Int} */
    const EValInt = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Int#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Text} */
    const EValTxt = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Text#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Text_I18n} */
    const EValTxtI18n = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Text_I18n#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Product_Card} */
    const ECard = spec['Fl32_Ap_Back_Store_RDb_Schema_Product_Card#'];
    /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Product_Card_Attr_Value} */
    const ECardAV = spec['Fl32_Ap_Back_Store_RDb_Schema_Product_Card_Attr_Value#'];


    // DEFINE INNER FUNCTIONS
    /**
     * @param trx
     * @param {string} lang
     * @returns {*}
     * @memberOf Fl32_Ap_Back_Store_RDb_Query_Product_Card_Attr_List
     */
    function queryBuilder({trx, lang}) {
        // alias for the function itself
        const me = queryBuilder;

        // select from main table
        const query = trx.from({[me.T_C]: ECard.ENTITY});
        query.select([
            {[me.A_CARD_ID]: `${me.T_C}.${ECard.A_ID}`},
            {[me.A_DATE_CREATED]: `${me.T_C}.${ECard.A_DATE_CREATED}`},
            {[me.A_TYPE]: `${me.T_C}.${ECard.A_TYPE}`},
        ]);
        // left join product_card_attr_value
        query.leftOuterJoin(
            {[me.T_CV]: ECardAV.ENTITY},
            `${me.T_CV}.${ECardAV.A_CARD_REF}`,
            `${me.T_C}.${ECard.A_ID}`);
        query.select([{[me.A_VALUE_ID]: `${me.T_CV}.${ECardAV.A_VALUE_REF}`}]);
        // left join attr_value
        query.leftOuterJoin(
            {[me.T_AV]: EAttrVal.ENTITY},
            `${me.T_AV}.${EAttrVal.A_ID}`,
            `${me.T_CV}.${ECardAV.A_VALUE_REF}`);
        query.select([{[me.A_ATTR_ID]: `${me.T_AV}.${EAttrVal.A_ATTR_REF}`}]);
        // left join attr
        query.leftOuterJoin(
            {[me.T_A]: EAttr.ENTITY},
            `${me.T_A}.${EAttr.A_ID}`,
            `${me.T_AV}.${EAttrVal.A_ATTR_REF}`);
        query.select([
            {[me.A_ATTR_CODE]: `${me.T_A}.${EAttr.A_CODE}`},
            {[me.A_ATTR_TYPE]: `${me.T_A}.${EAttr.A_TYPE}`}
        ]);
        // left join attr_value_text
        query.leftOuterJoin(
            {[me.T_VT]: EValTxt.ENTITY},
            `${me.T_VT}.${EValTxt.A_VALUE_REF}`,
            `${me.T_AV}.${EAttrVal.A_ID}`);
        query.select([{[me.A_VALUE_TXT]: `${me.T_VT}.${EValTxt.A_VALUE}`}]);
        // left join attr_value_text_i18n
        if (lang) {
            query.leftOuterJoin(
                {[me.T_VTI]: EValTxtI18n.ENTITY},
                function () {
                    this.on(`${me.T_VTI}.${EValTxtI18n.A_VALUE_REF}`, `${me.T_AV}.${EAttrVal.A_ID}`)
                        .andOnVal(`${me.T_VTI}.${EValTxtI18n.A_LANG}`, lang)
                });
            query.select([{[me.A_VALUE_TXT_LNG]: `${me.T_VTI}.${EValTxtI18n.A_TRANSLATION}`}]);
        }
        // left join attr_value_dec
        query.leftOuterJoin(
            {[me.T_VD]: EValDec.ENTITY},
            `${me.T_VD}.${EValDec.A_VALUE_REF}`,
            `${me.T_AV}.${EAttrVal.A_ID}`);
        query.select([{[me.A_VALUE_DEC]: `${me.T_VD}.${EValDec.A_VALUE}`}]);
        // left join attr_value_int
        query.leftOuterJoin(
            {[me.T_VI]: EValInt.ENTITY},
            `${me.T_VI}.${EValInt.A_VALUE_REF}`,
            `${me.T_AV}.${EAttrVal.A_ID}`);
        query.select([{[me.A_VALUE_INT]: `${me.T_VI}.${EValInt.A_VALUE}`}]);
        // left join attr_value_datetime
        query.leftOuterJoin(
            {[me.T_VDT]: EValDt.ENTITY},
            `${me.T_VDT}.${EValDt.A_VALUE_REF}`,
            `${me.T_AV}.${EAttrVal.A_ID}`);
        query.select([{[me.A_VALUE_DATETIME]: `${me.T_VDT}.${EValDt.A_VALUE}`}]);

        return query;
    }

    // MAIN FUNCTIONALITY
    Object.defineProperty(queryBuilder, 'name', {value: `${NS}.${queryBuilder.name}`});
    // pin tables and aliases names been used in the query to the builder
    queryBuilder.A_ATTR_CODE = 'attrCode';
    queryBuilder.A_ATTR_ID = 'attrId';
    queryBuilder.A_ATTR_TYPE = 'attrType';
    queryBuilder.A_CARD_ID = 'cardId';
    queryBuilder.A_DATE_CREATED = 'dateCreated';
    queryBuilder.A_TYPE = 'type';
    queryBuilder.A_VALUE_DATETIME = 'valueDt';
    queryBuilder.A_VALUE_DEC = 'valueDec';
    queryBuilder.A_VALUE_ID = 'valueId';
    queryBuilder.A_VALUE_INT = 'valueInt';
    queryBuilder.A_VALUE_TXT = 'valueTxt';
    queryBuilder.A_VALUE_TXT_LNG = 'valueTxtLng';
    queryBuilder.T_A = 'a';
    queryBuilder.T_AV = 'av';
    queryBuilder.T_C = 'c';
    queryBuilder.T_CV = 'cv';
    queryBuilder.T_VD = 'vd';
    queryBuilder.T_VDT = 'vdt';
    queryBuilder.T_VI = 'vi';
    queryBuilder.T_VT = 'vt';
    queryBuilder.T_VTI = 'vti';

    // COMPOSE RESULT
    return queryBuilder;
}

// MODULE'S FUNCTIONALITY
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

// MODULE'S EXPORT
export default Factory;
