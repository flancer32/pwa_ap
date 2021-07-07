/**
 * Plugin constants (hardcoded configuration) for frontend code.
 */
export default class Fl32_Ap_Front_Defaults {

    DOOR_ADM_ROUTE_HOME = '/';
    DOOR_ADM_ROUTE_SALE_LIST = '/sale/list';
    DOOR_ADM_ROUTE_SIGN_IN_CODE_CHECK;
    DOOR_ADM_ROUTE_SIGN_IN_EMAIL_GET = '/signIn/emailGet';
    DOOR_ADM_ROUTE_USER_INVITE = '/user/invite';
    DOOR_PUB_ROUTE_CART = '/cart';
    DOOR_PUB_ROUTE_CFG = '/cfg';
    DOOR_PUB_ROUTE_HOME = '/';
    DOOR_PUB_ROUTE_LOGOUT = '/logout';
    DOOR_PUB_ROUTE_SALES = '/sales';
    DOOR_PUB_ROUTE_SIGN_IN_CODE_CHECK;
    DOOR_PUB_ROUTE_SIGN_IN_EMAIL_GET = '/signIn/emailGet';
    DOOR_PUB_ROUTE_sign_Up_code_Check = '/signUp/codeCheck/:code';

    /** @type {TeqFw_I18n_Front_Defaults} */
    MOD_I18N;
    /** @type {TeqFw_Ui_Quasar_Front_Defaults} */
    MOD_QUASAR;
    /** @type {TeqFw_Vue_Front_Defaults} */
    MOD_VUE;
    /** @type {TeqFw_Web_Front_Defaults} */
    MOD_WEB;

    /** @type {Fl32_Ap_Shared_Defaults} */
    SHARED;

    constructor(spec) {
        // EXTRACT DEPS
        this.MOD_I18N = spec['TeqFw_I18n_Front_Defaults$'];
        this.MOD_QUASAR = spec['TeqFw_Ui_Quasar_Front_Defaults$'];
        this.MOD_VUE = spec['TeqFw_Vue_Front_Defaults$'];
        this.MOD_WEB = spec['TeqFw_Web_Front_Defaults$'];
        this.SHARED = spec['Fl32_Ap_Shared_Defaults$'];

        this.DOOR_ADM_ROUTE_SIGN_IN_CODE_CHECK = this.SHARED.DOOR_ADM_ROUTE_SIGNIN_CODE_CHECK;
        this.DOOR_PUB_ROUTE_SIGN_IN_CODE_CHECK = this.SHARED.DOOR_PUB_ROUTE_SIGNIN_CODE_CHECK;

        // MAIN FUNCTIONALITY
        Object.freeze(this);
    }
}
