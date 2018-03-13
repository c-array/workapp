import Vue from 'vue';
import http from '../../public/js/http';
import { formatDate } from '../../public/js/common';
export default {
    namespaced: true,
    state: {
        vm:{
            visible:false
        },
        deptList:[],
        formModel:{
            depName:"",
            depDescribe:""
        }
    },
    mutations:{
        getList(state,params){
            http.get({
                url:'/depts',
                success: data => {
                    state.deptList = data;
                },
                error:msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        },
        getDeptItem(state,deptId){
            http.get({
                url:"/depts/" + deptId,
                success: data => {
                    state.formModel = data;
                },
                error: msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        },
        clear(state,params){
            for (const key in state.formModel) {
                state.formModel[key] = "";
            }
        },
        add(state,params){
            if(!state.formModel.depName){
                Vue.$vux.toast.text('部门名称不能为空！', 'top');
                return false;
            }else if(!state.formModel.depDescribe){
                Vue.$vux.toast.text('部门描述不能为空！', 'top');
                return false;
            }
            http.post({
                url:'/depts',
                type:'json',
                data:state.formModel,
                success:data => {
                    Vue.$vux.toast.text('添加成功', 'top');
                    this.commit('common/dept/clear');
                    this.commit({
                        type:'common/dept/getList'
                    });
                },
                error: msg => {
                    Vue.$vux.toast.text(msg, 'top');;
                }
            })
        },
        edit(state,params){
            if(!state.formModel.depName){
                Vue.$vux.toast.text('部门名称不能为空！', 'top');
                return false;
            }else if(!state.formModel.depDescribe){
                Vue.$vux.toast.text('部门描述不能为空！', 'top');
                return false;
            }
            http.post({
                url:'/updateDept',
                type:'json',
                data:state.formModel,
                success:data => {
                    Vue.$vux.toast.text('修改成功', 'top');
                    this.commit({
                        type:'common/dept/getList'
                    });
                },
                error: msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        },
        delete(state,params){
            http.get({
                url:'/deleteDept',
                data:{
                    id:params.id
                },
                success:data => {
                    Vue.$vux.toast.text('删除成功', 'top');
                    this.commit({
                        type:'common/dept/getList'
                    });
                },
                error: msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        }
    }
}