import Vue from 'vue';
import http from '../../public/js/http';
import {formatDate} from '../../public/js/common';
export default {
    namespaced: true,
    state: {
        vm:{
            visible:false,
            dateVisible:false,
            username:'',
            nameModel:[''], //选择用户的model
            userList:[],
            dateKey:'',
            date:formatDate({ //开始时间
                type: 'yyyy-mm-dd',
                date:new Date('2016-08-01') 
            }),
            loading:true,
            empty:false
        },
        formModel:{
            username:'',
            startDate: formatDate({ //开始时间
                type: 'yyyy-mm-dd',
                date:new Date('2016-08-01') 
            }), 
            endDate: formatDate({ //开始时间
                type: 'yyyy-mm-dd',
                date:new Date('2016-08-31') 
            }), 
            userId:''
        },
        chartsData:{
            dayData:{ //每天投入时间
                columns: ['createDate', 'usedTime'],
                rows: []
            },
            pmData:{ //产品投入时间
                columns: ['prName', 'usedTime'],
                rows: []
            },
            pjData:{ //项目投入时间
                columns: ['prName', 'usedTime'],
                rows: []
            },
            otherData:{ //其他投入时间
                columns: ['name', 'usedTime'],
                rows: []
            }
        },
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
                if(startTime > endTime){ //开始时间小于结束时间
                    Vue.$vux.toast.text('开始时间不能大于结束时间', 'top');
                    return false;
                }
            }else if(!state.formModel.startDate && !state.formModel.endDate){
                Vue.$vux.toast.text('时间不能为空', 'top');
                return false;
            }

            if(!state.formModel.userId){
                state.formModel.userId = sessionStorage.userId;
            }
            if(!state.vm.nameModel[0]){
                state.vm.nameModel = [sessionStorage.userId];
            }
            
            if(!state.formModel.username){
                state.formModel.username = sessionStorage.username;
            }
            state.vm.loading = true;
            http.post({
                url:'/statsMyColleague',
                data:state.formModel,
                type:'json',
                success: data => {
                    setTimeout(_ => {
                        state.vm.loading = false;
                        state.vm.empty = false;
                        data[0].forEach(function(item,key){
                            var arr = item.createDate.split('-');
                            item.createDate = arr[1] + '-' + arr[2];
                        })
                        var itemPmData = [];
                        var itemPjData = [];
                        data[1].forEach(function(item,key){
                            if(item.work_product_project.type == 1){
                                itemPmData.push({
                                    prName:item.work_product_project.prName,
                                    usedTime:item.usedTime
                                })
                            }
                            if(item.work_product_project.type == 2){
                                itemPjData.push({
                                    prName:item.work_product_project.prName,
                                    usedTime:item.usedTime
                                })
                            }
                        })
                        state.chartsData.pmData.rows = itemPmData;
                        state.chartsData.pjData.rows = itemPjData;
                        state.chartsData.dayData.rows = data[0];
                        state.chartsData.otherData.rows = data[2];
                    },300);
                },
                error: msg => {
                    state.vm.empty = true;
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        },
        getUserList(state,params){
            http.get({
                url:'/users',
                success: data => {
                    state.vm.userList = [data];
                    state.vm.visible = true;
                },
                error: msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        },
        getUserName(state,params){ //获取选择的用户名
            state.formModel.userId = state.vm.nameModel[0];
            for (const item of state.vm.userList[0]) {
                if(item.value == state.formModel.userId){
                    state.formModel.username = item.name;
                    break;
                }
            }
            this.commit('common/colleague/getList');
            state.vm.visible = false; //隐藏选择用户控件
        },
        getDate(state,params){
            state.formModel[state.vm.dateKey] = state.vm.date;
            state.vm.dateVisible = false;
            this.commit('common/colleague/getList');
        },
        clear(state,array){
            array.forEach(key => {
                state.formModel[key] = "";
            });
            this.commit('common/colleague/getList');
        },
        showDate(state,key){
            state.vm.dateKey = key;
            state.vm.dateVisible = true;
        },
        export(state,params){
            http.post({
                url:'/exportMyColleague',
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