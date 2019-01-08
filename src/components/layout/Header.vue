<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <ul class="navbar-nav">
      <router-link :to="{name: 'home'}" class="nav-item" active-class="active" exact tag="li">
        <a class="nav-link">Home</a>
      </router-link>
      <router-link :to="{name: 'stocks'}" class="nav-item" active-class="active" tag="li">
        <a class="nav-link">Stocks</a>
      </router-link>
      <router-link :to="{name: 'portfolio'}" class="nav-item" active-class="active" tag="li">
        <a class="nav-link">Portfolio</a>
      </router-link>
    </ul>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a class="nav-link" href="#" @click.prevent="endDay">End Day</a>
      </li>
      <li class="nav-item dropdown" :class="{'show': isDropDownOpened}">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          @click="isDropDownOpened=!isDropDownOpened"
          :aria-expanded="isDropDownOpened"
        >Save & Load</a>
        <div
          class="dropdown-menu"
          :class="{'show': isDropDownOpened}"
          aria-labelledby="navbarDropdown"
        >
          <a class="dropdown-item" href="#" @click.prevent="loadData">Load Data</a>
          <a class="dropdown-item" href="#" @click.prevent="saveData">Save Data</a>
        </div>
      </li>
      <router-link :to="{name: 'about'}" class="nav-item" active-class="active" tag="li">
        <a class="nav-link">About</a>
      </router-link>
      <li class="nav-item funds">
        <span
          class="badge badge-pill"
          :class="{'badge-success': funds>0, 'badge-danger': funds<=0}"
        >{{funds | price | currency}}</span>
      </li>
    </ul>
  </nav>
</template>

<script>
import Vue from "vue";
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("portfolio");
const { mapActions } = createNamespacedHelpers("stocks");

export default Vue.extend({
  computed: mapGetters(["funds", "orders"]),
  methods: {
    ...mapActions(["RANDOMIZE_STOCKS"]),
    endDay() {
      this.RANDOMIZE_STOCKS();
    },
    saveData() {
      const data = {
        funds: this.funds,
        orders: this.orders,
        stocks: this.$store.getters["stocks/stocks"]
      };

      this.$store.dispatch("saveData", data);
    },
    loadData() {
      this.$store.dispatch("loadData");
    }
  },
  data() {
    return {
      isDropDownOpened: false
    };
  },
  created() {
    console.log(process.env.VUE_APP_API_URL);
  }
});
</script>

<style lang="scss" scoped>
li.funds {
  margin-top: 6px;
}
</style>


