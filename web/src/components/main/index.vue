<template>
    <div class="inner main">
        <div class="main-body">
            <router-view></router-view>
        </div>
        <mu-tabs :value="activeTab" @change="handleTabChange">
            <mu-tab v-for="item in menuList" :value="item.id" :key="item.id" :icon="item.icon" :title="item.name" />
        </mu-tabs>
    </div>
</template>
<style lang="less">
    @import '../../public/less/main.less';
</style>
<script>
    export default {
        name: 'home',
        data() {
            return {
                activeTab: 1,
                menuList:[
                    {
                        id:1,
                        name:'今天',
                        icon:'date_range',
                        url:'/main/day'
                    },
                    {
                        id:2,
                        name:'统计分析',
                        icon:'show_chart',
                        url:'/main/statistics'
                    },
                    {
                        id:3,
                        name:'系统管理',
                        icon:'settings',
                        url:'/main/day'
                    },
                    {
                        id:4,
                        name:'我的',
                        icon:'perm_identity',
                        url:'/main/day'
                    }
                ]
            }
        },
        mounted () {
            if(this.$route.query.tabId){
                this.activeTab = parseInt(this.$route.query.tabId);
            }
        },
        methods: {
            handleTabChange(val) {
                this.activeTab = val;
                for (const item of this.menuList) {
                    if(item.id == val){
                        this.$router.push({
                            path:item.url,
                            query:{
                                tabId:val
                            }
                        })
                        break;
                    }
                }
            }
        }
    }
</script>