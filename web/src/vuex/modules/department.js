import http from '../../public/js/http';
import {formatDate} from '../../public/js/common';
import {Toast} from 'mint-ui'

export default {
    namespaced: true,
    state: {
        vm:{
            visible:false,
            dateVisible:false,
            itemList:[], //部门数据集合
            dateKey:'',
            date:formatDate({ //开始时间
                type: 'yyyy-mm-dd',
                date:new Date('2016-08-01') 
            })
        },
        formModel:{
            departmentId:'', //部门id
            startDate: formatDate({ //开始时间
                type: 'yyyy-mm-dd',
                date:new Date('2016-08-01') 
            }),
            endDate:formatDate({ //开始时间
                type: 'yyyy-mm-dd',
                date:new Date('2016-08-31') 
            })
        },
        chartsData:{
            personData:{ //人员总体投入时间
                columns: ['createDate', 'usedTime'],
                rows: []
            },
            itemPersonData:{ //每人投入时间
                columns: ['realname', 'usedTime'],
                rows: []
            },
            depPmData:{ //产品投入时间
                columns: ['prName', 'usedTime'],
                rows: []
            },
            depPjData:{ //项目投入时间
                columns: ['prName', 'usedTime'],
                rows: []
            },
            depOtherData:{ //项目/产品/其他投入时间
                columns: ['name', 'usedTime'],
                rows: []
            },
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
            callback(options){
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
    mutations:{
        getList(state,params){
            if(state.formModel.startDate && state.formModel.endDate){
                var startTime = formatDate({
                    type:'time',
                    date:state.formModel.startDate
                })
                var endTime = formatDate({
                    type:'time',
                    date:state.formModel.endDate
                })
                if(startTime >= endTime){ //开始时间小于结束时间
                    Toast('开始时间不能大于结束时间');
                    return false;
                }
            }else if(!state.formModel.startDate && !state.formModel.endDate){
                Toast('时间不能为空');
                return false;
            }
            http.post({
                url:'/statsDepartment',
                data:state.formModel,
                type:'json',
                success: data => {
                    state.chartsData.personData.rows = data[0];
                        var itemPersonData = [];
                        data[1].forEach(function(item,key){
                            itemPersonData.push({
                                realname:item.work_admin.realname,
                                usedTime:item.usedTime
                            })
                        })
                        state.chartsData.itemPersonData.rows = itemPersonData;

                        var depPmData = [];
                        var depPjData = [];
                        data[2].forEach(function(item,key){
                            if(item.work_product_project.type == 1){
                                depPmData.push({
                                    prName:item.work_product_project.prName,
                                    usedTime:item.usedTime
                                })
                            }
                            if(item.work_product_project.type == 2){
                                depPjData.push({
                                    prName:item.work_product_project.prName,
                                    usedTime:item.usedTime
                                })
                            }
                        })
                        state.chartsData.depPmData.rows = depPmData;
                        state.chartsData.depPjData.rows = depPjData;
                        state.chartsData.depOtherData.rows = data[3];
                },
                error: msg => {
                    Toast(msg);
                }
            })
        },
        getDepartmentList(state,params){
            http.get({
                url:'/departments',
                success: data => {
                    state.vm.itemList = data;
                },
                error: msg => {
                    Toast(msg);
                }
            })
        },
        getDate(state,params){
            state.formModel[state.vm.dateKey] = state.vm.date;
            state.vm.dateVisible = false;
            this.commit('common/department/getList');
        },
        clear(state,array){
            array.forEach(key => {
                state.formModel[key] = "";
            });
            this.commit('common/department/getList');
        },
        showDate(state,key){
            state.vm.dateKey = key;
            state.vm.dateVisible = true;
        }
    }
}