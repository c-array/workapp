import Vue from 'vue';
import http from '../../public/js/http';
import { formatDate } from '../../public/js/common';
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
            itemPmData: {
                columns: ['prName', 'usedTime'],
                rows: []
            },
            itemPjData: {
                columns: ['prName', 'usedTime'],
                rows: []
            }
        }
    },
    mutations: {
        getList(state, params) {
            state.vm.loading = true;
            http.post({
                url: '/statsItem',
                data: state.formModel,
                type: 'json',
                success: data => {
                    setTimeout(_ => {
                        state.vm.loading = false;
                        state.vm.empty = false;
                        var itemPmData = [];
                        var itemPjData = [];
                        data.forEach(function (item, key) {
                            if (item.work_product_project.type == 1) {
                                itemPmData.push({
                                    prName: item.work_product_project.prName,
                                    usedTime: item.usedTime
                                })
                            }
                            if (item.work_product_project.type == 2) {
                                itemPjData.push({
                                    prName: item.work_product_project.prName,
                                    usedTime: item.usedTime
                                })
                            }
                        })
                        state.chartsData.itemPmData.rows = itemPmData;
                        state.chartsData.itemPjData.rows = itemPjData;
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
                http.post({
                    url: '/getPrItem',
                    data: state.formModel,
                    type: 'json',
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
            http.post({
                url:'/exportItem',
                data:state.formModel,
                type:'json',
                success: url => {
                    window.location.href = "http://192.168.1.8:8000" + url;
                },
                error: msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        }
    }
}