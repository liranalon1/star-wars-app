export default {
    state: () => ({
        isActive: false,
    }),
    getters: {
        loader: state => state,
    },
    mutations: {
        SET_LOADER(state, loaderStatus){
            state.isActive = loaderStatus
        },
    },
    actions: {
        showLoader({ commit }, data){
            commit('SET_LOADER', data)
        },
    },
}