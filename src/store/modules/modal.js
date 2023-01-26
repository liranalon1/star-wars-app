export default {
    state: {
        isActive: false,
        item: {
            index: null,
            data: {},
        }
    },
    getters: {
        modal: state => state,
    },
    mutations: {
        SHOW_MODAL(state, data){
            state.isActive = data
        },
        SET_MODAL_DATA(state, data){
            state.item.data = data.item
            state.item.index = data.index
        },
        CLEAR_MODAL_DATA(state, data){
            state.item.data = data
        },   
    },
    actions: {
        showModal({ commit }, data){
            commit('SHOW_MODAL', data)
        },
        setModalData({ commit }, data){
            commit('SET_MODAL_DATA', data);
        },
        clearModalData({ commit }, data){
            commit('CLEAR_MODAL_DATA', data);
        }
    },
}