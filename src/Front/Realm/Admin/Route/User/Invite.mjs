/**
 * Route widget to invite new user.
 *
 * @namespace Fl32_Ap_Front_Realm_Admin_Route_User_Invite
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Realm_Admin_Route_User_Invite';
const LifeCountValues = {ONE: 1, MANY: 2}
const LifeTimeValues = {MIN5: 1, HOUR: 2, DAY: 3}

// freeze codifiers
Object.freeze(LifeCountValues);
Object.freeze(LifeTimeValues);

// MODULE'S CLASSES

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Realm_Admin_Route_User_Invite
 * @returns {Fl32_Ap_Front_Realm_Admin_Route_User_Invite.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Defaults} */
    const DEF = spec['Fl32_Ap_Defaults$']; // instance singleton
    /** @type {Fl32_Ap_User_Front_Model_Session} */
    const session = spec[DEF.MOD_USER.DI_SESSION]; // named singleton

    // DEFINE WORKING VARS
    const template = `
<layout-base>
    <layout-centered class="app-based">
        <div class="t-grid rows">
            <q-card class="bg-white">
                <q-card-section>
                    <div class="text-subtitle2">{{$t('admin.route.user.invite.lifeTime.title')}}</div>
                    <q-option-group
                        :options="lifeTimeOpts"
                        inline
                        v-model="lifeTime"
                    ></q-option-group>
                </q-card-section>
                
                <q-separator></q-separator>
                
                <q-card-section>
                    <div class="text-subtitle2">{{$t('admin.route.user.invite.lifeCount.title')}}</div>
                    <q-option-group
                        :options="lifeCountOpts"
                        inline
                        v-model="lifeCount"
                    ></q-option-group>
                </q-card-section>
                
                <q-separator></q-separator>
                
                <q-card-actions align="center">
                    <q-btn color="primary">Создать</q-btn>
                </q-card-actions>
            </q-card>
            
        </div>
    </layout-centered>
</layout-base>
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Realm_Admin_Route_User_Invite
     */
    return {
        name: NS,
        template,
        data() {
            return {
                lifeCount: LifeCountValues.ONE,
                lifeTime: LifeTimeValues.MIN5,
            };
        },
        computed: {
            lifeCountOpts() {
                return [
                    {label: this.$t('admin.route.user.invite.lifeCount.opts.one'), value: LifeCountValues.ONE},
                    {label: this.$t('admin.route.user.invite.lifeCount.opts.many'), value: LifeCountValues.MANY},
                ];
            },
            lifeTimeOpts() {
                return [
                    {label: this.$t('admin.route.user.invite.lifeTime.opts.min5'), value: LifeTimeValues.MIN5},
                    {label: this.$t('admin.route.user.invite.lifeTime.opts.hour1'), value: LifeTimeValues.HOUR},
                    {label: this.$t('admin.route.user.invite.lifeTime.opts.day1'), value: LifeTimeValues.DAY},
                ];
            }
        },
        beforeCreate() {
            // redirect anonymous to sign-in route
            session.checkUserAuthenticated(this.$router);
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
