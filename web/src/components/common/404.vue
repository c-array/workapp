<template>
  <div class="inner err-404">
      <el-button @click="backHome" type="primary">返回首页</el-button>
  </div>
</template>
<script>
  export default {
    name:"",
    methods: {
      backHome(){
        this.$router.push("/main");
      }
    }
  }
</script>