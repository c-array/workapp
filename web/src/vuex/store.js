import Vue from 'vue'
import Vuex from 'vuex'
import day from './modules/day';
import colleague from './modules/colleague';
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        common:{
            namespaced: true,
            modules:{
                day:day,
                colleague:colleague,
            }
        }
    }
})