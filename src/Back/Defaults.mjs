/**
 * Application level constants (hardcoded configuration).
 */
export default class Fl32_Ap_Back_Defaults {
    ATTR = {
        PROD: {
            CARD: {
                ALCOHOL_PERCENT: 'alcoholPercent',
                BEER_TYPE: 'beerType',
                IMAGE: 'image',
                LIQUID_TYPE: 'liquidType',
                NAME: 'name',
            },
            UNIT: {
                VOLUME: 'volume',
            },
        },
    };

    BACK_REALM = 'app';  // realm for API services ('/api/app/...') and CLI commands ('app-...')

    DATA_USER_ADMIN_EMAIL = 'flancer64@gmail.com'; // app's sample data
    DATA_USER_ADMIN_ID = 1;
    DATA_USER_ADMIN_SESS_ID = 'sessIdForAdmin';
    DATA_USER_ADMIN_NAME = 'El Jefe';
    DATA = {
        PRICE: {LIST: {DEFAULT: 'default'}},
        PROD: {
            TYPE: {
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
            }
        }
    };

    DI = {
        SHOPPING_CART: 'appShoppingCart'
    };

    I18N = {LOCALE: {RU: 'ru'}};

    /** @type {TeqFw_Core_Back_Defaults} */
    MOD_CORE;
    /** @type {TeqFw_I18n_Defaults} */
    MOD_I18N;
    /** @type {TeqFw_Ui_Quasar_Defaults} */
    MOD_QUASAR;
    /** @type {Fl32_Ap_User_Back_Defaults} */
    MOD_USER;
    /** @type {TeqFw_Vue_Defaults} */
    MOD_VUE;

    REALM_ADM = 'admin';
    REALM_ADM_ROUTE_home = '/';
    REALM_ADM_ROUTE_sale_list = '/sale/list';
    REALM_ADM_ROUTE_signIn_codeCheck = 'WILL BE SET IN CONSTRUCTOR BELOW';
    REALM_ADM_ROUTE_signIn_emailGet = '/signIn/emailGet';
    REALM_ADM_ROUTE_user_invite = '/user/invite';
    REALM_PUB = 'pub';
    REALM_PUB_ROUTE_cart = '/cart';
    REALM_PUB_ROUTE_cfg = '/cfg';
    REALM_PUB_ROUTE_home = '/';
    REALM_PUB_ROUTE_logout = '/logout';
    REALM_PUB_ROUTE_sales = '/sales';
    REALM_PUB_ROUTE_signIn_codeCheck = 'WILL BE SET IN CONSTRUCTOR BELOW';
    REALM_PUB_ROUTE_signIn_emailGet = '/signIn/emailGet';
    REALM_PUB_ROUTE_signUp_codeCheck = '/signUp/codeCheck/:code';

    // SERVICES ROUTES
    SERV_product_list = '/product/list';
    SERV_profile_get = '/profile/get';
    SERV_profile_update = '/profile/update';
    SERV_sale_add = '/sale/add';
    SERV_sale_list = '/sale/list';

    constructor(spec) {
        // EXTRACT DEPS
        this.MOD_CORE = spec['TeqFw_Core_Back_Defaults$'];
        this.MOD_I18N = spec['TeqFw_I18n_Defaults$'];
        this.MOD_QUASAR = spec['TeqFw_Ui_Quasar_Defaults$'];
        this.MOD_USER = spec['Fl32_Ap_User_Back_Defaults$'];
        this.MOD_VUE = spec['TeqFw_Vue_Defaults$'];

        // INIT PROPS, DEFINE WORKING VARS
        this.REALM_ADM_ROUTE_signIn_codeCheck = this.MOD_USER.REALM_DEF_ROUTE_signIn_codeCheck;
        this.REALM_PUB_ROUTE_signIn_codeCheck = this.MOD_USER.REALM_DEF_ROUTE_signIn_codeCheck;

        // MAIN FUNCTIONALITY
        Object.freeze(this);
    }
}
