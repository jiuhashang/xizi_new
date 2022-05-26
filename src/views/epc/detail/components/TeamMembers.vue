<template>
  <!-- 团队成员 -->
  <el-card>
    <div class="top">
      <el-form :inline="true" :model="form" size="mini">
        <el-form-item>
          <el-input v-model="form.nickName" placeholder="人员名称搜索" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.createUserName" placeholder="邀请人搜索" clearable />
        </el-form-item>
        <el-form-item >
          <el-select v-model="form.type" placeholder="全部类型" clearable>
            <el-option label="项目经理" :value="0"></el-option>
            <el-option label="商务负责" :value="1"></el-option>
            <el-option label="采购负责" :value="2"></el-option>
            <el-option label="图纸设计" :value="3"></el-option>
            <el-option label="项目助理" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery" icon="el-icon-search">查 询</el-button>
          <el-button @click="reset">重 置</el-button>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" size="mini" @click="handleAdd"> 新增成员 </el-button>
      </div>
    </div>
    <el-table :data="tableData" v-loading="loading" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="mini">
      <el-table-column prop="nickName" label="成员名称" />
      <el-table-column label="成员类型">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 0">项目经理</span>
          <span v-else-if="scope.row.type == 1">商务负责</span>
          <span v-else-if="scope.row.type == 2">采购负责</span>
          <span v-else-if="scope.row.type == 3">图纸设计</span>
          <span v-else>项目助理</span>
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="手机号码" />
      <el-table-column prop="createTime" label="加入时间" />
      <el-table-column prop="createUserName" label="邀请人" />
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="text" style="color:red;" @click="handleRemove( scope.row )">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <c-pagination ref="pagination1" :total="total" @sendsize="handleSizeChange1" @sendpage="handleCurrentChange1" />

    <!-- 新增成员 -->
    <el-dialog title="提示" :visible.sync="addDialogVisible" :close-on-click-modal="false" width="30%" @close="clearType">
      <div style="padding:0 50px;">
        <el-form ref="addRef" :label-position="labelPosition" :rules="addRules" label-width="80px" :model="addForm" size="mini">
          <el-form-item label="请选择新增成员的类型：" prop="type">
            <el-select v-model="addForm.type" placeholder="请选择" class="width100">
              <el-option label="项目经理" :value="0"></el-option>
              <el-option label="商务负责" :value="1"></el-option>
              <el-option label="采购负责" :value="2"></el-option>
              <el-option label="图纸设计" :value="3"></el-option>
              <el-option label="项目助理" :value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleNext" size="mini">下一步</el-button>
      </span>
    </el-dialog>
    <!-- 指派人员 -->
    <el-dialog title="提示" :visible.sync="chooseDialogVisible" :close-on-click-modal="false" width="60%">
      <el-form ref="ruleForm" :model="personInfo" inline size="mini">
        <el-form-item>
          <el-input v-model="personInfo.userName" placeholder="账号持有人查询" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleChooseQuery" icon="el-icon-search">查 询</el-button>
          <el-button @click="chooseReset">重 置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="personTableData" v-loading="personLoading" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="mini">
        <el-table-column prop="nickName" label="账号持有人" />
        <el-table-column prop="companyName" label="所属公司" />
        <el-table-column prop="userName" label="手机号码" />
        <el-table-column label="账号状态">
           <template slot-scope="scope">
            <el-tag type="success" v-show="scope.row.status == 1 ">已启用</el-tag>
            <el-tag type="danger" v-show="scope.row.status == 2 ">已禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleChoose( scope.row )">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <c-pagination ref="pagination2" :total="personTotal" @sendsize="handleSizeChange2" @sendpage="handleCurrentChange2" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="chooseDialogVisible = false" size="mini">关 闭</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { selectList } from '@/api/integrated'
