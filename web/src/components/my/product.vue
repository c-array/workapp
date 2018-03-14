<template>
    <div class="inner">
        <x-header class="x-header" title="我参与的产品"></x-header>
        <div class="list-main list-inner">
            <scroller ref="myScroller" :on-refresh="refresh" :on-infinite="loadMore">
                <group>
                    <cell class="list-item" :key="item.id" v-for="item in list" :value="item.usedTime.toFixed(2)" :title="item.work_product_project.prName"></cell>
                </group>
            </scroller>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import '../../public/less/system.less';
    .list-item p{
        padding-left: 30px;
    }
</style>
<script>
    import {XHeader, Spinner, Group, Cell} from 'vux';
    export default {
        name:'partner',
        data () {
            return {
                currentPage:-1,
                pageSize:15,
                list:[]
            }
        },
        components: {
            XHeader,
            Spinner,
            Group,
            Cell
        },
        created () {
            //this.query();
        },
        methods:{
            query(param){
                this.$http.post({
                    url:'/my/item',
                    data:{
                        userId:sessionStorage.userId,
                        currentPage:this.currentPage,
                        pageSize:this.pageSize,
                        type:1
                    },
                    type:"json",
                    success: data => {
                        if(data.length > 0){
                            if(param && param.done){
                                setTimeout(_ => {
                                    if(param.type == 1){
                                        this.list = this.list.concat(data);
                                    }else if(param.type == 2){
                                        this.list = data;
                                    }
                                    param.done();
                                },1000)
                            }else{
                                this.list = data;
                            }
                        }else{
                            this.$refs.myScroller.finishInfinite(2);
                        }
                    },
                    error:msg => {
                        this.$vux.toast.text(msg, 'top');
                    }
                })
            },
            loadMore(done){
                this.currentPage = this.currentPage + 1;
                this.query({type:1,done:done});
            },
            refresh(state,done){
                this.currentPage = 0;
                this.query({type:2,done:done});
            }
        }
    }
</script>