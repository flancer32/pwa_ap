/**
 * Application level constants (hardcoded configuration).
 */
export default class Fl32_Ap_Back_Defaults {

    CLI_PREFIX = 'app'; // prefix in CLI commands

    DATA_PRICE_LIST_DEFAULT = 'default';
    DATA_PROD_TYPE = {
        BEER: {
            LIGHT: 'light',
            DARK: 'dark',
        },
        LIQUID: {
            BEER: 'beer',
            KVAS: 'kvas',
            CIDER: 'cider',
            VINE: 'vine',
        }
    };
    DATA_USER_ADMIN_EMAIL = 'flancer64@gmail.com';
    DATA_USER_ADMIN_ID = 1;
    DATA_USER_ADMIN_NAME = 'El Jefe';
    DATA_USER_ADMIN_SESS_ID = 'sessIdForAdmin';

    DESC_NODE = 'app'; // plugin's node in './cfg/local.json'

    DOOR_ADM_ROUTE_SIGNIN_CODE_CHECK;
    DOOR_PUB_ROUTE_SIGNIN_CODE_CHECK;

    I18N_LOCALE_RU = 'ru';

    /** @type {Fl32_Ap_User_Back_Defaults} */
    MOD_USER;
    /** @type {TeqFw_Web_Back_Defaults} */
    MOD_WEB;

    /** @type {Fl32_Ap_Shared_Defaults} */
    SHARED;

    constructor(spec) {
        // EXTRACT DEPS
        this.MOD_USER = spec['Fl32_Ap_User_Back_Defaults$'];
        this.MOD_WEB = spec['TeqFw_Web_Back_Defaults$'];
        this.SHARED = spec['Fl32_Ap_Shared_Defaults$'];

        // INIT PROPS, DEFINE WORKING VARS
        this.DOOR_ADM_ROUTE_SIGNIN_CODE_CHECK = this.MOD_USER.DOOR_DEF_ROUTE_SIGNIN_CODE_CHECK;
        this.DOOR_PUB_ROUTE_SIGNIN_CODE_CHECK = this.MOD_USER.DOOR_DEF_ROUTE_SIGNIN_CODE_CHECK;

        // MAIN FUNCTIONALITY
        Object.freeze(this);
    }
}
