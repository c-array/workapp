import Vue from 'vue';
import http from '../../public/js/http';
import { formatDate } from '../../public/js/common';
export default {
    namespaced: true,
    state: {
        vm:{
            itemList:'',
            charts:1,
            empty:false,
            loading:true
        },
        formModel:{
            type:'',
            itemId:''
        },
        peopleList:[],
        chartData:{
            name:"",
            peopleData:{
                columns:['realname', '用时'],
                rows:[]
            }
        }
    },
    mutations: {
        getList(state,params){
            state.vm.loading = true;
            http.post({
                url:'/statsPeople',
                data:state.formModel,
                type:'json',
                success: data => {
                    data.forEach(function(item,key){
                        item.count = 0;
                        item.dailies.forEach(function(obj,index){
                            item.count = item.count + obj.usedTime;
                        })
                    })
                    state.peopleList = data;
                },
                error: msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        },
        getItemList(state, params) {
            if (state.formModel.type) {
                http.post({
                    url: '/getPrItem',
                    data: state.formModel,
                    type: 'json',
                    success: data => {
                        state.formModel.itemId = '';
                        state.vm.itemList = data;
                        this.commit('common/people/getList');
                    },
                    error: msg => {
                        Vue.$vux.toast.text(msg, 'top');
                    }
                })
            } else {
                state.formModel.itemId = '';
                state.vm.itemList = [];
                this.commit('common/people/getList');
            }
        },
        getPeopleItem(state, itemId){
            state.vm.loading = true;
            http.post({
                url: '/statsPeople',
                data: {
                    itemId:itemId
                },
                type: 'json',
                success: data => {
                    setTimeout(_ => {
                        state.vm.loading = false;
                        state.vm.empty = false;
                        let arr = [];
                        data[0].dailies.forEach((item,key) => {
                            arr.push({
                                realname:item.realname,
                                用时:item.usedTime.toFixed(2)
                            })
                        })
                        state.chartData.peopleData.rows = arr;
                        state.chartData.name = data[0].prName;
                    },300)
                },
                error: msg => {
                    state.vm.empty = true;
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        },
        export(state,params){
            http.post({
                url:'/exportPeople',
                data:state.formModel,
                type:'json',
                success: url => {
                    window.location.href = "http://192.168.1.8:8000" + url;
                    //state.peopleList = data;
                },
                error: msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        }
    }
}
