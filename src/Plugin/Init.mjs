/**
 * Class to integrate plugin into TeqFW application.
 * @extends TeqFw_Core_App_Plugin_Init_Base
 */
export default class Fl32_Ap_Plugin_Init {

    constructor(spec) {
        /** @type {Fl32_Ap_Defaults} */
        const DEF = spec['Fl32_Ap_Defaults$'];    // instance singleton

        this.getCommands = function () {
            return [
                'Fl32_Ap_Cli_Db_Reset$',
            ];
        };
        // TODO: move it to teqfw.json
        this.getI18nResources = function () {
            return {
                [DEF.MOD_CORE.I18N_FRONT]: [
                    './i18n/front.lv.json',
                    './i18n/front.ru.json'
                ],
            };
        };
        /**
         * Realm for plugin's services in the integrated API.
         *
         * @returns {String}
         */
        this.getServicesRealm = function () {
            return DEF.BACK_REALM;
        };

    }
}
