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
            <el-input v-model="tableInfo.roleName" placeholder="角色名称查询" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleQuery" icon="el-icon-search">查 询</el-button>
            <el-button @click="reset">重 置</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-button type="primary" @click="create" size="mini" icon="el-icon-plus">创建角色</el-button>
        </div>
      </div>
      <el-table :data="tableData" v-loading="loading" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="mini">
        <el-table-column prop="roleName" label="角色名称" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text"  @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" style="color:red;" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column> 
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </el-card>
  </div>
</template>

<script>
import { roleList, deleteRole } from '@/api/integrated'

export default {
  name: 'Role',
  data() {
    return {
      tableInfo: {
        roleName: '',
        id: '',
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      loading: true,
      total: 0,
      rules: {
        projectName: [
            { required: true, message: '请输入项目名称', trigger: 'blur' },
            { min: 4, max: 50, message: '长度在 4 到 50 个字符', trigger: 'blur' }
          ],
        companyName: [
          { required: true, message: '请输入业主名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ]
      },
    }
  },
  created() {
    this.roleList()
  },
  methods: {
    // 列表请求
    roleList() {
      roleList(this.tableInfo).then(res => {
        const { records, total } = res.data
        this.tableData = records
        this.total = total
        this.loading = false
      })
    },
    create() {
      this.$router.push({name: 'RoleDetail'})
    },
    // 查看，编辑
    handleEdit(row) {
      this.$router.push({
        name: 'RoleDetail',
        query: {
          id: row.id
        }
      })
    },
    // 删除
    handleDelete(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteRole({ id }).then(res => {
            if(res.code == 0){
              this.$message.success('删除成功')
              this.roleList()
            } else {
              this.$message.error(res.msg)
              this.roleList()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })          
        })
    },
    // 表dan查询
    handleQuery() {
      this.tableInfo.pageIndex = 1
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.roleList()
    },
    // 表dan重置
    reset() {
      this.tableInfo = {
        roleName: '',
        id: '',
        pageIndex: 1,
        pageSize: 10
      }
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.roleList()
    },
    
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.tableInfo.pageSize = val
      this.roleList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.tableInfo.pageIndex = val
      this.roleList()
    },
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
    margin-bottom: 25px;
  }
</style>