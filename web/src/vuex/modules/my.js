import Vue from 'vue';
import http from '../../public/js/http';
import {formatDate} from '../../public/js/common';
import { setTimeout } from 'timers';
export default {
    namespaced: true,
    state: {
    },
    mutations:{
        getList(state,param){
            http.post({
                url:'/my-list',
                data:{
                    userId:sessionStorage.userId,
                    currentPage:state.vm.currentPage,
                    pageSize:state.vm.pageSize
                },
                type:"json",
                success: data => {
                    if(param && param.done){
                        setTimeout(_ => {
                            if(param.type == 1){
                                state.workList = state.workList.concat(data);
                            }else if(param.type == 2){
                                state.workList = data;
                            }
                            param.done();
                        },1500)
                    }else{
                        state.workList = data;
                    }
                },
                error:msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        },
        loadMore(state,done){
            state.vm.currentPage = state.vm.currentPage + 1;
            this.commit('common/my/getList',{type:1,done:done});
        },
        refresh(state,done){
            state.vm.currentPage = 0;
            this.commit('common/my/getList',{type:2,done:done});
        }
    }
}