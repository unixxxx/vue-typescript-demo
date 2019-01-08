import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

import { StocksModule } from './modules/stocks';
import { PortfolioModule } from './modules/portfolio';

import axios from 'axios';
import { Order } from '@/models/order';

Vue.use(Vuex);

export interface RootState {
    version: string;
}

const store: StoreOptions<RootState> = {
    state: { version: '1.0' },
    actions: {
        saveData(context: any, order: any) {
            axios.put(process.env.VUE_APP_API_URL + '/data.json', order);
        },
        loadData(context: any) {
            axios
                .get(process.env.VUE_APP_API_URL + '/data.json')
                .then(response => {
                    const data = response.data;
                    const orders: Order[] = response.data.orders.map(
                        (order: any) => {
                            return <Order>{
                                stockId: order.id,
                                price: order.price,
                                quantity: order.quantity
                            };
                        }
                    );
                    context.commit('portfolio/SET_FUNDS', data.funds);
                    context.commit('stocks/SET_STOCKS', data.stocks);
                    context.commit('portfolio/SET_ORDERS', orders);
                });
        }
    },
    modules: { stocks: StocksModule, portfolio: PortfolioModule }
};

export default new Vuex.Store<RootState>(store);
