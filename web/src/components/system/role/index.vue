<template>
    <div class="inner">
        <x-header class="x-header" title="角色管理">
            <div slot="right" class="x-header-right">
                <i @click="gotoForm()" class="icon-add"></i>
            </div>
        </x-header>
        <div class="list-main list-inner">
            <ul>
                <li v-for="(item,index) in roleList">
                    <p class="title"><span>角色名称：{{item.roleName}}</span></p>
                    <p><span>角色描述：{{item.roleDescription}}</span></p>
                    <p>
                        <span>创建日期：{{item.createTime}}</span>
                        <span>
                            <i @click="getAuthority(item)" class="icon-authority"></i>
                            <i @click="gotoForm(item)" class="icon-edit"></i>
                            <i @click="handleDelete(item.id)" class="icon-delete"></i>
                        </span>
                    </p>
                </li>
            </ul>
        </div>
        <popup v-model="vm.visible" height="80%" position="bottom">
            <popup-header 
                left-text="取消" 
                right-text="确定" 
                :title="roleInfo.roleName + '-分配权限'" 
                :show-bottom-border="false" 
                @on-click-left="vm.visible = false"
                @on-click-right="saveAuthority">
            </popup-header>
            <div class="tree-main">
                <ul>
                    <li v-for="item in menuList">
                        <p class="tree-level1">
                            <i @click="item.visible = !item.visible" class="awwor" :class="item.visible ? 'icon-bottom' : 'icon-left'"></i>
                            <i @click="setCheck({type:1,item:item})" class="checked" :class="item.checked ? 'icon-checked active' : 'icon-unchecked'"></i>
                            <span>{{item.name}}</span>
                        </p>
                        <div class="tree-level2" :style="{height:item.second.length * 32 + 'px'}" :class="{'hide':!item.visible}">
                            <p v-for="obj in item.second">
                                <i @click="setCheck({type:2,item:item,obj:obj})" class="checked" :class="obj.checked ? 'icon-checked active' : 'icon-unchecked'"></i>
                                <span>{{obj.name}}</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </popup>
    </div>
</template>
<style scoped lang="less">
    @import '../../../public/less/system.less';
</style>
<script>
    import {mapState,mapMutations} from "vuex";
    import { XHeader, Popup, PopupHeader, Checklist} from 'vux';
    export default {
        name:"role",
        computed:{
            ...mapState({
                roleList: state => state.common.role.roleList,
                vm: state => state.common.role.vm,
                roleInfo: state => state.common.role.roleInfo,
                menuList: state => state.common.role.menuList
            })
        },
        components: {
            XHeader,
            Popup,
            PopupHeader,
            Checklist
        },
        created () {
            this.query();
        },
        methods: {
            ...mapMutations({
                query:'common/role/getList',
                setCheck:'common/role/setCheck',
                saveAuthority:'common/role/saveAuthority'
            }),
            gotoForm(item){
                this.$store.commit('common/role/clear');
                if(item){
                    this.$router.push({path:"/role-form",query:{roleId:item.id}});
                }else{
                    this.$router.push({path:"/role-form"});
                }
            },
            handleDelete(roleId) {
                const _this = this;
                this.$vux.confirm.show({
                    title:"删除提示",
                    content:"确定要删除该条记录?",
                    onCancel () {
                        _this.$vux.toast.text('已取消删除', 'top');
                    },
                    onConfirm () {
                        _this.$store.commit({
                            type: 'common/role/delete',
                            id: roleId
                        })
                    }
                })
            },
            getAuthority(item){
                this.$store.commit({
                    type:"common/role/getAuthority",
                    roleInfo:item
                })
            }
        }
    }
</script>