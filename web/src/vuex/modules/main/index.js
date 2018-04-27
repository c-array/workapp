import Vue from "vue";
export default {
  namespaced: true,
  state: {
    vm:{
      isCollapse:false,
      currentMenu:""
    },
    breadcrumb:{
      parent:"",
      child:""
    },
    userInfo:localStorage.userInfo ? JSON.parse(localStorage.userInfo) : {},
    menus:""
  },
  mutations:{
    getMenus(state,callback){
      Vue.$http.get({
        url:"/menus",
        success: data => {
          state.menus = data;
          state.vm.currentMenu = "" + data[0].second[0].id;
          state.breadcrumb.parent = data[0].name;
          state.breadcrumb.child = data[0].second[0].name;
          callback(data[0].second[0].id);
        },
        error: msg => {
          Vue.$Message.error(msg);
        }
      })
    }
  }
}