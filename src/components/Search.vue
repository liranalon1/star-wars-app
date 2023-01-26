<template>
    <div id="search" v-if="search.isReady">
        <img class="logo" src="/src/assets/images/star_wars_logo.png" alt="logo" />
        <input type="text" @input="onTyping" placeholder="Search for Star Wars Entities" autofocus />
        <SearchResults v-if="search.results.length" :results="search.results" :value="search.value"/>
    </div>
</template>
  
<script setup>
    import SearchResults from "/src/components/SearchResults.vue";
    import { reactive } from "vue";
    import { useStore } from "vuex";
    import baseURL from "/src/services/api";
    import getData from "/src/services/utils";

    const store = useStore();
    let categories = [];
    let searchTimeout = null;

    let search = reactive({
        isReady: false,
        value: "",
        results: [],
    });

    function onTyping(event) {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        searchTimeout = setTimeout(() => {
            handleSearch(event.target.value);
        }, 200);
    }

    function filterByIncludesValue(arr){
        return arr.filter( ({name, title}) => name?.toLowerCase().includes(search.value.toLowerCase()) 
            || 
            title?.toLowerCase().includes(search.value.toLowerCase()) ); 
    }

    function handleSearch(value) {
        store.dispatch('showLoader', true);
        search.value = value;
        search.results.splice(0);

        if (search.value !== "") {
            categories.forEach((category) => {
                const categoryURL = `${baseURL}/${category}?search=${search.value}`;
                getData(categoryURL).then((data) => {
                    const urlValue = categoryURL.split('?search=')[1];
                    if(urlValue === search.value){
                        setResults({ 
                            category: category, 
                            data: filterByIncludesValue(data.results)
                        });
                        store.dispatch('showLoader', false);
                    }
                });
            });
        } else {
            store.dispatch('showLoader', false);
        }
    }

    function setResults({category, data}) {
        if(data.length){
            let resultsObj = {
                category: category,
                list: data.slice(0, 3)
            }
            search.results.push(resultsObj);
        }
    }

    function initCategories() {
        store.dispatch('showLoader', true);
        getData(baseURL).then((data) => {
            categories = Object.keys(data);
            search.isReady = true;
            store.dispatch('showLoader', false);
        }); 
    }

    initCategories();
</script>

<style lang="scss" scoped>
    @import "../assets/scss/global.scss";
    @import "../assets/scss/variables.scss";

    #search{
        max-width: 500px;
        margin: 20px auto;
        .logo{
            width: 300px;
            height: 145px;
            display: block;
            margin: 40px auto;
        }

        .loader {
            position: relative;
            left: 0;
            right: 0;
            top: 30px;
            margin: 0 auto;
        }

        input{
            width: 100%;
            height: 40px;
            padding: 0 15px;
            box-shadow: 0 1px 3px 1px rgb(36 91 140 / 15%);
            border-radius: 50px;
            background: url("/src/assets/images/search.svg") no-repeat 20px center $primary-color;
            text-align: center;
            font-size: 18px;
            color: initial;
        }
        .no-results{
            text-align: center;
            margin: 10px 0;
        }
    }

    @media (max-width: 768px) {

    }

    @media (max-width: 640px) {
        #search{
            padding: 0 20px;
            .logo{
                width: 200px;
                height: auto;
                margin: 20px auto;
            }
            input {
                font-size: 16px;
            }
            
        }
    }  
</style>