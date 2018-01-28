<template>
    <div class="inner">
        <x-header :title="deptId ? '修改部门' : '添加部门'"></x-header>
        <group label-width="70px" label-margin-right="10px" label-align="right">
            <x-input title="部门名称" placeholder="请输入部门名称" v-model="formModel.depName"></x-input>
            <x-textarea :max="255" :height="100" title="部门描述" placeholder="请输入部门描述" v-model="formModel.depDescribe"></x-textarea>
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
        name:"deptForm",
        data () {
            return {
                deptId:this.$route.query.deptId      
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
                formModel:state => state.common.dept.formModel,
                vm:state => state.common.dept.vm
            })
        },
        created () {
            if(this.deptId){
                this.getDeptItem(this.deptId);
            }
        },
        methods: {
            ...mapMutations({
                getDeptItem:"common/dept/getDeptItem"
            }),
            handleSave(){
                if(this.deptId){
                    this.$store.commit({
                        type:'common/dept/edit'
                    })
                }else{
                    this.$store.commit({
                        type:'common/dept/add'
                    })
                }
            }
        }
    }
</script>