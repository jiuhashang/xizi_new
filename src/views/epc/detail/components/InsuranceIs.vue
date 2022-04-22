<template>
  <!-- 保险情况 -->
  <el-card>
    <div class="top">
      <div>
        <el-form :inline="true" :model="form" size="mini">
          <el-form-item>
            <el-input v-model="formInline" placeholder="保险名称搜索"></el-input>
          </el-form-item>
          <el-form-item >
            <el-select v-model="formInline" placeholder="全部类型">
              <el-option label="项目保险" value="项目保险"></el-option>
              <el-option label="施工保险" value="施工保险"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item >
            <el-select v-model="formInline" placeholder="全部提醒状态">
              <el-option label="已开启" value="已开启"></el-option>
              <el-option label="已关闭" value="已关闭"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item >
            <el-select v-model="formInline" placeholder="全部保险状态">
              <el-option label="存续期" value="存续期"></el-option>
              <el-option label="即将到期" value="即将到期"></el-option>
              <el-option label="已过期" value="已过期"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search">查 询</el-button>
            <el-button>重 置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-button type="primary" size="mini">添加保险</el-button>
      </div>
    </div>
    <el-alert title="保险临近结束日期7天时将会在项目概况中进行提示，如需关闭提醒，可点击取消提醒或将保险续期" type="success" :closable="false" />
    <el-table :data="tableData" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="mini">
      <el-table-column label="保险名称" />
      <el-table-column label="保险类型" />
      <el-table-column label="保险公司" />
      <el-table-column label="有效开始日期" />
      <el-table-column label="有效结束日期" />
      <el-table-column label="提醒状态" />
      <el-table-column label="保险状态" />
      <el-table-column label="操作">
        <template>
          <el-button type="text">关闭提醒</el-button>
          <el-button type="text">编辑</el-button>
          <el-button type="text" style="color:red;">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
  </el-card>
</template>

<script>
export default {
  name: 'InsuranceIs',

  data() {
    return {
      tableData: []
    }
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.tableInfo.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.tableInfo.pageIndex = val
      this.getList()
    }
  },
};
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
}
.el-alert {
  margin-bottom: 15px;
}
.el-card {
  margin-top: 0;
}
</style>