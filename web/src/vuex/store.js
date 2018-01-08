import Vue from 'vue'
import Vuex from 'vuex'
import day from './modules/day';
import colleague from './modules/colleague';
import department from './modules/department';
import item from './modules/item';
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        common:{
            namespaced: true,
            state:{
                userInfo:localStorage.userInfo ? JSON.parse(localStorage.userInfo) : {}
            },
            modules:{
                day:day,
                colleague:colleague,
                department:department,
                item:item
            }
        }
    }
})