<template>
  <div class="card text-white bg-danger mb-3" style="max-width: 18rem;">
    <div class="card-header">
      {{order.name}}
      <small>(price: {{order.price | price | currency}}) | (quantity: {{order.quantity}})</small>
    </div>
    <div class="card-body d-flex">
      <input
        type="number"
        min="1"
        :max="order.quantity"
        class="form-control"
        placeholder="Quantity"
        v-model.number="quantity"
      >
      <button
        class="btn btn-primary"
        @click="sellStock"
        :disabled="quantity <= 0 || !Number.isInteger(quantity)"
      >sell</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Order } from "@/models/order";

export default Vue.extend({
  props: ["order"],

  data() {
    return {
      quantity: 0
    };
  },
  methods: {
    sellStock() {
      if (this.quantity <= this.order.quantity) {
        const order: Order = {
          stockId: this.order.id,
          price: this.order.price,
          quantity: this.quantity
        };
        this.$store.dispatch("portfolio/SELL_STOCK", order);
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

