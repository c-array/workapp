import Vue from 'vue'
import Vuex from 'vuex'
import main from './modules/main';
import day from './modules/my/day';
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        main,
        day
    }
})