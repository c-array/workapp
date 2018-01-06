import Vue from 'vue'
import Vuex from 'vuex'
import day from './modules/day';
import stats from './modules/statistics';
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        common:{
            namespaced: true,
            modules:{
                day:day,
                stats:stats,
            }
        }
    }
})