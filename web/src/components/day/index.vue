<template>
    <div class="inner day">
        <mu-appbar title="今天">
            <div @click="openPicker" slot="right" class="day-date-picker">
                <input v-model="vm.currentDate" disabled type="text">
                <mu-icon value="date_range" />
            </div>
        </mu-appbar>
        <ul class="day-list">
            <li v-for="(item,index) in list">
                <p>{{item.taskName}}</p>
                <div class="day-action">
                    <mu-icon @click="handleGoTo(item)" color="brown500" value="mode_edit" />
                    <mu-icon @click="handleDelete(item.id)" color="blueGrey500" value="delete_forever" />
                </div>
            </li>
        </ul>
        <mu-float-button @click="handleGoTo()" icon="add" class="day-add" />
        <mt-datetime-picker
            ref="picker"
            v-model="vm.queryPicker"
            type="date"
            :startDate="vm.startDate"
            :endDate="vm.endDate"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            @confirm="handleConfirmDate">
        </mt-datetime-picker>
    </div>
</template>
<style scoped lang="less">
    @import '../../public/less/day.less';
</style>
<script>
    import Vue from 'vue';
    import { DatetimePicker } from 'mint-ui';
    Vue.component(DatetimePicker.name, DatetimePicker);
    import { mapState, mapMutations } from 'vuex';
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
                this.$MessageBox.confirm('确定要删除该条记录?').then(action => {
                    this.$store.commit({
                        type: 'common/day/delete',
                        id: taskId
                    })
                }).catch(() => {

                })
            },
            openPicker() {
                this.$refs.picker.open();
            },
            handleConfirmDate(val){
                this.$store.commit({
                    type: 'common/day/confirmDate',
                    date: val,
                    status:1
                })
            }
        }
    }
</script>