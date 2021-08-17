/**
 * Plugin finalization function.
 */
// MODULE'S VARS
const NS = 'Fl32_Ap_Back_Plugin_Stop';

export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {TeqFw_Db_Back_Api_IConnect} */
    const connect = spec['TeqFw_Db_Back_Api_IConnect$'];

    // COMPOSE RESULT
    async function exec() {
        await connect.disconnect();
    }

    Object.defineProperty(exec, 'name', {value: `${NS}.${exec.name}`});
    return exec;
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
