<template>
    <div class="inner user-main">
        <x-header class="x-header" title="用户管理"></x-header>
        <ul>
            <li v-for="(item,index) in userList">
                <p>
                    <span>用户名：{{item.username}}</span>
                    <span>真实姓名：{{item.realname}}</span>
                </p>
                <p><span>部门：{{item.work_department.depName}}</span><span>职位：{{item.post}}</span></p>
                <p><span>手机号：{{item.phone}}</span><span>QQ：{{item.qq}}</span></p>
                <p><span>邮箱：{{item.email}}</span></p>
                <p>
                    <span>创建日期：{{item.createTime}}</span>
                    <span>
                        <i @click="getRoles(item)" class="icon-partner"></i>
                        <i class="icon-edit"></i>
                        <i class="icon-delete"></i>
                    </span>
                </p>
            </li>
        </ul>
        <popup v-model="vm.visible">
            <popup-header 
                left-text="关闭" 
                right-text="" 
                title="分配角色" 
                :show-bottom-border="false" 
                @on-click-left="vm.visible = false">
            </popup-header>
            <checklist @on-change="handleAssignRole" v-model="vm.checkRole" :options="roleList"></checklist>
        </popup>
    </div>
</template>
<style scoped lang="less">
    @import '../../../public/less/system.less';
</style>
<script>
    import {mapState,mapMutations} from 'vuex';
    import { Grid, GridItem, XHeader, XButton, Popup, PopupHeader, Checklist, CellFormPreview, Group, Cell} from 'vux';
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
            Grid,
            GridItem,
            XHeader,
            CellFormPreview,
            Group,
            Cell,
            Popup,
            PopupHeader,
            Checklist
        },
        created () {
          this.query();  
        },
        methods:{
            ...mapMutations({
                query:'common/user/getList',
                getRoles:'common/user/getRoles',
            }),
            handleAssignRole(value, label){
                console.log(value,label);
            }
        }
    }
</script>