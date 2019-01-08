<template>
  <div class="card-group">
    <app-portfolio-stock v-for="order in orders" :key="order.id" :order="order"></app-portfolio-stock>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { createNamespacedHelpers } from "vuex";

import StockComponent from "@/components/portfolio/Stock.vue";

const { mapGetters } = createNamespacedHelpers("portfolio");

export default Vue.extend({
  computed: {
    ...mapGetters(["orders"])
  },
  components: {
    "app-portfolio-stock": StockComponent
  }
});
</script>

