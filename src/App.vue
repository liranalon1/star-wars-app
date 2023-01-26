<template>
  <main>
    <Loader />
    <router-view />
  </main>

</template>

<script setup>
  import Loader from "/src/components/Loader.vue";
</script>

<style lang="scss">
  @import "/src/assets/scss/reset.scss";
  @import "/src/assets/scss/global.scss";
  @import "/src/assets/scss/variables.scss";
  @import "https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap";

  body{
    background: #272b30;
  }

  #app {
    color: $primary-color;
    font-family: $primary-font;
  }
</style>
