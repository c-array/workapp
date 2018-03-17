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
            <x-button @click.native="handleLogin" type="primary">登 录</x-button>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import '../../public/less/login.less';
</style>
<script>
    import {XButton} from 'vux';
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
        components: {
            XButton  
        },
        mounted(){
            window.onkeyup = e => {
                if(e.keyCode == 13){
                    this.handleLogin();
                }
            }
        },
        methods: {
            handleLogin(){
                if(!this.formModel.username){
                    this.$vux.toast.text('用户名不能为空！', 'top');
                    return false;
                }else if(!this.formModel.password){
                    this.$vux.toast.text('密码不能为空！', 'top');
                    return false;
                }
                this.$vux.loading.show({
                    text: 'Loading'
                })
                this.$http.post({
                    url:'/login',
                    type:'json',
                    data:this.formModel,
                    success:data => {
                        localStorage.userInfo = JSON.stringify(data);
                        sessionStorage.username = data.realname;
                        sessionStorage.departmentId = data.departmentId;
                        sessionStorage.userId = data.id;
                        setTimeout(_ =>{
                            this.$vux.loading.hide();
                            this.$router.push({ path: '/main' }); //登录成功，跳转到主页
                        },1000);
                    },
                    error:msg => {
                        this.$vux.toast.text(msg, 'top');
                    }
                })
            }
        }
    }
</script>