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
            <el-input v-model="tableInfo.templateName" placeholder="模板名称查询" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleQuery" icon="el-icon-search">查 询</el-button>
            <el-button @click="reset">重 置</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-button type="primary" @click="handleCreate" size="mini" icon="el-icon-plus">创建模板</el-button>
        </div>
      </div>
      <el-alert title="任务模板的变更或删除不影响已经使用的项目，若项目中重新选配模板将使用最新的模板数据" type="success" :closable="false" />
      <el-table :data="tableData" v-loading="loading" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="mini">
        <el-table-column prop="templateName" label="模板名称" />
        <el-table-column label="模板类型">
          <template slot-scope="scope">
            <span v-show="scope.row.type == 0">任务模板</span>
          </template>
        </el-table-column>
        <el-table-column prop="lastEditTime" label="最后操作时间" />
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">启用</span>
            <span v-else style="color:red;">未启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)">修改</el-button>
            <el-button type="text" @click="handleManagement(scope.row)">管理任务</el-button>
            <el-button type="text" v-show="scope.row.status == 1" @click="handleStart(scope.row)">启用</el-button>
            <el-button type="text" v-show="scope.row.status == 0" @click="handleStop(scope.row)" style="color:red;">停用</el-button>
            <el-button type="text" style="color:red;" @click="handleRemove(scope.row)">删除</el-button>
          </template>
        </el-table-column> 
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </el-card>

    <!-- 创建模板 -->
    <el-dialog title="创建模板" :visible.sync="createDialogVisible" :close-on-click-modal="false" width="40%" @close="clear">
      <div style="padding:10px 20px;">
        <el-form ref="createRef" :model="createInfo" :rules="rules" label-width="80px" size="mini">
          <el-form-item label="模板名称" prop="templateName">
            <el-input v-model="createInfo.templateName"></el-input>
          </el-form-item>
          <el-form-item label="模板类型" prop="type">
            <el-select v-model="createInfo.type" placeholder="请选择" class="width100">
              <el-option label="任务模板" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleCreateTask" size="small">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改模板 -->
    <el-dialog title="修改模板" :visible.sync="editDialogVisible" :close-on-click-modal="false" width="40%">
      <div style="padding:10px 20px;">
        <el-form ref="editRef" :model="editInfo" :rules="rules" label-width="80px" size="mini">
          <el-form-item label="模板名称" prop="templateName">
            <el-input v-model="editInfo.templateName"></el-input>
          </el-form-item>
          <el-form-item label="模板类型" prop="type">
            <el-select v-model="editInfo.type" placeholder="请选择" class="width100">
              <el-option label="任务模板" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleEditTask" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList, addOrUpdateOne, deleteOne } from '@/api/integrated'
import _ from 'lodash'
export default {
  name: 'Task',
  data () {
    return {
      tableInfo: {
        templateName: '',
        pageIndex: 0,
        pageSize: 10
      },
      tableData: [],
      loading: true,
      total: 0,
      // 创建模板
      createDialogVisible: false,
      createInfo: {
        templateName: undefined,
        type: undefined
      },
      rules: {
        templateName: [
          { required: true, message: '请输入模板名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        type: [{ required: true, message: '请选择模板类型', trigger: 'change' }]
      },
      // 修改模板
      editDialogVisible: false,
      editInfo: {
        id: undefined,
        templateName: undefined,
        type: undefined
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 获取任务模板列表
    getList () {
      getList( this.tableInfo ).then( res => {
        // console.log(res)
        const { records, total } = res.data
        this.tableData = records
        this.total = total 
        this.loading = false
      })
    },

    // 创建模板
    handleCreate () {
      this.createInfo = {
        templateName: undefined,
        type: undefined
      }
      this.createDialogVisible = true
    },
    handleCreateTask () {
      this.$refs.createRef.validate( valid => {
        if ( valid ) {
          addOrUpdateOne( this.createInfo ).then( res => {
            this.$message.success(res.msg)
            this.getList()
            this.createDialogVisible = false
          })
        }
      })
    },
    clear () {
      this.$refs.createRef.resetFields()
    },
    // 修改模板
    handleEdit ( row ) {
      this.editInfo = _.cloneDeep( row )
      this.editDialogVisible = true
    },
    handleEditTask () {
      this.$refs.editRef.validate( valid => {
        if ( valid ) {
          addOrUpdateOne( this.editInfo ).then( res => {
            this.$message.success(res.msg)
            this.getList()
            this.editDialogVisible = false
          })
        }
      })
    },

    // 管理任务
    handleManagement ( row ) {
      this.$router.push({ name: 'TaskDetail', query: { templateId: row.id } })
    },

    // 是否启用
    handleStart ( row ) {
      this.$confirm('是否启用模板?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          row.status = 0
          addOrUpdateOne(row).then( res => {
            this.$message.success('模板启用成功')
            this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })      
        })
    },
    // 是否停用
    handleStop ( row ) {
      this.$confirm('是否停用模板?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        row.status = 1
        addOrUpdateOne(row).then( res => {
          this.$message.success('模板停用成功')
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })      
      })
    },

    // 删除模板
    handleRemove ( row ) {
      this.$confirm('删除模板后，任务将无法找回，是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteOne({ id: row.id }).then( res => {
          this.$message.success(res.msg)
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })      
      })
    },

    // 表dan查询
    handleQuery () {
      this.tableInfo.pageIndex = 0
      this.$refs.pagination.resetOption( this.tableInfo.pageIndex, this.tableInfo.pageSize )
      this.getList()
    },
    // 表dan重置
    reset () {
      this.tableInfo = {
        templateName: '',
        pageIndex: 0,
        pageSize: 10
      }
      this.$refs.pagination.resetOption( this.tableInfo.pageIndex, this.tableInfo.pageSize )
      this.getList()
    },

    handleSizeChange ( val ) {
      this.tableInfo.pageSize = val
      this.getList()
    },
    handleCurrentChange ( val ) {
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
  .el-alert {
    margin-bottom: 20px;
  }
</style>