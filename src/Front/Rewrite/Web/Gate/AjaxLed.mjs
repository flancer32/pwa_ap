/**
 * @implements TeqFw_Web_Front_Api_Gate_IAjaxLed
 */
export default class Fl32_Ap_Front_Rewrite_Web_Gate_AjaxLed {

    on() {
        console.log('AP app: Ajax LED On');
    }

    off() {
        console.log('AP app: Ajax LED Off');
    }

    reset() {
        console.log('AP app: Ajax LED Reset');
    }

}
