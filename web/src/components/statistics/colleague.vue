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
            <li>姓名</li>
            <li><calendar title="" placeholder="开始日期" v-model="formModel.startDate"></calendar></li>
            <li><calendar title="" placeholder="开始日期" v-model="formModel.endDate"></calendar></li>
        </ul>
        <div class="stats-chart">
            <ve-histogram v-if="chartsData.dayData.rows.length > 0" height="250px" :title="{text:'我和伙伴'}" :legend-visible="false" :data-zoom="histogramConfig.dataZoom"
                :after-config="histogramConfig.callback" :data="chartsData.dayData" :settings="histogramConfig.chartSettings"></ve-histogram>
            <div class="stats-empty" v-else>
                <h3>每天投入时间</h3>
                <mu-icon value="warning" />
                <p>暂无数据</p>
            </div>
        </div>
        <div class="stats-chart">
            <ve-histogram v-if="chartsData.pmData.rows.length > 0" height="250px" :title="{text:'产品投入时间'}" :legend-visible="false" :data-zoom="histogramConfig.dataZoom"
                :after-config="histogramConfig.callback" :data="chartsData.pmData" :settings="histogramConfig.chartSettings"></ve-histogram>
            <div class="stats-empty" v-else>
                <h3>产品投入时间</h3>
                <mu-icon value="warning" />
                <p>暂无数据</p>
            </div>
        </div>
        <div class="stats-chart">
            <ve-histogram v-if="chartsData.pjData.rows.length > 0" height="250px" :title="{text:'项目投入时间'}" :legend-visible="false" :data-zoom="histogramConfig.dataZoom"
                :after-config="histogramConfig.callback" :data="chartsData.pjData" :settings="histogramConfig.chartSettings"></ve-histogram>
            <div class="stats-empty" v-else>
                <h3>项目投入时间</h3>
                <mu-icon value="warning" />
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
                <mu-icon value="warning" />
                <p>暂无数据</p>
            </div>
        </div>
    </div>
</div>
</template>
<style scoped lang="less">
    @import '../../public/less/statistics.less';
</style>
<script>
    import {mapState,mapMutations} from 'vuex';
    import {XHeader,Calendar} from 'vux';
    export default {
        name:'day',
        computed: {
            ...mapState({
                histogramConfig: state => state.common.colleague.histogramConfig,
                pieConfig: state => state.common.colleague.pieConfig,
                chartsData: state => state.common.colleague.chartsData,
                formModel: state => state.common.colleague.formModel
            })
        },
        components: {
            XHeader,
            Calendar
        }
    }
</script>