<template>
    <div class="inner stats">
        <x-header title="人月统计-图表展示">
            <div slot="right" class="stats-head-right">
                <i @click="vm.charts = 1" class="icon-curve"></i>
                <i @click="vm.charts = 2" class="icon-stats"></i>
            </div>
        </x-header>
        <div class="stats-people">
            <ve-line
                v-show="vm.charts == 1" 
                width="100%"
                height="250px"
                :data="chartData.peopleData"
                :legend-visible="false"
                :dataZoom="lineConfig.dataZoom"
                :after-config="lineConfig.callback" 
                :title="{text:chartData.name,left:10}"
                :data-empty="vm.empty"
                :loading="vm.loading" 
                :settings="lineConfig.chartSettings">
            </ve-line>
            <ve-histogram 
                v-show="vm.charts == 2"
                width="100%"
                height="250px" 
                :data="chartData.peopleData"
                :title="{text:chartData.name,left:10}" 
                :legend-visible="false" 
                :data-zoom="histogramConfig.dataZoom"
                :after-config="histogramConfig.callback"
                :data-empty="vm.empty"
                :loading="vm.loading" 
                :settings="histogramConfig.chartSettings">
            </ve-histogram>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import '../../public/less/statistics.less';
</style>
<script>
    import {mapState,mapMutations} from 'vuex';
    import {XHeader} from 'vux';
    export default {
        name:'',
        components: {
            XHeader
        },
        computed: {
            ...mapState({
                vm:state => state.common.people.vm,
                chartData:state => state.common.people.chartData,
                lineConfig:state => state.common.lineConfig,
                histogramConfig:state => state.common.histogramConfig,
            })  
        },
        created () {
            if(this.$route.query.itemId){
                this.getPeopleItem(this.$route.query.itemId);
            }else{
                this.$vux.toast.text('无法取到当前要展示的图表的id，3秒回返回！', 'top');
                setTimeout(_ => {
                    window.history.back();
                },3000);
            }
        },
        methods:{
            ...mapMutations({
                getPeopleItem:'common/people/getPeopleItem'
            })
        }
    }
</script>
