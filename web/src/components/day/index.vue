<template>
    <div class="inner day">
        <x-header title="今天">
            <div slot="right" class="day-date-picker">
                <calendar @on-change="handleQuery" title="" v-model="vm.currentDate"></calendar>
                <i class="icon-date"></i>
            </div>
        </x-header>
        <ul class="day-list">
            <li v-for="(item,index) in list">
                <p>{{item.taskName}}</p>
                <div class="day-action">
                    <i @click="handleGoTo(item)" class="icon-edit"></i>
                    <i @click="handleDelete(item.id)" class="icon-delete"></i>
                </div>
            </li>
        </ul>
        <div @click="handleGoTo()" class="day-add">
            <i class="icon-add"></i>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import '../../public/less/day.less';
</style>
<script>
    import Vue from 'vue';
    import { mapState, mapMutations } from 'vuex';
    import { Calendar,XHeader } from 'vux';
    export default {
        name: 'day',
        data() {
            return {
                
            }
        },
        computed: {
            ...mapState({
                list: state => state.common.day.list,
                vm: state => state.common.day.vm
            })
        },
        components: {
            Calendar,
            XHeader 
        },
        created() {
            this.handleQuery();
        },
        methods: {
            ...mapMutations({
                handleQuery: 'common/day/getList'
            }),
            handleGoTo(item) { //跳转
                this.$store.commit('common/day/clear');
                this.$router.push({
                    path: '/day-form',
                    query: {
                        id: item ? item.id : '',
                    }
                });
            },
            handleDelete(taskId) {
                const _this = this;
                this.$vux.confirm.show({
                    title:"删除提示",
                    content:"确定要删除该条记录?",
                    onCancel () {
                        _this.$vux.toast.text('已取消删除', 'top');
                    },
                    onConfirm () {
                        _this.$store.commit({
                            type: 'common/day/delete',
                            id: taskId
                        })
                    }
                })
            }
        }
    }
</script>