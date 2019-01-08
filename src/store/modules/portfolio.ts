import { Stock } from "@/models/stock";
import { RootState } from "../store";
import { Module, GetterTree, ActionTree, MutationTree } from "vuex";
import { Order } from "@/models/order";

export interface PortfolioState {
  funds: number;
  orders: Order[];
}

const state: PortfolioState = {
  funds: 5000,
  orders: []
};

const mutations: MutationTree<PortfolioState> = {
  BUY_STOCK(state: PortfolioState, payload: Order) {
    const record = state.orders.find(it => it.stockId == payload.stockId);
    if (record) {
      record.quantity += payload.quantity;
    } else {
      state.orders.push(payload);
    }
    state.funds -= payload.price * payload.quantity;
  },

  SELL_STOCK(state: PortfolioState, payload: Order) {
    const record = state.orders.find(it => it.stockId == payload.stockId);
    if (record) {
      if (record.quantity > payload.quantity) {
        record.quantity -= payload.quantity;
      } else {
        state.orders.splice(state.orders.indexOf(record), 1);
      }
      state.funds += payload.price * payload.quantity;
    }
  },
  SET_FUNDS(state: PortfolioState, payload: number) {
    state.funds = payload;
  },
  SET_ORDERS(state: PortfolioState, payload: Order[]) {
    state.orders = payload;
  }
};

const actions: ActionTree<PortfolioState, RootState> = {
  SELL_STOCK(context: any, order: Order) {
    context.commit("SELL_STOCK", order);
  }
};

const getters: GetterTree<PortfolioState, RootState> = {
  orders(
    state: PortfolioState,
    getters: any,
    rootState: any,
    rootGetters: any
  ) {
    return state.orders.map(order => {
      const record: Stock = rootGetters["stocks/stocks"].find(
        (it: Stock) => it.id == order.stockId
      );
      return {
        id: order.stockId,
        quantity: order.quantity,
        name: record.name,
        price: record.price
      };
    });
  },
  funds(state: PortfolioState) {
    return state.funds;
  }
};

export const PortfolioModule: Module<PortfolioState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
