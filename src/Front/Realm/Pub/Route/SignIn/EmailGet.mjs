/**
 * Route widget to enter email to get one-time link for sign-in.
 *
 * @namespace Fl32_Ap_Front_Realm_Pub_Route_SignIn_EmailGet
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Realm_Pub_Route_SignIn_EmailGet';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Realm_Pub_Route_SignIn_EmailGet
 * @returns {Fl32_Ap_Front_Realm_Pub_Route_SignIn_EmailGet.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Defaults} */
    const DEF = spec['Fl32_Ap_Defaults$']; // instance singleton
    /** @function {@type Fl32_Ap_User_Front_Gate_SignIn_Code_Send.gate} */
    const gateSend = spec['Fl32_Ap_User_Front_Gate_SignIn_Code_Send$']; // function singleton
    /** @type {typeof Fl32_Ap_User_Shared_Service_Route_SignIn_Code_Send.Request} */
    const ReqSend = spec['Fl32_Ap_User_Shared_Service_Route_SignIn_Code_Send#Request']; // class
    const {mapMutations, mapState} = spec[DEF.MOD_VUE.DI_VUEX]; // ES6 module

    // DEFINE WORKING VARS
    const template = `
<layout-centered>
  <div class="t-grid rows gutter-md" style="padding: var(--padding-grid);" v-show="!displayMsg">
        <div>{{$t('pub:route.signIn.code.get.title')}}</div>
        <div>
            <q-input class="id-email"
                     :hint="$t('pub:route.signIn.code.get.email.hint')"
                     :label="$t('pub:route.signIn.code.get.email.label')"
                     :loading="loading"
                     :stack-label="true"
                     autocomplete="email"
                     bottom-slots
                     outlined
                     v-model="fldEmail"
            ></q-input>
            <div class="actions">
                <q-btn :label="$t('shared:btn.submit')"
                       :disabled="loading"
                       color="primary"
                       v-on:click="onSubmit"
                ></q-btn>
            </div>
        </div>
    </div>
    <div v-show="displayMsg" style="padding: var(--padding-grid); text-align: center">
        <div>{{msg}}</div>
    </div>
</layout-centered>
`;

    // DEFINE INNER FUNCTIONS

    // MAIN FUNCTIONALITY

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Realm_Pub_Route_SignIn_EmailGet
     */
    return {
        name: NS,
        template,
        components: {},
        data: function () {
            return {
                displayMsg: false,
                fldEmail: null,
                loading: false,
                msg: null,
            };
        },
        computed: {},
        methods: {
            async onSubmit() {
                this.loading = true;
                const req = new ReqSend();
                req.email = this.fldEmail;
                /** @type {Fl32_Ap_User_Shared_Service_Route_SignIn_Code_Send.Response} */
                const res = await gateSend(req);
                this.loading = false;
                const opts = {email: this.fldEmail};
                if (res.isSent) {
                    this.msg = this.$t('pub:route.signIn.code.get.msg.success', opts);
                } else {
                    this.msg = this.$t('pub:route.signIn.code.get.msg.failure', opts);
                }
                this.displayMsg = true;
            },
        },
        created() {

        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
