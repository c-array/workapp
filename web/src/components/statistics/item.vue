<template>
    <div class="inner stats">
        <x-header title="统计分析-项目/产品统计">
            <div slot="right" class="stats-head-right">
                <i @click="handleExport" class="icon-export"></i>
            </div>
        </x-header>
        <div class="stats-box">
            <ul>
                <li>
                    <select @change="handleGetItemList" v-model="formModel.type">
                        <option value="">全部</option>
                        <option v-for="item in [{id:1,name:'产品'},{id:2,name:'项目'}]" :value="item.id">{{item.name}}</option>
                    </select>
                </li>
                <li>
                    <select @change="handleGetList" v-model="formModel.itemId">
                        <option value="">全部</option>
                        <option v-for="item in vm.itemList" :value="item.id">{{item.prName}}</option>
                    </select>
                </li>
            </ul>
            <div class="stats-warp">
                <div v-if="formModel.type == 1 || formModel.type == ''" class="stats-chart">
                    <ve-histogram 
                        height="250px" 
                        :title="{text: '产品投入时间'}" 
                        :legend-visible="false"
                        :data-zoom="histogramConfig.dataZoom" 
                        :after-config="histogramConfig.callback" 
                        :data="chartsData.itemPmData"
                        :data-empty="vm.empty"
                        :loading="vm.loading"
                        :settings="histogramConfig.chartSettings">
                    </ve-histogram>
                </div>
                <div v-if="formModel.type == 2 || formModel.type == ''" class="stats-chart">
                    <ve-histogram 
                        height="250px" 
                        :title="{text: '项目投入时间'}" 
                        :legend-visible="false"
                        :data-zoom="histogramConfig.dataZoom" 
                        :after-config="histogramConfig.callback" 
                        :data="chartsData.itemPjData"
                        :data-empty="vm.empty"
                        :loading="vm.loading"
                        :settings="histogramConfig.chartSettings">
                    </ve-histogram>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import '../../public/less/statistics.less';
</style>
<script>
    import { mapState, mapMutations } from 'vuex';
    import {XHeader} from 'vux';
    export default {
        name: 'item',
        computed: {
            ...mapState({
                formModel: state => state.common.item.formModel,
                vm: state => state.common.item.vm,
                histogramConfig: state => state.common.histogramConfig,
                chartsData: state => state.common.item.chartsData
            })
        },
        components: {
            XHeader
        },
        created () {
          this.handleGetList();  
        },
        methods:{
            ...mapMutations({
                handleGetItemList:'common/item/getItemList',
                handleGetList:'common/item/getList',
                handleExport:'common/item/export',
            })
        }
    }
</script>