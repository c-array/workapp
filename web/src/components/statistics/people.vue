<template>
    <div class="inner stats">
        <x-header title="统计分析-项目人月">
            <div slot="right" class="stats-head-right">
                <i class="icon-list"></i>
                <i class="icon-curve"></i>
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
                <li>
                    <span @click="handleShowDate('startDate')">{{formModel.startDate ? formModel.startDate :'开始时间'}}</span>
                    <i v-if="formModel.startDate" @click="handleClear(['startDate'])" class="icon-clear"></i>
                </li>
                <li>
                    <span @click="handleShowDate('endDate')">{{formModel.endDate ? formModel.endDate :'结束时间'}}</span>
                    <i v-if="formModel.endDate" @click="handleClear(['endDate'])" class="icon-clear"></i>
                </li>
            </ul>
        </div>
        <!-- <dl class="people" v-for="item in peopleList">
            <dt>{{item.prName}}</dt>
            <dd v-for="obj in item.work_dailies">
                {{obj.work_admin.realname}}：<span class="usedTime">{{obj.usedTime.toFixed(2)}}</span> 小时
            </dd>
            <dd class="people-count">总投入时间：<span class="usedTime">{{item.count.toFixed(2)}}</span> 小时</dd>
        </dl> -->
    </div>
</template>
<style scoped lang="less">
    @import '../../public/less/statistics.less';
</style>
<script>
    import { mapState, mapMutations } from 'vuex';
    export default {
        name: 'people',
        computed: {
            ...mapState({
                histogramConfig: state => state.common.histogramConfig,
                chartsData: state => state.common.stats.chartsData,
                peopleList: state => state.common.stats.peopleList
            })
        }
    }
</script>