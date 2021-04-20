export default class Fl32_Ap_Defaults {
    BACK_REALM = 'app';  // realm for API services ('/api/app/...') and CLI commands ('app-...')

    DATA_USER_ADMIN_EMAIL = 'alex@flancer64.com'; // app's sample data
    DATA_USER_ADMIN_ID = 1;
    DATA_USER_ADMIN_NAME = 'El Jefe';

    /** @type {TeqFw_Core_App_Defaults} */
    MOD_CORE;
    /** @type {Fl32_Ap_User_Defaults} */
    MOD_USER;
    /** @type {TeqFw_Vue_Defaults} */
    MOD_VUE;

    REALM_PUB_ROUTE_home = '/';
    REALM_PUB_ROUTE_signIn_codeCheck = '/signIn/codeCheck';
    REALM_PUB_ROUTE_signIn_emailGet = '/signIn/emailGet';

    constructor(spec) {
        this.MOD_CORE = spec['TeqFw_Core_App_Defaults$'];    // instance singleton
        this.MOD_USER = spec['Fl32_Ap_User_Defaults$'];    // instance singleton
        this.MOD_VUE = spec['TeqFw_Vue_Defaults$'];    // instance singleton
        Object.freeze(this);
    }
}
