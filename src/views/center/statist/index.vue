<template>
  <div>
    <div class="shang">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{ $route.matched[1].meta.title }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <h3>{{ $route.meta.title }}</h3>
    </div>
    <div class="alert">
      <span @click="handleDetail">点击此处查看搜索规则与数据统计规则</span>
    </div>
    <el-card>
      <div style="display:flex;justify-content:space-between;">
        <el-form ref="ruleForm" :model="tableInfo" inline size="mini">
          <el-form-item>
            <el-input v-model="tableInfo.userName" placeholder="账号持有人查询" clearable />
          </el-form-item>
          <el-form-item>
            <el-select v-model="company" @change="handleChange" clearable placeholder="全部公司">
              <el-option
                v-for="item in options"
                :key="item.companyId"
                :label="item.companyName"
                :value="item.companyId" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="timedate"
              type="daterange"
              align="right"
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
            <el-button type="primary" @click="handleQuery" icon="el-icon-search">查询</el-button>
            <el-button @click="reset">重 置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="center" v-loading="loading">
        <div style="background:#E87E04;margin-left:0;">
          <h3>发起项目</h3>
          <h3>{{ totalUserProjectCountModel.creatNum }}</h3>
        </div>
        <div style="background:#3598DC;">
          <h3>提交审核</h3>
          <h3>{{ totalUserProjectCountModel.commitNum }}</h3>
        </div>
        <div style="background:#5C9BD1;">
          <h3>初审通过</h3>
          <h3>{{ totalUserProjectCountModel.firstExamineNum }}</h3>
        </div>
        <div style="background:#4B77BE;">
          <h3>终审通过</h3>
          <h3>{{ totalUserProjectCountModel.endExamineNum }}</h3>
        </div>
        <div style="background:#36D7B7;">
          <h3>目前已初审通过</h3>
          <h3>{{ totalUserProjectCountModel.firstExamineNow }}</h3>
        </div>
        <div style="background:#26C281;">
          <h3>目前已终审通过</h3>
          <h3>{{ totalUserProjectCountModel.endExamineNow }}</h3>
        </div>
        <div style="background:#22313F;">
          <h3>目前已终止</h3>
          <h3>{{ totalUserProjectCountModel.stopProjectNow }}</h3>
        </div>
      </div>
      <el-table :data="tableData" v-loading="loading" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="mini">
        <el-table-column prop="nickName" label="负责人" />
        <el-table-column prop="companyName" label="所属公司" />
        <el-table-column prop="creatNum" sortable label="发起项目" />
        <el-table-column prop="commitNum" sortable label="提交审核" />
        <el-table-column prop="firstExamineNum" sortable label="初审通过" />
        <el-table-column prop="endExamineNum" sortable label="终审通过" />
        <el-table-column prop="firstExamineNow" sortable label="目前已初审通过" />
        <el-table-column prop="endExamineNow" sortable label="目前已终审通过" />
        <el-table-column prop="stopProjectNow" sortable label="目前已终止" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleView(scope.row)">项目明细</el-button>
          </template>
        </el-table-column>
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </el-card>
    <el-dialog title="规则说明" :visible.sync="dialogVisible" :close-on-click-modal="false" width="45%">
      <p style="font-size:12px;">
        项目统计显示每位负责人的项目录入与被审核的情况，列表中各数据信息规则如下：<br/><br/>
        1、发起项目：表示这段时间内该用户创建的项目数量<br/>
        2、提交审核：示这段时间内该用户提交审核的项目数量，驳回后再次提交不重复记录<br/>
        3、初审通过：表示这段时间内该用户的项目被初审通过的项目数量，驳回后再次提交不重复记录<br/>
        4、终审通过：表示这段时间内该用户的项目被终审通过的项目数量，驳回后再次提交不重复记录<br/>
        5、目前已初审通过：表示所选时间内创建的项目到目前已初审通过的数量，记录最新状态<br/>
        6、目前已终审通过：表示所选时间内创建的项目到目前已初审通过的数量，记录最新状态<br/>
        7、目前已终止：表示所选时间内创建的项目到目前已被终止的数量，记录最新状态<br/><br/>
        如：王某一共负责20个项目，搜索日期为设定为：2021年12月1日-2021年12月31日，那么：<br/>
        1、搜索日期内，王某发起了10个项目<br/>
        2、王某全部负责的20个项目在搜索日期内提交审核、初审通过、终审通过的数量<br/>
        3、搜索时间内发起的10个项目，到目前已初审通过、已终审通过、已终止的数量<br/>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false" size="small">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserProjectCount, getCompanyList } from '@/api/center'

export default {
  name: 'Statist',
  data() {
    return {
      tableInfo: {
        userName: '',
        companyId: '',
        startDate: null,
        endDate: null,
        rootFlag: '',
        pageIndex: 1,
        pageSize: 10
      },
      company: '',
      options: [],
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
      timedate: '',
      totalUserProjectCountModel: {},
      tableData: [],
      loading: true,
      total: 0,

      dialogVisible: false,
      rootFlag: window.sessionStorage.getItem('rootFlag')
    }
  },
  created() {
    this.tableInfo.rootFlag = parseInt(window.sessionStorage.getItem('rootFlag'))
    this.getCompanyList()
    this.getUserProjectCount()
  },
  methods: {
    getUserProjectCount() {
      getUserProjectCount( this.tableInfo ).then(res => {
        // console.log(res)
        this.totalUserProjectCountModel = res.data.totalUserProjectCountModel
        this.tableData = res.data.userProjectCountModelPage.records
        this.total = res.data.userProjectCountModelPage.total
        this.loading = false
      })
    },
    getCompanyList() {
      getCompanyList({ rootFlag: this.rootFlag }).then(res => {
        this.options = res.data
      })
    },
    handleChange(val) {
      this.tableInfo.companyId = val
    },
    handleTimeChange(val) {
      if(val == null) {
        this.tableInfo.startDate = null
        this.tableInfo.endDate = null
      } else {
        this.tableInfo.startDate = val[0]
        this.tableInfo.endDate = val[1]
      }
    },
    // 表dan查询
    handleQuery() {
      this.tableInfo.pageIndex = 1
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.getUserProjectCount()
    },
    // 表dan重置
    reset() {
      this.tableInfo = {
        userName: '',
        companyId: '',
        startDate: null,
        endDate: null,
        rootFlag: window.sessionStorage.getItem('rootFlag'),
        pageIndex: 1,
        pageSize: 10
      }
      this.timedate = ''
      this.company = ''
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.getUserProjectCount()
    },

    // 查看详情
    handleView(row) {
      console.log(row)
      this.$router.push({ name: 'StatistDetail', query: { 
          userName: row.userName,
          companyName: row.companyName,
          nickName: row.nickName,
          userId: row.id
        }
      })
    },
    handleDetail() {
      this.dialogVisible = true
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.tableInfo.pageSize = val
      this.getUserProjectCount()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.tableInfo.pageIndex = val
      this.getUserProjectCount()
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
  .alert {
    padding: 5px 10px;
    margin: 20px;
    background: rgba(0, 193, 222, 0.1);
    border: 1px solid rgb(0, 193, 222);
    span {
      color: rgb(0, 193, 222);
      text-decoration:underline;
      cursor: pointer;
    }
  }
  .center {
    display: flex;
    margin-bottom: 15px;
    div {
      margin-left: 15px;
      flex: 1;
      text-align: center;
      color: #fff;
    }
  }
</style>