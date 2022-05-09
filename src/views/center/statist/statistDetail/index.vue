<template>
  <div>
    <div class="shang">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{ $route.matched[1].meta.title }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="back">
        <div @click="$router.back()" style="width: 240px">
          <h3>&lt; {{ $route.meta.title }}</h3>
        </div>
      </div>
    </div>
    <el-card>
      <div class="xian">
        <div>负责人信息</div>
      </div>
      <el-row :gutter="20" style="margin: 15px">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">负责人</el-col>
            <el-col :span="16" class="span130">{{ $route.query.nickName }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">所属公司</el-col>
            <el-col :span="16" class="span130">{{ $route.query.companyName }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">负责人电话</el-col>
            <el-col :span="16" class="span130">{{ $route.query.userName }}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <div class="xian">
        <div>负责项目</div>
      </div>
      <div style="display:flex;justify-content:space-between;margin-top: 15px;">
        <el-form ref="ruleForm" :model="tableInfo" inline size="mini">
          <el-form-item>
            <el-input v-model="tableInfo.projectName" placeholder="项目名称查询" clearable />
          </el-form-item>
          <el-form-item>
            <el-input v-model="tableInfo.companyName" placeholder="公司名称查询" clearable />
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="timedate"
              type="daterange"
              align="right"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['00:00:00', '23:59:59']"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="handleTimeChange"
              :picker-options="pickerOptions" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleQuery" icon="el-icon-search">查询</el-button>
            <el-button @click="reset">重 置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="mini">
        <el-table-column prop="projectName" label="项目名称" />
        <el-table-column prop="companyName" label="公司名称" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="当前进度" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0 || scope.row.status == 2">待录入</span>
            <span v-else-if="scope.row.status == 1">初审审核</span>
            <span v-else-if="( scope.row.status == 3 && scope.row.firstExamineType == 1 )">图纸复核</span>
            <span v-else-if="scope.row.status == 5 || (scope.row.status == 3 && scope.row.firstExamineType == 2)">材料补充</span>
            <span v-else-if="scope.row.status == 6 || ( scope.row.status == 3 && scope.row.firstExamineType == 3 )">终审审核</span>
            <span v-else-if="scope.row.status == 7">立项补充</span>
            <span v-else-if="scope.row.status == 99">项目终止</span>
          </template>
        </el-table-column>
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </el-card>
  </div>
</template>

<script>
import { getSelectListAll } from '@/api/center'
export default {
  name: 'StatistDetail',
  data() {
    return {
      tableInfo: {
        projectName: '',
        companyName: '',
        startDate: '',
        endDate: '',
        userId: '',
        pageIndex: 1,
        pageSize: 10
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      timedate: '',
      tableData: [],
      total: 0,
    }
  },
  created() {
    this.tableInfo.userId = this.$route.query.userId
    this.getSelectListAll()
  },
  methods: {
    getSelectListAll() {
      getSelectListAll(this.tableInfo).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    // 表dan查询
    handleQuery() {
      this.tableInfo.pageIndex = 1
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.getSelectListAll()
    },
    handleTimeChange(val) {
      console.log(val)
      if(val == null) {
        this.tableInfo.startDate = null
        this.tableInfo.endDate = null
      } else {
        this.tableInfo.startDate = val[0]
        this.tableInfo.endDate = val[1]
      }
    },
    // 表dan重置
    reset() {
      this.tableInfo = {
        projectName: '',
        companyName: '',
        startDate: '',
        endDate: '',
        pageIndex: 1,
        pageSize: 10
      }
      this.timedate = ''
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.getSelectListAll()
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.tableInfo.pageSize = val
      this.getSelectListAll()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.tableInfo.pageIndex = val
      this.getSelectListAll()
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
.xian {
  color: #1890ff;
  border-bottom: 1px solid #1890ff;
  padding-bottom: 5px;
  div {
    border-left: 4px solid #1890ff;
    padding-left: 15px;
  }
}
</style>