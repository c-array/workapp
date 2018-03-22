import Vue from 'vue';
import formatDate from '../../../public/js/formatDate';
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
            personItemData:{ //每人投入时间
                columns: ['realname', 'usedTime'],
                rows: []
            },
            productData:{ //产品投入时间
                columns: ['prName', 'usedTime'],
                rows: []
            },
            projectData:{ //项目投入时间
                columns: ['prName', 'usedTime'],
                rows: []
            },
            otherData:{ //项目/产品/其他投入时间
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
            Vue.$http.post({
                url:'/stats/dept',
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

                        state.chartsData.personData.rows = data.personTotal;

                        var personItemData = [];
                        data.personItem.forEach(function(item,key){
                            personItemData.push({
                                realname:item.work_admin.realname,
                                usedTime:item.usedTime
                            })
                        })
                        state.chartsData.personItemData.rows = personItemData;

                        var productData = [];
                        data.product.forEach(function(item,key){
                            productData.push({
                                prName:item.work_product_project.prName,
                                usedTime:item.usedTime
                            })
                        })

                        var projectData = [];
                        data.project.forEach(function(item,key){
                            projectData.push({
                                prName:item.work_product_project.prName,
                                usedTime:item.usedTime
                            })
                        })

                        state.chartsData.productData.rows = productData;
                        state.chartsData.projectData.rows = projectData;
                        state.chartsData.otherData.rows = data.other;
                    },300)
                },
                error: msg => {
                    state.vm.empty = true;
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        },
        getDepartmentList(state,params){
            Vue.$http.get({
                url:'/depts',
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
            Vue.$http.post({
                url:'/export/getDept',
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