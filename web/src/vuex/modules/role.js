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
                url:"/roles/" + roleId,
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
                success:result => {
                    result.forEach((item,key) => {
                        item.checked = false;
                        item.visible = false;
                        item.second.forEach((obj,index) => {
                            obj.checked = false;
                            state.roleInfo.work_menus.forEach((value,k) => {
                                if(item.id == value.id){
                                    item.checked = true;
                                }
                                if(obj.id == value.id){
                                    obj.checked = true;
                                }
                            })
                        })
                    })
                    state.menuList = result;
                    state.vm.visible = true;
                },
                error: msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        },
        saveAuthority(state,params){
            let menus = [];
            state.menuList.forEach((item,key) => {
                if(item.checked){
                    menus.push(item.id);
                }
                item.second.forEach((obj,index) => {
                    if(obj.checked){
                        menus.push(obj.id);
                    }
                })
            })
            http.post({
                url:"/roles/authority",
                data:{
                    roleId:state.roleInfo.id,
                    menus:menus
                },
                type:'json',
                success: data => {
                    state.vm.visible = false;
                    this.commit({
                        type:'common/role/getList'
                    });
                    Vue.$vux.toast.text("权限分配成功！", 'top');
                },
                error: msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        },
        setCheck(state,params){
            if(params.type == 1){
                params.item.checked = !params.item.checked;
                params.item.second.forEach((item,key) => {
                    item.checked = params.item.checked;
                })
            }else if(params.type == 2){
                params.obj.checked = !params.obj.checked;
                let flag = false;
                params.item.second.forEach((item,key) => {
                    if(item.checked){
                        flag = true;
                    }
                })
                params.item.checked = flag;
            }
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
                url:'/roles',
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
            http.put({
                url:'/roles/' + state.formModel.id,
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
            http.delete({
                url:'/roles/' + params.id,
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