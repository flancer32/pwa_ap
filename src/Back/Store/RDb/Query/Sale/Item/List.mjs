/**
 * Query to get list of items for sale orders.
 *
 * @namespace Fl32_Ap_Back_Store_RDb_Query_Sale_Item_List
 */
class Fl32_Ap_Back_Store_RDb_Query_Sale_Item_List {
    // Meta-data for the query (aliases for fields/expressions and tables)
    A_AMOUNT_TOTAL = 'amountTotal';
    A_ITEM_ID = 'itemId';
    A_QTY = 'qty';
    A_SALE_ID = 'saleId';
    A_UNIT_ID = 'unitId';
    A_UNIT_PRICE = 'unitPrice';
    T_I = 'i';
    T_S = 's';

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Sale} */
        const ESale = spec['Fl32_Ap_Back_Store_RDb_Schema_Sale#']; // class
        /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Sale_Item} */
        const ESaleItem = spec['Fl32_Ap_Back_Store_RDb_Schema_Sale_Item#']; // class

        // DEFINE INSTANCE METHODS

        this.build = function ({trx}) {
            // select from main table
            const query = trx.from({[this.T_S]: ESale.ENTITY});
            // left join user
            query.leftOuterJoin(
                {[this.T_I]: ESaleItem.ENTITY},
                `${this.T_I}.${ESaleItem.A_SALE_REF}`,
                `${this.T_S}.${ESale.A_ID}`);
            query.select([
                {[this.A_ITEM_ID]: `${this.T_I}.${ESaleItem.A_ID}`},
                {[this.A_SALE_ID]: `${this.T_I}.${ESaleItem.A_SALE_REF}`},
                {[this.A_UNIT_ID]: `${this.T_I}.${ESaleItem.A_UNIT_REF}`},
                {[this.A_QTY]: `${this.T_I}.${ESaleItem.A_QTY}`},
                {[this.A_UNIT_PRICE]: `${this.T_I}.${ESaleItem.A_UNIT_PRICE}`},
                {[this.A_AMOUNT_TOTAL]: `${this.T_I}.${ESaleItem.A_AMOUNT_TOTAL}`},
            ]);
            // COMPOSE RESULT
            return query;
        }

        // COMPOSE RESULT
        Object.freeze(this);
    }

}

// MODULE'S EXPORT
export default Fl32_Ap_Back_Store_RDb_Query_Sale_Item_List;
