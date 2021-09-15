/**
 * Route widget to generate new sign-up code to invite new user.
 *
 * @namespace Fl32_Ap_Front_Door_Admin_Route_User_Invite
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Door_Admin_Route_User_Invite';
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
 * @memberOf Fl32_Ap_Front_Door_Admin_Route_User_Invite
 * @returns {Fl32_Ap_Front_Door_Admin_Route_User_Invite.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Front_Defaults} */
    const DEF = spec['Fl32_Ap_Front_Defaults$'];
    /** @type {TeqFw_Web_Front_Api_Dto_Config} */
    const config = spec['TeqFw_Web_Front_Api_Dto_Config$'];
    /** @type {Fl32_Ap_User_Front_Model_Session} */
    const session = spec['Fl32_Ap_User_Front_Model_Session$'];
    /** @type {TeqFw_Web_Front_Service_Gate} */
    const gate = spec['TeqFw_Web_Front_Service_Gate$'];
    /** @type {Fl32_Ap_User_Shared_Service_Route_SignUp_Code_Create.Factory} */
    const route = spec['Fl32_Ap_User_Shared_Service_Route_SignUp_Code_Create#Factory$'];

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
                    <q-btn 
                        :disabled="loading"
                        color="primary"
                        v-on:click="onSubmit"
                    >{{$t('btn.submit')}}</q-btn>
                </q-card-actions>
                {{message}}
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
     * @memberOf Fl32_Ap_Front_Door_Admin_Route_User_Invite
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        data() {
            return {
                lifeCount: LifeCountValues.ONE,
                lifeTime: LifeTimeValues.MIN5,
                loading: false,
                message: null,
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
        methods: {
            async onSubmit() {
                this.loading = true;
                const req = route.createReq();
                req.onetime = (this.lifeCount === LifeCountValues.ONE);
                const date = new Date();
                if (this.lifeTime === LifeTimeValues.HOUR) {
                    date.setHours(date.getHours() + 1);
                } else if (this.lifeTime === LifeTimeValues.DAY) {
                    date.setDate(date.getDate() + 1);
                } else {
                    date.setMinutes(date.getMinutes() + 5); // 5 min by default
                }
                req.dateExpired = date;
                // noinspection JSValidateTypes
                /** @type {Fl32_Ap_User_Shared_Service_Route_SignUp_Code_Create.Response} */
                const res = await gate.send(req, route);
                this.loading = false;
                if (res) {
                    try {
                        // compose URL to sign up
                        const host = `https://${config.urlBase}`;
                        const door = `/${DEF.SHARED.DOOR_PUB}/#`;
                        const route = DEF.DOOR_PUB_ROUTE_sign_Up_code_Check.replace(':code', res.code);
                        const url = `${host}${door}${route}`;
                        // open sharing options or print out sign up link to console
                        if (self.navigator.share) {
                            // smartphone mode
                            const data = {
                                title: this.$t('admin.route.user.invite.share.title'),
                                text: this.$t('admin.route.user.invite.share.message'),
                                url,
                            };
                            await self.navigator.share(data);
                        } else {
                            // browser mode
                            console.log(`sign up url: ${url}`);
                        }
                    } catch (e) {
                        this.message = e.message;
                        console.log(e.message);
                    }
                }
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
