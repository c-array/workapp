import Vue from 'vue';
import http from '../../public/js/http';
import { formatDate } from '../../public/js/common';
export default {
    namespaced: true,
    state: {
        userList:[],
        roleList:[],
        vm:{
            visible:false,
            checkRole:[] //选中的角色
        }
    },
    mutations: {
        getList(state){
            http.get({
                url:'/users',
                success: data => {
                    state.userList = data;
                },
                error:msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        },
        getRoles(state,params){
            http.get({
                url:'/roles',
                success: data => {
                    state.roleList = data;
                    for (const item of params.work_roles) {
                        state.vm.checkRole.push(item.id);
                    }
                    state.vm.visible = true;
                },
                error:msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        }
    }
}