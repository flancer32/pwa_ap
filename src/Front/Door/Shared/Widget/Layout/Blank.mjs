/**
 * Blank layout widget.
 *
 * @namespace Fl32_Ap_Front_Door_Shared_Widget_Layout_Blank
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Front_Door_Shared_Widget_Layout_Blank';

// MODULE'S CLASSES

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Ap_Front_Door_Shared_Widget_Layout_Blank
 * @returns {Fl32_Ap_Front_Door_Shared_Widget_Layout_Blank.vueCompTmpl}
 */
function Factory() {
    // DEFINE WORKING VARS
    const template = `
<div>
    <slot />
</div>
`;

    // DEFINE INNER FUNCTIONS

    // MAIN FUNCTIONALITY

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Ap_Front_Door_Shared_Widget_Layout_Blank
     */
    return {
        name: NS,
        template,
    };
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
