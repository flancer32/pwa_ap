/**
 * Dialog to get receiving date from user and emit 'submit' event.
 *
 * @namespace Fl32_Ap_Front_Area_Pub_Widget_Cart_Submit
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Area_Pub_Widget_Cart_Submit';
const EVT_HIDE = 'onHide';
const EVT_SUBMIT = 'onSubmit';

// MODULE'S CLASSES

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Area_Pub_Widget_Cart_Submit
 * @returns {Fl32_Ap_Front_Area_Pub_Widget_Cart_Submit.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    const {formatDate, formatTime} = spec['TeqFw_Core_Shared_Util']; // ES6 destruct

    // DEFINE WORKING VARS
    const template = `
<q-dialog :model-value="display" @hide="$emit('${EVT_HIDE}')">
    <q-card style="min-width: 350px">
        <q-card-section class="t-grid gutter-xs align-items-center">
            <div class="q-gutter-md row items-start">
                <div>{{$t('wg.cart.submit.title')}}:</div>
                <div class="t-grid" style="grid-template-columns: 1fr 2fr 2fr 1fr;">
                    <div></div>
                    <q-input v-model="date"
                             :label="$t('wg.cart.submit.date')"
                             borderless
                             input-style="font-size: larger; color: var(--color-darker)"
                             readonly
                             v-on:click="displayDate=true"
                    />
                    <q-input v-model="time"
                             :label="$t('wg.cart.submit.time')"
                             borderless
                             input-style="font-size: larger; color: var(--color-darker)"
                             readonly
                             v-on:click="displayTime=true"
                    />
                    <div></div>
                </div>
            </div>
        </q-card-section>

        <q-card-actions align="center" class="text-primary">
            <q-btn color="primary" :label="$t('btn.cancel')" v-close-popup></q-btn>
            <q-btn color="primary" :label="$t('btn.ok')" v-close-popup v-on:click="submit"></q-btn>
        </q-card-actions>
    </q-card>
    <q-dialog :model-value="displayDate" @hide="displayDate=false">
        <q-date v-model="date" mask="YYYY/MM/DD"/>
        <q-btn color="primary" :label="$t('btn.close')" v-close-popup></q-btn>
    </q-dialog>
    <q-dialog :model-value="displayTime" @hide="displayTime=false">
        <q-time v-model="time"
                :format24h="true"
                :minute-options="[0, 15, 30, 45]"
                :with-seconds="false"
                mask="HH:mm"
        />
        <q-btn color="primary" :label="$t('btn.close')" v-close-popup></q-btn>
    </q-dialog>
</q-dialog>
`;

    // DEFINE INNER FUNCTIONS

    // MAIN FUNCTIONALITY

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Area_Pub_Widget_Cart_Submit
     */
    return {
        name: NS,
        template,
        components: {},
        data() {
            return {
                date: 'YYYY/MM/DD',
                displayDate: false,
                displayTime: false,
                time: 'HH:mm',
            };
        },
        props: {
            display: Boolean, // control hide/display the widget from parent
        },
        computed: {},
        methods: {
            submit() {
                const date = new Date(`${this.date} ${this.time}`);
                this.$emit(EVT_SUBMIT, date);
            }
        },
        watch: {},
        emits: [EVT_HIDE, EVT_SUBMIT],
        mounted() {
            const nowAndOne = new Date();
            nowAndOne.setHours(nowAndOne.getHours() + 1);
            this.date = formatDate(nowAndOne);
            this.time = formatTime(nowAndOne, false);
        },
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
