import http from '../../public/js/http';
import { formatDate } from '../../public/js/common';
import { Toast } from 'mint-ui'

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
        },
        histogramConfig: {
            callback(options) {
                options.title.textStyle = {
                    color: "#666",
                    fontWeight: 'normal'
                }
                return options;
            },
            dataZoom: [
                {
                    show: true,
                    start: 0,
                    end: 50,
                    handleIcon: 'M512 512m-494.933333 0a494.933333 494.933333 0 1 0 989.866666 0 494.933333 494.933333 0 1 0-989.866666 0Z',
                    handleSize: '200%',
                    backgroundColor: '#e4e7ed',
                    borderColor: '#e4e7ed',
                    fillerColor: "#409eff",
                    height: 6,//组件高度
                    dataBackground: {
                        lineStyle: {
                            opacity: 0
                        },
                        areaStyle: {
                            opacity: 0
                        }
                    },
                    handleStyle: {
                        color: "#fff",
                        borderWidth: 2,
                        borderColor: "#409eff"
                    }
                },
                {
                    type: 'inside',
                    start: 94,
                    end: 100
                }
            ],
            chartSettings: {
                labelMap: {
                    usedTime: '用时'
                }
            }
        },
        pieConfig: {
            callback(options) {
                options.legend.top = "20%";
                options.title.textStyle = {
                    color: "#666",
                    fontWeight: 'normal'
                }
                return options;
            },
            chartSettings: {
                dimension: 'name',
                metrics: 'usedTime',
                dataType: 'KMB',
                selectedMode: 'single',
                hoverAnimation: false,
                radius: 50,
                offsetY: 170
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
                },
                error: msg => {
                    Toast(msg);
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
                        Toast(msg);
                    }
                })
            } else {
                state.formModel.itemId = '';
                state.vm.itemList = [];
                this.commit('common/item/getList');
            }
        }
    }
}