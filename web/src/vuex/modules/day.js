import Vue from 'vue';
import http from '../../public/js/http';
import {formatDate} from '../../public/js/common';
export default {
    namespaced: true,
    state: {
        vm:{
            currentDate:formatDate({
                type:'yyyy-mm-dd',
                date:'2016-08-11'
            }),
            formPicker:'',
        },
        list:[],
        formModel:{
            createDate:'',
            taskName:'',
            usedTime:'',
            type:'',
            itemId:''
        },
        types:[
            {
                id:1,
                name:'产品'
            },
            {
                id:2,
                name:'项目'
            },
            {
                id:3,
                name:'其他'
            }
        ],
        prList:[]
    },
    mutations: {
        getList(state,params){
            http.post({
                url:'/daily',
                type:'json',
                data:{
                    userId:sessionStorage.userId,
                    createDate:state.vm.currentDate
                },
                success:data => {
                    state.list = data;
                },
                error:msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        },
        getPrItem(state,params){
            http.post({
                url:'/getPrItem',
                type:'json',
                data:{
                    type:state.formModel.type
                },
                success:data => {
                    state.prList = data;
                },
                error:msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        },
        changeType(state,params){
            this.commit('common/day/getPrItem');
            state.formModel.itemId = "";
        },
        clear(state,params){
            for (const key in state.formModel) {
                state.formModel[key] = "";
            }
        },
        add(state,params){
            state.formModel.userId = sessionStorage.userId;
            http.post({
                url:'/addTask',
                type:'json',
                data:state.formModel,
                success:data => {
                    Vue.$vux.toast.text('添加成功', 'top');
                    this.commit('common/day/clear');
                    this.commit({
                        type:'common/day/getList'
                    });
                },
                error: msg => {
                    Vue.$vux.toast.text(msg, 'top');;
                }
            })
        },
        edit(state,params){
            http.post({
                url:'/updateTask',
                type:'json',
                data:state.formModel,
                success:data => {
                    Vue.$vux.toast.text('修改成功', 'top');
                    this.commit({
                        type:'common/day/getList'
                    });
                },
                error: msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        },
        delete(state,params){
            http.post({
                url:'/deleteTask',
                type:'json',
                data:{
                    id:params.id
                },
                success:data => {
                    Vue.$vux.toast.text('删除成功', 'top');
                    this.commit({
                        type:'common/day/getList'
                    });
                },
                error: msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        }
    }
}