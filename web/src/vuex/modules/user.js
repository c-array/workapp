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
            searchVisible:false, //搜索弹窗显示
            checkRole:[], //选中的角色
            currentUserInfo:"", //存储当前用户信息
            departmentList:[] //存储部门数据
        },
        formModel:{
            username:"",
            realname:"",
            departmentId:"",
            post:"",
            email:"",
            phone:"",
            qq:""
        },
        queryModel:{
            realname:"",
            departmentId:"",
            post:""
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
            state.vm.currentUserInfo = params;
            http.get({
                url:'/roles',
                success: data => {
                    state.vm.checkRole = [];
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
        },
        assignRole(state,params){
            http.post({
                url:'/assignRole',
                data:{
                    userId:state.vm.currentUserInfo.id,
                    roles:state.vm.checkRole
                },
                type:"json",
                success: data => {
                    this.commit('common/user/getList');
                    state.vm.visible = false;
                },
                error: msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        },
        getUserItem(state,userId){
            http.get({
                url:"/userItem",
                data:{
                    userId:userId
                },
                success: data => {
                    state.formModel = data;
                },
                error: msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        },
        getUserSearch(state){
            http.post({
                url:'/userSearch',
                data:state.queryModel,
                type:"json",
                success: data => {
                    state.userList = data;
                    state.vm.searchVisible = false;
                },
                error: msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        },
        getDepartmentList(state,params){
            http.get({
                url:'/departments',
                success: data => {
                    state.vm.departmentList = data;
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
            http.post({
                url:'/addUser',
                type:'json',
                data:state.formModel,
                success:data => {
                    Vue.$vux.toast.text('添加成功', 'top');
                    this.commit('common/user/clear');
                    this.commit({
                        type:'common/user/getList'
                    });
                },
                error: msg => {
                    Vue.$vux.toast.text(msg, 'top');;
                }
            })
        },
        edit(state,params){
            http.post({
                url:'/updateUser',
                type:'json',
                data:state.formModel,
                success:data => {
                    Vue.$vux.toast.text('修改成功', 'top');
                    this.commit({
                        type:'common/user/getList'
                    });
                },
                error: msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        },
        delete(state,params){
            http.get({
                url:'/deleteUser',
                data:{
                    id:params.id
                },
                success:data => {
                    Vue.$vux.toast.text('删除成功', 'top');
                    this.commit({
                        type:'common/user/getList'
                    });
                },
                error: msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        }
    }
}