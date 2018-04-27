<template>
  <div class="day">
    <el-form :inline="true" :model="queryModel" class="day-query">
      <el-form-item label="时间">
        <el-date-picker
          v-model="queryModel.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="queryModel.type" placeholder="请选择类型">
          <el-option label="产品" value="1"></el-option>
          <el-option label="项目" value="2"></el-option>
          <el-option label="其他" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="list">
      <el-card v-for="item in list" :key="item.id" class="box-card">
        <div slot="header" class="card-head">
          <span>{{item.createDate}}</span>
          <div class="action">
            <i title="修改" class="icon-edit"></i>
            <i title="删除" class="icon-delete"></i>
          </div>
        </div>
        <ul>
          <li v-for="(obj,index) in item.second" :key="obj.id">
            <span>{{(index + 1) + "、" + obj.taskName}}</span>
            <span>用时：{{obj.usedTime}}</span>
          </li>
        </ul>
      </el-card>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageConfig.currentPage"
      :page-sizes="pageConfig.pageSizes"
      :page-size="pageConfig.pageSize"
      layout="prev, pager, next, jumper, sizes , total"
      :total="pageConfig.total">
    </el-pagination>
  </div>
</template>
<style scoped lang="less">
  @import "../../../assets/less/modules/day.less";
</style>
<script>
  import { mapState, mapMutations } from "vuex";
  import { Card } from "element-ui"
  export default {
    name: "day",
    computed: {
      ...mapState({
        list: state => state.day.list,
        queryModel: state => state.day.queryModel,
        pageConfig: state => state.day.pageConfig,
        userInfo: state => state.main.userInfo
      })
    },
    components: {
      'el-card': Card
    },
    created() {
      this.getData();
    },
    methods: {
      ...mapMutations('day', [
        'getData',
        'handleSizeChange',
        'handleCurrentChange'
      ])
    }
  }
</script>