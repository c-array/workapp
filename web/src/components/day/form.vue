<template>
    <div class="inner day-form">
        <x-header :title="taskId ? '修改任务信息' : '添加任务信息'"></x-header>
        <div class="day-form-body">
            <ul>
                <li>
                    <label>任务时间</label>
                    <div class="day-form-item">
                        <calendar placeholder="请选择任务时间" title="" v-model="formModel.createDate"></calendar>
                    </div>
                </li>
                <li>
                    <label>任务名称</label>
                    <div class="day-form-item">
                        <input v-model="formModel.taskName" placeholder="请输入任务名称" type="text">
                    </div>
                </li>
                <li>
                    <label>任务用时</label>
                    <div class="day-form-item">
                        <input v-model="formModel.usedTime" placeholder="请输入任务用时" type="text">
                    </div>
                </li>
                <li>
                    <label>任务类型</label>
                    <div class="day-form-item">
                        <select @change="handleChangeType" v-model="formModel.type">
                            <option value="">请选择</option>
                            <option v-for="item in types" :value="item.id">{{item.name}}</option>
                        </select>
                    </div>
                </li>
                <li v-if="formModel.type == 1 || formModel.type == 2">
                    <label>选择{{formModel.type == 1 ? '产品' : '项目'}}</label>
                    <div class="day-form-item">
                        <select v-model="formModel.itemId">
                            <option value="">请选择</option>
                            <option v-for="item in prList" :value="item.value">{{item.name}}</option>
                        </select>
                    </div>
                </li>
            </ul>
            <div class="day-form-btn">
                <mu-raised-button @click="handleSave" label="保 存" class="demo-raised-button" primary/>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import '../../public/less/day.less';
</style>
<script>
    import Vue from 'vue';
    import { mapState, mapMutations } from 'vuex';
    import { XHeader,Calendar } from 'vux';
    import { Field, Picker, Popup } from 'mint-ui';
    Vue.component(Field.name, Field);
    Vue.component(Picker.name, Picker);
    Vue.component(Popup.name, Popup);
    export default {
        name: 'day-form',
        data() {
            return {
                taskId:this.$route.query.id
            }
        },
        computed: {
            ...mapState({
                formModel: state => state.common.day.formModel,
                types: state => state.common.day.types,
                prList: state => state.common.day.prList,
                vm: state => state.common.day.vm
            })
        },
        components: {
            XHeader,
            Calendar  
        },
        created(){
            if(this.taskId){
                this.$http.post({
                    url:'/daily',
                    type:'json',
                    data:{
                        id:this.taskId
                    },
                    success:data => {
                        this.$store.state.common.day.formModel = data;
                        this.getPrItem();
                    },
                    error: msg => {
                        this.$Toast(msg);
                    }
                })
            }
        },
        methods: {
            ...mapMutations({
                getPrItem:'common/day/getPrItem'
            }),
            handleSave(){
                if(this.taskId){
                    this.$store.commit({
                        type:'common/day/edit'
                    })
                }else{
                    this.$store.commit({
                        type:'common/day/add'
                    })
                }
            },
            handleBack(){
                window.history.go(-1);
            },
            handleChangeType() {
                this.$store.commit({
                    type: 'common/day/changeType'
                })
            }
        }
    }
</script>