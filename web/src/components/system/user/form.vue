<template>
    <div class="inner ">
        <x-header :title="userId ? '修改用户信息' : '添加用户信息'"></x-header>
        <div class="form-list">
            <ul>
                <li>
                    <label>用户名称</label>
                    <div class="form-item">
                        <input v-model="formModel.username" placeholder="请输入用户名称" type="text">
                    </div>
                </li>
                <li>
                    <label>真实姓名</label>
                    <div class="form-item">
                        <input v-model="formModel.realname" placeholder="请输入真实姓名" type="text">
                    </div>
                </li>
                <li>
                    <label>部门</label>
                    <div class="form-item">
                        <select v-model="formModel.departmentId">
                            <option value="">请选择部门</option>
                            <option :value="item.id" v-for="item in vm.departmentList">{{item.depName}}</option>
                        </select>
                    </div>
                </li>
                <li>
                    <label>职位</label>
                    <div class="form-item">
                        <input v-model="formModel.post" placeholder="请输入职位" type="text">
                    </div>
                </li>
                <li>
                    <label>手机号</label>
                    <div class="form-item">
                        <input v-model="formModel.phone" placeholder="请输入手机号" type="text">
                    </div>
                </li>
                <li>
                    <label>邮箱</label>
                    <div class="form-item">
                        <input v-model="formModel.email" placeholder="请输入邮箱" type="text">
                    </div>
                </li>
                <li>
                    <label>qq</label>
                    <div class="form-item">
                        <input v-model="formModel.qq" placeholder="请输入qq" type="text">
                    </div>
                </li>
            </ul>
            <div class="form-btn">
                <x-button @click.native="handleSave" type="primary">保 存</x-button>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState,mapMutations} from "vuex";
    import {XHeader,XButton} from 'vux';
    export default {
        name:"userForm",
        data () {
            return {
                userId:this.$route.query.userId      
            }
        },
        components: {
            XHeader,
            XButton
        },
        computed:{
            ...mapState({
                formModel:state => state.common.user.formModel,
                vm:state => state.common.user.vm,
            })
        },
        created () {
            if(this.userId){
                this.getUserItem(this.userId);
            }
            this.getDepartmentList();
        },
        methods: {
            ...mapMutations({
                getUserItem:"common/user/getUserItem",
                getDepartmentList:"common/user/getDepartmentList"
            }),
            handleSave(){
                if(this.userId){
                    this.$store.commit({
                        type:'common/user/edit'
                    })
                }else{
                    this.$store.commit({
                        type:'common/user/add'
                    })
                }
            }
        }
    }
</script>