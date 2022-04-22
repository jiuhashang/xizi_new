<template>
  <!-- 文件材料 -->
  <el-card>
    <div class="top">
      <div>
        <el-form :inline="true" :model="tableInfo" size="mini">
          <el-form-item>
            <el-input v-model="tableInfo.createUserName" placeholder="会议创建人搜索" clearable />
          </el-form-item>
          <el-form-item >
            <el-select v-model="tableInfo.type" placeholder="全部类型" clearable>
            </el-select>
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
      <div>
        <el-button type="primary" size="mini">新建会议</el-button>
      </div>
    </div>
    <div class="bottom">
      <el-table :data="tableData" v-loading="loading" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="mini">
        <el-table-column label="会议主题" />
        <el-table-column label="会议类型" />
        <el-table-column label="创建人" />
        <el-table-column label="会议时间" />
        <el-table-column label="创建时间" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text">查看</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text" style="color:red;" @click="handleRemove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </div>
    
  </el-card>
</template>

<script>
export default {
  name: 'MeetingMinutes',
  props: ['id'],
  data() {
    return {
      tableInfo: {
        projectId: this.id,
        fileName: undefined,
        createUserName: undefined,
        startTime: null,
        endTime: null
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
  },
  methods: {
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