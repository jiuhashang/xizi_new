<template>
  <!-- 文件材料 -->
  <el-card>
    <div class="top">
      <el-form :inline="true" :model="tableInfo" size="mini">
        <el-form-item>
          <el-input v-model="tableInfo.fileName" placeholder="文档名称搜索" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="tableInfo.createUserName" placeholder="上传人搜索" clearable />
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
        <el-button type="primary" size="mini" @click="handlePut">上传文件</el-button>
      </div>
    </div>
    <div class="bottom">
      <el-table :data="tableData" v-loading="loading" stripe :header-cell-style="{ background:'#eef1f6',color:'#606266' }" size="mini">
        <el-table-column label="文件名称">
          <template slot-scope="scope"> 
            <el-link type="primary" @click="handleDown( scope.row.fileUrl )">{{ scope.row.fileName }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="文件类型">
          <template slot-scope="scope">
            <span v-if="scope.row.fileType == 0">立项文件</span>
            <span v-else-if="scope.row.fileType == 1">合同文件</span>
            <span v-if="scope.row.fileType == 2">并网文件</span>
            <span v-if="scope.row.fileType == 3">竣工文件</span>
            <span v-if="scope.row.fileType == 99">其他文件</span>
          </template>
        </el-table-column>
        <el-table-column label="文件大小">
          <template slot-scope="scope">
            <span>{{ scope.row.fileSize + ' MB' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createUserName" label="上传人" />
        <el-table-column prop="createTime" label="上传时间" />
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" style="color:red;" @click="handleRemove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </div>
    <!-- 上传文件 -->
    <el-dialog title="上传文件" :visible.sync="dialogVisible" :close-on-click-modal="false" width="40%" @close="clear">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" size="mini" style="width:95%;">
        <el-form-item label="文件类型" prop="fileType">
          <el-select v-model="ruleForm.fileType" placeholder="请选择" class="width100">
            <el-option label="立项文件" :value="0"></el-option>
            <el-option label="合同文件" :value="1"></el-option>
            <el-option label="并网文件" :value="2"></el-option>
            <el-option label="竣工文件" :value="3"></el-option>
            <el-option label="其他文件" :value="99"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文件名称" prop="fileName">
          <el-input v-model="ruleForm.fileName"></el-input>
        </el-form-item>
        <el-form-item label="上传文件" prop="fileUrl" class="must-form-item">
          <!-- <file-upload-string v-model="ruleForm.fileUrl" :limit="1" /> -->
          <file-upload ref="invertRef" :limit="1" :show-file-list="true" style="display: block;" :action="uploadUrl" :data="inverterData" @success="uploadSuccess">
            <el-button type="primary" style="margin-right: 10px;">上传<i class="el-icon-upload el-icon--right"></i></el-button>
          </file-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="handlePutFile" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
// const uploadUrl = 'http://119.45.162.104:7800/huawei/uploadFile'
const uploadUrl = 'http://123.60.52.140:7800/huawei/uploadFile'
// const uploadUrl = 'http://10.11.32.54:7800/huawei/uploadFile'
import { getFileList, addFile, deleteFile } from '@/api/epc'
export default {
  name: 'FileMaterial',
  props: ['id'],
  data() {
    return {
      uploadUrl: uploadUrl,
      tableInfo: {
        projectId: this.id,
        fileName: undefined,
        createUserName: undefined,
        startTime: null,
        endTime: null
      },
      tableData: [],
      loading: true,
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

      // 上传文件
      dialogVisible: false,
      ruleForm: {
        projectId: this.id,
        fileType: undefined,
        fileName: undefined,
        fileUrl: undefined,
        fileSize: undefined
      },
      rules: {
        fileType: [{ required: true, message: '请选择文件类型', trigger: 'change' }],
        fileName: [
          { required: true, message: '请输入文件名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        fileUrl: [{ required: true, message: '请上传相关文件' }]
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      getFileList( this.tableInfo ).then( res => {
        const { records, total } = res.data
        this.tableData = records
        this.total = total
        this.loading = false
      })
    },
    handleDown ( fileUrl ) {
      window.open( fileUrl )
    },
    handlePut () {
      this.dialogVisible = true
    },
    handlePutFile () {
      this.$refs.ruleForm.validate( valid => {
        if ( valid ) {
          addFile( this.ruleForm ).then( res => {
            this.$message.success( res.msg )
            this.getList()
            this.dialogVisible = false
          })
        }
      })
    },
    handleRemove ( id ) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteFile({ id }).then( res => {
          this.getList()
          this.$message.success( res.msg )
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })       
      })
    },
    clear () {
      this.$refs.ruleForm.resetFields()
      this.$refs.invertRef.$refs.imageUpload.clearFiles()
      this.$refs.invertRef.$refs.imageUpload.abort()
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
    },

    uploadSuccess (array, res, file, filelist) {
      // console.log(res)
      this.ruleForm.fileUrl = res.data.url
      this.ruleForm.fileSize = res.data.fileSize
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
/deep/ .el-upload-list {
  width: 40%;
} 
</style>