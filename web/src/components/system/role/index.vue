<template>
    <div class="inner list-main">
        <x-header class="x-header" title="角色管理">
            <div slot="right" class="x-header-right">
                <i @click="gotoForm()" class="icon-add"></i>
            </div>
        </x-header>
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
        <popup v-model="vm.visible" position="bottom" height="80%">
            <div class="tree-main">
                <ul>
                    <li>
                        <p class="tree-level1">
                            <i class="icon-left awwor"></i>
                            <i class="icon-unchecked"></i>
                            <span>一级1</span>
                        </p>
                        <div class="tree-level2">
                            <p><i class="icon-unchecked"></i><span>二级1</span></p>
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
                vm: state => state.common.role.vm
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