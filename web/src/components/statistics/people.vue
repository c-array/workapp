<template>
    <div class="statistics-box">
        <dl class="people" v-for="item in peopleList">
            <dt>{{item.prName}}</dt>
            <dd v-for="obj in item.work_dailies">
                {{obj.work_admin.realname}}：<span class="usedTime">{{obj.usedTime.toFixed(2)}}</span> 小时
            </dd>
            <dd class="people-count">总投入时间：<span class="usedTime">{{item.count.toFixed(2)}}</span> 小时</dd>
        </dl>
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
                histogramConfig: state => state.common.stats.histogramConfig,
                chartsData: state => state.common.stats.chartsData,
                peopleList: state => state.common.stats.peopleList
            })
        }
    }
</script>