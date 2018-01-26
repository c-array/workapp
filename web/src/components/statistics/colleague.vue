<template>
<div class="inner stats">
    <x-header title="统计分析-同事统计">
        <div slot="right" class="stats-head-right">
            <i @click="handleExport" class="icon-export"></i>
        </div>
    </x-header>
    <div class="stats-box">
        <ul>
            <li>
                <span @click="getUserList">{{formModel.username ? formModel.username :'选择姓名'}}</span> 
                <i v-if="formModel.username" @click="handleClear(['username','userId'])" class="icon-clear"></i>
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
                    :title="{text:'我和伙伴'}" 
                    :legend-visible="false" 
                    :data-zoom="histogramConfig.dataZoom"
                    :after-config="histogramConfig.callback" 
                    :data="chartsData.dayData"
                    :data-empty="vm.empty"
                    :loading="vm.loading" 
                    :settings="histogramConfig.chartSettings">
                </ve-histogram>
            </div>
            <div class="stats-chart">
                <ve-histogram 
                    height="250px" 
                    :title="{text:'产品投入时间'}" 
                    :legend-visible="false"
                    :data-zoom="histogramConfig.dataZoom"
                    :after-config="histogramConfig.callback" 
                    :data="chartsData.pmData"
                    :data-empty="vm.empty"
                    :loading="vm.loading" 
                    :settings="histogramConfig.chartSettings">
                </ve-histogram>
            </div>
            <div class="stats-chart">
                <ve-histogram 
                    height="250px" 
                    :title="{text:'项目投入时间'}" 
                    :legend-visible="false" 
                    :data-zoom="histogramConfig.dataZoom"
                    :after-config="histogramConfig.callback" 
                    :data="chartsData.pjData"
                    :data-empty="vm.empty"
                    :loading="vm.loading" 
                    :settings="histogramConfig.chartSettings">
                </ve-histogram>
            </div>
            <div class="stats-chart">
                <ve-pie 
                    height="250px" 
                    :data="chartsData.otherData"
                    :after-config="pieConfig.callback"
                    :title="{text: '项目/产品/其他投入时间'}"
                    :legend-visible="true"
                    :data-empty="vm.empty"
                    :loading="vm.loading"
                    :settings="pieConfig.chartSettings">
                </ve-pie>
            </div>
        </div>
    </div>
    <popup v-model="vm.visible" width="100%">
        <popup-header left-text="取消" right-text="确定" title="" :show-bottom-border="false" @on-click-left="vm.visible = false"
            @on-click-right="getUserName">
        </popup-header>
        <div class="search-picker">
            <input v-model="vm.username" placeholder="输入用户名筛选" type="text">
        </div>
        <picker :data='filterName' v-model='vm.nameModel'></picker>
    </popup>
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
    import {mapState,mapMutations} from 'vuex';
    import {XHeader,DatetimeView,Popup,PopupHeader,Picker} from 'vux';
    export default {
        name:'day',
        computed: {
            ...mapState({
                histogramConfig: state => state.common.histogramConfig,
                pieConfig: state => state.common.pieConfig,
                chartsData: state => state.common.colleague.chartsData,
                formModel: state => state.common.colleague.formModel,
                vm: state => state.common.colleague.vm
            }),
            filterName() { //过滤用户名
                if(this.vm.userList && this.vm.userList.length > 0){
                    let data = this.vm.userList[0].filter((obj,index) => {
                        if (this.vm.username) {
                            if (obj.name.indexOf(this.vm.username) >= 0) {
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
        components: {
            XHeader,
            DatetimeView,
            Popup,
            PopupHeader,
            Picker
        },
        created(){
            this.getList();
        },
        methods:{
            ...mapMutations({
                getUserName:'common/colleague/getUserName',
                getUserList:'common/colleague/getUserList',
                handleClear:'common/colleague/clear',
                getList:'common/colleague/getList',
                getDate:'common/colleague/getDate',
                handleShowDate:'common/colleague/showDate',
                handleExport:'common/colleague/export',
            }),
            handleFormat(value){
                return value[0] + ' 至 ' + value[1];
            }
        }
    }
</script>