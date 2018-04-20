import Vue from 'vue';
export default {
    namespaced: true,
    state: {
        vm: {
            itemList: '',
            loading: true,
            empty: false
        },
        formModel: {
            type: '', //类型：1产品，2：项目
            itemId: '' //产品或项目id
        },
        chartsData: {
            product: {
                columns: ['prName', 'usedTime'],
                rows: []
            },
            project: {
                columns: ['prName', 'usedTime'],
                rows: []
            }
        }
    },
    mutations: {
        getList(state, params) {
            state.vm.loading = true;
            Vue.$http.post({
                url: '/stats/product-item',
                data: state.formModel,
                type: 'json',
                success: data => {
                    setTimeout(_ => {
                        state.vm.loading = false;
                        state.vm.empty = false;
                        state.chartsData.product.rows = data.product;
                        state.chartsData.project.rows = data.project;
                    },300)
                },
                error: msg => {
                    Vue.$vux.toast.text(msg, 'top');
                    state.vm.empty = true;
                }
            })
        },
        getItemList(state, params) {
            if (state.formModel.type) {
                Vue.$http.get({
                    url: '/proitems/type/' + state.formModel.type,
                    success: data => {
                        state.formModel.itemId = '';
                        state.vm.itemList = data;
                        this.commit('common/item/getList');
                    },
                    error: msg => {
                        Vue.$vux.toast.text(msg, 'top');
                    }
                })
            } else {
                state.formModel.itemId = '';
                state.vm.itemList = [];
                this.commit('common/item/getList');
            }
        },
        export(state,params){
            Vue.$http.post({
                url:'/export/product-item',
                data:state.formModel,
                type:'json',
                success: url => {
                    window.location.href = this.state.common.exportIP + url;
                },
                error: msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        }
    }
}