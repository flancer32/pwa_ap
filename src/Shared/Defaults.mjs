/**
 * Plugin constants (hardcoded configuration) for shared code.
 */
export default class Fl32_Ap_Shared_Defaults {
    NAME = '@flancer32/pwa_ap';

    // SERVICES ROUTES
    SERV_product_list = '/product/list';
    SERV_profile_get = '/profile/get';
    SERV_profile_update = '/profile/update';
    SERV_sale_add = '/sale/add';
    SERV_sale_list = '/sale/list';

    constructor(spec) {
        // EXTRACT DEPS
        // /** @type {TeqFw_Web_Shared_Defaults} */
        // this.MOD.WEB = spec['TeqFw_Web_Shared_Defaults$'];

        // MAIN FUNCTIONALITY
        Object.freeze(this);
    }
}
