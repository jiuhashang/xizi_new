<template>
  <!-- 文件材料 -->
  <el-card>
    <div class="top">
      <div>
        <el-form :inline="true" :model="tableInfo" size="mini">
          <el-form-item >
            <el-select v-model="tableInfo.type" placeholder="全部板块" clearable>
              <el-option label="项目进度" :value="0"></el-option>
              <el-option label="项目概况" :value="1"></el-option>
              <el-option label="任务管理" :value="2"></el-option>
              <el-option label="图纸管理" :value="3"></el-option>
              <el-option label="保险情况" :value="4"></el-option>
              <el-option label="团队成员" :value="5"></el-option>
              <el-option label="汇报信息" :value="6"></el-option>
              <el-option label="会议纪要" :value="7"></el-option>
              <el-option label="文件材料" :value="8"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="tableInfo.createUserName" placeholder="操作人员搜索" clearable />
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="timedate"
              type="daterange"
              align="center"
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
            <el-button type="primary" icon="el-icon-search" @click="handleQuery">查 询</el-button>
            <el-button @click="reset">重 置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="bottom">
      <el-table :data="tableData" v-loading="loading" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="mini">
        <el-table-column label="操作内容" prop="editMessage" />
        <el-table-column label="操作时间" prop="createTime" />
        <el-table-column label="板块">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 0">项目进度</span>
            <span v-else-if="scope.row.type == 1">项目概况</span>
            <span v-else-if="scope.row.type == 2">任务管理</span>
            <span v-else-if="scope.row.type == 3">图纸管理</span>
            <span v-else-if="scope.row.type == 4">保险情况</span>
            <span v-else-if="scope.row.type == 5">团队成员</span>
            <span v-else-if="scope.row.type == 6">汇报信息</span>
            <span v-else-if="scope.row.type == 7">会议纪要</span>
            <span v-else>文件材料</span>
          </template>
        </el-table-column>
        <el-table-column label="操作人员" prop="createUserName" />
        <el-table-column label="人员身份">
          <template slot-scope="scope">
            <span v-if="scope.row.userType == 0">项目经理</span>
            <span v-else-if="scope.row.userType == 1">商务负责</span>
            <span v-else-if="scope.row.userType == 2">采购负责</span>
            <span v-else-if="scope.row.userType == 3">图纸设计</span>
            <span v-else-if="scope.row.userType == 4">项目助理</span>
            <span v-else>其他</span>
          </template>
        </el-table-column>
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </div>
    
  </el-card>
</template>

<script>
import { getEditLog } from '@/api/epc'
export default {
  name: 'ChangeRecord',
  props: ['id'],
  data() {
    return {
      tableInfo: {
        projectId: this.id,
        createUserName: undefined,
        startTime: null,
        endTime: null,
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      loading: false,
      total: 0,
      timedate: '',
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
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      getEditLog( this.tableInfo ).then( res => {
        const { records, total } = res.data
        this.tableData = records
        this.total = total
      })
    },
    handleTimeChange( val ) {
      if( val == null ) {
        this.tableInfo.startTime = null
        this.tableInfo.endTime = null
      } else {
        this.tableInfo.startTime = val[0]
        this.tableInfo.endTime = val[1]
      }
    },
    // 表dan查询
    handleQuery () {
      this.tableInfo.pageIndex = 1
      this.$refs.pagination.resetOption( this.tableInfo.pageIndex, this.tableInfo.pageSize )
      this.getList()
    },
    // 表dan重置
    reset () {
      this.tableInfo = {
        projectId: this.id,
        fileName: undefined,
        createUserName: undefined,
        startTime: null,
        endTime: null
      }
      this.timedate = ''
      this.$refs.pagination.resetOption( this.tableInfo.pageIndex, this.tableInfo.pageSize )
      this.getList()
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
.top {
  display: flex;
  justify-content: space-between;
}
.must-form-item {
  /deep/ .el-form-item__label:before {
    content: '*';
    color: red;
    margin-right: 4px;
  }
}
.el-card {
  margin-top: 0;
}
</style>