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
            <el-input v-model="tableInfo.projectName" placeholder="项目名称查询" clearable />
          </el-form-item>
          <el-form-item>
            <el-input v-model="tableInfo.companyName" placeholder="业主名称查询" clearable />
          </el-form-item>
          <el-form-item>
            <el-select v-model="tableInfo.setProjectStatus" clearable placeholder="全部状态">
              <el-option label="未完善" :value="0"></el-option>
              <el-option label="已完善" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="tableInfo.firstExamine" clearable placeholder="全部进度">
              <el-option
                v-for="item in option"
                :key="item.firstExamine"
                :label="item.label"
                :value="item.firstExamine">
              </el-option>
            </el-select>
           </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleQuery" icon="el-icon-search">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-button type="primary" @click="create" size="mini" icon="el-icon-plus">创建项目表单</el-button>
        </div>
      </div>
      <el-table :data="tableData" v-loading="loading" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="mini">
        <el-table-column prop="projectName" label="项目名称" />
        <el-table-column prop="companyName" label="业主名称" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="建站地址">
          <template slot-scope="scope">
            {{scope.row.province}} - {{scope.row.city}}
          </template>
        </el-table-column>
        <el-table-column label="发起进度">
          <template slot-scope="scope">
            <span v-if="scope.row.companyInfoStatus == 1 && scope.row.companyBuildStatus == 1 && scope.row.cooperateStatus == 1 && scope.row.powerStatus == 1 && scope.row.relevantStatus == 1" style="color:#70B603;">已完善</span>
            <span v-else>未完善</span>
          </template>
        </el-table-column>
        <el-table-column label="审批状态">
          <template slot-scope="scope">
            <span v-if="scope.row.firstExamine == 0">待提交</span>
            <span v-else-if="scope.row.firstExamine == 1" style="color:#F59A23;">审核中</span>
            <span v-else-if="scope.row.firstExamine == 3" style="color:#1890FF;">初审通过</span>
            <span v-else-if="scope.row.firstExamine == 2" style="color:#D9001B;">初审未通过</span>
            <span v-else-if="scope.row.firstExamine == 99">项目已终止</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <el-button type="text" @click="handleView(scope.row)">查看</el-button>
            <el-button type="text" @click="approval(scope.row.projectId)">审批记录</el-button>
          </template>
        </el-table-column> 
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </el-card>
    <!-- 创建项目表单 -->
    <el-dialog
      title="创建项目表单"
      :visible.sync="dialogVisible"
      width="40%"
      :close-on-click-modal="false"
      @close="colseDialog">
      <div style="position: relative;">
        <el-alert
          title="请在搜索结果中选择匹配的公司名称，且创建表单后将无法修改，请认真核对 !"
          type="success"
          :closable="false">
        </el-alert>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" style="width:80%;margin:auto;" size="mini">
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="ruleForm.projectName" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="公司名称" prop="companyName">
            <el-input v-model.trim="ruleForm.companyName" placeholder="请输入" clearable @input="handleInput" @clear="handleClear" />
          </el-form-item>
        </el-form>
        <div class="divul" v-show="options.length">
          <ul v-show="options.length" style="list-style: none;">
            <li v-for="(item, index) in options" :key="item.id" class="divli" 
              :class="{bgc: index === currentIndex}" 
              @click="handleSelect(item, index)"
              @mousemove="handleMove(index)">
                {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="createProject" :loading="loading" size="mini">创 建</el-button>
      </span>
    </el-dialog>
    <!-- 审批记录 -->
    <ApprovalLog :logVisible.sync="logVisible" :activities="activities" />
  </div>
</template>

<script>
import { getList, addOne, getCompanyInfoList, getProjectExamineLog } from '@/api/listProject'

import ApprovalLog from '@/components/Log/ApprovalLog.vue'

export default {
  name: 'Launch',
  data() {
    return {
      tableInfo: {
        companyName: '',
        projectName: '',
        firstExamine: '',
        type: 0,
        setProjectStatus: '',
        pageIndex: 1,
        pageSize: 10
      },
      option: [
        {
          firstExamine: '0',
          label: '待提交'
        }, 
        {
          firstExamine: '1',
          label: '审核中'
        }, 
        {
          firstExamine: '3',
          label: '审核通过'
        }, 
        {
          firstExamine: '2',
          label: '审核未通过'
        }, 
        {
          firstExamine: '99',
          label: '项目已终止'
        }
      ],
      tableData: [],
      loading: true,
      total: 0,

      // 创建项目表单
      dialogVisible: false,
      options: [], // 搜索公司列表
      optionss: [], //
      ruleForm: {
        projectName: '',
        companyName: '',
        legalPerson: '',
        registerMoney: '',
        sameCreditCode: ''
      },
      rules: {
        projectName: [
            { required: true, message: '请输入项目名称', trigger: 'blur' },
            { min: 4, max: 50, message: '长度在 4 到 50 个字符', trigger: 'blur' }
          ],
        companyName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
          { min: 6, max: 50, message: '长度在 6 到 50 个字符', trigger: 'blur' }
        ]
      },
      currentIndex: null,
      loading: false,

      // 审批记录
      logVisible: false,
      activities: []
    }
  },
  components: { ApprovalLog },
  created() {
    this.getList()
  },
  methods: {
    // 列表请求
    getList() {
      getList(this.tableInfo).then(res => {
        const { records, total } = res.data
        this.tableData = records
        this.total = total
        this.loading = false
      })
    },
    // 表dan查询
    handleQuery() {
      this.tableInfo.pageIndex = 1
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.getList()
    },
    // 表dan重置
    reset() {
      this.tableInfo = {
        companyName: '',
        projectName: '',
        firstExamine: '',
        setProjectStatus: '',
        type: 0,
        pageIndex: 1,
        pageSize: 10
      }
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.getList()
    },

    // 查看详情
    handleView(row) {
      this.$router.push({ name: 'LaunchDetail', query: { 
          projectId: row.projectId,
          createTime: row.createTime,
          createUserNickName: row.createUserNickName,
          createUserPhone: row.createUserPhone,
          projectName: row.projectName,
          companyName: row.companyName,
          firstExamine: row.firstExamine
        }
      })
    },
    
    // 审批记录
    approval(projectId) {
      getProjectExamineLog({projectId}).then(res => {
        this.activities = res.data
      })
      this.logVisible = true
    },

    handleSizeChange(val) {
      this.tableInfo.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.tableInfo.pageIndex = val
      this.getList()
    },

    // 创建项目表
    create() {
      this.dialogVisible = true
    },
    handleInput() {
      if( this.ruleForm.companyName.length > 5 ) {
        setTimeout(() => {
          getCompanyInfoList(this.ruleForm).then(res => {
            this.options = res.data
            this.optionss = res.data
          })
        }, 300)
      } else {
        this.options = []
        this.optionss = []
      }
    },
    handleSelect(item) {
      this.ruleForm.companyName = item.name
      this.ruleForm.legalPerson = item.legalPersonName
      this.ruleForm.registerMoney = item.regCapital
      this.ruleForm.sameCreditCode = item.creditCode
      this.options = []
    },
    createProject() { // 创建项目
      this.$refs.ruleForm.validate(valid => {
        if(valid) {
          const result = this.optionss.find(item => {
            return item.name === this.ruleForm.companyName
          })
          if(result == undefined || this.options.length > 0) {
            this.$message.error('必须选择一项才能进行下一步操作')
            return
          } else {
            addOne(this.ruleForm).then(res => {
              this.$message.success('创建项目表单成功')
              this.$router.push({ name: 'LaunchDetail', query: { 
                projectId: res.data.projectId,
                createTime: res.data.createTime,
                createUserNickName: res.data.createUserNickName,
                createUserPhone: res.data.createUserPhone,
                projectName: res.data.projectName,
                companyName: res.data.companyName
                }
              })
            }).catch(err => err)
          }
        }
      })
    },
    colseDialog() {
      this.ruleForm = {
        projectName: '',
        companyName: '',
        legalPerson: '',
        registerMoney: '',
        sameCreditCode: ''
      }
      this.options = []
      this.optionss = []
      this.$refs.ruleForm.resetFields()
    },
    handleClear() {
      this.ruleForm.companyName = ''
      this.options = []
    },
    handleMove(index) {
      this.currentIndex = index
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
    margin-bottom: 15px;
  }
  .divul {
    max-width: 600px;
    min-width: 350px;
    list-style: none;
    background-color: #fff;
    position: absolute;
    top: 170px;
    left: 153px;
    border:1px solid #DCDFE6;
    border-radius: 5px;
    overflow: auto;
  }
  .divli {
    margin-bottom: 10px;
    cursor: pointer;
    width: 100%;
  }
  .bgc:hover {
    color: blue;
  }
</style>