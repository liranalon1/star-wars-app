import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import table from './modules/table'
import modal from './modules/modal'
import loader from "./modules/loader";

const store = createStore({
    modules: {
        table,
        modal,
        loader
    },
    plugins: [createPersistedState()],
})

export default store