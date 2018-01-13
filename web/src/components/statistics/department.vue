<template>
    <div class="inner stats">
        <x-header title="统计分析-部门统计">
            <div slot="right" class="stats-head-right">
                <i class="icon-list"></i>
                <i class="icon-curve"></i>
            </div>
        </x-header>
        <div class="stats-box">
            <ul>
                <li>
                    <select @change="getList" v-model="formModel.departmentId">
                        <option v-for="item in vm.itemList" :value="item.id">{{item.depName}}</option>
                    </select>
                </li>
                <li>
                    <span @click="handleShowDate('startDate')">{{formModel.startDate ? formModel.startDate :'开始时间'}}</span>
                    <i v-if="formModel.startDate" @click="handleClear(['startDate'])" class="icon-clear"></i>
                </li>
                <li>
                    <span @click="handleShowDate('endDate')">{{formModel.endDate ? formModel.endDate :'结束时间'}}</span>
                    <i v-if="formModel.endDate" @click="handleClear(['endDate'])" class="icon-clear"></i>
                </li>
            </ul>
            <div class="stats-warp">
                <div class="stats-chart">
                    <ve-histogram 
                        height="250px" 
                        :title="{text: '人员总体投入时间'}" 
                        :legend-visible="false"
                        :data-zoom="histogramConfig.dataZoom" 
                        :after-config="histogramConfig.callback" 
                        :data="chartsData.personData"
                        :data-empty="vm.empty"
                        :loading="vm.loading"
                        :settings="histogramConfig.chartSettings">
                    </ve-histogram>
                </div>
                <div class="stats-chart">
                    <ve-histogram 
                        height="250px" 
                        :title="{text: '每人投入时间'}" 
                        :legend-visible="false"
                        :data-zoom="histogramConfig.dataZoom" 
                        :after-config="histogramConfig.callback" 
                        :data="chartsData.itemPersonData"
                        :data-empty="vm.empty"
                        :loading="vm.loading"
                        :settings="histogramConfig.chartSettings">
                    </ve-histogram>
                </div>
                <div class="stats-chart">
                    <ve-histogram 
                        height="250px" 
                        :title="{text: '产品投入时间'}" 
                        :legend-visible="false"
                        :data-zoom="histogramConfig.dataZoom" 
                        :after-config="histogramConfig.callback" 
                        :data="chartsData.depPmData"
                        :data-empty="vm.empty"
                        :loading="vm.loading"
                        :settings="histogramConfig.chartSettings">
                    </ve-histogram>
                </div>
                <div class="stats-chart">
                    <ve-histogram 
                        height="250px" :title="{text: '项目投入时间'}" 
                        :legend-visible="false"
                        :data-zoom="histogramConfig.dataZoom" 
                        :after-config="histogramConfig.callback" 
                        :data="chartsData.depPjData"
                        :data-empty="vm.empty"
                        :loading="vm.loading"
                        :settings="histogramConfig.chartSettings">
                    </ve-histogram>
                </div>
                <div class="stats-chart">
                    <ve-pie 
                        height="250px" 
                        :data="chartsData.depOtherData" 
                        :after-config="pieConfig.callback"
                        :title="{text: '项目/产品/其他'}" 
                        :data-empty="vm.empty"
                        :loading="vm.loading"
                        :settings="pieConfig.chartSettings">
                    </ve-pie>
                </div>
            </div>
        </div>
        <popup v-model="vm.dateVisible">
            <popup-header 
                left-text="取消" 
                right-text="确定" 
                title="请选择日期" 
                :show-bottom-border="false" 
                @on-click-left="vm.dateVisible = false"
                @on-click-right="getDate">
            </popup-header>
            <datetime-view format="YYYY-MM-DD" v-model="vm.date"></datetime-view>
        </popup>
    </div>
</template>
<style scoped lang="less">
    @import '../../public/less/statistics.less';
</style>
<script>
    import { mapState, mapMutations } from 'vuex';
    import {XHeader,DatetimeView,Popup,PopupHeader,Picker} from 'vux';
    export default {
        name: 'department',
        computed: {
            ...mapState({
                histogramConfig: state => state.common.histogramConfig,
                pieConfig: state => state.common.pieConfig,
                chartsData: state => state.common.department.chartsData,
                formModel: state => state.common.department.formModel,
                vm: state => state.common.department.vm
            })
        },
        components: {
            XHeader,
            DatetimeView,
            Popup,
            PopupHeader,
            Picker
        },
        created(){
            this.getDepartmentList();
        },
        mounted () {
          this.getList();
        },
        methods:{
            ...mapMutations({
                getDepartmentList:'common/department/getDepartmentList',
                handleClear:'common/department/clear',
                getList:'common/department/getList',
                getDate:'common/department/getDate',
                handleShowDate:'common/department/showDate'
            }),
            handleFormat(value){
                return value[0] + ' 至 ' + value[1];
            }
        }
    }
</script>