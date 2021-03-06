/**
 * Local configuration DTO for the plugin.
 * @see TeqFw_Core_Back_Config
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Back_Api_Dto_Config_Local';

// MODULE'S CLASSES
export default class Fl32_Ap_Back_Api_Dto_Config_Local {
    /** @type {TeqFw_Db_Back_Api_Dto_Config_Local} */
    db;
}

/**
 * Factory to create new DTO instances.
 * @memberOf Fl32_Ap_Back_Api_Dto_Config_Local
 */
export class Factory {
    constructor(spec) {
        /** @type {typeof TeqFw_Db_Back_Api_Dto_Config_Local} */
        const DDb = spec['TeqFw_Db_Back_Api_Dto_Config_Local#'];
        /** @type {TeqFw_Db_Back_Api_Dto_Config_Local.Factory} */
        const fDb = spec['TeqFw_Db_Back_Api_Dto_Config_Local#Factory$'];

        /**
         * @param {Fl32_Ap_Back_Api_Dto_Config_Local|null} data
         * @return {Fl32_Ap_Back_Api_Dto_Config_Local}
         */
        this.create = function (data = null) {
            const res = new Fl32_Ap_Back_Api_Dto_Config_Local();
            res.db = (data?.db instanceof DDb)
                ? data.db : fDb.create(data?.db);
            return res;
        }
    }
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
