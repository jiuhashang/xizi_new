<template>
  <!-- 会议纪要 -->
  <el-card>
    <div class="top">
      <div>
        <el-form :inline="true" :model="tableInfo" size="mini">
          <el-form-item>
            <el-input v-model="tableInfo.createUserName" placeholder="会议创建人搜索" clearable />
          </el-form-item>
          <el-form-item >
            <el-select v-model="tableInfo.type" placeholder="全部类型" clearable>
              <el-option label="日常例会" :value="0"></el-option>
              <el-option label="图纸评审" :value="1"></el-option>
              <el-option label="问题讨论" :value="2"></el-option>
              <el-option label="竣工验收" :value="3"></el-option>
              <el-option label="其他" :value="9"></el-option>
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
              :picker-options="pickerOptions"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="handleQuery">查 询</el-button>
            <el-button @click="reset">重 置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-button type="primary" size="mini" @click="handleAdd">新建会议</el-button>
      </div>
    </div>
    <div class="bottom">
      <el-table :data="tableData" v-loading="loading" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="mini">
        <el-table-column label="会议主题" width="380">
          <template slot-scope="scope">
            <span class="yi">{{ scope.row.theme }}</span>
          </template>
        </el-table-column>
        <el-table-column label="会议类型">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 0">日常例会</span>
            <span v-else-if="scope.row.type == 1">图纸评审</span>
            <span v-else-if="scope.row.type == 2">问题讨论</span>
            <span v-else-if="scope.row.type == 3">竣工验收</span>
            <span v-else>其他</span>
          </template>
        </el-table-column>
        <el-table-column label="创建人" prop="createUserName" />
        <el-table-column label="会议时间" prop="time" />
        <el-table-column label="创建时间" prop="createTime" />
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-button type="text" @click="handleView(scope.row)">查看</el-button>
            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" style="color:red;" @click="handleRemove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </div>

    <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" width="40%" @close="handleClear">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" size="mini" style="width:95%;">
        <el-form-item label="会议主题" prop="theme">
          <el-input v-model="ruleForm.theme" placeholder="请输入会议主题" />
        </el-form-item>
        <el-form-item label="会议类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择会议类型" class="width100">
            <el-option label="日常例会" :value="0"></el-option>
            <el-option label="图纸评审" :value="1"></el-option>
            <el-option label="问题讨论" :value="2"></el-option>
            <el-option label="竣工验收" :value="3"></el-option>
            <el-option label="其他" :value="9"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会议时间" prop="time">
          <el-date-picker v-model="ruleForm.time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择会议时间" style="width:100%;" />
        </el-form-item>
        <el-form-item label="会议概况" prop="message">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 50}" v-model="ruleForm.message" placeholder="请输入会议内容,最多500字" />
        </el-form-item>
        <el-form-item label="上传文件">
          <file-upload-string v-model="ruleForm.fileUrl" :limit="1" ref="fileUpload" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="add" size="mini">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="查看会议" :visible.sync="viewDialogVisible" :close-on-click-modal="false" width="40%">
      <div style="color:#333;">
        <span style="font-size:16px;font-weight:800;">{{ info.theme }}</span>
        <div style="display:flex;justify-content:space-between;margin:20px 0;">
          <template>
            <span v-if="info.type == 0">日常例会</span>
            <span v-else-if="info.type == 1">图纸评审</span>
            <span v-else-if="info.type == 2">问题讨论</span>
            <span v-else-if="info.type == 3">竣工验收</span>
            <span v-else>其他</span>
          </template>
          <span>{{ info.time }}</span>
        </div>
        <div style="white-space:pre-wrap;font-size:13px;">{{ info.message }}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="down(info.fileUrl)" size="mini" :disabled="info.fileUrl === null">下载附件</el-button>
        <el-button type="primary" @click="viewDialogVisible = false" size="mini">关 闭</el-button>
      </span>
    </el-dialog>

  </el-card>
</template>

<script>
import { getEpcProjectMeetingInfo, addMeetingInfo, deleteMeetingInfo } from '@/api/epc'
import _ from 'lodash'
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
      },

      // 添加删除
      dialogVisible: false,
      title: '',
      ruleForm: {
        projectId: this.id,
        theme: undefined,
        type: undefined,
        time: undefined,
        message: undefined,
        fileUrl: null
      },
      rules: {
        theme: [
          { required: true, message: '请输入会议主题', trigger: 'blur' },
          { min: 4, max: 50, message: '长度在 4 到 50 个字符', trigger: 'blur' }
        ],
        type: [{ required: true, message: '请选择会议类型', trigger: 'change' }],
        time: [{ required: true, message: '请选择会议时间', trigger: 'change' }],
        message: [
          { required: true, message: '请输入会议概况', trigger: 'blur' },
          { min: 1, max: 500, message: '最多 500 个字符', trigger: 'blur' }
        ]
      },
      // 查看
      viewDialogVisible: false,
      info: {}
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      getEpcProjectMeetingInfo( this.tableInfo ).then( res => {
        const { records, total } = res.data
        this.tableData = records
        this.total = total
      })
    },
    handleAdd () {
      this.title = '新建会议'
      this.dialogVisible = true
    },
    add () {
      this.$refs.ruleForm.validate((valid) => {
        if ( valid ) {
          addMeetingInfo( this.ruleForm ).then( res => {
            this.$message.success(res.msg)
            this.getList()
            this.dialogVisible = false
          })
        }
      })
    },
    handleView (row) {
      this.info = row
      this.viewDialogVisible = true
    },
    handleEdit (row) {
      this.title = '修改会议'
      this.$nextTick(() => {
        this.ruleForm = _.cloneDeep(row)
      })
      this.dialogVisible = true
    },
    // 删除
    handleRemove (id) {
      this.$confirm('确定要删除该会议信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMeetingInfo({ id }).then( res => {
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
    handleClear () {
      this.$refs.ruleForm.resetFields()
      this.ruleForm = {
        projectId: this.id,
        theme: undefined,
        type: undefined,
        time: undefined,
        message: undefined,
        fileUrl: null
      }
    },
    down (url) {
      window.open(url)
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