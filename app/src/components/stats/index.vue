<template>
    <!-- 统计分析 -->
    <div class="inner stats">
        <x-header :left-options="{showBack: false}" title="">
            <span class="x-title" slot="left">统计分析</span>
        </x-header>
        <grid :cols="2">
            <grid-item link="/main/stats/colleague">
                <i class="icon-colleague"></i>
                <p>同事统计</p>
            </grid-item>
            <grid-item link="/main/stats/dept">
                <i class="icon-department"></i>
                <p>部门统计</p>
            </grid-item>
            <grid-item link="/main/stats/item">
                <i class="icon-product"></i>
                <p>产品/项目统计</p>
            </grid-item>
            <grid-item link="/main/stats/people">
                <i class="icon-partner"></i>
                <p>人月统计</p>
            </grid-item>
        </grid>
    </div>
</template>
<style scoped lang="less">
    @import '../../public/less/statistics.less';
</style>
<script>
    import Vue from 'vue';
    import { mapState, mapMutations } from 'vuex';
    import { Grid, GridItem,XHeader} from 'vux';
    export default {
        name: 'statistics',
        data() {
            return {
                name: ''
            }
        },
        components: {
            Grid,
            GridItem,
            XHeader
        }
    }
</script>