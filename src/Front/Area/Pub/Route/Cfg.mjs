/**
 * Route widget for app configuration in 'pub' realm.
 *
 * @namespace Fl32_Ap_Front_Area_Pub_Route_Cfg
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Area_Pub_Route_Cfg';
const LANG_LV = 'lv';
const LANG_RU = 'ru';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Area_Pub_Route_Cfg
 * @returns {Fl32_Ap_Front_Area_Pub_Route_Cfg.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Ap_Defaults} */
    const DEF = spec['Fl32_Ap_Defaults$']; // instance singleton
    const i18n = spec[DEF.MOD_I18N.DI.I18N]; // named singleton
    /** @type {Fl32_Ap_Front_Area_Shared_Idb} */
    const idb = spec['Fl32_Ap_Front_Area_Shared_Idb$']; // instance singleton
    /** @type {Fl32_Ap_Front_Area_Pub_Model_Cart} */
    const mCart = spec['Fl32_Ap_Front_Area_Pub_Model_Cart$']; // instance singleton
    /** @type {Fl32_Ap_Front_Area_Pub_Model_Profile} */
    const mProfile = spec['Fl32_Ap_Front_Area_Pub_Model_Profile$']; // instance singleton

    // DEFINE WORKING VARS
    const template = `
<layout-base>
    <div class="q-pa-xs q-gutter-xs">
        <q-card>
            <q-card-section class="t-grid rows gutter-xs">
                <q-input v-model="profile.name"
                         :label="$t('pub.route.cfg.user.name.label')"
                         :hint="$t('pub.route.cfg.user.name.hint')"
                         input-style="font-size: larger; color: var(--color-darker)"
                         outlined
                />
                <q-input v-model="profile.email"
                         :label="$t('pub.route.cfg.user.email.label')"
                         :hint="$t('pub.route.cfg.user.email.hint')"
                         input-style="font-size: larger; color: var(--color-darker)"
                         outlined
                />
                <q-card-actions align="center">
                    <q-btn 
                        color="primary"
                        :loading="btnSaveLoad"
                        v-on:click="onProfileSave"
                    >{{$t('btn.save')}}</q-btn>
                </q-card-actions>
            </q-card-section>
        </q-card>
        <q-card>
            <q-card-section>
                <div class="text-subtitle2">{{$t('pub.route.cfg.lang.title')}}</div>
                <q-option-group
                        :options="optsLang"
                        inline
                        v-model="fldLang"
                ></q-option-group>
            </q-card-section>
        </q-card>
        <q-card>
            <q-card-section>
                <div class="text-body2 text-center" v-if="!cleanIsActive">
                    {{$t('pub.route.cfg.user.clean.info')}}
                </div>
                <div class="text-body2 text-center" v-if="cleanIsActive">
                    {{$t('pub.route.cfg.user.clean.success')}}
                </div>
                <q-card-actions align="center">
                    <q-btn 
                        color="primary"
                        v-on:click="onClean"
                    >{{$t('btn.delete')}}</q-btn>
                </q-card-actions>
            </q-card-section>
        </q-card>
    </div>
</layout-base>
`;

    // DEFINE INNER FUNCTIONS

    // MAIN FUNCTIONALITY

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Area_Pub_Route_Cfg
     */
    return {
        name: NS,
        template,
        components: {},
        data: function () {
            return {
                btnSaveLoad: false,
                cleanIsActive: false, // true - if cleaning process is active
                fldLang: null,
                /** @type {Fl32_Ap_Front_Area_Pub_Dto_Profile} */
                profile: null,
            };
        },
        computed: {
            email() {
                return 'alex.flancer64.com';
            },
            name() {
                return null;
            },
            optsLang() {
                return [
                    {label: this.$t('pub.route.cfg.lang.value.lv'), value: LANG_LV},
                    {label: this.$t('pub.route.cfg.lang.value.ru'), value: LANG_RU},
                ];
            },
        },
        methods: {
            async onClean() {
                await idb.delete();
                await mCart.clean();
                this.cleanIsActive = true;
                setTimeout(() => this.cleanIsActive = false, 2000);
            },
            async onProfileSave() {
                this.btnSaveLoad = true;
                await mProfile.update(this.profile);
                this.btnSaveLoad = false;
            },
        },
        watch: {
            fldLang(current, old) {
                if (current !== old && (current === LANG_RU || current === LANG_LV)) {
                    i18n.changeLanguage(current);
                }
            }
        },
        async created() {
            this.profile = mProfile.getData();
        },
        mounted() {
            this.fldLang = i18n.language;
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
