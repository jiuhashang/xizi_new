<template>
  <div>
    <!-- mianbaoxie -->
    <Bread />
    <!-- 搜索区域 -->
    <el-card>
      <div style="display:flex;justify-content:space-between;">
        <span style="font-weight:800;font-size:13px;">搜索查询</span>
        <i :class="isShow ? 'el-icon-caret-top' : 'el-icon-caret-bottom'" @click="handleShow" style="font-size:20px;color:#409eff;cursor:pointer;"></i>
      </div>
      <div v-show="isShow" style="margin-top:20px;">
        <el-form ref="form" :model="tableInfo" label-width="80px" size="mini">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="项目名称">
                <el-input v-model="tableInfo.projectName" placeholder="项目名称查询" clearable style="width:60%;" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参与人员">
                <el-input v-model="tableInfo.nickName" placeholder="参与人员查询" clearable style="width:60%;" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="计划开始">
                <el-col :span="11" style="padding-left:0px !important;">
                  <el-date-picker type="date" placeholder="起始日期" v-model="tableInfo.startTimeFrom" value-format="yyyy-MM-dd" style="width: 100%;" />
                </el-col>
                <el-col :span="2">
                  <span>-</span>
                </el-col>
                <el-col :span="11" style="padding-left:0px !important;">
                  <el-date-picker type="date" placeholder="截止日期" v-model="tableInfo.startTimeTo" value-format="yyyy-MM-dd" style="width: 100%;" />
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="4">
              <el-form-item label="计划结束">
                <el-col :span="11" style="padding-left:0px !important;">
                  <el-date-picker type="date" placeholder="起始日期" v-model="tableInfo.endTimeFrom" value-format="yyyy-MM-dd" style="width: 100%;" />
                </el-col>
                <el-col :span="2">
                  <span>-</span>
                </el-col>
                <el-col :span="11" style="padding-left:0px !important;">
                  <el-date-picker type="date" placeholder="截止日期" v-model="tableInfo.endTimeTo" value-format="yyyy-MM-dd" style="width: 100%;" />
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="项目来源">
                <el-radio-group v-model="tableInfo.projectSource" size="mini">
                  <el-radio-button :label="null">全部</el-radio-button>
                  <el-radio-button :label="0">自主投资</el-radio-button>
                  <el-radio-button :label="1">EPC项目</el-radio-button>
                  <el-radio-button :label="9">其他项目</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="项目类型">
                <el-radio-group v-model="tableInfo.projectType" size="mini">
                  <el-radio-button :label="null">全部</el-radio-button>
                  <el-radio-button :label="0">分布式</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="项目状态">
                <el-radio-group v-model="tableInfo.status" size="mini">
                  <el-radio-button :label="null">全部</el-radio-button>
                  <el-radio-button :label="0">未开始</el-radio-button>
                  <el-radio-button :label="1">进行中</el-radio-button>
                  <el-radio-button :label="2">已暂停</el-radio-button>
                  <el-radio-button :label="3">已结项</el-radio-button>
                  <el-radio-button :label="4">已终止</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否超期">
                <el-radio-group v-model="tableInfo.timeLimitFlag" size="mini">
                  <el-radio-button :label="null">全部</el-radio-button>
                  <el-radio-button :label="0">未超期</el-radio-button>
                  <el-radio-button :label="2">已超期</el-radio-button>
                  <el-radio-button :label="1">临期</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="紧急程度">
                <el-radio-group v-model="tableInfo.urgentLevel" size="mini">
                  <el-radio-button :label="null">全部</el-radio-button>
                  <el-radio-button :label="0">一般</el-radio-button>
                  <el-radio-button :label="1">紧急</el-radio-button>
                  <el-radio-button :label="2">非常紧急</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="优先级别">
                <el-radio-group v-model="tableInfo.firstLevel" size="mini">
                  <el-radio-button :label="null">全部</el-radio-button>
                  <el-radio-button :label="2">高</el-radio-button>
                  <el-radio-button :label="1">中</el-radio-button>
                  <el-radio-button :label="0">低</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="里程碑">
                <el-radio-group v-model="tableInfo.selfAccessProgress" size="mini">
                  <el-radio-button :label="null">全部</el-radio-button>
                  <el-radio-button :label="0">起始阶段</el-radio-button>
                  <el-radio-button :label="1">接入方案</el-radio-button>
                  <el-radio-button :label="2">初设完成</el-radio-button>
                  <el-radio-button :label="3">施工进场</el-radio-button>
                  <el-radio-button :label="4">并网完成</el-radio-button>
                  <el-radio-button :label="5">竣工验收</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <div style="text-align:right;">
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">查 询</el-button>
              <el-button size="mini" @click="reset">重 置</el-button>
          </div>
        </el-form>
      </div>
    </el-card>
    <!-- 列表 -->
    <el-card>
      <div slot="header">
        <span style="font-weight:800;font-size:13px;">项目列表</span>
        <el-button type="primary" size="mini" style="float: right;" @click="handleRegister">立项登记</el-button>
      </div>
      <div>
        <div v-if="list.length" >
          <div class="content" @click="handleDetail(item.id)" v-for="item in list" :key="item.id">
            <div class="top">
              <span style="font-weight:800;">{{ item.projectName }}</span>
              <div>
                <span v-if="item.startTime !== null" style="margin-right:20px;">{{ item.startTime }} 至 {{ item.endTime }}</span>
                <span v-else style="margin-right:20px;">暂定</span>

                <el-button round size="mini" v-if="item.timeLimitFlag == 0">未超期</el-button>
                <el-button round size="mini" v-else-if="item.timeLimitFlag == 1">临期</el-button>
                <el-button round size="mini" v-else-if="item.timeLimitFlag == 2">已过期</el-button>
                <el-button round size="mini" v-else>  无  </el-button>
                
                <el-button type="primary" round size="mini" v-if="item.status == 0">未开始</el-button>
                <el-button type="primary" round size="mini" v-else-if="item.status == 1">进行中</el-button>
                <el-button type="primary" round size="mini" v-else-if="item.status == 2">已暂停</el-button>
                <el-button type="primary" round size="mini" v-else-if="item.status == 3">已结项</el-button>
                <el-button type="primary" round size="mini" v-else>已终止</el-button>
              </div>
            </div>
            <div class="bottom">
              <el-row :gutter="20" class="mb10" style="padding-left:25px;">
                <el-col :span="4">
                  <span class="mr10">项目来源</span>
                  <span v-show="item.projectSource == 0">自主投资</span>
                  <span v-show="item.projectSource == 1">EPC项目</span>
                  <span v-show="item.projectSource == 9">其他项目</span>
                </el-col>
                <el-col :span="4">
                  <span class="mr10">优先级别</span>
                  <span v-show="item.firstLevel == 0">低</span>
                  <span v-show="item.firstLevel == 1">中</span>
                  <span v-show="item.firstLevel == 2">高</span>
                </el-col>
                <el-col :span="4">
                  <span class="mr10">项目经理</span>
                  <span>{{ item.nickName ? item.nickName : '-' }}</span>
                </el-col>
                <el-col :span="4">
                  <span class="mr10">主要任务</span>
                  <span v-if="item.taskWornImportant == 0" class="el-icon-success" style="color: green;font-size:14px;"></span>
                  <span v-else class="el-icon-warning" style="color:red;font-size:14px;"></span>
                </el-col>
                <el-col :span="8">
                  <span style="margin-left: 70px;margin-right:10px;">时间进度</span>
                  <el-progress :percentage="item.timeProgress" style="width:60%;margin-top:2px;" v-if="item.timeProgress !== null" />
                  <span v-else>-</span>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="padding-left:25px;">
                <el-col :span="4">
                  <span class="mr10">项目类型</span>
                  <span v-show="item.projectType == 0">分布式项目</span>
                </el-col>
                <el-col :span="4">
                  <span class="mr10">紧急程度</span>
                  <span v-show="item.urgentLevel == 0">一般</span>
                  <span v-show="item.urgentLevel == 1">紧急</span>
                  <span v-show="item.urgentLevel == 2">非常紧急</span>
                </el-col>
                <el-col :span="4">
                  <span class="mr10" style="margin-right:32px;">里程碑</span>
                  <span v-show="item.selfAccessProgress == 0">起始阶段</span>
                  <span v-show="item.selfAccessProgress == 1">接入方案</span>
                  <span v-show="item.selfAccessProgress == 2">初设完成</span>
                  <span v-show="item.selfAccessProgress == 3">施工进场</span>
                  <span v-show="item.selfAccessProgress == 4">并网完成</span>
                  <span v-show="item.selfAccessProgress == 5">竣工验收</span>
                </el-col>
                <el-col :span="4">
                  <span class="mr10">一般任务</span>
                  <span v-if="item.taskWornUsual == 0" class="el-icon-success" style="color: green;font-size:14px;"></span>
                  <span v-else class="el-icon-warning" style="color:red;font-size:14px;"></span>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div v-else style="text-align:center;margin-top:20px;font-size:12px;">
          <span>暂无数据</span>
        </div>
        
        <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
      </div>
    </el-card>
  </div>
