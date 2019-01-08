import { Stock } from "@/models/stock";
import { Order } from "@/models/order";
import { stocks } from "@/data/stocks";
import { StockState } from "./stocks";
import { RootState } from "../store";
import { Module, GetterTree, ActionTree, MutationTree } from "vuex";

export interface StockState {
  stocks: Stock[];
}

const state: StockState = {
  stocks: []
};

const mutations: MutationTree<StockState> = {
  SET_STOCKS(state: StockState, stocks: Stock[]) {
    state.stocks = stocks;
  },
  RANDOM_STOCKS(state: StockState) {
    state.stocks.forEach(stock => {
      stock.price = stock.price * (1 + Math.random() - 0.5);
    });
  }
};

const actions: ActionTree<StockState, RootState> = {
  BUY_STOCK(context: any, order: Order) {
    context.commit("portfolio/BUY_STOCK", order, { root: true });
  },
  SET_STOCKS(context: any) {
    context.commit("SET_STOCKS", stocks);
  },
  RANDOMIZE_STOCKS(context: any) {
    context.commit("RANDOM_STOCKS");
  }
};

const getters: GetterTree<StockState, RootState> = {
  stocks: (state: StockState) => {
    return state.stocks;
  }
};

export const StocksModule: Module<StockState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
