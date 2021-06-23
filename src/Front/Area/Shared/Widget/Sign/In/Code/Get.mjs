/**
 * Widget to enter email to get sign-in link.
 *
 * @namespace Fl32_Ap_Front_Area_Shared_Widget_Sign_In_Code_Get
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Area_Shared_Widget_Sign_In_Code_Get';
const TIMEOUT = 3000;

// MODULE'S CLASSES

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Area_Shared_Widget_Sign_In_Code_Get
 * @returns {Fl32_Ap_Front_Area_Shared_Widget_Sign_In_Code_Get.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Defaults} */
    const DEF = spec['Fl32_Ap_Defaults$'];
    /** @type {TeqFw_Core_Front_Data_Config} */
    const config = spec[DEF.MOD_CORE.DI_CONFIG]; // instance singleton
    /** @type {Function|Fl32_Ap_User_Front_Gate_SignIn_Code_Send.gate} */
    const gateSend = spec['Fl32_Ap_User_Front_Gate_SignIn_Code_Send$']; // function singleton
    /** @type {typeof Fl32_Ap_User_Shared_Service_Route_SignIn_Code_Send.Request} */
    const ReqSend = spec['Fl32_Ap_User_Shared_Service_Route_SignIn_Code_Send#Request']; // class

    // DEFINE WORKING VARS
    const template = `
<layout-centered>
  <div class="t-grid rows gutter-md" style="padding: var(--padding-grid); min-width: 80vw;" v-show="!displayMsg">
        <div>{{$t('wg.sign.in.code.get.title')}}</div>
        <div>
            <q-input class="id-email"
                     :hint="$t('wg.sign.in.code.get.email.hint')"
                     :label="$t('wg.sign.in.code.get.email.label')"
                     :loading="loading"
                     :stack-label="true"
                     autocomplete="email"
                     bottom-slots
                     outlined
                     v-model="fldEmail"
            ></q-input>
            <div class="actions">
                <q-btn :label="$t('btn.submit')"
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

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Area_Shared_Widget_Sign_In_Code_Get
     */
    return {
        name: NS,
        template,
        data() {
            return {
                displayMsg: false,
                fldEmail: null,
                loading: false,
                msg: null,
            };
        },
        methods: {
            async onSubmit() {
                this.loading = true;
                const req = new ReqSend();
                req.email = this.fldEmail;
                req.realm = config.realm;
                /** @type {Fl32_Ap_User_Shared_Service_Route_SignIn_Code_Send.Response} */
                const res = await gateSend(req);
                this.loading = false;
                const opts = {email: this.fldEmail};
                if (res.isSent) {
                    this.msg = this.$t('wg.sign.in.code.get.msg.success', opts);

                } else {
                    this.msg = this.$t('wg.sign.in.code.get.msg.failure', opts);
                }
                this.displayMsg = true;
                setTimeout(() => {
                    this.displayMsg = false;
                    this.fldEmail = null
                }, TIMEOUT);
            },
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
