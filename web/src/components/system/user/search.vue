<template>
    <div class="inner search-box">
        <group label-width="55px" label-margin-right="10px" label-align="right">
            <x-input title="用户名" placeholder="请输入用户名" v-model="queryModel.realname"></x-input>
            <selector title="部门" :value-map="['id', 'depName']" placeholder="请选择部门" :options="vm.departmentList" v-model="queryModel.departmentId"></selector>
            <x-input title="职位" placeholder="请输入职位" v-model="queryModel.post"></x-input>
        </group>
        <div class="search-btn">
            <x-button @click.native="getUserSearch" type="primary" text="确定"></x-button>
            <x-button @click.native="vm.searchVisible = !vm.searchVisible" text="取消"></x-button>
        </div> 
    </div>
</template>
<style scoped lang="less">
    @import "../../../public/less/system.less";
</style>
<script>
    import {mapState,mapMutations} from 'vuex';
    import {Group, XInput, XButton, Selector} from "vux";
    export default {
        name:"user-search",
        data () {
            return {
                
            }
        },
        components:{
            Group,
            XInput,
            XButton,
            Selector
        },
        created () {
          this.getDepartmentList();  
        },
        computed:{
            ...mapState({
                vm:state => state.common.user.vm,
                queryModel:state => state.common.user.queryModel
            })
        },
        methods:{
            ...mapMutations({
                getDepartmentList:'common/user/getDepartmentList',
                getUserSearch:'common/user/getUserSearch'
            }),
        }
    }
</script>