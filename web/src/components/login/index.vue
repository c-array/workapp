<template>
    <div class="inner login">
        <div class="login-item">
            <img src="../../public/images/logo.png" alt="">
        </div>
        <div class="login-item">
            <i class="icon-my"></i>
            <input v-model="formModel.username" type="text">
        </div>
        <div class="login-item">
            <i class="icon-password"></i>
            <input v-model="formModel.password" type="password">
        </div>
        <div class="login-btn">
            <mu-raised-button @click="handleLogin" label="登 录" class="demo-raised-button" primary/>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import '../../public/less/login.less';
</style>
<script>
    export default {
        name:'login',
        data () {
            return {
                formModel:{
                    username:'',
                    password:''
                }
            }
        },
        methods: {
            handleLogin(){
                this.$http.post({
                    url:'/login',
                    type:'json',
                    data:this.formModel,
                    success:data => {
                        localStorage.userInfo = JSON.stringify(data);
                        sessionStorage.userId = data.id;
                        this.$router.push({ path: '/main' }); //登录成功，跳转到主页
                    },
                    error:msg => {
                        this.$Toast(msg);
                    }
                })
            }
        }
    }
</script>