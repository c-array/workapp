import Vue from 'vue';
import http from '../../public/js/http';
import { formatDate } from '../../public/js/common';
export default {
    namespaced: true,
    state: {
        vm:{
            visible:false
        },
        roleList:[],
        menuList:[],
        roleInfo:"",
        formModel:{
            roleName:"",
            roleDescription:""
        }
    },
    mutations:{
        getList(state,params){
            http.get({
                url:'/roles',
                success: data => {
                    state.roleList = data;
                },
                error:msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        },
        getRoleItem(state,roleId){
            http.get({
                url:"/roleItem",
                data:{
                    roleId:roleId
                },
                success: data => {
                    state.formModel = data;
                },
                error: msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        },
        getAuthority(state,params){
            state.roleInfo = params.roleInfo;
            http.get({
                url:'/menus',
                success:data => {
                    state.menuList = data;
                    state.vm.visible = true;
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
            if(!state.formModel.roleName){
                Vue.$vux.toast.text('角色名称不能为空！', 'top');
                return false;
            }else if(!state.formModel.roleDescription){
                Vue.$vux.toast.text('角色描述不能为空！', 'top');
                return false;
            }
            http.post({
                url:'/addRole',
                type:'json',
                data:state.formModel,
                success:data => {
                    Vue.$vux.toast.text('添加成功', 'top');
                    this.commit('common/role/clear');
                    this.commit({
                        type:'common/role/getList'
                    });
                },
                error: msg => {
                    Vue.$vux.toast.text(msg, 'top');;
                }
            })
        },
        edit(state,params){
            if(!state.formModel.roleName){
                Vue.$vux.toast.text('角色名称不能为空！', 'top');
                return false;
            }else if(!state.formModel.roleDescription){
                Vue.$vux.toast.text('角色描述不能为空！', 'top');
                return false;
            }
            http.post({
                url:'/updateRole',
                type:'json',
                data:state.formModel,
                success:data => {
                    Vue.$vux.toast.text('修改成功', 'top');
                    this.commit({
                        type:'common/role/getList'
                    });
                },
                error: msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        },
        delete(state,params){
            http.get({
                url:'/deleteRole',
                data:{
                    id:params.id
                },
                success:data => {
                    Vue.$vux.toast.text('删除成功', 'top');
                    this.commit({
                        type:'common/role/getList'
                    });
                },
                error: msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        }
    }
}