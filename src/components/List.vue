<template>
    <div id="list">
        <div class="container">
            <a href="/" class="goBack">&#10140;</a>
            <h1>{{route.name}}</h1>

            <ModalForm
                :title="modalData.title" 
                :btnText="modalData.btnText"
                :action="modalData.action"
            />

            <div class="main-table" v-if="tableIsReady">
                <ul class="flex table-row table-header">
                    <li v-for="(item, index) in tableListKeys" :key="index">
                        {{item.replaceAll('_',' ')}}
                    </li>
                    <li></li>
                </ul>

                <div class="table-wrap">
                    <ul class="flex table-row row-collection" v-for="(item, index) in tableList" :key="index">
                        <li v-for="(item, index) in Object.values( tableList[index] )" :key="index">{{item}}</li>
                        <li class="buttons flex">
                            <button class="edit" @click="handleModal({action:'edit', itemData: item, index: index })"><img src="/src/assets/images/list/edit.svg" />Edit</button>
                            <button class="delete" @click="handleModal({action:'confirmDelete', itemData: item, index: index })" v-if="tableList.length > 1"><img src="/src/assets/images/list/delete.svg" />Delete</button>
                        </li>
                    </ul>
                </div>

                <pagination v-model="store.getters.table.pageNumber" :records="tableData.totalPages" :per-page="10" @paginate="handlePagination"/>

                <button class="btn create" 
                    @click="handleModal({
                            action:'create',
                            itemData: tableListKeys.reduce((accumulator, currentValue) => ({ ...accumulator, [currentValue]: ''}), {}),
                            index: tableList.length+1
                        })">
                        Create
                    </button>
                <button class="btn reset" @click="resetList()">Reset List</button>
            </div> 
        </div>
    </div>
</template>
    
<script setup>
    import ModalForm from '/src/components/Form.vue'
    import { computed, reactive, ref } from 'vue'
    import { useRoute } from 'vue-router'
    import { useStore } from 'vuex'
    import Pagination from 'v-pagination-3';
    import baseURL from "/src/services/api";
    import getData from "/src/services/utils";

    const store = useStore()
    const route = useRoute();
    const tableData = computed(() => store.getters.table);
    const tableList = computed(() => filteredList(store.getters.table.list));
    const tableListKeys = computed(() => Object.keys( filteredList(store.getters.table.list)[0] ));
    let tableIsReady = ref(false);
    let modalData = reactive({
        show: false,
        title: '',
        btnText: '',
        action: '',
    });

    function filteredList(arr) {
        switch( route.name ){
            case "people":
                return arr.map( ({name, gender, birth_year, height, mass}) => ({ name, gender, birth_year, height, mass }));
            case "films":
                return arr.map( ({title, episode_id, producer, release_date, director}) => ({ title, episode_id, producer, release_date, director }));
            case "species":
                return arr.map( ({name, classification, designation, average_height, language}) => ({ name, classification, designation, average_height, language }));
            case "vehicles":
                return arr.map( ({name, model, cost_in_credits, length, max_atmosphering_speed}) => ({ name, model, cost_in_credits, length, max_atmosphering_speed }));
            case "starships":
                return arr.map( ({name, model, cost_in_credits, length, max_atmosphering_speed}) => ({ name, model, cost_in_credits, length, max_atmosphering_speed }));  
            case "planets":
                return arr.map( ({name, gravity, orbital_period, population, terrain}) => ({ name, gravity, orbital_period, population, terrain })); 
        }
    }

    function handlePagination(callback){
        store.dispatch('setPageNumber', callback);
        initCategory();
    }

    function handleModal({action, itemData, index}){
        const exp = action;
        switch( exp ){
            case "edit":
                modalData.title = 'Edit Item';
                modalData.btnText = 'Edit';
                modalData.action = 'edit';
                break;
            case "create":
                modalData.title = 'Create Item';
                modalData.btnText = 'Create';
                modalData.action = 'create';
                break;
            case "confirmDelete":
                modalData.title = 'Delete Item';
                modalData.action = 'confirmDelete';
                break;                
            default:  
        } 
        store.dispatch('setModalData', {item: itemData, index: index});
        store.dispatch('showModal', true);
    }

    function resetList() {
        initCategory();
    }

    function sortedArray(arr){
        return arr.sort((a, b) => a.name > b.name ? 1 : -1);
    }

    function initCategory() {
        store.dispatch('showLoader', true);
        const apiPage = `${baseURL}/${route.name}/?page=${store.getters.table.pageNumber}`;
        getData(apiPage).then((data) => {
            store.dispatch(
                'setTableData', 
                {data: data, categoryName: route.name}
            );
            tableIsReady.value = true;
            store.dispatch('showLoader', false);
        });
    }

    function init() {
        const categoryNameAndListExist = store.getters.table.tableName === route.name && store.getters.table.list.length ? true : false;
        if(categoryNameAndListExist) {
            tableIsReady.value = true;
            return;
        }
        store.dispatch('setPageNumber', 1); //  if the category doesn't exist on store --> reset the page number to 1
        initCategory();
    }

    init();
