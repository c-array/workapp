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
                userInfo:localStorage.userInfo ? JSON.parse(localStorage.userInfo) : {},
                histogramConfig: {
                    callback(options) {
                        options.title.textStyle = {
                            color: "#666",
                            fontWeight: 'normal'
                        }
                        return options;
                    },
                    dataZoom: [
                        {
                            show: true,
                            start: 0,
                            end: 50,
                            handleIcon: 'M512 512m-494.933333 0a494.933333 494.933333 0 1 0 989.866666 0 494.933333 494.933333 0 1 0-989.866666 0Z',
                            handleSize: '200%',
                            backgroundColor: '#e4e7ed',
                            borderColor: '#e4e7ed',
                            fillerColor: "#409eff",
                            height: 6,//组件高度
                            dataBackground: {
                                lineStyle: {
                                    opacity: 0
                                },
                                areaStyle: {
                                    opacity: 0
                                }
                            },
                            handleStyle: {
                                color: "#fff",
                                borderWidth: 2,
                                borderColor: "#409eff"
                            }
                        },
                        {
                            type: 'inside',
                            start: 94,
                            end: 100
                        }
                    ],
                    chartSettings: {
                        labelMap: {
                            usedTime: '用时'
                        }
                    }
                },
                pieConfig: {
                    callback(options){
                        if(options.legend){
                            options.legend.top = "20%";
                        }
                        options.title.textStyle = {
                            color: "#666",
                            fontWeight: 'normal'
                        }
                        return options;
                    },
                    chartSettings: {
                        dimension: 'name',
                        metrics: 'usedTime',
                        dataType: 'KMB',
                        selectedMode: 'single',
                        hoverAnimation: false,
                        radius: 50,
                        offsetY: 170
                    }
                }
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