<template>
    <!-- 统计分析 -->
    <div class="inner statistics">
        <mu-appbar title="统计分析">
            <div slot="right" class="statistics-head">
                <mu-icon value="format_list_bulleted" />
                <mu-icon value="multiline_chart" />
                <mu-icon @click="open" value="search" />
            </div>
        </mu-appbar>
        <div class="statistics-box">
            <div class="statistics-chart">
                <ve-histogram v-if="dayConfig.data.rows.length > 0" height="250px" :title="dayConfig.title" :legend-visible="false" :data-zoom="dayConfig.dataZoom"
                    :after-config="dayConfig.callback" :data="dayConfig.data" :settings="dayConfig.chartSettings"></ve-histogram>
                <div class="stats-empty" v-else>
                    <h3>每天投入时间</h3>
                    <mu-icon value="warning" />
                    <p>暂无数据</p>
                </div>
            </div>
            <div class="statistics-chart">
                <ve-histogram v-if="pmConfig.data.rows.length > 0" height="250px" :title="pmConfig.title" :legend-visible="false" :data-zoom="pmConfig.dataZoom"
                    :after-config="pmConfig.callback" :data="pmConfig.data" :settings="pmConfig.chartSettings"></ve-histogram>
                <div class="stats-empty" v-else>
                    <h3>产品投入时间</h3>
                    <mu-icon value="warning" />
                    <p>暂无数据</p>
                </div>
            </div>
            <div class="statistics-chart">
                <ve-histogram v-if="pjConfig.data.rows.length > 0" height="250px" :title="pjConfig.title" :legend-visible="false" :data-zoom="pjConfig.dataZoom"
                    :after-config="pjConfig.callback" :data="pjConfig.data" :settings="pjConfig.chartSettings"></ve-histogram>
                <div class="stats-empty" v-else>
                    <h3>项目投入时间</h3>
                    <mu-icon value="warning" />
                    <p>暂无数据</p>
                </div>
            </div>
            <div class="statistics-chart">
                <ve-pie 
                    v-if="otherConfig.data.rows.length > 0" 
                    height="250px" 
                    :data="otherConfig.data"
                    :after-config="otherConfig.callback"
                    :title="otherConfig.title"
                    :settings="otherConfig.chartSettings">
                </ve-pie>
                <div class="stats-empty" v-else>
                    <h3>项目/产品/其他投入时间</h3>
                    <mu-icon value="warning" />
                    <p>暂无数据</p>
                </div>
            </div>
        </div>
        <mu-popup position="right" popupClass="search-box" :open="vm.visible" @close="close">
            <dl>
                <dt>业务类型</dt>
                <dd>
                    <mu-row gutter>
                        <mu-col width="50" :key="item.id" v-for="(item,index) in searchList">
                            <span @click="handleSelectType(item)" :class="item.checked ? 'active' : ''">{{item.name}}</span>
                        </mu-col>
                    </mu-row>
                </dd>
                <dd v-if="vm.searchVisible == 1" class="search-form">
                    <mu-row gutter>
                        <mu-col class="search-form-item" width="100">
                            <input v-model="formModel.username" placeholder="姓名" type="text">
                        </mu-col>
                        <mu-col class="search-form-item date" width="100">
                            <input @click="openPicker('startDate')" v-model="formModel.startDate" class="left" readonly placeholder="开始日期" type="text">
                            <input @click="openPicker('endDate')" v-model="formModel.endDate" class="right" readonly placeholder="结束日期" type="text">
                        </mu-col>
                    </mu-row>
                </dd>
                <dd v-if="vm.searchVisible == 2" class="search-form">
                    <mu-row gutter>
                        <mu-col class="search-form-item" width="100">
                            <select v-model="formModel.departmentId">
                                <option value="">请选择部门</option>
                            </select>
                        </mu-col>
                        <mu-col class="search-form-item date" width="100">
                            <input @click="openPicker('startDate')" v-model="formModel.startDate" class="left" disabled placeholder="开始日期" type="text">
                            <input @click="openPicker('endDate')" v-model="formModel.endDate" class="right" disabled placeholder="结束日期" type="text">
                        </mu-col>
                    </mu-row>
                </dd>
                <dd v-if="vm.searchVisible == 3" class="search-form">
                    <mu-row gutter>
                        <mu-col class="search-form-item" width="100">
                            <select v-model="formModel.itemType">
                                <option value="">请选择产品或项目</option>
                            </select>
                        </mu-col>
                        <mu-col class="search-form-item" width="100">
                            <input v-model="formModel.time" disabled placeholder="投入时间" type="text">
                        </mu-col>
                    </mu-row>
                </dd>
                <dd v-if="vm.searchVisible == 4" class="search-form">
                    <mu-row gutter>
                        <mu-col class="search-form-item" width="100">
                            <select v-model="formModel.itemType">
                                <option value="">请选择产品或项目</option>
                            </select>
                        </mu-col>
                        <mu-col class="search-form-item" width="100">
                            <input v-model="formModel.prName" placeholder="产品名称" type="text">
                        </mu-col>
                        <mu-col class="search-form-item date" width="100">
                            <input @click="openPicker('startDate')" v-model="formModel.startDate" class="left" disabled placeholder="开始时间" type="text">
                            <input @click="openPicker('endDate')" v-model="formModel.endDate" class="right" disabled placeholder="结束时间" type="text">
                        </mu-col>
                    </mu-row>
                </dd>
            </dl>
            <div class="search-btn">
                <mu-raised-button label="导出" class="default" />
                <mu-raised-button @click="queryData" label="确定" primary/>
            </div>
            <mt-datetime-picker ref="picker" v-model="vm.queryPicker" type="date" class="statistics-picker" :startDate="vm.startDate"
                :endDate="vm.endDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirmDate">
            </mt-datetime-picker>
        </mu-popup>
    </div>