</template>

<script>
import { getList } from '@/api/epc'
export default {
  name: 'All',
  data() {
    return {
      tableInfo: {
        type: 0,
        projectName: undefined,
        nickName: undefined,
        startTimeFrom: undefined,
        startTimeTo: undefined,
        endTimeFrom: undefined,
        endTimeTo: undefined,
        projectSource: null,
        projectType: null,
        status: null,
        timeLimitFlag: null,
        urgentLevel: null,
        firstLevel: null,
        selfAccessProgress: null,
        pageIndex: 0,
        pageSize: 10
      },
      isShow: false,
      form: {},
      list: [],
      loading: true,
      total: 0
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      getList( this.tableInfo ).then( res => {
        const { records, total } = res.data
        this.list = records
        this.total = total
        this.loading = false
      })
    },
    handleQuery () {
      this.getList()
    },
    reset () {
      this.tableInfo = {
        type: 0,
        projectName: undefined,
        nickName: undefined,
        startTimeFrom: undefined,
        startTimeTo: undefined,
        endTimeFrom: undefined,
        endTimeTo: undefined,
        projectSource: null,
        projectType: null,
        status: null,
        timeLimitFlag: null,
        urgentLevel: null,
        firstLevel: null,
        selfAccessProgress: null,
        pageIndex: 0,
        pageSize: 10
      }
      this.getList()
    },
    handleShow () {
      this.isShow = !this.isShow
    },
    handleRegister () {
      this.$router.push({ name: 'Register' })
    },
    handleDetail ( id ) {
      this.$router.push({ name: 'Detail', query: { id } })
    },
    handleSizeChange ( val ) {
      this.tableInfo.pageSize = val
      this.getList()
    },
    handleCurrentChange ( val ) {
      this.tableInfo.pageIndex = val
      this.getList()
    }
  },
};
</script>

<style lang="scss" scoped>
.content {
  margin-bottom: 15px;
  font-size: 12px;
  border: 1px solid #DCDFE6;
  &:hover {
    // border-color: black;
    cursor: pointer;
    border-radius: 3px;
    box-shadow: 0px 0px 5px 5px #aaa;
    }
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    padding: 5px 15px;
    span {
      padding-left: 10px;
    }
  }
  .bottom {
    border-top: 1px solid #DCDFE6;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    padding: 15px 0;
  }
}
.mr10 {
  margin-right: 20px;
  color: #aaa;
}
.mb10 {
  margin-bottom: 10px;
}
/deep/ .el-form-item__label {
  font-size: 12px;
}
/deep/ .el-progress__text {
  margin-top: -2px;
}
.el-progress {
  display: inline-block;
}
</style>