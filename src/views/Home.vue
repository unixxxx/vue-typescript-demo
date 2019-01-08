<template>
  <div class="home">
    <h1>Trade or View your Portfolio</h1>
    <h6>You may save or load your data</h6>
    <h6>Click on 'End Day' to begin a New Day!</h6>
    <hr>
    <p>Your funds: {{funds | price | currency}}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("portfolio");

export default Vue.extend({
  computed: mapGetters(["funds"])
});
</script>
