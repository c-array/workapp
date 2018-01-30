<template>
    <div class="inner search-box">
        <group label-width="55px" label-margin-right="10px" label-align="right">
            <radio :options="[{key:0,value:'全部'},{key:1,value:'产品'},{key:2,value:'项目'},{key:3,value:'其他'}]" v-model="queryModel.type"></radio>
            <x-input placeholder="请输入用户名" v-model="queryModel.realname"></x-input>
            <x-input placeholder="请输入任务名称" v-model="queryModel.taskName"></x-input>
        </group>
        <div class="search-btn">
            <x-button @click.native="getSearch" type="primary" text="确定"></x-button>
            <x-button @click.native="vm.visible = vm.visible" text="取消"></x-button>
        </div> 
    </div>
</template>
<style scoped lang="less">
    @import "../../../public/less/system.less";
</style>
<script>
    import {mapState,mapMutations} from 'vuex';
    import {Group, XInput, XButton,Radio, Selector} from "vux";
    export default {
        name:"user-search",
        data () {
            return {
                queryModel:{
                    type:0,
                    realname:'',
                    taskName:''
                }
            }
        },
        components:{
            Group,
            XInput,
            XButton,
            Radio
        },
        methods:{
            getSearch(){
                this.$http.post({
                    url:'/my-search',
                    data:this.queryModel,
                    type:"json",
                    success: data => {

                    },
                    error:msg => {
                        this.$vux.toast.text(msg, 'top');
                    }
                })
            }
        }
    }
</script>