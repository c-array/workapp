<template>
<div class="inner stats">
    <x-header title="统计分析-同事统计">
        <div slot="right" class="stats-head-right">
            <i class="icon-list"></i>
            <i class="icon-curve"></i>
        </div>
    </x-header>
    <div class="stats-box">
        <ul>
            <li>
                <span @click="getUserList">{{formModel.username ? formModel.username :'选择姓名'}}</span> 
                <i v-if="formModel.username" @click="handleClear(['username','userId'])" class="icon-clear"></i>
            </li>
            <li>
                <span @click="vm.dateVisible = true">{{formModel.createDate}}</span>
                <i v-if="formModel.createDate" @click="handleClear(['createDate'])" class="icon-clear"></i>
            </li>
        </ul>
        <div class="stats-chart">
            <ve-histogram v-if="chartsData.dayData.rows.length > 0" height="250px" :title="{text:'我和伙伴'}" :legend-visible="false" :data-zoom="histogramConfig.dataZoom"
                :after-config="histogramConfig.callback" :data="chartsData.dayData" :settings="histogramConfig.chartSettings"></ve-histogram>
            <div class="stats-empty" v-else>
                <h3>每天投入时间</h3>
                <i class="icon-warning"></i>
                <p>暂无数据</p>
            </div>
        </div>
        <div class="stats-chart">
            <ve-histogram v-if="chartsData.pmData.rows.length > 0" height="250px" :title="{text:'产品投入时间'}" :legend-visible="false" :data-zoom="histogramConfig.dataZoom"
                :after-config="histogramConfig.callback" :data="chartsData.pmData" :settings="histogramConfig.chartSettings"></ve-histogram>
            <div class="stats-empty" v-else>
                <h3>产品投入时间</h3>
                <i class="icon-warning"></i>
                <p>暂无数据</p>
            </div>
        </div>
        <div class="stats-chart">
            <ve-histogram v-if="chartsData.pjData.rows.length > 0" height="250px" :title="{text:'项目投入时间'}" :legend-visible="false" :data-zoom="histogramConfig.dataZoom"
                :after-config="histogramConfig.callback" :data="chartsData.pjData" :settings="histogramConfig.chartSettings"></ve-histogram>
            <div class="stats-empty" v-else>
                <h3>项目投入时间</h3>
                <i class="icon-warning"></i>
                <p>暂无数据</p>
            </div>
        </div>
        <div class="stats-chart">
            <ve-pie 
                v-if="chartsData.otherData.rows.length > 0" 
                height="250px" 
                :data="chartsData.otherData"
                :after-config="pieConfig.callback"
                :title="{text: '项目投入时间'}"
                :settings="pieConfig.chartSettings">
            </ve-pie>
            <div class="stats-empty" v-else>
                <h3>项目/产品/其他投入时间</h3>
                <i class="icon-warning"></i>
                <p>暂无数据</p>
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
        <datetime-view format="YYYY-MM" v-model="vm.date"></datetime-view>
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
                histogramConfig: state => state.common.colleague.histogramConfig,
                pieConfig: state => state.common.colleague.pieConfig,
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
                getDate:'common/colleague/getDate'
            }),
            handleFormat(value){
                console.log(value);
                return value[0] + ' 至 ' + value[1];
            }
        }
    }
</script>