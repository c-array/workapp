<template>
    <div class="inner stats">
        <x-header title="统计分析-人月统计">
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
                <dl class="people" v-for="item in peopleList">
                    <dt>{{item.prName}}</dt>
                    <dd v-for="obj in item.dailies">
                        {{obj.realname}}：<span class="usedTime">{{obj.usedTime.toFixed(1)}}</span>小时
                    </dd>
                    <dd class="people-count">总投入时间：<span class="usedTime">{{item.count.toFixed(1)}}</span> 小时 <i @click="handleCharts(item)" class="icon-curve"></i></dd>
                </dl>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import '../../public/less/statistics.less';
</style>
<script>
    import { mapState, mapMutations } from 'vuex';
    import { XHeader } from 'vux';
    export default {
        name: 'people',
        computed: {
            ...mapState({
                histogramConfig: state => state.common.histogramConfig,
                formModel: state => state.common.people.formModel,
                peopleList: state => state.common.people.peopleList,
                vm: state => state.common.people.vm
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
                handleGetList:'common/people/getList',
                handleGetItemList:'common/people/getItemList',
                handleExport:'common/people/export',
            }),
            handleCharts(item){
                this.$router.push({path:'/main/people-charts',query:{itemId:item.id}});
            },
        }
    }
</script>