<template>
    <div class="inner list-main">
        <x-header class="x-header" title="部门管理">
            <div slot="right" class="x-header-right">
                <i @click="gotoForm()" class="icon-add"></i>
            </div>
        </x-header>
        <ul>
            <li v-for="(item,index) in deptList">
                <p class="title">
                    <span>部门名称：{{item.depName}}</span>
                </p>
                <p>
                    <span>部门描述：{{item.depDescribe}}</span>
                </p>
                <p>
                    <span>创建日期：{{item.createTime}}</span>
                    <span>
                        <i @click="gotoForm(item)" class="icon-edit"></i>
                        <i @click="handleDelete(item.id)" class="icon-delete"></i>
                    </span>
                </p>
            </li>
        </ul>
    </div>
</template>
<style scoped lang="less">
    @import '../../../public/less/system.less';
</style>
<script>
    import { mapState, mapMutations } from 'vuex';
    import { XHeader, Popup, PopupHeader, Checklist } from 'vux';
    export default {
        name: 'user',
        data() {
            return {

            }
        },
        computed: {
            ...mapState({
                deptList: state => state.common.dept.deptList,
                vm: state => state.common.dept.vm
            })
        },
        components: {
            XHeader,
            Popup,
            PopupHeader,
            Checklist
        },
        created() {
            this.query();
        },
        methods: {
            ...mapMutations({
                query: 'common/dept/getList',
            }),
            gotoForm(item) {
                this.$store.commit('common/dept/clear');
                if (item) {
                    this.$router.push({ path: "/system/dept/form", query: { deptId: item.id } });
                } else {
                    this.$router.push({ path: "/system/dept/form" });
                }
            },
            handleDelete(userId) {
                const _this = this;
                this.$vux.confirm.show({
                    title: "删除提示",
                    content: "确定要删除该条记录?",
                    onCancel() {
                        _this.$vux.toast.text('已取消删除', 'top');
                    },
                    onConfirm() {
                        _this.$store.commit({
                            type: 'common/dept/delete',
                            id: userId
                        })
                    }
                })
            }
        }
    }
</script>