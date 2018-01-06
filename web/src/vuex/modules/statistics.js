import Vue from 'vue';
import {formatDate} from '../../public/js/common';
export default {
    namespaced: true,
    state: {
        vm:{
            popupVisible:false, //控制弹窗是否显示
            dateKey:'', //存储选择日期的key 
            dateModel: '2017-10-24', //日期的model
            dateVisible:false //日期是否显示
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
            startDate: formatDate({
                type: 'yyyy-mm-dd'
            }), //开始时间
            endDate: formatDate({
                type: 'yyyy-mm-dd'
            }), //结束时间
            departmentId: '', //部门id
            itemType: '', //产品或项目
            time: '', //投入时间
            prName: '' //产品或项目名称
        },
    },
    mutations:{
        handleSelectType(state,item) {
            item.checked = !item.checked;
            if (item.checked) {
                state.vm.searchVisible = item.id;
            } else {
                state.vm.searchVisible = "";
            }
            state.searchList.forEach((value, key) => {
                if (value.id != item.id) {
                    value.checked = false;
                } else {
                    Vue.set(state.searchList, key, item);
                }
            })
        }, 
        openDatePicker(state,key){ //显示日期控件
            state.vm.dateKey = key; //获取key
            state.vm.dateVisible = true; //显示日期控件
        },
        getDate(state,params){ //获取选择的日期赋值
            state.formModel[state.vm.dateKey] = state.vm.dateModel; //根据保存的dateKey来将选择的日期赋给formModel
            state.vm.dateVisible = false; //隐藏日期控件
        }
    }
}