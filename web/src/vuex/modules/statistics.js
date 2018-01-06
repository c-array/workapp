import Vue from 'vue';
import {Toast} from 'mint-ui';
import {formatDate} from '../../public/js/common';
import http from '../../public/js/http';
export default {
    namespaced: true,
    state: {
        vm:{
            popupVisible:false, //控制弹窗是否显示
            dateKey:'', //存储选择日期的key 
            dateModel: '2017-10-24', //日期的model
            nameModel:[''], //选择用户的model
            dateVisible:false, //日期是否显示
            nameVisible:false, //选择用户控件是否显示
            usernames:[],//用户数据
            departments:[], //部门数据
            itemModel:[''], //选择产品项目的model
            itemVisible:false, //选择产品项目控件是否显示
            items:[] //产品项目数据
        },
        searchList: [
            {
                id: 1,
                name: '我和同事',
                checked: true
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
            businessType: 1, //业务类型
            username:'',
            userId: sessionStorage.userId ? JSON.parse(sessionStorage.userId) : '', //用户名
            startDate: formatDate({
                type: 'yyyy-mm-dd',
                date:new Date('2016-08-01')
            }), //开始时间
            endDate: formatDate({
                type: 'yyyy-mm-dd',
                date:new Date('2016-08-31')
            }), //结束时间
            departmentId: '', //部门id
            itemType: '', //产品或项目
            time: '', //投入时间
            prName: '', //产品或项目名称
            itemId:''
        },
        chartsData:{
            dayData:{ //每天投入时间
                columns: ['createDate', 'usedTime'],
                rows: []
            },
            pmData:{ //产品投入时间
                columns: ['createDate', 'usedTime'],
                rows: []
            },
            pjData:{ //项目投入时间
                columns: ['createDate', 'usedTime'],
                rows: []
            },
            otherData:{ //其他投入时间
                columns: ['name', 'usedTime'],
                rows: []
            },
            personData:{ //部门人员总体投入时间
                columns: ['createDate', 'usedTime'],
                rows: []
            },
            itemPersonData:{
                columns: ['realname', 'usedTime'],
                rows: []
            },
            depPmData:{
                columns: ['prName', 'usedTime'],
                rows: []
            },
            depPjData:{
                columns: ['prName', 'usedTime'],
                rows: []
            },
            depOtherData:{
                columns: ['name', 'usedTime'],
                rows: []
            },
            itemPmData:{
                columns: ['prName', 'usedTime'],
                rows: []
            },
            itemPjData:{
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
            callback(options){
                console.log(options);
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
        handleSelectType(state,item) {
            item.checked = true;
            if (item.checked) {
                state.formModel.businessType = item.id;
            }
            state.searchList.forEach((value, key) => {
                if (value.id != item.id) {
                    value.checked = false;
                } else {
                    Vue.set(state.searchList, key, item);
                }
            })
            if(state.formModel.businessType == 2){ //部门
                http.post({
                    url:"/departments",
                    success: data => {
                        state.vm.departments = data;
                    },
                    error: msg => {
                        Toast(msg);
                    }
                })
            }else if(state.formModel.businessType == 3){
            }
        }, 
        openDatePicker(state,key){ //显示日期控件
            state.vm.dateKey = key; //获取key
            state.vm.dateVisible = true; //显示日期控件
        },
        getDate(state,params){ //获取选择的日期赋值
            state.formModel[state.vm.dateKey] = state.vm.dateModel; //根据保存的dateKey来将选择的日期赋给formModel
            state.vm.dateVisible = false; //隐藏日期控件
        },
        getUserName(state,params){ //获取选择的用户名
            state.formModel.userId = state.vm.nameModel[0];
            for (const item of state.vm.usernames[0]) {
                if(item.value == state.formModel.userId){
                    state.formModel.username = item.name;
                    break;
                }
            }
            state.vm.nameVisible = false; //隐藏选择用户控件
        },
        handleUserList(state,params){ //获取用户集合
            http.get({
                url:'/users',
                success: data => {
                    state.vm.usernames = [data];
                    state.vm.nameVisible = true;
                },
                error: msg => {
                    Toast(msg);
                }
            })
        },
        getItemName(state,params){
            state.formModel.itemId = state.vm.itemModel[0];
            for (const item of state.vm.items[0]) {
                if(item.value == state.formModel.itemId){
                    state.formModel.prName = item.name;
                    break;
                }
            }
            state.vm.itemVisible = false; //隐藏选择用户控件
        },
        handleItemList(state,params){ //获取产品项目集合
            http.post({
                url:'/getPrItem',
                type:'json',
                data:{
                    type:state.formModel.itemType
                },
                success: data => {
                    state.vm.items = [data];
                    state.vm.itemVisible = true;
                },
                error: msg => {
                    Toast(msg);
                }
            })
        },
        confirm(state,params){ //确定
            let url = "";
            if(state.formModel.businessType == 1){ //我和同事
                http.post({
                    url:'/statsMyColleague',
                    data:state.formModel,
                    type:'json',
                    success: data => {
                        data.slice(0,3).forEach(function(item,key){
                            item.forEach(function(obj,index){
                                var arr = obj.createDate.split('-');
                                obj.createDate = arr[1] + '-' + arr[2];
                            })
                        })
                        state.chartsData.dayData.rows = data[0];
                        state.chartsData.pmData.rows = data[1];
                        state.chartsData.pjData.rows = data[2];
                        state.chartsData.otherData.rows = data[3];
                        state.vm.popupVisible = false;
                    },
                    error: msg => {
                        Toast(msg);
                    }
                })
            }else if(state.formModel.businessType == 2){ //部门
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
                            if(item.work_product_project && item.work_product_project.type == 1){
                                depPmData.push({
                                    prName:item.work_product_project.prName,
                                    usedTime:item.usedTime
                                })
                            }
                            if(item.work_product_project && item.work_product_project.type == 2){
                                depPjData.push({
                                    prName:item.work_product_project.prName,
                                    usedTime:item.usedTime
                                })
                            }
                        })
                        state.chartsData.depPmData.rows = depPmData;
                        state.chartsData.depPjData.rows = depPjData;
                        state.chartsData.depOtherData.rows = data[3];
                        state.vm.popupVisible = false;
                    },
                    error: msg => {
                        Toast(msg);
                    }
                })
            }else if(state.formModel.businessType == 3){ //产品和项目
                http.post({
                    url:'/statsItem',
                    data:state.formModel,
                    type:'json',
                    success: data => {
                        var itemPmData = [];
                        var itemPjData = [];
                        data.forEach(function(item,key){
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
                        state.chartsData.itemPmData.rows = itemPmData;
                        state.chartsData.itemPjData.rows = itemPjData;
                        state.vm.popupVisible = false;
                    },
                    error: msg => {
                        Toast(msg);
                    }
                })
            }else if(state.formModel.businessType == 4){

            }
        }
    }
}