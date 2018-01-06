<template>
    <div class="statistics-box">
        <div class="statistics-chart">
            <ve-histogram v-if="chartsData.dayData.rows.length > 0" height="250px" :title="{text:'我和伙伴'}" :legend-visible="false" :data-zoom="histogramConfig.dataZoom"
                :after-config="histogramConfig.callback" :data="chartsData.dayData" :settings="histogramConfig.chartSettings"></ve-histogram>
            <div class="stats-empty" v-else>
                <h3>每天投入时间</h3>
                <mu-icon value="warning" />
                <p>暂无数据</p>
            </div>
        </div>
        <div class="statistics-chart">
            <ve-histogram v-if="chartsData.pmData.rows.length > 0" height="250px" :title="{text:'产品投入时间'}" :legend-visible="false" :data-zoom="histogramConfig.dataZoom"
                :after-config="histogramConfig.callback" :data="chartsData.pmData" :settings="histogramConfig.chartSettings"></ve-histogram>
            <div class="stats-empty" v-else>
                <h3>产品投入时间</h3>
                <mu-icon value="warning" />
                <p>暂无数据</p>
            </div>
        </div>
        <div class="statistics-chart">
            <ve-histogram v-if="chartsData.pjData.rows.length > 0" height="250px" :title="{text:'项目投入时间'}" :legend-visible="false" :data-zoom="histogramConfig.dataZoom"
                :after-config="histogramConfig.callback" :data="chartsData.pjData" :settings="histogramConfig.chartSettings"></ve-histogram>
            <div class="stats-empty" v-else>
                <h3>项目投入时间</h3>
                <mu-icon value="warning" />
                <p>暂无数据</p>
            </div>
        </div>
        <div class="statistics-chart">
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
</template>
<style scoped lang="less">
    @import '../../public/less/statistics.less';
</style>
<script>
    import {mapState,mapMutations} from 'vuex';
    export default {
        name:'day',
        computed: {
            ...mapState({
                histogramConfig: state => state.common.stats.histogramConfig,
                pieConfig: state => state.common.stats.pieConfig,
                chartsData: state => state.common.stats.chartsData
            })
        }
    }
</script>