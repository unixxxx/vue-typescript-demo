<template>
  <div id="app">
    <app-header></app-header>
    <div class="container">
      <transition name="slide">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "@/components/layout/Header.vue";

export default Vue.extend({
  components: {
    "app-header": Header
  }
});
</script>

<style lang="scss" scoped>
.slide-enter-active {
  animation: slide-in 500ms ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>



