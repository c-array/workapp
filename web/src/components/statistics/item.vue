<template>
    <div class="statistics-box">
        <div class="statistics-chart">
            <ve-histogram 
                v-if="chartsData.itemPmData.rows.length > 0" 
                height="250px" 
                :title="{text: '产品投入时间'}" 
                :legend-visible="false"
                :data-zoom="histogramConfig.dataZoom" 
                :after-config="histogramConfig.callback" 
                :data="chartsData.itemPmData"
                :settings="histogramConfig.chartSettings">
            </ve-histogram>
            <div class="stats-empty" v-else>
                <h3>产品投入时间</h3>
                <mu-icon value="warning" />
                <p>暂无数据</p>
            </div>
        </div>
        <div class="statistics-chart">
            <ve-histogram 
                v-if="chartsData.itemPjData.rows.length > 0" 
                height="250px" 
                :title="{text: '项目投入时间'}" 
                :legend-visible="false"
                :data-zoom="histogramConfig.dataZoom" 
                :after-config="histogramConfig.callback" 
                :data="chartsData.itemPjData"
                :settings="histogramConfig.chartSettings">
            </ve-histogram>
            <div class="stats-empty" v-else>
                <h3>项目投入时间</h3>
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
    import { mapState, mapMutations } from 'vuex';
    export default {
        name: 'item',
        computed: {
            ...mapState({
                histogramConfig: state => state.common.stats.histogramConfig,
                chartsData: state => state.common.stats.chartsData
            })
        }
    }
</script>