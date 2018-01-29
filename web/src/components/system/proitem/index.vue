<template>
    <div class="inner list-main">
        <x-header class="x-header" title="产品项目管理">
            <div slot="right" class="x-header-right">
                <i @click="vm.searchVisible = !vm.searchVisible" class="icon-search"></i>
                <i @click="gotoForm()" class="icon-add"></i>
            </div>
        </x-header>
        <ul>
            <li v-for="(item,index) in proitemList">
                <p class="title">
                    <span>名称：{{item.prName}}</span>
                </p>
                <p>
                    <span>描述：{{item.prDescribe}}</span>
                </p>
                <p>
                    <span>类型：{{item.type == 1 ? '产品' : '项目'}}</span>
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
        <popup position="right" width="90%" v-model="vm.searchVisible">
            <proitem-search></proitem-search>
        </popup>
    </div>
</template>
<style scoped lang="less">
    @import '../../../public/less/system.less';
</style>
<script>
    import { mapState, mapMutations } from 'vuex';
    import { XHeader, Popup, PopupHeader, Checklist } from 'vux';
    import proitemSearch from "./search.vue";
    export default {
        name: 'proitem',
        computed: {
            ...mapState({
                proitemList: state => state.common.proitem.proitemList,
                vm: state => state.common.proitem.vm
            })
        },
        components: {
            XHeader,
            Popup,
            PopupHeader,
            Checklist,
            proitemSearch
        },
        created() {
            this.query();
        },
        methods: {
            ...mapMutations({
                query: 'common/proitem/getList'
            }),
            gotoForm(item) {
                this.$store.commit('common/proitem/clear');
                if (item) {
                    this.$router.push({ path: "/proitem-form", query: { proitemId: item.id } });
                } else {
                    this.$router.push({ path: "/proitem-form" });
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
                            type: 'common/proitem/delete',
                            id: userId
                        })
                    }
                })
            }
        }
    }
</script>