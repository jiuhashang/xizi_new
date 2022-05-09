<template>
  <div>
    <div class="shang">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{ $route.matched[1].meta.title }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <h3>{{ $route.meta.title }}</h3>
    </div>
    <el-card>
      <div style="display:flex;justify-content:space-between;">
        <el-form ref="ruleForm" :model="tableInfo" inline size="mini">
          <el-form-item>
            <el-input v-model="tableInfo.projectName" placeholder="项目名称查询" clearable />
          </el-form-item>
          <el-form-item>
            <el-input v-model="tableInfo.companyName" placeholder="业主名称查询" clearable />
          </el-form-item>
          <el-form-item>
            <el-select v-model="tableInfo.setProjectStatus" clearable placeholder="全部进度">
              <el-option
                v-for="item in options"
                :key="item.setProjectStatus"
                :label="item.label"
                :value="item.setProjectStatus">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleQuery" icon="el-icon-search">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" v-loading="loading" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="mini">
        <el-table-column prop="projectName" label="项目名称" />
        <el-table-column prop="companyName" label="业主名称" />
        <el-table-column prop="messageExamineTime" label="初审通过时间" />
        <el-table-column prop="province" label="建站地址">
          <template slot-scope="scope">
            {{scope.row.province}} - {{scope.row.city}}
          </template>
        </el-table-column>
        <el-table-column label="补充进度">
          <template slot-scope="scope">
            <span v-if="scope.row.setProjectStatus == 1" style="color:#70B603;">已完善</span>
            <span v-else>未完善</span>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="handleView(scope.row)">查看</el-button>
            <el-button type="text" @click="approval(scope.row.projectId)">审批记录</el-button>
          </template>
        </el-table-column> 
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </el-card>
    <!-- 审批记录 -->
    <ApprovalLog :logVisible.sync="logVisible" :activities="activities" />
  </div>
</template>

<script>
import { getList, getProjectExamineLog } from '@/api/listProject'

import ApprovalLog from '@/components/Log/ApprovalLog.vue'

export default {
  name: 'Added',
  data() {
    return {
      tableInfo: {
        companyName: '',
        projectName: '',
        setProjectStatus: '',
        type: 2,
        pageIndex: 1,
        pageSize: 10
      },
      options: [
        {
          setProjectStatus: '0',
          label: '待完善'
        }, 
        {
          setProjectStatus: '1',
          label: '已完善'
        }
      ],
      tableData: [],
      loading: true,
      total: 0,

      // 审批记录
      logVisible: false,
      activities: []
    }
  },
  components: { ApprovalLog },
  created() {
    this.getList()
  },
  methods: {
    // 列表请求
    getList() {
      getList(this.tableInfo).then(res => {
        const { records, total } = res.data
        this.tableData = records
        this.total = total
        this.loading = false 
      })
    },
    // 表dan查询
    handleQuery() {
      this.tableInfo.pageIndex = 1
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.getList()
    },
    // 表dan重置
    reset() {
      this.tableInfo = {
        companyName: '',
        projectName: '',
        setProjectStatus: '',
        type: 2,
        pageIndex: 1,
        pageSize: 10
      }
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.getList()
    },

    // 查看详情
    handleView(row) {
      this.$router.push({ name: 'AddedDetail', query: { 
        projectId: row.projectId,
        createTime: row.createTime,
        createUserNickName: row.createUserNickName,
        createUserPhone: row.createUserPhone,
        projectName: row.projectName
       } })
    },
    
    // 审批记录
    approval(projectId) {
      this.logVisible = true
      getProjectExamineLog({projectId}).then(res => {
        this.activities = res.data
      })
    },

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
  }
}
</script>

<style lang="scss" scoped>
  .shang {
    height: 70px;
    background-color: #fff;
    .el-breadcrumb {
      padding: 10px 0 0 25px;
    }
    h3 {
      text-align: left;
      padding-left: 25px;
    }
  }
</style>