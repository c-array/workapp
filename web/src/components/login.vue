<template>
  <div class="login inner">
    <p>中云智慧-工时统计系统</p>
    <div class="login-box">
      <h3>用户登录</h3>
      <el-form :model="formModel" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" v-model="formModel.username"></el-input>
          <i class="el-icon-m-user"></i>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="formModel.password"></el-input>
          <i class="el-icon-m-pwd"></i>
        </el-form-item>
        <div class="remember">
          <el-checkbox v-model="remember">记住密码</el-checkbox>
        </div>
        <el-button @click="handleLogin" size="large" type="primary">登 录</el-button>
      </el-form>
    </div>
    <div class="login-footer">Copyright © 中云智慧（北京）科技有限公司，保留一切权利。京ICP备13028344-2. </div>
  </div>
</template>
<style scoped lang="less">
  @import "../assets/less/modules/login.less";
</style>
<script>
  export default {
    name: "login",
    data() {
      return {
        remember: false, //记住密码
        formModel: {
          username: "",
          password: ""
        },
        rules: {
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]
        }
      }
    },
    mounted() {
      if(localStorage.remember === "true"){ //记住密码
          this.remember = true;
          if(localStorage.username != "" && localStorage.username != null){
              this.formModel.username =  localStorage.username;
          }
          if(localStorage.password != "" && localStorage.password != null){
              this.formModel.password = localStorage.password;
          }
      }
      window.onkeyup = e => {
        if (e.keyCode == 13) {
          this.handleLogin();
        }
      }
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) { //验证成功
            const loading = this.$loading({
              lock: true,
              text: '正在登陆',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)',
              customClass:"loading"
            });
            this.$http.post({
              url: '/login',
              type: 'json',
              data: this.formModel,
              success: data => {
                //记住密码，用户名和密码保存本地
                localStorage.remember = this.remember;
                localStorage.username = this.formModel.username;
                localStorage.password = this.formModel.password;

                //用户信息缓存本地
                localStorage.userInfo = JSON.stringify(data);
                sessionStorage.username = data.realname;
                sessionStorage.departmentId = data.departmentId;
                sessionStorage.userId = data.id;
                loading.close();
                this.$router.push({ path: '/main' }); //登录成功，跳转到主页
              },
              error: msg => {
                this.$Message.error(msg);
                loading.close();
              }
            })
          }else{ //验证失败
            console.log('error submit!!');
            return false;
          }
        })
      }
    }
  }

</script>