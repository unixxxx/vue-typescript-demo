<template>
  <div class="card text-white bg-info mb-3" style="max-width: 18rem;">
    <div class="card-header">
      {{stock.name}}
      <small>(price: {{stock.price | price | currency}})</small>
    </div>
    <div class="card-body d-flex">
      <input
        type="number"
        min="1"
        class="form-control"
        placeholder="Quantity"
        v-model.number="quantity"
      >
      <button
        class="btn"
        :class="{'btn-primary': !insufficientFunds, 'btn-danger': insufficientFunds}"
        @click="buyStock"
        :disabled="quantity <= 0 || !Number.isInteger(quantity)"
      >{{insufficientFunds? 'Insufficient funds':'Buy'}}</button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { createNamespacedHelpers } from "vuex";
import { Stock } from "@/models/stock.ts";
import { Order } from "@/models/order.ts";

const { mapGetters } = createNamespacedHelpers("portfolio");

export default Vue.extend({
  props: ["stock"],
  computed: {
    ...mapGetters(["funds"]),
    insufficientFunds() {
      return this.quantity * this.stock.price > this.funds;
    }
  },
  data() {
    return {
      quantity: 0
    };
  },
  methods: {
    buyStock() {
      const order = {
        stockId: this.stock.id,
        price: this.stock.price,
        quantity: this.quantity
      };
      if (!this.insufficientFunds) {
        this.$store.dispatch("stocks/BUY_STOCK", order);
      }
      this.quantity = 0;
    }
  }
});
</script>

<style lang="scss" scoped>
.card {
  margin: 10px;
}
.btn {
  margin-left: 5px;
  height: calc(2.25rem + 2px);
}
</style>

