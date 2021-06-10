/**
 * Query to get list of sale orders.
 *
 * @namespace Fl32_Ap_Back_Store_RDb_Query_Sale_List
 */

class Fl32_Ap_Back_Store_RDb_Query_Sale_List {
    // Meta-data for the query (aliases for fields/expressions and tables)
    A_AMOUNT_TOTAL = 'amountTotal';
    A_CURRENCY = 'currency';
    A_DATE_CREATED = 'dateCreated';
    A_DATE_RECEIVING = 'dateReceiving';
    A_IS_ADMIN = 'isAdmin';
    A_SALE_ID = 'saleId';
    A_STATE = 'state';
    A_USER_DATE_CREATED = 'userDateCreated';
    A_USER_ID = 'userId';
    A_USER_NAME = 'userName';
    T_S = 's';
    T_U = 'u';

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Sale} */
        const ESale = spec['Fl32_Ap_Back_Store_RDb_Schema_Sale#']; // class
        /** @type {typeof Fl32_Ap_User_Back_Store_RDb_Schema_User} */
        const EUser = spec['Fl32_Ap_User_Back_Store_RDb_Schema_User#']; // class

        // DEFINE INSTANCE METHODS

        this.build = function ({trx}) {
            // select from main table
            const query = trx.from({[this.T_S]: ESale.ENTITY});
            query.select([
                {[this.A_SALE_ID]: `${this.T_S}.${ESale.A_ID}`},
                {[this.A_USER_ID]: `${this.T_S}.${ESale.A_USER_REF}`},
                {[this.A_DATE_CREATED]: `${this.T_S}.${ESale.A_DATE_CREATED}`},
                {[this.A_DATE_RECEIVING]: `${this.T_S}.${ESale.A_DATE_RECEIVING}`},
                {[this.A_STATE]: `${this.T_S}.${ESale.A_STATE}`},
                {[this.A_AMOUNT_TOTAL]: `${this.T_S}.${ESale.A_AMOUNT_TOTAL}`},
                {[this.A_CURRENCY]: `${this.T_S}.${ESale.A_CURRENCY}`},
            ]);
            // left join user
            query.leftOuterJoin(
                {[this.T_U]: EUser.ENTITY},
                `${this.T_U}.${EUser.A_ID}`,
                `${this.T_S}.${ESale.A_USER_REF}`);
            query.select([
                {[this.A_USER_DATE_CREATED]: `${this.T_U}.${EUser.A_DATE_CREATED}`},
                {[this.A_IS_ADMIN]: `${this.T_U}.${EUser.A_IS_ADMIN}`},
                {[this.A_USER_NAME]: `${this.T_U}.${EUser.A_NAME}`},
            ]);
            // COMPOSE RESULT
            return query;
        }

        // COMPOSE RESULT
        Object.freeze(this);
    }

}

// MODULE'S EXPORT
export default Fl32_Ap_Back_Store_RDb_Query_Sale_List;
