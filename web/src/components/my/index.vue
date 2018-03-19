<template>
    <div class="inner my">
        <div class="my-head">
            <div class="my-pic">
                <img src="../../public/images/pic.jpg" alt="">
                <input @change="handleUpload($event)" type="file">
            </div>
            <div class="my-head_info">
                <h3>曹琦敏 前端工程师</h3>
                <p>部门：软件部</p>
            </div>
        </div>
        <group class="my-group">
            <cell link="/partner" is-link>
                <div slot="icon">
                    <i class="icon-partner blue"></i>
                    <span>我的工作</span>
                </div>
            </cell>
            <cell link="/product" is-link>
                <div slot="icon">
                    <i class="icon-product purple"></i>
                    <span>我参与的产品</span>
                </div>
            </cell>
            <cell link="/project" is-link>
                <div slot="icon">
                    <i class="icon-project red"></i>
                    <span>我参与的项目</span>
                </div>
            </cell>
            <!-- <cell link="/other" is-link>
                <div slot="icon">
                    <i class="icon-product purple"></i>
                    <span>我参与的其他工作</span>
                </div>
            </cell> -->
        </group>
        <!-- <group class="my-group">
            <cell is-link>
                <div slot="icon">
                    <i class="icon-skin yellow"></i>
                    <span>换肤</span>
                </div>
            </cell>
        </group> -->
        <group class="my-group">
            <cell @click.native="logout" class="lgout" title="退出登录"></cell>
        </group>
    </div>
</template>
<style scoped lang="less">
    @import '../../public/less/my.less';
</style>
<script>
    import {mapState,mapMutations} from "vuex";
    import {Group,Cell,XButton} from 'vux';
    export default {
        name:"my",
        components: {
            Group,
            Cell,
            XButton
        },
        methods:{
            logout(){
                sessionStorage.userId = "";
                this.$vux.confirm.show({
                    title:"提示",
                    content:"确定要退出系统?",
                    onCancel () {
                        //_this.$vux.toast.text('已取消提示', 'top');
                    },
                    onConfirm: _ => {
                        this.$router.push({path:"/"});
                    }
                })
                
            },
            handleUpload(e){
                var file = e.target.files[0];
				if(!/image\/\w+/.test(file.type)){ //判断获取的是否为图片文件
					alert("请确保文件为图像文件");
					return false;
				}
                console.log(file);
				var reader = new FileReader();
             	reader.readAsDataURL(file);
             	reader.onload = e => {
                    this.baseImg = e.target.result;
                }
            }
        }
    }
</script>