</template>
<style scoped lang="less">
    @import '../../public/less/statistics.less';
</style>
<script>
    import Vue from 'vue';
    import { DatetimePicker } from 'mint-ui';
    Vue.component(DatetimePicker.name, DatetimePicker);
    export default {
        name: 'statistics',
        data() {
            return {
                vm: {
                    visible: false,
                    searchVisible: '',
                    queryPicker: '',
                    startDate: new Date('2010-01-01'),
                    endDate: new Date(),
                    pickerKey: ''
                },
                searchList: [
                    {
                        id: 1,
                        name: '我和同事',
                        checked: false
                    },
                    {
                        id: 2,
                        name: '部门',
                        checked: false
                    },
                    {
                        id: 3,
                        name: '项目和产品',
                        checked: false
                    },
                    {
                        id: 4,
                        name: '项目人月',
                        checked: false
                    }
                ],
                formModel: {
                    businessType: '', //业务类型
                    userId: sessionStorage.userId ? JSON.parse(sessionStorage.userId) : '', //用户名
                    startDate: this.$formatDate({
                        type: 'yyyy-mm-dd'
                    }), //开始时间
                    endDate: this.$formatDate({
                        type: 'yyyy-mm-dd'
                    }), //结束时间
                    departmentId: '', //部门id
                    itemType: '', //产品或项目
                    time: '', //投入时间
                    prName: '' //产品或项目名称
                },
                dayConfig: {
                    data: {
                        columns: ['createDate', 'usedTime'],
                        rows: []
                    },
                    title: {
                        text: '每天投入时间',
                        textStyle: {
                            color: "#666",
                            fontWeight: 'normal'
                        }
                    },
                    callback(options) {
                        options.xAxis[0].data.forEach((item, key) => {
                            var arr = item.split('-');
                            options.xAxis[0].data[key] = arr[1] + '-' + arr[2];
                        });
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
                pmConfig: {
                    data: {
                        columns: ['createDate', 'usedTime'],
                        rows: []
                    },
                    title: {
                        text: '产品投入时间',
                        textStyle: {
                            color: "#666",
                            fontWeight: 'normal'
                        }
                    },
                    callback(options) {
                        options.xAxis[0].data.forEach((item, key) => {
                            var arr = item.split('-');
                            options.xAxis[0].data[key] = arr[1] + '-' + arr[2];
                        });
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
                pjConfig: {
                    data: {
                        columns: ['createDate', 'usedTime'],
                        rows: []
                    },
                    title: {
                        text: '项目投入时间',
                        textStyle: {
                            color: "#666",
                            fontWeight: 'normal'
                        }
                    },
                    callback(options) {
                        options.xAxis[0].data.forEach((item, key) => {
                            var arr = item.split('-');
                            options.xAxis[0].data[key] = arr[1] + '-' + arr[2];
                        });
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
                otherConfig: {
                    data: {
                        columns: ['name', 'usedTime'],
                        rows: []
                    },
                    title: {
                        text: '项目投入时间',
                        textStyle: {
                            color: "#666",
                            fontWeight: 'normal'
                        }
                    },
                    callback(options){
                        console.log(options);
                        options.legend.top = "20%";
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
            }
        },
        created() {
            this.vm.searchVisible = this.searchList[0].id;
            this.searchList[0].checked = true;
            this.queryData();
        },
        methods: {
            open() {
                this.vm.visible = true;
            },
            close() {
                this.vm.visible = false;
            },
            handleSelectType(item) {
                item.checked = !item.checked;
                if (item.checked) {
                    this.vm.searchVisible = item.id;
                } else {
                    this.vm.searchVisible = "";
                }
                this.searchList.forEach((value, key) => {
                    if (value.id != item.id) {
                        value.checked = false;
                    } else {
                        this.$set(this.searchList, key, item);
                    }
                })
            },
            openPicker(key) {
                this.vm.pickerKey = key;
                this.$refs.picker.open();
            },
            handleConfirmDate(val) {
                this.formModel[this.vm.pickerKey] = this.$formatDate({
                    type: 'yyyy-mm-dd',
                    date: val
                });
            },
            queryData() {
                this.formModel.businessType = this.vm.searchVisible;
                let url = ''
                if (this.formModel.businessType == 1) {
                    url = "/statsDay"
                } else if (this.formModel.businessType == 2) {
                    url = "/statspm"
                }
                this.$http.post({
                    url: url,
                    data: this.formModel,
                    type: 'json',
                    success: data => {
                        console.log(data);
                        this.dayConfig.data.rows = data[0];
                        this.pmConfig.data.rows = data[1];
                        this.pjConfig.data.rows = data[2];
                        this.otherConfig.data.rows = data[3];
                        this.close();
                    },
                    error: msg => {
                        this.$Toast(msg);
                    }
                })
            }
        }
    }
</script>