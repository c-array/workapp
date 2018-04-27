import Vue from "vue";
export default {
  namespaced: true,
  state: {
    list:"",
    pageConfig:{
      currentPage:1,
      pageSizes:[9,20,30,50,80,100],
      pageSize:9,
      total:20
    },
    queryModel:{
      date:"",
      type:""
    }
  },
  mutations:{
    getData(state){
      Vue.$http.post({
        url:"/my/workDay",
        data:{
          userId:sessionStorage.userId,
          pageSize:state.pageConfig.pageSize,
          currentPage:state.pageConfig.currentPage
        },
        type:"json",
        success: data => {
          state.list = data;
        },
        error: msg => {
          Vue.$Message.error(msg);
        }
      })
    },
    handleCurrentChange(state,size){
      console.log('每页' + size + '条');
    },
    handleCurrentChange(state,currentPage) {
      console.log('当前页:' + currentPage);
    }
  }
}