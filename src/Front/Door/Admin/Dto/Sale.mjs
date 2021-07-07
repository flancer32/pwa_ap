/**
 * Sale order DTO for the 'admin' realm.
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Door_Admin_Dto_Sale';

// MODULE'S CLASSES
class Fl32_Ap_Front_Door_Admin_Dto_Sale {
    /** @type {Date} */
    dateCreated;
    /** @type {Date} */
    dateReceiving;
    /** @type {number} */
    id;
    /** @type {Object<number, Fl32_Ap_Front_Door_Admin_Dto_Sale_Item>} */
    items;
    /** @type {string} */
    state;
    /** @type {Fl32_Ap_Front_Door_Shared_Dto_Amount} */
    totals;
    /** @type {number} */
    userId;
}

// attributes names
Fl32_Ap_Front_Door_Admin_Dto_Sale.DATE_CREATED = 'dateCreated';
Fl32_Ap_Front_Door_Admin_Dto_Sale.DATE_RECEIVING = 'dateReceiving';
Fl32_Ap_Front_Door_Admin_Dto_Sale.ID = 'id';
Fl32_Ap_Front_Door_Admin_Dto_Sale.ITEMS = 'items';
Fl32_Ap_Front_Door_Admin_Dto_Sale.STATE = 'state';
Fl32_Ap_Front_Door_Admin_Dto_Sale.TOTALS = 'totals';
Fl32_Ap_Front_Door_Admin_Dto_Sale.USER_ID = 'userId';

/**
 * Factory to create new DTOs.
 * @memberOf Fl32_Ap_Front_Door_Admin_Dto_Sale
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {typeof Fl32_Ap_Front_Door_Admin_Dto_Sale_Item} */
        const DItem = spec['Fl32_Ap_Front_Door_Admin_Dto_Sale_Item#'];
        /** @type {Fl32_Ap_Front_Door_Shared_Dto_Amount.Factory} */
        const fAmount = spec['Fl32_Ap_Front_Door_Shared_Dto_Amount#Factory$'];
        /** @type {Fl32_Ap_Front_Door_Admin_Dto_Sale_Item.Factory} */
        const fItem = spec['Fl32_Ap_Front_Door_Admin_Dto_Sale_Item#Factory$'];

        /**
         * @param {Object|null} data
         * @return {Fl32_Ap_Front_Door_Admin_Dto_Sale}
         */
        this.create = function (data = null) {
            const result = new Fl32_Ap_Front_Door_Admin_Dto_Sale();
            result.dateCreated = data?.dateCreated
                ? (data.dateCreated instanceof Date) ? data.dateCreated : new Date(data.dateCreated)
                : null;
            result.dateReceiving = data?.dateReceiving
                ? (data.dateReceiving instanceof Date) ? data.dateReceiving : new Date(data.dateReceiving)
                : null;
            result.id = data?.id;
            result.items = {};
            if (typeof data?.items === 'object') {
                for (const one of Object.values(data.items)) {
                    /** @type {Fl32_Ap_Front_Door_Admin_Dto_Sale_Item} */
                    const item = (one instanceof DItem) ? one : fItem.create(one);
                    result.items[item.id] = item;
                }
            }
            result.state = data?.state;
            result.totals = fAmount.create(data?.totals);
            result.userId = data?.userId;
            return result;
        }
    }

}

// freeze class to deny attributes changes then export class
Object.freeze(Fl32_Ap_Front_Door_Admin_Dto_Sale);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});

export {
    Fl32_Ap_Front_Door_Admin_Dto_Sale as default,
    Factory
} ;
