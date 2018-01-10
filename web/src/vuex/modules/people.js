import Vue from 'vue';
import http from '../../public/js/http';
import { formatDate } from '../../public/js/common';
export default {
    namespaced: true,
    state: {
        peopleList:[]
    },
    mutations: {
        getList(){
            http.post({
                url:'/statsPeople',
                data:state.formModel,
                type:'json',
                success: data => {
                    data.forEach(function(item,key){
                        item.count = 0;
                        item.work_dailies.forEach(function(obj,index){
                            item.count = item.count + obj.usedTime;
                        })
                    })
                    state.peopleList = data;
                    state.vm.popupVisible = false;
                },
                error: msg => {
                    Toast(msg);
                }
            })
        }
    }
}
