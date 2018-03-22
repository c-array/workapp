import Vue from 'vue';
import formatDate from '../../../public/js/formatDate';
export default {
    namespaced: true,
    state: {
        vm:{
            currentDate:formatDate({
                type:'yyyy-mm-dd'
            }),
            formPicker:'',
        },
        list:[],
        formModel:{
            createDate:"",
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
            Vue.$http.get({
                url:'/dailys',
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
        getItem(state,id){
            Vue.$http.get({
                url:'/dailys/' + id,
                success:data => {
                    state.formModel = data;
                    this.commit({
                        type:'common/day/getPrItem'
                    });
                },
                error:msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        },
        getPrItem(state,params){
            Vue.$http.get({
                url:'/proitems/type/' + state.formModel.type,
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
        clear(state,item){
            for (const key in state.formModel) {
                state.formModel[key] = "";
            }
        },
        add(state,params){
            state.formModel.userId = sessionStorage.userId;
            Vue.$http.post({
                url:'/dailys',
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
            Vue.$http.put({
                url:'/dailys/' + state.formModel.id,
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
            Vue.$http.delete({
                url:'/dailys/' + params.id,
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