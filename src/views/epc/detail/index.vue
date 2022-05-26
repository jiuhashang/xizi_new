<template>
  <div>
    <div class="top">
      <div>
        <i class="el-icon-s-promotion" style="color: #1890ff; font-size:20px;"></i>
        <span class="top_title">{{ detailInfo.projectName }}</span>
        <span class="top_title">{{ detailInfo.id }}</span>
        <el-button type="primary" round size="mini" v-if="detailInfo.status == 0">未开始</el-button>
        <el-button type="primary" round size="mini" v-else-if="detailInfo.status == 1">进行中</el-button>
        <el-button type="primary" round size="mini" v-else-if="detailInfo.status == 2">已暂停</el-button>
        <el-button type="primary" round size="mini" v-else-if="detailInfo.status == 3">已结项</el-button>
        <el-button type="primary" round size="mini" v-else>已终止</el-button>

        <el-button type="danger" round size="mini" v-if="detailInfo.firstLevel == 0">低</el-button>
        <el-button type="danger" round size="mini" v-else-if="detailInfo.firstLevel == 1">中</el-button>
        <el-button type="danger" round size="mini" v-else>高</el-button>

        <el-button type="danger" round size="mini" v-if="detailInfo.urgentLevel == 0">一般</el-button>
        <el-button type="danger" round size="mini" v-else-if="detailInfo.urgentLevel == 1">紧急</el-button>
        <el-button type="danger" round size="mini" v-else>非常紧急</el-button>
      </div>
      <el-row :gutter="20" style="margin: 20px 0 10px 20px;">
        <el-col :span="8">
          <i class="el-icon-menu" style="margin-right: 5px; color: #1890ff;"></i>
          <span style="font-size:14px;color:#aaa;" v-show="detailInfo.projectType == 0">项目类型：分布式项目</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-left:20px;">
        <el-col :span="18">
          <el-row :gutter="20">
            <el-col :span="5">
              <i class="el-icon-user" style="margin-right: 5px; color: #1890ff;"></i>
              <span style="font-size:14px;color:#aaa;">项目经理：{{ projectManager ? projectManager : '-' }}</span>
            </el-col>
            <el-col :span="5">
              <i class="el-icon-user" style="margin-right: 5px; color: #1890ff;"></i>
              <span style="font-size:14px;color:#aaa;">商务负责：{{ projectBusiness ? projectBusiness : '-' }}</span>
            </el-col>
            <el-col :span="5">
              <i class="el-icon-user" style="margin: 5px; color: #1890ff;"></i>
              <span style="font-size:14px;color:#aaa;">采购负责：{{ projectBuyer ? projectBuyer : '-' }}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-button type="danger" size="small" v-show="detailInfo.status == 0" @click="handleStart">启 动</el-button>
          <el-button type="danger" size="small" v-show="detailInfo.status == 1" @click="handleOver">终 止</el-button>
          <el-button type="primary" size="small" v-show="detailInfo.status == 1" @click="handleStop">暂 停</el-button>
          <el-button type="primary" size="small" v-show="detailInfo.status == 1" @click="handlePdsp">结 项</el-button>
          <el-button type="danger" size="small" v-show="detailInfo.status == 2 || detailInfo.status == 3 || detailInfo.status == 4" @click="handleAgain">重新启动</el-button>
        </el-col>
      </el-row>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="项目概况" name="1">
        <ProjectOverview :detailInfo="detailInfo" :taskConut="taskConut" @update="updateProgress" />
      </el-tab-pane>
      <el-tab-pane label="变更记录" name="2">
        <ChangeRecord :id="id" ref="changeRecord" />
      </el-tab-pane>
      <el-tab-pane label="任务管理" name="3">
        <TaskManagement :id="id" ref="taskManagement" />
      </el-tab-pane>
      <el-tab-pane label="图纸管理" name="4">
        <DrawingManagement :id="id" ref="drawingManagement" />
      </el-tab-pane>
      <el-tab-pane label="保险情况" name="5">
        <InsuranceIs :id="id" ref="insuranceIs" />
      </el-tab-pane>
      <el-tab-pane label="团队成员" name="6">
        <TeamMembers :id="id" @update="updatePerson" ref="teamMembers" />
      </el-tab-pane>
      <el-tab-pane label="汇报信息" name="7">
        <ReportingInfo :id="id" ref="reportingInfo" />
      </el-tab-pane>
      <el-tab-pane label="会议纪要" name="8">
        <MeetingMinutes :id="id" ref="meetingMinutes" />
      </el-tab-pane>
      <el-tab-pane label="文件材料" name="9">
        <FileMaterial :id="id" ref="fileMaterial" />
      </el-tab-pane>
      <el-tab-pane label="回款管理" name="10">
        <ReceivManagement :id="id" ref="receivManagement" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getOne, getEpcEachUser, editProjectStatus, getProjectTaskCount } from '@/api/epc'

