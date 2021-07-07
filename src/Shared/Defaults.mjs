/**
 * Plugin constants (hardcoded configuration) for shared code.
 */
export default class Fl32_Ap_Shared_Defaults {

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

    DOOR_ADMIN = 'admin';
    DOOR_PUB = 'pub';

    NAME = '@flancer32/pwa_ap';

    DOOR_ADM_ROUTE_SIGNIN_CODE_CHECK;
    DOOR_PUB_ROUTE_SIGNIN_CODE_CHECK;

    /** @type {Fl32_Ap_User_Shared_Defaults} */
    MOD_USER;

    // SERVICES ROUTES
    WEB_PRODUCT_LIST = '/product/list';
    WEB_PROFILE_GET = '/profile/get';
    WEB_PROFILE_UPDATE = '/profile/update';
    WEB_SALE_ADD = '/sale/add';
    WEB_SALE_LIST = '/sale/list';

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl32_Ap_User_Shared_Defaults} */
        this.MOD_USER = spec['Fl32_Ap_User_Shared_Defaults$'];

        this.DOOR_ADM_ROUTE_SIGNIN_CODE_CHECK = this.MOD_USER.DOOR_DEF_ROUTE_SIGNIN_CODE_CHECK;
        this.DOOR_PUB_ROUTE_SIGNIN_CODE_CHECK = this.MOD_USER.DOOR_DEF_ROUTE_SIGNIN_CODE_CHECK;

        // MAIN FUNCTIONALITY
        Object.freeze(this);
    }
}
