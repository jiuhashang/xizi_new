<template>
  <div>
    <div class="shang">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>审批中心</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <h2>{{ $route.meta.title }}</h2>
    </div>
    <el-card>
      <el-form ref="ruleForm" :model="tableInfo" inline>
        <el-form-item>
          <el-input v-model="tableInfo.projectName" placeholder="项目名称查询" clearable style="width:200px;" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="tableInfo.companyName" placeholder="公司名称查询" clearable style="width:200px;" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="tableInfo.bankId" placeholder="关联机构查询" clearable style="width:200px;" />
        </el-form-item>
        <el-form-item>
          <el-select v-model="tableInfo.firstExamine" clearable placeholder="全部进度">
            <el-option
              v-for="item in options"
              :key="item.firstExamine"
              :label="item.label"
              :value="item.firstExamine">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-left: 20px;">
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" style="width: 100%">
        <el-table-column prop="projectName" label="项目名称" />
        <el-table-column label="公司名称" />
        <el-table-column prop="province" label="建站地址" />
        <el-table-column label="项目发起时间" />
        <el-table-column label="当前进度">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleView(scope.row)">查看</el-button>
            <el-button type="text">文件打包</el-button>
            <el-button type="text">生成PDF</el-button>
          </template>
        </el-table-column> 
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </el-card>
    <!-- 审批记录 -->
    <el-dialog
      title="审批记录"
      :visible.sync="logVisible"
      width="50%"
      :close-on-click-modal="false">
      <el-timeline :reverse="true">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.createTime">
          <p>{{activity.title}}</p>
          <p>{{activity.userName}}</p>
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
import { getList, getProjectExamineLog } from '@/api/listProject'

export default {
  name: 'Preview',
  data() {
    return {
      tableInfo: {
        companyName: '',
        projectName: '',
        bankId: '',
        firstExamine: '',
        pageIndex: 1,
        pageSize: 10
      },
      options: [
        {
          firstExamine: '0',
          label: '待提交'
        }, 
        {
          firstExamine: '1',
          label: '审核中'
        }, 
        {
          firstExamine: '3',
          label: '审核通过'
        }, 
        {
          firstExamine: '2',
          label: '审核未通过'
        }, 
        {
          firstExamine: '99',
          label: '项目已终止'
        }
      ],
      tableData: [],
      total: 0,

      // 审批记录
      logVisible: false,
      activities: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 列表请求
    getList() {
      getList(this.tableInfo).then(res => {
        console.log(res)
        const { records, total } = res.data
        this.tableData = records
        this.total = total
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
        bankId: '',
        firstExamine: '',
        pageIndex: 1,
        pageSize: 10
      }
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.getList()
    },

    // 查看详情
    handleView(row) {
      this.$router.push({ name: 'PreviewDetail', query: { 
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
        console.log(res)
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
    height: 97px;
    background-color: #fff;
    .el-breadcrumb {
      padding: 15px 0 0 25px;
    }
    h2 {
      text-align: left;
      padding-left: 25px;
    }
  }
  .el-form {
    width: 80%;
  }
  .el-alert {
    margin-bottom: 25px;
  }
</style>