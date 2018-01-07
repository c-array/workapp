<template>
        <!-- 统计分析 -->
        <div class="inner statistics">
            <mu-appbar title="统计分析">
                <div slot="right" class="statistics-head">
                    <mu-icon value="format_list_bulleted" />
                    <mu-icon value="multiline_chart" />
                    <mu-icon @click="vm.popupVisible = !vm.popupVisible" value="search" />
                </div>
            </mu-appbar>
            <day v-if="formModel.businessType == 1"></day>
            <department v-if="formModel.businessType == 2"></department>
            <item v-if="formModel.businessType == 3"></item>
            <people v-if="formModel.businessType == 4"></people>
            <div>
                <popup width="90%" position="right" v-model="vm.popupVisible">
                    <div class="search-box">
                        <dl>
                            <dt>统计类型</dt>
                            <dd>
                                <mu-row gutter>
                                    <mu-col width="50" :key="item.id" v-for="(item,index) in searchList">
                                        <span @click="handleSelectType(item)" :class="item.checked ? 'active' : ''">{{item.name}}</span>
                                    </mu-col>
                                </mu-row>
                            </dd>
                            <dd class="search-form">
                                <mu-row gutter>
                                    <mu-col v-if="formModel.businessType == 1" class="search-form-item" width="100">
                                        <div @click="handleClear(['username','userId'])" class="clear-icon"><icon type="clear"></icon></div>
                                        <input @click="handleUserList" v-model="formModel.username" readonly placeholder="姓名" type="text">
                                    </mu-col>
                                    <mu-col v-if="formModel.businessType == 2" class="search-form-item" width="100">
                                        <select v-model="formModel.departmentId">
                                            <option value="">请选择部门</option>
                                            <option v-for="(item,index) in vm.departments" :value="item.id">{{item.depName}}</option>
                                        </select>
                                    </mu-col>
                                    <mu-col v-if="formModel.businessType == 4" class="search-form-item" width="100">
                                        <select @change="handleClear(['prName','itemId'])" v-model="formModel.itemType">
                                            <option value="">请选择类型</option>
                                            <option v-for="(item,index) in [{id:1,name:'产品'},{id:2,name:'项目'}]" :value="item.id">{{item.name}}</option>
                                        </select>
                                    </mu-col>
                                    <mu-col v-if="formModel.businessType == 4 && (formModel.itemType == 1 || formModel.itemType == 2)" class="search-form-item" width="100">
                                        <div @click="handleClear(['prName','itemId'])" class="clear-icon"><icon type="clear"></icon></div>
                                        <input @click="handleItemList" v-model="formModel.prName" readonly :placeholder="formModel.itemType == 2 ? '请选择项目' : '请选择产品'" type="text">
                                    </mu-col>
                                    <mu-col class="search-form-item date" width="100">
                                        <div class="date-item">
                                            <div @click="handleClear(['startDate'])" class="clear-icon"><icon type="clear"></icon></div>
                                            <input @click="openDatePicker('startDate')" v-model="formModel.startDate" class="left" readonly placeholder="开始日期" type="text">
                                        </div> 
                                        <div class="date-item">
                                            <div @click="handleClear(['endDate'])" class="clear-icon"><icon type="clear"></icon></div>
                                            <input @click="openDatePicker('endDate')" v-model="formModel.endDate" class="right" readonly placeholder="结束日期" type="text">
                                        </div>
                                    </mu-col>
                                </mu-row>
                            </dd>
                        </dl>
                        <div class="search-btn">
                            <mu-raised-button label="导出" class="default" />
                            <mu-raised-button @click="handleConfirm" label="确定" primary/>
                        </div>
                    </div>
                    <popup v-model="vm.dateVisible" width="100%">
                        <popup-header left-text="取消" right-text="确定" title="" :show-bottom-border="false" @on-click-left="vm.dateVisible = false"
                            @on-click-right="getDate">
                        </popup-header>
                        <datetime-view v-model="vm.dateModel"></datetime-view>
                    </popup>
                    <popup v-model="vm.nameVisible" width="100%">
                        <popup-header left-text="取消" right-text="确定" title="" :show-bottom-border="false" @on-click-left="vm.nameVisible = false"
                            @on-click-right="getUserName">
                        </popup-header>
                        <div class="search-picker">
                            <input v-model="name" placeholder="输入用户名筛选" type="text">
                        </div>
                        <picker :data='filterName' v-model='vm.nameModel'></picker>
                    </popup>
                    <popup v-model="vm.itemVisible" width="100%">
                        <popup-header left-text="取消" right-text="确定" title="" :show-bottom-border="false" @on-click-left="vm.itemVisible = false"
                            @on-click-right="getItemName">
                        </popup-header>
                        <div class="search-picker">
                            <input v-model="name" placeholder="输入用户名筛选" type="text">
                        </div>
                        <picker :data='vm.items' v-model='vm.itemModel'></picker>
                    </popup>
                </popup>
            </div>
        </div>
    </template>
    <style scoped lang="less">
        @import '../../public/less/statistics.less';
    </style>
    <script>
        import Vue from 'vue';
        import { mapState, mapMutations } from 'vuex';
        import { Popup, DatetimeView, PopupHeader, Picker,Icon } from 'vux';
        import day from './day';
        import department from './department';
        import item from './item';
        import people from './people';
        export default {
            name: 'statistics',
            data() {
                return {
                    name: ''
                }
            },
            components: {
                Popup,
                DatetimeView,
                PopupHeader,
                Picker,
                day,
                Icon,
                department,
                item,
                people
            },
            computed: {
                ...mapState({
                    vm: state => state.common.stats.vm,
                    searchList: state => state.common.stats.searchList,
                    formModel: state => state.common.stats.formModel
                }),
                filterName() { //过滤用户名
                    if(this.vm.usernames && this.vm.usernames.length > 0){
                        let data = this.vm.usernames[0].filter((obj,index) => {
                                if (this.name) {
                                    if (obj.name.indexOf(this.name) >= 0) {
                                        return obj;
                                    }
                                } else {
                                    return obj;
                                }
                            })
                        return [data];
                    }else{
                        return [];
                    }
                }
            },
            created() {
                this.handleConfirm();
            },
            methods: {
                ...mapMutations({
                    handleSelectType: 'common/stats/handleSelectType',
                    openDatePicker: 'common/stats/openDatePicker',
                    getDate: 'common/stats/getDate',
                    getUserName: 'common/stats/getUserName',
                    handleUserList: 'common/stats/handleUserList',
                    getItemName: 'common/stats/getItemName',
                    handleItemList: 'common/stats/handleItemList',
                    handleClear: 'common/stats/handleClear',
                    handleConfirm: 'common/stats/confirm',
                }),
            }
        }
    </script>