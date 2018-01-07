import http from '../../public/js/http';
import {formatDate} from '../../public/js/common';
import {Toast} from 'mint-ui'
export default {
    namespaced: true,
    state: {
        vm:{
            visible:false,
            dateVisible:false,
            username:'',
            nameModel:[''], //选择用户的model
            userList:[],
            date:formatDate({ //开始时间
                type: 'yyyy-mm',
                date:new Date('2016-08-01') 
            })
        },
        formModel:{
            username:'',
            createDate: formatDate({ //开始时间
                type: 'yyyy-mm',
                date:new Date('2016-08-01') 
            }), 
            userId:sessionStorage.userId
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
            http.post({
                url:'/statsMyColleague',
                data:state.formModel,
                type:'json',
                success: data => {
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
                    console.log(itemPmData);
                    state.chartsData.dayData.rows = data[0];
                    state.chartsData.otherData.rows = data[2];
                },
                error: msg => {
                    Toast(msg);
                }
            })
        },
        getUserList(state,params){
            console.log(123);
            http.get({
                url:'/users',
                success: data => {
                    state.vm.userList = [data];
                    state.vm.visible = true;
                },
                error: msg => {
                    Toast(msg);
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
            state.formModel.createDate = state.vm.date;
            state.vm.dateVisible = false;
            this.commit('common/colleague/getList');
        },
        clear(state,array){
            array.forEach(key => {
                state.formModel[key] = "";
            });
            this.commit('common/colleague/getList');
        }
    }
}