<template>
  <!-- 图纸管理 -->
  <el-card>
    <div class="top">
      <el-form :inline="true" :model="tableInfo" size="mini">
        <el-form-item>
          <el-input v-model="tableInfo.imageName" placeholder="图纸名称搜索" clearable />
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
        <el-button type="primary" size="mini" @click="handlePut">上传图纸</el-button>
      </div>
    </div>
    <el-table :data="tableData" v-loading="loading" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="mini">
      <el-table-column label="图纸名称">
        <template slot-scope="scope"> 
          <el-link type="primary" @click="handleDown(scope.row.imageUrl)">{{ scope.row.imageName }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="文件大小">
        <template slot-scope="scope">
          <span>{{ scope.row.fileSize + ' MB' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createUserName" label="上传人" />
      <el-table-column prop="createTime" label="上传时间" />
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="text" style="color:red;" @click="handleRemove(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />

    <!-- 上传图纸 -->
    <el-dialog title="上传图纸" :visible.sync="dialogVisible" :close-on-click-modal="false" width="40%" @close="clear">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" size="mini" class="width95">
        <el-form-item label="文件名称" prop="imageName">
          <el-input v-model="ruleForm.imageName"></el-input>
        </el-form-item>
        <el-form-item label="上传文件" prop="imageUrl">
          <!-- <file-upload-string v-model="ruleForm.imageUrl" :limit="1" /> -->
          <!-- <file-upload ref="invertRef" :limit="1" :show-file-list="true" :action="uploadUrl" :data="inverterData" @success="uploadSuccess"> -->
          <file-upload ref="invertRef" :limit="1" :show-file-list="true" :action="uploadUrl" @success="uploadSuccess">
            <el-button type="primary" style="margin-right: 10px;">上传<i class="el-icon-upload el-icon--right"></i></el-button>
          </file-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="handlePutImg" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { getImgList, addImg, deleteImg } from '@/api/epc'
const uploadUrl = 'http://123.60.52.140:7800/huawei/uploadFile'
export default {
  name: 'DrawingManagement',
  props: ['id'],
  data() {
    return {
      uploadUrl: uploadUrl,
      tableInfo: {
        projectId: this.id,
        imageName: undefined,
        startTime: undefined,
        endTime: undefined
      },
      tableData: [],
      total: 0,
      loading: true,
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

      // 上传图纸
      dialogVisible: false,
      ruleForm: {
        projectId: this.id,
        imageName: undefined,
        imageUrl: undefined,
        fileSize: undefined
      },
      rules: {
        imageName: [
          { required: true, message: '请输入文件名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        imageUrl: [{ required: true, message: '请上传相关文件' }]
      }
    }
  },
  // created () {
  //   this.getList()
  // },
  methods: {
    getList () {
      getImgList( this.tableInfo ).then( res => {
        const { records, total } = res.data
        this.tableData = records
        this.total = total
        this.loading = false
      })
    },
    // 上传图纸
    handlePut () {
      this.dialogVisible = true
    },
    handlePutImg () {
      this.$refs.ruleForm.validate( valid => {
        if ( valid ) {
          addImg( this.ruleForm ).then( res => {
            this.$message.success(res.msg)
            this.getList()
            this.dialogVisible = false
          })
        }
      })
  
    },
    handleDown ( imageUrl ) {
      window.open( imageUrl )
    },
    handleRemove ( id ) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteImg({ id }).then( res => {
          this.$message.success(res.msg)
          this.getList()
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
        imageName: undefined,
        startTime: undefined,
        endTime: undefined
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
      this.ruleForm.imageUrl = res.data.url
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