<template>
    <div class="inner statistics">
        <mu-appbar title="统计分析">
            <div slot="right" class="statistics-head">
                <mu-icon value="format_list_bulleted" />
                <mu-icon value="multiline_chart" />
                <mu-icon @click="open" value="search" />
            </div>
        </mu-appbar>
        <mu-popup position="right" popupClass="search-box" :open="vm.visible" @close="close">
            <dl>
                <dt>业务类型</dt>
                <dd>
                    <mu-row gutter>
                        <mu-col width="50" :key="item.id" v-for="(item,index) in searchList"><span @click="handleSelectType(item)" :class="item.checked ? 'active' : ''">{{item.name}}</span></mu-col>
                    </mu-row>
                </dd>
                <dd v-if="vm.searchVisible == 1" class="search-form">
                    <mu-row gutter>
                        <mu-col class="search-form-item" width="100">
                            <input v-model="formModel.username" placeholder="姓名" type="text">
                        </mu-col>
                        <mu-col class="search-form-item date" width="100">
                            <input @click="openPicker('startDate')" v-model="formModel.startDate" class="left" readonly placeholder="开始日期" type="text">
                            <input @click="openPicker('endDate')" v-model="formModel.endDate" class="right" readonly placeholder="结束日期" type="text">
                        </mu-col>
                    </mu-row>
                </dd>
                <dd v-if="vm.searchVisible == 2" class="search-form">
                    <mu-row gutter>
                        <mu-col class="search-form-item" width="100">
                            <select v-model="formModel.departmentId">
                                <option value="">请选择部门</option>
                            </select>
                        </mu-col>
                        <mu-col class="search-form-item date" width="100">
                            <input @click="openPicker('startDate')" v-model="formModel.startDate" class="left" disabled placeholder="开始日期" type="text">
                            <input @click="openPicker('endDate')" v-model="formModel.endDate" class="right" disabled placeholder="结束日期" type="text">
                        </mu-col>
                    </mu-row>
                </dd>
                <dd v-if="vm.searchVisible == 3" class="search-form">
                    <mu-row gutter>
                        <mu-col class="search-form-item" width="100">
                            <select v-model="formModel.itemType">
                                <option value="">请选择产品或项目</option>
                            </select>
                        </mu-col>
                        <mu-col class="search-form-item" width="100">
                            <input v-model="formModel.time" disabled placeholder="投入时间" type="text">
                        </mu-col>
                    </mu-row>
                </dd>
                <dd v-if="vm.searchVisible == 4" class="search-form">
                    <mu-row gutter>
                        <mu-col class="search-form-item" width="100">
                            <select v-model="formModel.itemType">
                                <option value="">请选择产品或项目</option>
                            </select>
                        </mu-col>
                        <mu-col class="search-form-item" width="100">
                            <input v-model="formModel.prName" placeholder="产品名称" type="text">
                        </mu-col>
                        <mu-col class="search-form-item date" width="100">
                            <input @click="openPicker('startDate')" v-model="formModel.startDate" class="left" disabled placeholder="开始时间" type="text">
                            <input @click="openPicker('endDate')" v-model="formModel.endDate" class="right" disabled placeholder="结束时间" type="text">
                        </mu-col>
                    </mu-row>
                </dd>
            </dl>
            <div class="search-btn">
                <mu-raised-button label="导出" class="default"/>
                <mu-raised-button label="确定" primary/>
            </div>
            <mt-datetime-picker
                ref="picker"
                v-model="vm.queryPicker"
                type="date"
                class="statistics-picker"
                :startDate="vm.startDate"
                :endDate="vm.endDate"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                @confirm="handleConfirmDate">
            </mt-datetime-picker>
        </mu-popup>
    </div>
</template>
<style scoped lang="less">
    @import '../../public/less/statistics.less';
</style>
<script>
    import Vue from 'vue';
    import { DatetimePicker } from 'mint-ui';
    Vue.component(DatetimePicker.name, DatetimePicker);
    export default {
        name: 'statistics',
        data() {
            return {
                vm: {
                    visible: false,
                    searchVisible:'',
                    queryPicker:'',
                    startDate:new Date('2010-01-01'),
                    endDate:new Date(),
                    pickerKey:''
                },
                searchList:[
                    {
                        id:1,
                        name:'我和同事',
                        checked:false
                    },
                    {
                        id:2,
                        name:'部门',
                        checked:false
                    },
                    {
                        id:3,
                        name:'项目和产品',
                        checked:false
                    },
                    {
                        id:4,
                        name:'项目人月',
                        checked:false
                    }
                ],
                formModel:{
                    businessType:'', //业务类型
                    username:'', //用户名
                    startDate:'', //开始时间
                    endDate:'', //结束时间
                    departmentId:'', //部门id
                    itemType:'', //产品或项目
                    time:'', //投入时间
                    prName:'' //产品或项目名称
                }
            }
        },
        created () {
          this.vm.searchVisible = this.searchList[0].id; 
          this.searchList[0].checked = true;
        },
        methods: {
            open() {
                this.vm.visible = true;
            },
            close() {
                this.vm.visible = false;
            },
            handleSelectType(item){
                item.checked = !item.checked;
                if(item.checked){
                    this.vm.searchVisible = item.id;
                }else{
                    this.vm.searchVisible = "";
                }
                this.searchList.forEach((value,key) => {
                    if(value.id != item.id){
                        value.checked = false;
                    }else{
                        this.$set(this.searchList,key,item);
                    }
                })
            },
            openPicker(key) {
                this.vm.pickerKey = key;
                this.$refs.picker.open();
            },
            handleConfirmDate(val){
               this.formModel[this.vm.pickerKey] = this.$formatDate({
                    type:'yyyy-mm-dd',
                    date:val
                });
            },
            queryData(){
                this.$http.post({
                    url:'',
                    data:this,formModel,
                    type:'json',
                    success: data => {

                    },
                    error:msg => {
                        
                    }
                })
            }
        }
    }
</script>