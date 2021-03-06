import Vue from 'vue';
export default {
    namespaced: true,
    state: {
        vm:{
            itemList:'',
            charts:1,
            empty:false
        },
        formModel:{
            type:'',
            itemId:''
        },
        peopleList:[],
        chartData:{
            name:"",
            peopleData:{
                columns:['realname', '用时'],
                rows:[]
            }
        }
    },
    mutations: {
        getList(state,param){
            state.vm.loading = true;
            Vue.$http.post({
                url:'/stats/people',
                data:state.formModel,
                type:'json',
                success: data => {
                    data.forEach(function(item,key){
                        item.count = 0;
                        item.second.forEach(function(obj,index){
                            item.count = item.count + obj.usedTime;
                        })
                    })
                    setTimeout(_ =>{
                        state.peopleList = data;
                        Vue.$vux.loading.hide();
                    },1000);
                },
                error: msg => {
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        },
        getItemList(state, params) {
            if (state.formModel.type) {
                Vue.$http.get({
                    url: '/proitems/type/' + state.formModel.type,
                    success: data => {
                        state.formModel.itemId = '';
                        state.vm.itemList = data;
                        this.commit('common/people/getList');
                    },
                    error: msg => {
                        Vue.$vux.toast.text(msg, 'top');
                    }
                })
            } else {
                state.formModel.itemId = '';
                state.vm.itemList = [];
                this.commit('common/people/getList');
            }
        },
        getPeopleItem(state, itemId){
            state.vm.loading = true;
            Vue.$http.post({
                url: '/stats/people',
                data: {
                    itemId:itemId
                },
                type: 'json',
                success: data => {
                    setTimeout(_ => {
                        state.vm.loading = false;
                        state.vm.empty = false;
                        let arr = [];
                        data[0].second.forEach((item,key) => {
                            arr.push({
                                realname:item.work_admin.realname,
                                用时:item.usedTime.toFixed(2)
                            })
                        })
                        state.chartData.peopleData.rows = arr;
                        state.chartData.name = data[0].prName;
                    },300)
                },
                error: msg => {
                    state.vm.empty = true;
                    Vue.$vux.toast.text(msg, 'top');
                }
            })
        },
        export(state,params){
            Vue.$http.post({
                url:'/export/people',
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
