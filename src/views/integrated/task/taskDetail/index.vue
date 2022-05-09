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
      <!-- <el-alert title="可通过拖拽方式调整任务排序，每个模板必须同时包含主要节点，若有主要节点缺失会导致项目进度无法正确显示" type="success" :closable="false" /> -->
      <div style="text-align:right;">
        <el-button type="primary" size="mini" @click="handleAddOne">添加一级任务</el-button>
        <el-button type="primary" size="mini" @click="handleAddTwo">添加二级任务</el-button>
      </div>
      <el-table :data="tableData" v-loading="loading" row-key="id" default-expand-all :tree-props="{children: 'seEpcProjectTemplateTaskInfoList', hasChildren: 'hasChildren'}" stripe style="margin-top:15px;" :header-cell-style="{background:'#f2f2f2',color:'#555'}" size="mini">
        <el-table-column prop="taskName" label="任务名称" />
        <el-table-column prop="sortNum" label="排序" />
        <el-table-column label="任务级别">
          <template slot-scope="scope">
            <span v-if="scope.row.wornFlag == 1">主要任务</span>
            <span v-else>一般任务</span>
          </template>
        </el-table-column>
        <el-table-column prop="useDay" label="默认工期" />
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" style="color:red;" @click="handleRemoveAddOne(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加/编辑一级任务 -->
    <el-dialog :title="title" :visible.sync="oneAddDialogVisible" width="40%" @close="clear('AddOneRef')">
      <el-form :model="oneForm" :rules="oneRules" ref="AddOneRef" label-width="80px" size="mini" class="width95">
        <el-form-item label="任务名称" prop="taskName">
          <el-input v-model="oneForm.taskName" clearable />
        </el-form-item>
        <el-form-item label="排序" prop="sortNum">
          <el-input type="number" v-model.number="oneForm.sortNum" clearable />
        </el-form-item>
        <el-form-item label="任务级别" prop="wornFlag">
          <el-select v-model="oneForm.wornFlag" placeholder="请选择" class="width100">
            <el-option label="主要任务" :value="1"></el-option>
            <el-option label="一般任务" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="默认工期" prop="useDay">
          <el-input type="number" v-model.number="oneForm.useDay" clearable />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="oneAddDialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleAddOneTask" size="mini">确 定</el-button>
      </span>
    </el-dialog>
    
    <!-- 添加/编辑二级任务 -->
    <el-dialog :title="title" :visible.sync="twoAddDialogVisible" width="40%" @close="clear('AddTwoRef')">
      <el-form :model="twoForm" :rules="twoRules" ref="AddTwoRef" label-width="80px" size="mini" class="width95">
        <el-form-item label="任务名称" prop="taskName">
          <el-input v-model="twoForm.taskName" />
        </el-form-item>
        <el-form-item label="排序" prop="sortNum">
          <el-input type="number" v-model="twoForm.sortNum" clearable />
        </el-form-item>
        <el-form-item label="父级任务" prop="parentId">
          <el-select v-model="twoForm.parentId" placeholder="请选择" class="width100">
            <el-option :label="item.taskName" :value="item.id" v-for="item in parentList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务级别" prop="wornFlag">
          <el-select v-model="twoForm.wornFlag" placeholder="请选择" class="width100">
            <el-option label="主要任务" :value="1"></el-option>
            <el-option label="一般任务" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="默认工期" prop="useDay">
          <el-input type="number" v-model="twoForm.useDay" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="twoAddDialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleAddTwoTask" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllList, addOrUpdateOneTask, deleteTask, getParentList } from '@/api/integrated'