</script>

<style lang="scss" scoped>
    @import "../assets/scss/global.scss";
    @import "../assets/scss/variables.scss";

    #list{
        margin: 20px auto;
        padding: 0 20px;

        .container{
            position: relative;
            max-width: 1300px;
            margin: 0 auto;
        }
        .goBack{
            position: absolute;
            top: 0;
            left: 0;
            font-size: 40px;
            color: $gold-color;
            transform: rotate(-180deg);         
        }
        h1{
            text-transform: capitalize;
            font-size: 40px;
            font-weight: 700;
            margin: 40px auto;
            text-align: center;
            color: $gold-color;
        }
        .table-row{
            justify-content: space-between;
            border: 1px solid #4e4e4e;
            &:nth-child(even){
                background-color: $secondary-color;
            }

            li{
                flex: 1;
                padding: 10px;                
            }
        }

       
        
        .table-header{
            font-size: 18px;
            font-weight: 700;
            border: none;
            
            li{
                text-transform: capitalize;
            }
        }

        .table-wrap{
            max-height: 530px;
            overflow-x: hidden;
            overflow-y: auto;     

            ul.row-collection{
                transition: 0.2s;

                &:first-child{
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                }
                &:last-child{
                    border-bottom-right-radius: 5px;
                    border-bottom-left-radius: 5px;
                }
                &:hover{
                    background: rgba(245,197,24,0.11);

                    li{
                        &.buttons{
                            .edit, .delete{
                                display: flex;
                            }
                        }
                    }                    
                }

                li{

                    &.buttons{
                        gap: 30px;
                        .edit, .delete{
                            display: none;
                            align-items: center;
                            gap: 6px;
                        }
                    }
                }
            }
        }
                
        .btn{
            display: inline-flex;
            margin: 20px 0;
            &.reset{
                margin-inline-start: 15px;
            }
        }

        /* VuePagination */
        :deep(.VuePagination) {
            margin-top: 15px;

            nav{
                ul{
                    display: flex;
                    gap: 10px;

                    li{
                        .page-link{
                            background: #4e4e4e;
                            border-radius: 5px;
                            
                            min-width: 32px;
                            min-height: 32px;
                            display: grid;
                            place-items: center;
                            font-size: 14px;  
                            &:hover{
                                background: rgba(245, 197, 24, 0.11);
                            }
                            &.active{
                                background: $gold-color;
                                color: $secondary-color;
                            }
                        }

                        &.VuePagination__pagination-item-prev-chunk,
                        &.VuePagination__pagination-item-next-chunk{
                            display: none;
                        }
                    }
                }
                p{
                        margin-top: 10px;
                }
            }
        }
    }

    @media (max-width: 768px) {

    }

    @media (max-width: 640px) {
        #list {
            .goBack{
                font-size: 30px;
            }
            h1{
                font-size: 30px;
            }
        
            .main-table{
                overflow-x: auto;
                width: fit-content;
                .table-header{
                    font-size: 14px;
                }

                #list .table-wrap {
                    max-height: 350px;
                }

                ul.row-collection{
                    font-size: 12px;
                }

                ul li.buttons .edit,
                ul li.buttons .delete{
                    display: flex;
                }
            }
        }
    }  
</style>
