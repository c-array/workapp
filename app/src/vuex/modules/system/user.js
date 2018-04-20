import Vue from 'vue';
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
            departmentList:[], //存储部门数据
            departmentList1:[], //存储部门数据
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
            departmentId:0,
            post:""
        }
    },
    mutations: {
        getList(state){
            Vue.$http.get({
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
            Vue.$http.get({
                url:'/roles',
                success: data => {
                    state.vm.checkRole = [];
                    let arr = [];
                    data.forEach((item,key) => {
                        arr.push({
                            key:item.id,
                            value:item.roleName,
                            inlineDesc:item.inlineDesc
                        })
                    })
                    state.roleList = arr;
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
            Vue.$http.post({
                url:'/users/role',
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
            Vue.$http.get({
                url:"/users/" + userId,
                success: data => {
                    state.formModel = data;
                },
                error: msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        },
        getUserSearch(state){
            Vue.$http.post({
                url:'/users/search',
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
            Vue.$http.get({
                url:'/depts',
                success: data => {
                    state.vm.departmentList = data;
                    state.vm.departmentList1 = JSON.parse(JSON.stringify(data));
                    state.vm.departmentList1.unshift({
                        id:0,
                        depName:"全部"
                    })
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
            if(!state.formModel.username){
                Vue.$vux.toast.text('用户名不能为空！', 'top');
                return false;
            }else if(!state.formModel.realname){
                Vue.$vux.toast.text('真实姓名不能为空！', 'top');
                return false;
            }else if(!state.formModel.departmentId){
                Vue.$vux.toast.text('部门不能为空！', 'top');
                return false;
            }else if(!state.formModel.post){
                Vue.$vux.toast.text('职位名称不能为空！', 'top');
                return false;
            }else if(!state.formModel.email){
                Vue.$vux.toast.text('邮箱不能为空！', 'top');
                return false;
            }
            Vue.$http.post({
                url:'/users',
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
            Vue.$http.put({
                url:'/users/' + state.formModel.id,
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
            Vue.$http.delete({
                url:'/users/' + params.id,
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