<template>
    <div class="inner search-box">
        <group label-width="120px" label-margin-right="10px" label-align="right">
            <radio :options="[{key:1,value:'产品'},{key:2,value:'项目'}]" v-model="queryModel.type"></radio>
            <x-input placeholder="请输入产品/项目名称" v-model="queryModel.prName"></x-input>
        </group>
        <div class="search-btn">
            <x-button @click.native="getProitemSearch" type="primary" text="确定"></x-button>
            <x-button @click.native="vm.searchVisible = !vm.searchVisible" text="取消"></x-button>
        </div> 
    </div>
</template>
<style scoped lang="less">
    @import "../../../public/less/system.less";
</style>
<script>
    import {mapState,mapMutations} from 'vuex';
    import {Group, XInput, XButton, Radio} from "vux";
    export default {
        name:"proitem-search",
        components:{
            Group,
            XInput,
            XButton,
            Radio
        },
        created () {

        },
        computed:{
            ...mapState({
                vm:state => state.common.proitem.vm,
                queryModel:state => state.common.proitem.queryModel
            })
        },
        methods:{
            ...mapMutations({
                getProitemSearch:'common/proitem/getProitemSearch'
            }),
        }
    }
</script>