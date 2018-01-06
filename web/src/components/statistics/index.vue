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
        <div class="statistics-box">
        </div>
        <div>
            <popup width="90%" position="right" v-model="vm.popupVisible">
                <div class="search-box">
                    <dl>
                        <dt>业务类型</dt>
                        <dd>
                            <mu-row gutter>
                                <mu-col width="50" :key="item.id" v-for="(item,index) in searchList">
                                    <span @click="handleSelectType(item)" :class="item.checked ? 'active' : ''">{{item.name}}</span>
                                </mu-col>
                            </mu-row>
                        </dd>
                        <dd v-if="vm.searchVisible == 1" class="search-form">
                            <mu-row gutter>
                                <mu-col class="search-form-item" width="100">
                                    <input v-model="formModel.username" placeholder="姓名" type="text">
                                </mu-col>
                                <mu-col class="search-form-item date" width="100">
                                    <input @click="openDatePicker('startDate')" v-model="formModel.startDate" class="left" readonly placeholder="开始日期" type="text">
                                    <input @click="openDatePicker('endDate')" v-model="formModel.endDate" class="right" readonly placeholder="结束日期" type="text">
                                </mu-col>
                            </mu-row>
                        </dd>
                    </dl>
                </div>
                <popup v-model="vm.dateVisible" width="100%">
                        <popup-header
                            left-text="取消"
                            right-text="确定"
                            title=""
                            :show-bottom-border="false"
                            @on-click-left="vm.dateVisible = false"
                            @on-click-right="getDate">
                        </popup-header>
                    <datetime-view v-model="vm.dateModel"></datetime-view>
                </popup>
                <popup v-model="vm.nameVisible" width="100%">
                    <popup-header
                        left-text="取消"
                        right-text="确定"
                        title=""
                        :show-bottom-border="false"
                        @on-click-left="vm.nameVisible = false"
                        @on-click-right="getDate">
                    </popup-header>
                    <picker :data='years' v-model='year1' @on-change='change'></picker>
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
    import {mapState,mapMutations} from 'vuex';
    import { Popup,DatetimeView,PopupHeader,Picker } from 'vux';
    export default {
        name: 'statistics',
        data() {
            return {
            }
        },
        components:{
            Popup,
            DatetimeView,
            PopupHeader,
            Picker
        },
        computed: {
          ...mapState({
              vm:state => state.common.stats.vm,
              searchList: state => state.common.stats.searchList,
              formModel:state => state.common.stats.formModel
          })  
        },
        created() {
            
        },
        methods: {
            ...mapMutations({
                handleSelectType:'common/stats/handleSelectType',
                getDate:'common/stats/getDate',
                openDatePicker:'common/stats/openDatePicker'
            })
            
        }
    }
</script>