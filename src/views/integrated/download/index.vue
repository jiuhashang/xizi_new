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
      <el-form ref="ruleForm" :model="tableInfo" inline size="mini">
        <el-form-item>
          <el-input v-model="tableInfo.projectName" placeholder="项目名称查询" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery" icon="el-icon-search">查 询</el-button>
          <el-button @click="reset">重 置</el-button>
        </el-form-item>
      </el-form>
      <el-alert
        title="下载的项目文件，会通过服务器预下载进行管理，方便使用者快速下载，减少因网络问题导致的失败。预下载的文件最多保存7天，超时后将会被清除。"
        type="success"
        :closable="false">
      </el-alert>
      <el-table :data="tableData" v-loading="loading" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="mini">
        <el-table-column prop="fileName" label="项目名称" />
        <el-table-column prop="readyTime" label="完成预下载时间" />
        <el-table-column label="进度">
          <template slot-scope="scope">
            <span v-show="scope.row.status == 0">正在预下载</span>
            <span v-show="scope.row.status == 1">完成预下载</span>
            <span v-show="scope.row.status == 2">下载失败</span>
            <span v-show="scope.row.status == 3">文件过期</span>
          </template>
        </el-table-column>
        <el-table-column label="文件大小">
          <template slot-scope="scope">
            <span v-if="scope.row.fileSize == null"> - </span>
            <span v-else>
              {{ scope.row.fileSize > 0 ? scope.row.fileSize + 'MB' : scope.row.fileSize }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="fileValidityDate" label="存储到期时间" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDown(scope.row.downUrl)" :disabled="!(scope.row.status == 1)">下载</el-button>
            <el-button type="text" style="color:red;" @click="handleRemove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column> 
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </el-card>
  </div>
</template>

<script>
import { selectDownFileList, deleteDownFileList } from '@/api/integrated'

export default {
  name: 'Download',
  data() {
    return {
      tableInfo: {
        projectName: '',
        pageIndex: 0,
        pageSize: 10
      },
      tableData: [],
      loading: true,
      total: 0,
      seProjectDownFileId: []
    }
  },
  created() {
    this.selectDownFileList()
  },
  methods: {
    // 列表请求
    selectDownFileList() {
      selectDownFileList(this.tableInfo).then(res => {
        const { records, total } = res.data
        this.tableData = records
        this.total = total
        this.loading = false
      })
    },
    // 表dan查询
    handleQuery() {
      this.tableInfo.pageIndex = 0
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.selectDownFileList()
    },
    // 表dan重置
    reset() {
      this.tableInfo = {
        projectName: '',
        pageIndex: 0,
        pageSize: 10
      }
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.selectDownFileList()
    },

    handleDown(url) {
      window.open(url)
    },
    
    async handleRemove(id) {
      const confirmResult = await this.$confirm('此操作会永久删除，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消')
      }
      this.seProjectDownFileId.push(id)
      deleteDownFileList( this.seProjectDownFileId ).then(res => {
        this.selectDownFileList()
        this.$message.success(res.msg)
      })
    },

    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.tableInfo.pageSize = val
      this.selectDownFileList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.tableInfo.pageIndex = val
      this.selectDownFileList()
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
    margin-bottom: 20px;
  }
</style>