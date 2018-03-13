<template>
    <div class="inner list-main">
        <x-header class="x-header" title="用户管理">
            <div slot="right" class="x-header-right">
                <i @click="vm.searchVisible = !vm.searchVisible" class="icon-search"></i>
                <i @click="gotoForm()" class="icon-add"></i>
            </div>
        </x-header>
        <ul>
            <li v-for="(item,index) in userList">
                <p class="title"><span>真实姓名：{{item.realname}}</span></p>
                <p><span>部门：{{item.work_department.depName}}</span><span>职位：{{item.post}}</span></p>
                <p><span>手机号：{{item.phone}}</span></p>
                <p><span>邮箱：{{item.email}}</span></p>
                <p>
                    <span>创建日期：{{item.createTime}}</span>
                    <span>
                        <i @click="getRoles(item)" class="icon-partner"></i>
                        <i @click="gotoForm(item)" class="icon-edit"></i>
                        <i @click="handleDelete(item.id)" class="icon-delete"></i>
                    </span>
                </p>
            </li>
        </ul>
        <popup v-model="vm.visible">
            <popup-header 
                left-text="关闭" 
                right-text="确定" 
                :title="vm.currentUserInfo.realname + '-分配角色'" 
                :show-bottom-border="false" 
                @on-click-left="vm.visible = false"
                @on-click-right="handleAssignRole">
            </popup-header>
            <checklist v-model="vm.checkRole" :options="roleList"></checklist>
        </popup>
        <popup position="right" width="90%" v-model="vm.searchVisible">
            <user-search></user-search>
        </popup>
    </div>
</template>
<style scoped lang="less">
    @import '../../../public/less/system.less';
</style>
<script>
    import {mapState,mapMutations} from 'vuex';
    import { XHeader, Popup, PopupHeader, Checklist} from 'vux';
    import userSearch from "./search.vue";
    export default {
        name:'user',
        data () {
            return {
                      
            }
        },
        computed:{
            ...mapState({
                userList: state => state.common.user.userList,
                roleList: state => state.common.user.roleList,
                vm:state => state.common.user.vm
            })
        },
        components: {
            XHeader,
            Popup,
            PopupHeader,
            Checklist,
            userSearch
        },
        created () {
          this.query();  
        },
        methods:{
            ...mapMutations({
                query:'common/user/getList',
                getRoles:'common/user/getRoles',
                handleAssignRole:'common/user/assignRole',
            }),
            gotoForm(item){
                this.$store.commit('common/user/clear');
                if(item){
                    this.$router.push({path:"/user-form",query:{userId:item.id}});
                }else{
                    this.$router.push({path:"/user-form"});
                }
            },
            handleDelete(userId) {
                const _this = this;
                this.$vux.confirm.show({
                    title:"删除提示",
                    content:"确定要删除该条记录?",
                    onCancel () {
                        _this.$vux.toast.text('已取消删除', 'top');
                    },
                    onConfirm () {
                        _this.$store.commit({
                            type: 'common/user/delete',
                            id: userId
                        })
                    }
                })
            }
        }
    }
</script>