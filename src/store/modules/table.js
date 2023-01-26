export default {
    state: {
        tableName: "",
        list: [],
        nextPage: null,
        previousPage: null,
        totalPages: null,
        pageNumber: 1,
    },
    getters: {
        table: state => state,
    },
    mutations: {
        SET_TABLE_DATA(state, {categoryName, data}){
            state.tableName = categoryName
            state.list = data.results
            state.previousPage = data.previous
            state.nextPage = data.next
            state.totalPages = data.count
        },
        DELETE_TABLE_ITEM(state, index){
            state.list.splice(index,1);
        },
        UPDATE_TABLE_ITEM(state, data){
            state.list.splice(data.index, 1, data.data);
        },
        CREATE_TABLE_ITEM(state, data){
            state.list.push(data);
        },
        SET_PAGE_NUMBER(state, data){
            state.pageNumber = data
        },
    },
    actions: {
        setTableData({ commit }, data){
            commit('SET_TABLE_DATA', data);
        },
        deleteTableItem({ commit }, index){
            commit('DELETE_TABLE_ITEM', index);
        },
        updateTableItem({ commit }, data){
            commit('UPDATE_TABLE_ITEM', data);
        },
        createTableItem({ commit }, data){
            commit('CREATE_TABLE_ITEM', data);
        },
        setPageNumber({ commit }, data){
            commit('SET_PAGE_NUMBER', data);
        }
    },
}