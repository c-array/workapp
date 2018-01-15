import Vue from 'vue';
import http from '../../public/js/http';
import {formatDate} from '../../public/js/common';
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
            }),
            loading:true,
            empty:false
        },
        formModel:{
            departmentId:"", //部门id
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
                    Vue.$vux.toast.text('开始时间不能大于结束时间', 'top');
                    return false;
                }
            }else if(!state.formModel.startDate && !state.formModel.endDate){
                Vue.$vux.toast.text('时间不能为空', 'top');
                return false;
            }
            state.formModel.departmentId = state.formModel.departmentId ? state.formModel.departmentId : sessionStorage.departmentId
            state.vm.loading = true;
            http.post({
                url:'/statsDepartment',
                data:{
                    startDate:state.formModel.startDate,
                    endDate:state.formModel.endDate,
                    departmentId:state.formModel.departmentId,
                },
                type:'json',
                success: data => {
                    setTimeout(_ => {
                        state.vm.loading = false;
                        state.vm.empty = false;
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
                    },300)
                },
                error: msg => {
                    state.vm.empty = true;
                    Vue.$vux.toast.text(msg, 'top');
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
                    Vue.$vux.toast.text(msg, 'top');
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
        },
        export(state,params){
            http.post({
                url:'/exportDepartment',
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