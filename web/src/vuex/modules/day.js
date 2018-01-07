import http from '../../public/js/http';
import {formatDate} from '../../public/js/common';
import {Toast} from 'mint-ui'
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
                    Toast(msg);
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
                    Toast(msg);
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
                    Toast('添加成功');
                    this.commit('common/day/clear');
                    this.commit({
                        type:'common/day/getList'
                    });
                },
                error: msg => {
                    Toast(msg);
                }
            })
        },
        edit(state,params){
            http.post({
                url:'/updateTask',
                type:'json',
                data:state.formModel,
                success:data => {
                    Toast('修改成功');
                    this.commit({
                        type:'common/day/getList'
                    });
                },
                error: msg => {
                    Toast(msg);
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
                    Toast('删除成功');
                    this.commit({
                        type:'common/day/getList'
                    });
                },
                error: msg => {
                    Toast(msg);
                }
            })
        }
    }
}