<template>
  <!-- 文件材料 -->
  <el-card>
    <div class="top">
      <el-form :inline="true" :model="tableInfo" size="mini">
        <el-form-item>
          <el-input v-model="tableInfo.createUserName" placeholder="汇报人搜索" clearable />
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
      <div>
        <el-button type="primary" size="mini" @click="handleAdd">新增汇报</el-button>
      </div>
    </div>
    <div class="bottom">
      <el-table :data="tableData" v-loading="loading" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="mini">
        <el-table-column label="汇报标题" prop="reportName" />
        <el-table-column label="汇报人" prop="createUserName" />
        <el-table-column label="汇报时间" prop="createTime" />
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-button type="text" @click="handView(scope.row)">查看</el-button>
            <el-button type="text" @click="handEdit(scope.row)">编辑</el-button>
            <el-button type="text" style="color:red;" @click="handleRemove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </div>
    
    <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" width="40%" @close="clear">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" size="mini" style="width:95%;">
        <el-form-item label="汇报标题" prop="reportName">
          <el-input v-model="ruleForm.reportName" placeholder="请输入汇报标题" />
        </el-form-item>
        <el-form-item label="汇报内容" prop="message">
          <el-input type="textarea" :autosize="{ minRows: 8, maxRows: 50}" v-model="ruleForm.message" placeholder="请输入汇报内容,最多500字" />
        </el-form-item>
        <el-form-item label="上传文件">
          <file-upload-string v-model="ruleForm.reportUrl" :limit="1" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="add" size="mini">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="查看汇报" :visible.sync="viewDialogVisible" :close-on-click-modal="false" width="40%">
      <div style="color:#333;">
        <span style="font-size:16px;font-weight:800;">{{ info.reportName }}</span>
        <div style="white-space:pre-wrap;font-size:13px;margin-top:20px;">{{ info.message }}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="down(info.reportUrl)" size="mini" :disabled="info.reportUrl === null">下载附件</el-button>
        <el-button type="primary" @click="viewDialogVisible = false" size="mini">关 闭</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { getEpcProjecReportInfo, addReportInfo, deleteReportInfo } from '@/api/epc'
import _ from 'lodash'
export default {
  name: 'ReportingInfo',
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
      },

      // 添加修改
      dialogVisible: false,
      title: '',
      ruleForm: {
        projectId: this.id,
        reportName: undefined,
        message: undefined,
        reportUrl: null
      },
      rules: {
        reportName: [
          { required: true, message: '请输入汇报标题', trigger: 'blur' },
          { min: 4, max: 50, message: '长度在 4 到 50 个字符', trigger: 'blur' }
        ],
        message: [
          { required: true, message: '请输入汇报内容', trigger: 'blur' },
          { min: 1, max: 500, message: '最多 500 个字符', trigger: 'blur' }
        ]
      },
      // 查看
      info: {},
      viewDialogVisible: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList() {
      getEpcProjecReportInfo( this.tableInfo ).then( res => {
        const { total, records } = res.data
        this.tableData = records
        this.total = total
      })
    },
    handleAdd () {
      this.title = '新增汇报'
      this.dialogVisible = true
    },
    add () {
      this.$refs.ruleForm.validate((valid) => {
        if ( valid ) {
          addReportInfo( this.ruleForm ).then( res => {
            this.$message.success(res.msg)
            this.getList()
            this.dialogVisible = false
          })
        }
      })
    },
    // 查看
    handView ( row ) {
      this.info = row
      this.viewDialogVisible = true 
    },
    // 编辑
    handEdit ( row ) {
      this.title = '修改汇报'
      this.$nextTick(() => {
        this.ruleForm = _.cloneDeep(row)
      })
      this.dialogVisible = true
    },
    // 删除
    handleRemove (id) {
      this.$confirm('确定要删除该汇报信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteReportInfo({ id }).then( res => {
          this.getList()
          this.$message.success(res.msg)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })     
      })
    },
    // 下载附件
    down ( url ) {
      window.open(url)
    },
    clear () {
      this.$refs.ruleForm.resetFields()
      this.ruleForm = {
        projectId: this.id,
        reportName: undefined,
        message: undefined,
        reportUrl: null
      }
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
        createUserName: undefined,
        startTime: null,
        endTime: null,
        pageIndex: 1,
        pageSize: 10
      }
      this.timedate = ''
      this.$refs.pagination.resetOption( this.tableInfo.pageIndex, this.tableInfo.pageSize )
      this.getList()
    },
    handleSizeChange(val) {
      this.tableInfo.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
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