<template>
    <div class="inner">
        <x-header :title="roleId ? '修改角色' : '添加角色'"></x-header>
        <group label-width="70px" label-margin-right="10px" label-align="right">
            <x-input title="角色名称" placeholder="请输入角色名称" v-model="formModel.roleName"></x-input>
            <x-textarea :max="255" :height="100" title="角色描述" placeholder="请输入角色描述" v-model="formModel.roleDescription"></x-textarea>
        </group>
        <div class="form-btn">
            <x-button @click.native="handleSave" type="primary">保 存</x-button>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import '../../../public/less/system.less';
</style>
<script>
    import {mapState,mapMutations} from "vuex";
    import {XHeader,XInput,XButton,XTextarea,Group} from 'vux';
    export default {
        name:"roleForm",
        data () {
            return {
                roleId:this.$route.query.roleId      
            }
        },
        components: {
            Group,
            XHeader,
            XInput,
            XButton,
            XTextarea
        },
        computed:{
            ...mapState({
                formModel:state => state.common.role.formModel,
                vm:state => state.common.role.vm,
            })
        },
        created () {
            if(this.roleId){
                this.getRoleItem(this.roleId);
            }
        },
        methods: {
            ...mapMutations({
                getRoleItem:"common/role/getRoleItem"
            }),
            handleSave(){
                if(this.roleId){
                    this.$store.commit({
                        type:'common/role/edit'
                    })
                }else{
                    this.$store.commit({
                        type:'common/role/add'
                    })
                }
            }
        }
    }
</script>