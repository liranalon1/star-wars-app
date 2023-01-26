<template>
  <div class="loader" v-if="loaderIsActive"></div>
</template>

<script setup>
  import { computed } from "vue";
  import { useStore } from "vuex";
  const store = useStore();
  const loaderIsActive = computed(() => store.getters.loader.isActive);
</script>

<style lang="scss" scoped>
@import "../assets/scss/global.scss";
@import "../assets/scss/variables.scss";

.loader {
  position: fixed;
  z-index: 10;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 5px solid $primary-color;
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
  border-top: 5px solid $gold-color;
  border-radius: 50%;
  width: 50px;
  height: 50px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
