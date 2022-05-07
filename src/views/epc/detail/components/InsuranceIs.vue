<template>
  <!-- 保险情况 -->
  <el-card>
    <div class="top">
      <div>
        <el-form :inline="true" :model="form" size="mini">
          <el-form-item>
            <el-input v-model="tableInfo.safeName" placeholder="保险名称搜索" clearable></el-input>
          </el-form-item>
          <el-form-item >
            <el-select v-model="tableInfo.safeType" placeholder="全部类型">
              <el-option label="项目保险" :value="0"></el-option>
              <el-option label="施工保险" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item >
            <el-select v-model="tableInfo.wornFlag" placeholder="全部提醒状态">
              <el-option label="已开启" :value="1"></el-option>
              <el-option label="已关闭" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item >
            <el-select v-model="tableInfo.status" placeholder="全部保险状态">
              <el-option label="存续期" :value="0"></el-option>
              <el-option label="即将到期" :value="1"></el-option>
              <el-option label="已过期" :value="-1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="handleQuery">查 询</el-button>
            <el-button @click="reset">重 置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-button type="primary" size="mini" @click="handleAdd">添加保险</el-button>
      </div>
    </div>
    <el-alert title="保险临近结束日期7天时将会在项目概况中进行提示，如需关闭提醒，可点击取消提醒或将保险续期" type="success" :closable="false" />
    <el-table :data="tableData" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="mini">
      <el-table-column label="保险名称" prop="safeName" />
      <el-table-column label="保险类型">
        <template slot-scope="scope">
          <span>{{ scope.row.safeType ? '施工保险' : '项目保险' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="保险公司" prop="safeCompany" />
      <el-table-column label="有效开始日期" prop="startTime" />
      <el-table-column label="有效结束日期" prop="endTime" />
      <el-table-column label="提醒状态">
        <template slot-scope="scope">
          <span>{{ scope.row.wornFlag ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="保险状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">续存</span>
          <span v-else-if="scope.row.status == 1">即将过期</span>
          <span v-else>已过期</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button v-if="scope.row.wornFlag == 0" type="text" @click="handleOpen(scope.row)">开启提醒</el-button>
          <el-button v-else type="text" @click="handleClose(scope.row)">关闭提醒</el-button>
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" style="color:red;" @click="handleRemove(scope.row.id)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />

    <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" width="40%" @close="clear">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" size="mini" style="width:95%;">
        <el-form-item label="保险名称" prop="safeName">
          <el-input v-model="ruleForm.safeName" placeholder="请输入保险名称" />
        </el-form-item>
        <el-form-item label="保险类型" prop="safeType">
          <el-select v-model="ruleForm.safeType" placeholder="请选择" class="width100">
            <el-option label="项目保险" :value="0"></el-option>
            <el-option label="施工保险" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="保险公司" prop="safeCompany">
          <el-input v-model="ruleForm.safeCompany" placeholder="请输入保险公司名称" />
        </el-form-item>
        <el-form-item label="有效日期" prop="timedate">
          <el-date-picker
            v-model="ruleForm.timedate"
            type="daterange"
            align="center"
            value-format="yyyy-MM-dd"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="handleTimeChange"
            :picker-options="pickerOptions"
            style="width:100%;"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="add" size="mini">确 定</el-button>
      </span>
    </el-dialog>

  </el-card>
</template>

<script>
import { getSafeInfo, addSafeInfo, deleteSafeInfo, editWornFlag } from '@/api/epc'
import _ from 'lodash'
export default {
  name: 'InsuranceIs',
  props: ['id'],
  data() {
    return {
      tableInfo: {
        projectId: this.id,
        safeName: undefined,
        safeType: undefined,
        wornFlag: undefined,
        status: undefined,
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      total: 0, 

      // 添加
      ruleForm: {
        projectId: this.id,
        safeName: undefined,
        safeType: undefined,
        safeCompany: undefined,
        startTime: undefined,
        endTime: undefined,
        timedate: undefined
      },
      rules: {
        safeName: [
          { required: true, message: '请输入保险名称', trigger: 'blur' },
          { min: 4, max: 50, message: '长度在 4 到 50 个字符', trigger: 'blur' }
        ],
        safeType: [{ required: true, message: '请选择保险类型', trigger: 'change' }],
        safeCompany: [
          { required: true, message: '请输入保险公司名称', trigger: 'blur' },
          { min: 4, max: 50, message: '长度在 4 到 50 个字符', trigger: 'blur' }
        ],
        timedate: [{ required: true, message: '请选择日期', trigger: 'change' }]
      },
      dialogVisible: false,
      title: ''
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      getSafeInfo( this.tableInfo ).then( res => {
        const { records, total } = res.data
        this.tableData = records
        this.total = total
      })
    },
    handleAdd () {
      this.title = '添加保险'
      this.dialogVisible = true 
    },
    handleEdit (row) {
      this.title = '修改保险'
      this.ruleForm = _.cloneDeep(row)
      this.$set(this.ruleForm, 'timedate', [row.startTime, row.endTime])
      this.dialogVisible = true
    },
    add () {
      this.$refs.ruleForm.validate((valid) => {
        if ( valid ) {
          addSafeInfo( this.ruleForm ).then( res => {
            this.$message.success(res.msg)
            this.getList()
            this.dialogVisible = false
          })
        }
      })
    },
    handleOpen (row) {
      this.$confirm('开启提醒吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editWornFlag({ id: row.id, wornFlag: 1 }).then( res => {
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
    handleClose (row) {
      this.$confirm('关闭提醒吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editWornFlag({ id: row.id, wornFlag: 0 }).then( res => {
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
    // 删除
    handleRemove (id) {
      this.$confirm('确定要删除该保险信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSafeInfo({ id }).then( res => {
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
    clear () {
      this.$refs.ruleForm.resetFields()
      this.ruleForm = {
        projectId: this.id,
        safeName: undefined,
        safeType: undefined,
        safeCompany: undefined,
        startTime: undefined,
        endTime: undefined,
        timedate: undefined
      }
    },
    handleTimeChange( val ) {
      if( val == null ) {
        this.ruleForm.startTime = null
        this.ruleForm.endTime = null
      } else {
        this.ruleForm.startTime = val[0]
        this.ruleForm.endTime = val[1]
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
        safeName: undefined,
        safeType: undefined,
        wornFlag: undefined,
        status: undefined,
        pageIndex: 1,
        pageSize: 10
      }
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
  },
};
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
}
.el-alert {
  margin-bottom: 15px;
}
.el-card {
  margin-top: 0;
}
</style>