import { getPersonList, addOne, deleteOne } from '@/api/epc'
export default {
  name: 'FileMaterial',
  props: ['id'],
  data() {
    return {
      form: {
        projectId: this.id
      },
      tableData: [],
      loading: true,
      total: 0,

      // 新增成员
      labelPosition: 'top',
      addDialogVisible: false,
      addForm: {
        type: undefined
      },
      addRules: {
        type: [{ required: true, message: '请选择成员类型', trigger: 'change' }]
      },
      // 选择人员
      chooseDialogVisible: false,
      personInfo: {
        projectId: this.id,
        userName: undefined,
        userId: undefined,
        type: undefined,
        pageIndex: 0,
        pageSize: 10
      },
      personTableData: [],
      personLoading: true,
      personTotal: 0
    }
  },
  // created () {
  //   this.getList()
  // },
  methods: {
    // 获取项目团队成员列表
    getList () {
      getPersonList( this.form ).then( res => {
        const { records, total } = res.data
        this.tableData = records
        this.total = total
        this.loading = false
      })
    },
    // 新增成员弹框
    handleAdd () {
      this.addDialogVisible = true
    },
    // 下一步
    handleNext () {
      this.$refs.addRef.validate( valid => {
        if ( valid ) {
          this.handleSelectList()
          this.chooseDialogVisible = true
        }
      })
    },
    // 获取成员列表
    handleSelectList () {
      selectList( this.personInfo ).then( res => {
        const { records, total } = res.data
        this.personTableData = records
        this.personTotal = total
        this.personLoading = false
      })
    },
    // 指定成员
    handleChoose ( row ) {
      this.personInfo.userId = row.id
      this.personInfo.type = this.addForm.type
      let a = ''
      if ( this.personInfo.type == 0 ) {
        a = '项目经理'
      } else if ( this.personInfo.type == 1 ) {
        a = '商务负责'
      } else if ( this.personInfo.type == 2 ) {
        a = '采购负责'
      } else if ( this.personInfo.type == 3 ) {
        a = '图纸设计'
      } else if ( this.personInfo.type == 4 ) {
        a = '项目助理'
      }
      this.$confirm(`确定将 【${ row.nickName }】 指派为该项目的 【${ a }】 吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          addOne( this.personInfo ).then( res => {
            this.$message.success( res.msg )
            this.getList()
            this.$emit('update')
            this.addDialogVisible = false
            this.chooseDialogVisible = false
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })         
        })
    },
    // 移除成员
    handleRemove ( row ) {
      this.$confirm(`确定移除成员 【${row.nickName}】?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteOne({ id: row.id }).then( res => {
          this.$message.success( res.msg )
          this.getList()
          this.$emit('update')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })        
      })
    },
    // 清空新增成员弹框
    clearType () {
      this.$refs.addRef.resetFields()
    },

    // 表dan查询
    handleQuery () {
      this.form.pageIndex = 1
      this.$refs.pagination1.resetOption( this.form.pageIndex, this.form.pageSize )
      this.getList()
    },
    // 表dan重置
    reset () {
      this.form = {
        projectId: this.id
      }
      this.$refs.pagination1.resetOption( this.form.pageIndex, this.form.pageSize )
      this.getList()
    },

    handleChooseQuery () {
      this.form.pageIndex = 1
      this.$refs.pagination2.resetOption( this.personInfo.pageIndex, this.personInfo.pageSize )
      this.handleSelectList()
    },
    chooseReset () {
      this.personInfo = {
        projectId: this.id,
        userName: undefined,
        userId: undefined,
        type: undefined,
        pageIndex: 0,
        pageSize: 10
      },
      this.$refs.pagination2.resetOption( this.personInfo.pageIndex, this.personInfo.pageSize )
      this.handleSelectList()
    },
    handleSizeChange1 ( val ) {
      this.form.pageSize = val
      this.getList()
    },
    handleCurrentChange1 ( val ) {
      this.form.pageIndex = val
      this.getList()
    },

    handleSizeChange2 ( val ) {
      this.personInfo.pageSize = val
      this.handleSelectList()
    },
    handleCurrentChange2 ( val ) {
      this.personInfo.pageIndex = val
      this.handleSelectList()
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
}
.el-card {
  margin-top: 0;
}
</style>