<template>
    <div class="results">
        <div class="resultBox" v-for="{ category, list } in props.results" :key="category">
            <div class="category">{{ category }}</div>
            <ul>
                <li v-for="{ name, title } in list" :key="name" v-html="highlightMatchingText(name || title)"></li>
            </ul>
            <a class="btn" @click="goToCategoryPage(category)">View All</a>
        </div>
    </div>
</template>

<script setup>
    import router from "../router";
    
    const props = defineProps({
        results: Array,
        value: String,
    }) 

    function highlightMatchingText (text) {
        const searchText = props.value;
        if ( searchText ) {
            const pattern = new RegExp( searchText, 'i' );
            const highlightedText = text?.replace(
                pattern,
                `<span class="highlight">${searchText}</span>`
            );
            return highlightedText;
        }
    }

    function goToCategoryPage(category) {
        router.push({ name: category });
    }
</script>

<style lang="scss" scoped>
    @import "../assets/scss/global.scss";
    @import "../assets/scss/variables.scss";
    .results{
        width: 100%;
        max-height: 600px;
        border: 1px solid $secondary-color;
        margin-top: 10px;
        overflow: auto;
        background: $primary-color;
        .category{
            font-weight: 700; 
            font-size: 20px; 
            background-color: $secondary-color;
            padding: 5px 10px;
            text-transform: capitalize;
        }
        ul{
            display: flex;
            flex-direction: column;
            li{
                padding: 5px 10px;
                font-size: 16px;
                color: $secondary-color;

                :deep(.highlight) {
                    background-color: $gold-color;
                }
                
            }
        }
        .btn{
            margin: 10px auto;
        }
    }
</style>