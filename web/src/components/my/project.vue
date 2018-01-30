<template>
    <div class="inner">
        <x-header class="x-header" title="我参与的项目"></x-header>
        <div class="list-main list-inner">
            <scroller ref="myScroller" :on-refresh="refresh" :on-infinite="loadMore">
                <ul>
                    <li v-for="item in productList">
                        <p><span>姓名：{{item.work_admin.realname}}</span></p>
                        <p><span>工作任务：{{item.taskName}}</span></p>
                        <p><span>所属项目：{{item.work_product_project ? item.work_product_project.prName : '其他'}}</span></p>
                        <p><span>用时：{{item.usedTime}}</span><span>类型：{{item.type == 1 ? '产品' : (item.type == 2 ? '项目' : '其他')}}</span><span>日期：{{item.createDate}}</span></p>
                    </li>
                </ul>
            </scroller>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import '../../public/less/system.less';
</style>
<script>
    import Vue from 'vue';
    import {mapState,mapMutations} from 'vuex';
    import {XHeader,Spinner} from 'vux';
    export default {
        name:'partner',
        data () {
            return {
            }
        },
        components: {
            XHeader,
            Spinner
        },
        computed:{
            ...mapState({
                workList:state => state.common.my.workList,
                userInfo:state => state.common.userInfo
            })
        },
        created () {
            this.query();
        },
        methods:{
            ...mapMutations({
                query:'common/my/getList',
                loadMore:'common/my/loadMore',
                refresh:'common/my/refresh'
            })
        }
    }
</script>