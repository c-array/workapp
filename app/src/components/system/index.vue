<template>
    <div class="inner system">
        <x-header :left-options="{showBack: false}" class="x-header" title="">
            <span class="x-title" slot="left">系统管理</span>
        </x-header>
        <grid :cols="2">
            <grid-item link="/system/user">
                <i class="icon-user-mag"></i>
                <p>用户管理</p>
            </grid-item>
            <grid-item link="/system/role">
                <i class="icon-role-mag"></i>
                <p>角色管理</p>
            </grid-item>
            <grid-item link="/system/dept">
                <i class="icon-dep-mag"></i>
                <p>部门管理</p>
            </grid-item>
            <grid-item link="/system/proitem">
                <i class="icon-pro-mag"></i>
                <p>产品/项目管理</p>
            </grid-item>
        </grid>
    </div>
</template>
<style scoped lang="less">
    @import '../../public/less/system.less';
</style>
<script>
    import { Grid, GridItem,XHeader} from 'vux';
    export default {
        name:"system",
        data () {
            return {
                
            }
        },
        components: {
            Grid,
            GridItem,
            XHeader
        }
    }
</script>