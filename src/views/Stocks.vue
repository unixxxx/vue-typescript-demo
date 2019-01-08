<template>
  <div class="card-group">
    <app-stocks-stock v-for="stock in stocks" :key="stock.id" :stock="stock"></app-stocks-stock>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { createNamespacedHelpers } from "vuex";
import StockComponent from "@/components/stocks/Stock.vue";
import { Stock } from "@/models/stock.ts";

const { mapGetters } = createNamespacedHelpers("stocks");

export default Vue.extend({
  computed: {
    ...mapGetters(["stocks"])
  },
  created() {
    this.$store.dispatch("stocks/SET_STOCKS");
  },
  components: {
    "app-stocks-stock": StockComponent
  }
});
</script>

