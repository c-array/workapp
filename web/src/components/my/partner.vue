<template>
    <div class="inner">
        <x-header class="x-header" title="我的工作">
            <!-- <i @click="vm.visible = !vm.visible" class="icon-search"></i> -->
        </x-header>
        <div class="list-main list-inner">
            <scroller ref="myScroller" :on-refresh="refresh" :on-infinite="loadMore">
                <ul>
                    <li v-for="item in list">
                        <p><span>姓名：{{item.work_admin.realname}}</span></p>
                        <p><span>工作任务：{{item.taskName}}</span></p>
                        <p><span>所属项目：{{item.work_product_project ? item.work_product_project.prName : '其他'}}</span></p>
                        <p><span>用时：{{item.usedTime}}</span><span>类型：{{item.type == 1 ? '产品' : (item.type == 2 ? '项目' : '其他')}}</span><span>日期：{{item.createDate}}</span></p>
                    </li>
                </ul>
            </scroller>
        </div>
        <!-- <popup position="right" width="90%" v-model="vm.visible">
            <user-search></user-search>
        </popup> -->
    </div>
</template>
<style scoped lang="less">
    @import '../../public/less/system.less';
</style>
<script>
    import {XHeader,Spinner,Popup} from 'vux';
    export default {
        name:'partner',
        data () {
            return {
                vm:{
                    visible:false
                },
                currentPage:-1,
                pageSize:15,
                list:[]
            }
        },
        components: {
            XHeader,
            Spinner,
            Popup
        },
        created () {
            //this.query();
        },
        methods:{
            query(param){
                this.$http.post({
                    url:'/my/work',
                    data:{
                        userId:sessionStorage.userId,
                        currentPage:this.currentPage,
                        pageSize:this.pageSize
                    },
                    type:"json",
                    success: data => {
                        if(param && param.done){
                            setTimeout(_ => {
                                if(param.type == 1){
                                    this.list = this.list.concat(data);
                                }else if(param.type == 2){
                                    this.list = data;
                                }
                                param.done();
                            },1500)
                        }else{
                            this.list = data;
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