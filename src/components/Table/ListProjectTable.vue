<template>
  <div>
    <el-card>
      <div style="display:flex;justify-content:space-between;">
        <el-form ref="ruleForm" :model="tableInfo" inline>
          <el-form-item>
            <el-input v-model="tableInfo.projectName" placeholder="项目名称查询" clearable style="width:250px;" />
          </el-form-item>
          <slot name="leftFormArea" :tableInfo="tableInfo" />
          <el-form-item style="margin-left: 20px;">
            <el-button type="primary" @click="handleQuery">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
        <div>
          <slot name="rightOprArea" />
        </div>
      </div>
      <el-table :data="tableData" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" style="width: 100%" @selection-change="handleSelectionChange">
        <slot name="tableRow" />
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </el-card>
  </div>
</template>

<script>
import { getList } from '@/api/listProject'

export default {
  name: 'LisrProjectTable',
  data() {
    return {
      tableInfo: {
        projectName: '',
        companyName: '',
        firstExamine: ''
        // query: '',
        // dueDiligenceStatus: '',
        // companyStatus: '',
        // skillEstimateStatus: ''
      },
      queryInfo: {
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      // multipleSelection: [],
      total: null
    }
  },
  created() {
    this.$emit('init', this.tableInfo)
    this.getList()
  },
  methods: {
    // 列表请求
    getList() {
      console.log('table',this.tableInfo)
      const { query, ...resetTableInfo } = this.tableInfo
      const param = { ...resetTableInfo, ...this.queryInfo }
      console.log('222', param)
      getList(param).then(res => {
        console.log('111', res)
        const { current, records, total } = res.data
        this.tableData = records
        this.currentPage = current
        this.total = total
      })
    },
    // 表dan查询
    handleQuery() {
      console.log('=====', this.tableInfo)
      this.queryInfo.pageIndex = 1
      this.$refs.pagination.resetOption(this.queryInfo.pageIndex, this.queryInfo.pageSize)
      this.getList()
    },
    // 表dan重置
    reset() {
      this.tableInfo = {
        query: '',
        // dueDiligenceStatus: '',
        companyStatus: '',
        // skillEstimateStatus: ''
      }
      this.queryInfo = {
        pageIndex: 1,
        pageSize: 10
      }
      this.$emit('reset', this.tableInfo)
      this.$refs.pagination.resetOption(this.queryInfo.pageIndex, this.queryInfo.pageSize)
      this.getList()
    },

    // 材料预下载
    // downLoad() {
    //   if (this.multipleSelection.length < 1) {
    //     this.$alert('请选择项目进行材料预下载', '提示', {
    //       confirmButtonText: '好的'
    //       // callback: action => {
    //       //   this.$message({
    //       //     type: 'info',
    //       //     message: `action: ${ action }`
    //       //   })
    //       // }
    //     })
    //   } else {
    //     this.$confirm(`您选择了${this.multipleSelection.length}个项目，是否下载项目材料？下载的项目资料将会以预下载的形式存储7日，请在下载管理中，下载至电脑内。`, '提示', {
    //       confirmButtonText: '确定下载',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       this.$message({
    //         type: 'success',
    //         message: '下载成功!'
    //       })
    //     }).catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消下载'
    //       })
    //     })
    //   }
    // },

    // 查看详情
    handleView(row) {
      this.$router.push({ name: 'listProjectDetail', query: { projectId: row.projectId, createTime: row.createTime, createUser: row.createUser }})
    },

    // 表格多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.queryInfo.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.queryInfo.pageIndex = val
      this.getList()
    }
  }
}
</script>

<style scoped>
.el-card {
  margin: 20px;
}
.el-pagination {
  margin: 20px;
  float: right;
}
</style>
