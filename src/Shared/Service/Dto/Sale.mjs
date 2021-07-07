/**
 * Sale order DTO in Service API.
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Shared_Service_Dto_Sale';

// MODULE'S CLASSES
class Fl32_Ap_Shared_Service_Dto_Sale {
    /** @type {number} */
    amountTotal;
    /** @type {string} */
    currency;
    /** @type {Date} */
    dateCreated;
    /** @type {Date} */
    dateReceiving;
    /** @type {number} */
    id;
    /** @type {Fl32_Ap_Shared_Service_Dto_Sale_Item[]} */
    items;
    /** @type {string} */
    state;
    /** @type {number} */
    userId;
}

// attributes names to use as aliases in queries to RDb
Fl32_Ap_Shared_Service_Dto_Sale.AMOUNT_TOTAL = 'amountTotal';
Fl32_Ap_Shared_Service_Dto_Sale.CURRENCY = 'currency';
Fl32_Ap_Shared_Service_Dto_Sale.DATE_CREATED = 'dateCreated';
Fl32_Ap_Shared_Service_Dto_Sale.DATE_RECEIVING = 'dateReceiving';
Fl32_Ap_Shared_Service_Dto_Sale.ID = 'id';
Fl32_Ap_Shared_Service_Dto_Sale.ITEMS = 'items';
Fl32_Ap_Shared_Service_Dto_Sale.STATE = 'state';
Fl32_Ap_Shared_Service_Dto_Sale.USER_ID = 'userId';

/**
 * Factory to create new DTOs.
 * @memberOf Fl32_Ap_Shared_Service_Dto_Sale
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {typeof Fl32_Ap_Shared_Service_Dto_Sale_Item} */
        const DItem = spec['Fl32_Ap_Shared_Service_Dto_Sale_Item#'];
        /** @type {Fl32_Ap_Shared_Service_Dto_Sale_Item.Factory} */
        const fItem = spec['Fl32_Ap_Shared_Service_Dto_Sale_Item#Factory$'];


        /**
         * @param {Object|null} data
         * @return {Fl32_Ap_Shared_Service_Dto_Sale}
         */
        this.create = function (data = null) {
            const result = new Fl32_Ap_Shared_Service_Dto_Sale();
            result.amountTotal = data?.amountTotal ?? 0;
            result.currency = data?.currency;
            result.dateCreated = data?.dateCreated
                ? (data.dateCreated instanceof Date) ? data.dateCreated : new Date(data.dateCreated)
                : new Date();
            result.dateReceiving = data?.dateReceiving
                ? (data.dateReceiving instanceof Date) ? data.dateReceiving : new Date(data.dateReceiving)
                : null;
            result.id = data?.id;
            result.items = Array.isArray(data?.items)
                ? data.items.map((one) => (one instanceof DItem) ? one : fItem.create(one))
                : [];
            result.state = data?.state;
            result.userId = data?.userId;
            return result;
        }
    }
}

// freeze class to deny attributes changes then export class
Object.freeze(Fl32_Ap_Shared_Service_Dto_Sale);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export {
    Fl32_Ap_Shared_Service_Dto_Sale as default,
    Factory
} ;
