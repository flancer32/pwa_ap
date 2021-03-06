/**
 * Model object for user profile in 'pub' realm.
 * Model should load data by itself.
 *
 * @namespace Fl32_Ap_Front_Door_Pub_Model_Profile
 */

// MODULE'S CLASSES
class Fl32_Ap_Front_Door_Pub_Model_Profile {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Core_Shared_Logger} */
        const logger = spec['TeqFw_Core_Shared_Logger$'];
        /** @type {Fl32_Ap_Front_Door_Pub_DataSource_Profile} */
        const ds = spec['Fl32_Ap_Front_Door_Pub_DataSource_Profile$'];
        /** @type {Fl32_Ap_Front_Door_Pub_Dto_Profile.Factory} */
        const fProfile = spec['Fl32_Ap_Front_Door_Pub_Dto_Profile#Factory$'];
        /** @type {TeqFw_Vue_Front_Lib} */
        const VueLib = spec['TeqFw_Vue_Front_Lib$'];

        // DEFINE WORKING VARS
        const {reactive} = VueLib.getVue();
        /** @type {Fl32_Ap_Front_Door_Pub_Dto_Profile} */
        let modelData = reactive(fProfile.create());

        // DEFINE INNER FUNCTIONS

        // DEFINE INSTANCE METHODS
        /**
         * Return model data as reactive DTO.
         *
         * @return {Fl32_Ap_Front_Door_Pub_Dto_Profile}
         */
        this.getData = function () {
            return modelData;
        }
        /**
         * Convert service response DTO to model DTO and make it reactive.
         *
         * @param {Fl32_Ap_Shared_Service_Route_Profile_Get.Response} data
         */
        this.parseDataSource = function (data) {
            modelData.email = data.profile.email;
            modelData.name = data.profile.name;
        }

        /**
         * Load model data using datasource (from server or IDB) then make it reactive.
         * @return {Promise<void>}
         */
        this.reload = async function () {
            const res = await ds.loadData({});
            this.parseDataSource(res);
        }

        /**
         * @return {Promise<void>}
         */
        this.update = async function () {
            await ds.saveData(modelData);
        }

        // MAIN FUNCTIONALITY
        // load data from DataSource to the empty model
        this.reload().catch(function (e) {
            debugger
            logger.error('Cannot reload user profile: ' + e);
        });
    }
}

// MODULE'S EXPORT
export default Fl32_Ap_Front_Door_Pub_Model_Profile;
