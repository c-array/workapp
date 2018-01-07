<template>
    <div class="inner main">
        <div class="main-body">
            <router-view></router-view>
        </div>
        <tabbar v-model="activeTab">
            <tabbar-item @on-item-click="handleTabChange(item.id)" :key="item.id" v-for="(item,index) in menuList">
                <i slot="icon" :class="item.icon"></i>
                <div slot="label">
                    {{item.name}}
                </div>
            </tabbar-item>
        </tabbar>
    </div>
</template>
<style lang="less">
    @import '../../public/less/main.less';
</style>
<script>
    import {Tabbar,TabbarItem,Icon} from 'vux';
    export default {
        name: 'home',
        data() {
            return {
                activeTab: this.$route.query.tabId ? parseInt(this.$route.query.tabId) : 0,
                menuList:[
                    {
                        id:1,
                        name:'今天',
                        icon:'icon-date',
                        url:'/main/day'
                    },
                    {
                        id:2,
                        name:'统计分析',
                        icon:'icon-stats',
                        url:'/main/statistics'
                    },
                    {
                        id:3,
                        name:'系统管理',
                        icon:'icon-guanli',
                        url:'/main/day'
                    },
                    {
                        id:4,
                        name:'我的',
                        icon:'icon-my',
                        url:'/main/day'
                    }
                ]
            }
        },
        components:{
            Icon,
            Tabbar,
            TabbarItem
        },
        methods: {
            handleTabChange(val) {
                this.activeTab = val - 1;
                for (const item of this.menuList) {
                    if(item.id == val){
                        this.$router.push({
                            path:item.url,
                            query:{
                                tabId:val - 1
                            }
                        })
                        break;
                    }
                }
            }
        }
    }
</script>