import _ from 'lodash'
export default {
  name: 'TaskDetail',
  data() {
    var check = (rule, value, callback) => {
      const reg = /^([0-9]{1,2}|100)$/
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('限 0 - 100 整数'))
      }
    }
    var checkBai = (rule, value, callback) => {
      const reg = /^([1-9]\d?|100)$/
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('限 1 - 100 整数'))
      }
    }
    return {
      templateId: undefined,
      tableData: [], // 一级任务列表
      loading: true,
      seEpcProjectTemplateTaskInfoList: [],

      // 添加/编辑一级任务
      title: '',

      oneAddDialogVisible: false,
      oneForm: {
        templateId: this.$route.query.templateId,
        parentId: 0,
        taskLevel: 0,
        taskName: undefined,
        sortNum: undefined,
        wornFlag: undefined,
        useDay: undefined
      },
      oneRules: {
        taskName: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        sortNum: [{ required: true, validator: check, trigger: 'blur' }],
        wornFlag: [{ required: true, message: '请选择任务级别', trigger: 'change' }],
        useDay: [{ required: true, validator: checkBai, trigger: 'blur' }]
      },
      oneEditDialogVisible: false,
      // 添加/编辑二级任务
      parentList: [],
      twoAddDialogVisible: false,
      twoForm: {
        templateId: this.$route.query.templateId,
        taskName: undefined,
        parentId: undefined,
        taskLevel: 1,
        sortNum: undefined,
        wornFlag: undefined,
        useDay: undefined
      },
      twoRules: {
        taskName: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        parentId: [{ required: true, message: '请选择父级任务', trigger: 'change' }],
        sortNum: [{ required: true, validator: check, trigger: 'blur' }],
        wornFlag: [{ required: true, message: '请选择任务级别', trigger: 'change' }],
        useDay: [{ required: true, validator: checkBai, trigger: 'blur' }]
      }
    }
  },
  created() {
    this.templateId = this.$route.query.templateId
    this.getList()
  },
  methods: {
    // 获取一二级任务
    getList () {
      let templateId = this.templateId
      getAllList({ templateId }).then( res => {
        this.tableData = res.data
        this.loading = false
      })
    },

    // 添加一级任务
    handleAddOne () {
      this.title = '添加一级任务'
      this.oneAddDialogVisible = true
    },
    handleAddOneTask () {
      this.$refs.AddOneRef.validate( valid => {
        if ( valid ) {
          addOrUpdateOneTask( this.oneForm ).then( res => {
            this.$message.success( res.msg )
            this.getList()
            this.oneAddDialogVisible = false
          })
        }
      })
    },
    handleEdit ( row ) {
      this.title = '编辑任务'
      if ( row.taskLevel == 0 ) {
        this.oneForm = _.cloneDeep( row )
        this.oneForm.seEpcProjectTemplateTaskInfoList = []
        this.oneAddDialogVisible = true
      } else {
        this.twoForm = _.cloneDeep( row )
        this.twoAddDialogVisible = true
      }
    },
    handleEditOneTask () {
      this.$refs.EditOneRef.validate( valid => {
        if ( valid ) {
          addOrUpdateOneTask( this.oneForm ).then( res => {
            this.$message.success( res.msg )
            this.getList()
            this.oneEditDialogVisible = false
          })
        }
      })
    },
    handleRemoveAddOne ( id ) {
      this.$confirm('此操作将永久删除该任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTask({ id }).then( res => {
          this.$message.success(res.msg)
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });         
      })
    },
    // 添加二级任务
    handleAddTwo () {
      this.title = '添加二级任务'
      let templateId = this.templateId
      getParentList({ templateId }).then( res => {
        this.parentList = res.data
      })
      this.twoAddDialogVisible = true
    },
    handleAddTwoTask () {
      this.$refs.AddTwoRef.validate( valid => {
        if ( valid ) {
          addOrUpdateOneTask( this.twoForm ).then( res => {
            this.$message.success( res.msg )
            this.getList()
            this.twoAddDialogVisible = false
          })
        }
      })
    },

    clear ( ref ) {
      this.$refs[ref].resetFields()
      this.oneForm = {
        templateId: this.$route.query.templateId,
        parentId: 0,
        taskLevel: 0,
        taskName: undefined,
        sortNum: undefined,
        wornFlag: undefined,
        useDay: undefined
      }
      this.twoForm = {
        templateId: this.$route.query.templateId,
        taskName: undefined,
        parentId: undefined,
        taskLevel: 1,
        sortNum: undefined,
        wornFlag: undefined,
        useDay: undefined
      }
    },

    handleSizeChange ( val ) {
      this.listInfo.pageSize = val
      this.getList()
    },
    handleCurrentChange ( val ) {
      this.listInfo.pageIndex = val
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
  .back {
    position: relative;
    .btnnn {
      position: absolute;
      bottom: 0;
      right: 15px;
    }
  }
  h3 {
    padding-left: 25px;
    cursor: pointer;
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
