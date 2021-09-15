/**
 * Plugin finalization function.
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Back_Plugin_Stop';

export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {TeqFw_Db_Back_Api_RDb_IConnect} */
    const connect = spec['TeqFw_Db_Back_Api_RDb_IConnect$'];

    // COMPOSE RESULT
    async function action() {
        await connect.disconnect();
    }

    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});
    return action;
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
