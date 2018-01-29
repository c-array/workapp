<template>
    <div class="inner">
        <x-header :title="proitemId ? '修改产品/项目' : '添加产品/项目'"></x-header>
        <group label-width="70px" label-margin-right="10px" label-align="right">
            <selector label-width="85px" title="类型" :value-map="['id', 'name']" placeholder="请选择" :options="[{id:1,name:'产品'},{id:2,name:'项目'}]" v-model="formModel.type"></selector>
            <x-input :title="formModel.type == 2 ? '项目' : '产品'" :placeholder="formModel.type == 2 ? '请输入项目名称' : '请输入产品名称'" v-model="formModel.prName"></x-input>
            <x-textarea :max="255" :height="100" :title="formModel.type == 2 ? '项目描述' : '产品描述'" :placeholder="formModel.type == 2 ? '请输入项目描述' : '请输入产品描述'" v-model="formModel.prDescribe"></x-textarea>
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
    import {XHeader,XInput,XButton,XTextarea,Group,Selector} from 'vux';
    export default {
        name:"proitemForm",
        data () {
            return {
                proitemId:this.$route.query.proitemId      
            }
        },
        components: {
            Group,
            XHeader,
            XInput,
            XButton,
            XTextarea,
            Selector
        },
        computed:{
            ...mapState({
                formModel:state => state.common.proitem.formModel,
                vm:state => state.common.proitem.vm
            })
        },
        created () {
            if(this.proitemId){
                this.getProitem(this.proitemId);
            }
        },
        methods: {
            ...mapMutations({
                getProitem:"common/proitem/getProitem"
            }),
            handleSave(){
                if(this.proitemId){
                    this.$store.commit({
                        type:'common/proitem/edit'
                    })
                }else{
                    this.$store.commit({
                        type:'common/proitem/add'
                    })
                }
            }
        }
    }
</script>