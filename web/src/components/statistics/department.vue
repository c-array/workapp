<template>
        <div class="statistics-box">
            <div class="statistics-chart">
                <ve-histogram v-if="chartsData.personData.rows.length > 0" height="250px" :title="{text: '人员总体投入时间'}" :legend-visible="false" :data-zoom="histogramConfig.dataZoom"
                    :after-config="histogramConfig.callback" :data="chartsData.personData" :settings="histogramConfig.chartSettings"></ve-histogram>
                <div class="stats-empty" v-else>
                    <h3>人员总体投入时间</h3>
                    <mu-icon value="warning" />
                    <p>暂无数据</p>
                </div>
            </div>
            <div class="statistics-chart">
                <ve-histogram v-if="chartsData.itemPersonData.rows.length > 0" height="250px" :title="{text: '每人投入时间'}" :legend-visible="false" :data-zoom="histogramConfig.dataZoom"
                    :after-config="histogramConfig.callback" :data="chartsData.itemPersonData" :settings="histogramConfig.chartSettings"></ve-histogram>
                <div class="stats-empty" v-else>
                    <h3>每人投入时间</h3>
                    <mu-icon value="warning" />
                    <p>暂无数据</p>
                </div>
            </div>
            <div class="statistics-chart">
                <ve-histogram v-if="chartsData.depPmData.rows.length > 0" height="250px" :title="{text: '产品投入时间'}" :legend-visible="false" :data-zoom="histogramConfig.dataZoom"
                    :after-config="histogramConfig.callback" :data="chartsData.depPmData" :settings="histogramConfig.chartSettings"></ve-histogram>
                <div class="stats-empty" v-else>
                    <h3>产品投入时间</h3>
                    <mu-icon value="warning" />
                    <p>暂无数据</p>
                </div>
            </div>
            <div class="statistics-chart">
                <ve-histogram v-if="chartsData.depPjData.rows.length > 0" height="250px" :title="{text: '项目投入时间'}" :legend-visible="false" :data-zoom="histogramConfig.dataZoom"
                    :after-config="histogramConfig.callback" :data="chartsData.depPjData" :settings="histogramConfig.chartSettings"></ve-histogram>
                <div class="stats-empty" v-else>
                    <h3>项目投入时间</h3>
                    <mu-icon value="warning" />
                    <p>暂无数据</p>
                </div>
            </div>
            <div class="statistics-chart">
                    <ve-pie 
                    v-if="chartsData.depOtherData.rows.length > 0" 
                    height="250px" 
                    :data="chartsData.depOtherData"
                    :after-config="pieConfig.callback"
                    :title="{text: '项目/产品/其他'}"
                    :settings="pieConfig.chartSettings">
                </ve-pie>
                <div class="stats-empty" v-else>
                    <h3>项目/产品/其他</h3>
                    <mu-icon value="warning" />
                    <p>暂无数据</p>
                </div>
            </div>
        </div>
</template>
<style scoped lang="less">
    @import '../../public/less/statistics.less';
</style>
<script>
    import {mapState,mapMutations} from 'vuex';
    export default {
        name:'department',
        computed: {
            ...mapState({
                histogramConfig: state => state.common.stats.histogramConfig,
                pieConfig: state => state.common.stats.pieConfig,
                chartsData: state => state.common.stats.chartsData
            })
        }
    }
</script>