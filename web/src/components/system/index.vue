<template>
    <div class="inner system">
        <x-header class="x-header" title="系统管理">
            <!-- <div slot="right" class="x-header-right">
                <i class="icon-list"></i>
                <i class="icon-curve"></i>
            </div> -->
        </x-header>
        <grid :cols="2">
            <grid-item link="/user">
                <i class="icon-user-mag"></i>
                <p>用户管理</p>
            </grid-item>
            <grid-item link="/main/department">
                <i class="icon-role-mag"></i>
                <p>角色管理</p>
            </grid-item>
            <grid-item link="/main/item">
                <i class="icon-dep-mag"></i>
                <p>部门管理</p>
            </grid-item>
            <grid-item link="/main/people">
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