import ProjectOverview from './components/ProjectOverview.vue'
import ChangeRecord from './components/ChangeRecord.vue'
import TaskManagement from './components/TaskManagement.vue'
import DrawingManagement from './components/DrawingManagement.vue'
import InsuranceIs from './components/InsuranceIs.vue'
import TeamMembers from './components/TeamMembers.vue'
import ReportingInfo from './components/ReportingInfo.vue'
import MeetingMinutes from './components/MeetingMinutes.vue'
import FileMaterial from './components/FileMaterial.vue'
import ReceivManagement from './components/ReceivManagement.vue'
export default {
  name: 'Detail',
  components: { ProjectOverview, ChangeRecord, TaskManagement, DrawingManagement, InsuranceIs, TeamMembers, ReportingInfo, MeetingMinutes, FileMaterial, ReceivManagement},
  data() {
    return {
      activeName: '1',
      id: undefined,
      detailInfo: {},
      projectManager: '',
      projectBuyer: '',
      projectBusiness: '',
      taskConut: {}
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getList()
    this.getEpcEachUser()
    this.getProjectTaskCount()
  },
  methods: {
    handleClick ( tab, event ) {
      if (tab.index == 0) {
        this.getList()
        this.getEpcEachUser()
        this.getProjectTaskCount()
      } else if (tab.index == 1) {
        this.$refs.changeRecord.getList()
      } else if (tab.index == 2) {
        this.$refs.taskManagement.getList()
      } else if (tab.index == 3) {
        this.$refs.drawingManagement.getList()
      } else if (tab.index == 4) {
        this.$refs.insuranceIs.getList()
      } else if (tab.index == 5) {
        this.$refs.teamMembers.getList()
      } else if (tab.index == 6) {
        this.$refs.reportingInfo.getList()
      } else if (tab.index == 7) {
        this.$refs.meetingMinutes.getList()
      } else if (tab.index == 8) {
        this.$refs.fileMaterial.getList()
      } else if (tab.index == 9) {
        this.$refs.receivManagement.getList()
        this.$refs.receivManagement.getLog({ ...this.logForm, projectId: this.id, type: 1 }, 'deductTableData')
        this.$refs.receivManagement.getLog({ ...this.logForm, projectId: this.id, type: 0 }, 'receivaTableData')
      }
    },
    getList () {
      getOne({ id: this.id }).then( res => {
        this.detailInfo = res.data
      })
    },
    // 获取三个角色信息
    getEpcEachUser () {
      getEpcEachUser({ projectId: this.id }).then( res => {
        const { projectManager, projectBuyer, projectBusiness } = res.data
        this.projectManager = projectManager
        this.projectBuyer = projectBuyer
        this.projectBusiness = projectBusiness
      })
    },
    // 获取任务情况统计
    getProjectTaskCount () {
      getProjectTaskCount({ projectId: this.id }).then( res => {
        this.taskConut = res.data
      }) 
    },
    // 启动
    handleStart () {
      let title = '确定启动项目'
      let type = 0
      this.changeStatus( title, type )
    },
    // 终止
    handleOver () {
      let title = '终止后可正常管理项目，且可重新启动，确定终止项目'
      let type = 3
      this.changeStatus( title, type )
    },
    // 暂停
    handleStop () {
      let title = '暂停后可正常管理项目，且可重新启动，确定暂停项目'
      let type = 1
      this.changeStatus( title, type )
    },
    // 结项
    handlePdsp () {
      let title = '结项前请上传相关结项文件，结项后可重新启动，确定结项'
      let type = 2
      this.changeStatus( title, type )
    },
    // 重新启动
    handleAgain () {
      let title = '确定重新启动'
      let type = 4
      this.changeStatus( title, type )
    },
    changeStatus ( title, type ) {
      this.$confirm(`${ title }吗 ?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editProjectStatus({ projectId: this.detailInfo.id, type }).then( res => {
          this.getList()
          this.$message.success('项目状态已变更')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })         
      })
    },

    // 触发更新进度
    updateProgress () {
      this.getList()
    },
    // 触发更新团队成员
    updatePerson () {
      this.getEpcEachUser()
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  font-size: 12px;
  background-color: #fff;
  padding: 20px 15px;
  border-bottom: 1px solid #DCDFE6;
  .top_title {
    font-size: 16px;
    margin: 0 10px;
    font-weight:800;
  }
  
}
/deep/ .el-tabs__header {
  padding-left: 20px;
  background-color: #fff;
}
</style>