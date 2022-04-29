<template>
  <!-- 项目概况 -->
  <div>
    <div class="home">
    <!-- 整体左 -->
      <div class="left">
        <!-- 左上 -->
        <div class="top">
          <div class="header">
            <div>
              <i class="el-icon-document-copy" style="margin-right:10px;color:#1890ff;"></i>
              <span style="font-weight:800;">项目信息</span>
            </div>
            <el-button type="primary" size="mini" @click="handleRegister">修改项目</el-button>
          </div>
          <div class="body">
            <el-row :gutter="20">
              <el-col :span="12">
                <span class="aaa14">项目名称</span>
                <span>{{ detailInfo.projectName }}</span>
              </el-col>
              <el-col :span="12">
                <span class="aaa14">公司名称</span>
                <span>{{ detailInfo.companyName }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <span class="aaa14">项目编号</span>
                <span>{{ detailInfo.id }}</span>
              </el-col>
              <el-col :span="12">
                <span class="aaa14">建站地点</span>
                <span>{{ detailInfo.province }} {{ detailInfo.city }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <span class="aaa14">项目来源</span>
                <span v-if="detailInfo.projectSource == 0">自主投资</span>
                <span v-else-if="detailInfo.projectSource == 1">EPC项目</span>
                <span v-else>其他项目</span>
              </el-col>
              <el-col :span="12">
                <span class="aaa14">项目类型</span>
                <span v-show="detailInfo.projectType == 0">分布式项目</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <span class="aaa14">优先级别</span>
                <span v-if="detailInfo.firstLevel == 0">低</span>
                <span v-else-if="detailInfo.firstLevel == 1">中</span>
                <span v-else>高</span>
              </el-col>
              <el-col :span="12">
                <span class="aaa14">紧急程度</span>
                <span v-if="detailInfo.urgentLevel == 0">一般</span>
                <span v-else-if="detailInfo.urgentLevel == 1">紧急</span>
                <span v-else>非常紧急</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <span class="aaa14">EPC合同</span>
                <span v-if="detailInfo.isEpcContract == 0">无</span>
                <span v-else-if="detailInfo.isEpcContract == 1">有</span>
                <span v-else>-</span>
              </el-col>
              <el-col :span="12">
                <span class="aaa14">立项人员</span>
                <span>{{ detailInfo.createUserName ? detailInfo.createUserName : '-' }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <span class="aaa14">立项时间</span>
                <span>{{ detailInfo.createTime ? detailInfo.createTime : '-' }}</span>
              </el-col>
              <el-col :span="12">
                <span class="aaa14">绑定项目</span>
                <span>{{ detailInfo.seProjectInfo ? detailInfo.seProjectInfo.projectName : '-' }}</span>
              </el-col>
            </el-row>
            <div class="yi" style="margin-top: 10px;margin-bottom: 10px;padding-right:20px;">
              <span style="color:#aaa;margin-right:20px;">项目说明</span>
              <el-tooltip class="item" effect="dark" :content="detailInfo.setProjectMessage" placement="bottom-start">
                <span>{{ detailInfo.setProjectMessage ? detailInfo.setProjectMessage : '-' }}</span>
              </el-tooltip>
            </div>
          </div>
        </div>
        <!-- 左中 -->
        <!-- <div class="center">
          <div class="header">
            <i class="el-icon-document-copy" style="margin-right:10px;"></i>
            <span>关键提醒</span>
          </div>
          <div class="body">
            <div><i class="el-icon-success" style="margin-right:15px;color:#67C23A;"></i>EPC合同已签订</div>
            <div><i class="el-icon-success" style="margin-right:15px;color:#67C23A;"></i>设计图纸已上传</div>
            <div><i class="el-icon-success" style="margin-right:15px;color:#67C23A;"></i>项目保险存续期中</div>
            <div><i class="el-icon-success" style="margin-right:15px;color:#67C23A;"></i>施工保险存续期中</div>
          </div>
        </div> -->
        <!-- 左下 -->
        <!-- <div class="bottom">
          <div class="header">
            <i class="el-icon-document-copy" style="margin-right:10px;"></i>
            <span>任务提醒</span>
          </div>
          <div class="body">
            <el-table :data="tableData" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="small">
              <el-table-column label="任务名称" />
              <el-table-column label="计划时间" />
              <el-table-column label="延期时间" />
              <el-table-column label="剩余时间" />
            </el-table>
          </div>
        </div> -->
      </div>
      <!-- 整体右 -->
      <div class="right">
        <!-- 右上 -->
        <div class="top">
          <div class="header">
            <div>
              <i class="el-icon-document-copy" style="margin-right:10px;color:#1890ff;"></i>
              <span style="font-weight:800;">项目进度</span>
            </div>
            <div>
              <el-button type="primary" size="mini" @click="handleLog">进度记录</el-button>
              <el-button type="primary" size="mini" @click="handleProgress">自评进度</el-button>
            </div>
          </div>
          <div class="body">
            <div class="top">
              <el-steps :active="detailInfo.selfAccessProgress + 1" finish-status="success" align-center>
                <el-step title="起始阶段"></el-step>
                <el-step title="接入方案"></el-step>
                <el-step title="初设完成"></el-step>
                <el-step title="施工进场"></el-step>
                <el-step title="并网完成"></el-step>
                <el-step title="竣工验收"></el-step>
              </el-steps>
            </div>
            <div class="content">
              <el-row :gutter="10">
                <el-col :span="12">
                  <span class="aaa14">计划开始</span>
                  <span>{{ detailInfo.startTime ? detailInfo.startTime : '待定' }}</span>
                </el-col>
                <el-col :span="12">
                  <span class="aaa14">实际开始</span>
                  <span>{{ detailInfo.factStartTime ? detailInfo.factStartTime : '-' }}</span>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="12">
                  <span class="aaa14">计划结束</span>
                  <span>{{ detailInfo.endTime ? detailInfo.endTime : '待定' }}</span>
                </el-col>
                <el-col :span="12">
                  <span class="aaa14">实际结束</span>
                  <span>{{ detailInfo.factEndTime ? detailInfo.factEndTime : '-' }}</span>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="12">
                  <span class="aaa14">计划工期</span>
                  <span>{{ detailInfo.planDay ? detailInfo.planDay : '-' }}</span>
                </el-col>
                <el-col :span="12">
                  <span class="aaa14">实际工期</span>
                  <span>{{ detailInfo.factDay ? detailInfo.factDay : '-' }}</span>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="24">
                  <span class="aaa14">项目结束</span>
                  <span v-if="detailInfo.remainDay">剩余 <span style="color:red;">{{ detailInfo.remainDay }}</span> 天</span>
                  <span v-else>-</span>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="24" style="display:flex;">
                  <span class="aaa14">时间进度</span>
                  <el-progress :percentage="detailInfo.timeProgress" style="width:70%;margin-top:12px;" v-if="detailInfo.timeProgress" />
                  <span v-else style="margin-top:10px;">-</span>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>
  <!-- 下 -->
    <div class="bottom">
      <div class="header">
        <i class="el-icon-document-copy" style="margin-right:10px;color:#1890ff;"></i>
        <span style="font-weight:800;">任务情况</span>
      </div>
      <div class="body">
        <div>
          <p style="font-weight:800;font-size:16px;">{{ taskConut.allTask }}</p>
          <p>全部任务数</p>
        </div>
        <div>
          <p style="font-weight:800;font-size:16px;">{{ taskConut.underwayTask }}</p>
          <p>进行中任务数</p>
        </div>
        <div>
          <p style="font-weight:800;font-size:16px;">{{ taskConut.solveTask }}</p>
          <p>已解决任务数</p>
        </div>
        <div>
          <p style="font-weight:800;font-size:16px;">{{ taskConut.timeOverTask }}</p>
          <p>已超时任务数</p>
        </div>
        <div>
          <p style="font-weight:800;font-size:16px;">{{ taskConut.timeOverImportantTask }}</p>
          <p>已超时关键任务</p>
        </div>
        <div style="border-right: 1px solid #DCDFE6;">
          <p style="font-weight:800;font-size:16px;">{{ taskConut.timeOverUsualTask }}</p>
          <p>已超时一般任务</p>
        </div>
      </div>
    </div>

    <!-- 进度记录 -->
    <el-dialog title="进度记录" :visible.sync="logDialogVisible" :close-on-click-modal="false" width="40%">
      <div v-loading="loading">
        <div v-if="logs.length">
          <div v-for="item in logs" :key="item.id" class="log">
            <el-row :gutter="20">
              <el-col :span="4">记录日期</el-col>
              <el-col :span="20">{{ item.createTime }}</el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px;margin-bottom:10px;">
              <el-col :span="4">里程碑</el-col>
              <el-col :span="20">
                <span v-show="item.progressType == 0">起始阶段</span>
                <span v-show="item.progressType == 1">接入方案</span>
                <span v-show="item.progressType == 2">初设完成</span>
                <span v-show="item.progressType == 3">施工进场</span>
                <span v-show="item.progressType == 4">并网完成</span>
                <span v-show="item.progressType == 5">竣工验收</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="4">记录说明</el-col>
              <el-col :span="20">{{ item.message }}</el-col>
            </el-row>
          </div>
        </div>
        <div v-else style="text-align:center;">
          <span>暂无记录</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="logDialogVisible = false" size="small">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 自评进度 -->
    <el-dialog title="自评进度" :visible.sync="progressDialogVisible" :close-on-click-modal="false" width="40%" @close="clear">
      <el-form ref="form" :model="progressForm" :rules="rules">
        <el-form-item prop="selfAccessProgress" aligh="center">
          <el-radio-group v-model="progressForm.selfAccessProgress" size="small">
            <el-radio-button :label="0">起始阶段</el-radio-button>
            <el-radio-button :label="1">接入方案</el-radio-button>
            <el-radio-button :label="2">初设完成</el-radio-button>
            <el-radio-button :label="3">施工进场</el-radio-button>
            <el-radio-button :label="4">并网完成</el-radio-button>
            <el-radio-button :label="5">竣工验收</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-input type="textarea" v-model="progressForm.message" placeholder="请填写进度描述，最多200字，选填" maxlength="200" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="progressDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="save" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getLog, editProjectProgress } from '@/api/epc'
export default {
  name: 'ProjectOverview',
  props: {
    detailInfo: {
      type: Object,
      default: () => {}
    },
    taskConut: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tableData: [],
      logDialogVisible: false,
      loading: true,
      logs: [],
      progressDialogVisible: false,
      progressForm: {
        projectId: undefined,
        selfAccessProgress: null,
        message: undefined
      },
      rules: {
        selfAccessProgress: [{ required: true, message: '请选择自评进度', trigger: 'change' }]
      }
    }
  },
  methods: {
    handleRegister () {
      this.$router.push({ name: 'Register', query: { detailInfo: this.detailInfo } })
    },
    // 获取进度记录
    handleLog () {
      getLog({ projectId: this.detailInfo.id }).then( res => {
        this.logs = res.data
        this.loading = false
      })
      this.logDialogVisible = true
    },
    // 自评进度
    handleProgress () {
      this.progressForm.projectId = this.detailInfo.id
      this.progressDialogVisible = true
    },
    save () {
      this.$refs.form.validate( valid => {
        if ( valid ) {
          editProjectProgress( this.progressForm ).then( res => {
            this.$message.success(res.msg)
            this.progressDialogVisible = false
            this.$emit('update')
          })
        }
      })
    },
    clear () {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  // padding-top: 15px;
  display: flex;
  font-size: 12px;
  // 大佐
  .left {
    width: 65%;
    // 左上
    .top {
      margin: 0 15px;
      background-color: #fff;
      .header {
        border: 1px solid #DCDFE6;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border-bottom: none;
        padding: 10px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .body {
        padding: 15px 0 15px 25px;
        border: 1px solid #DCDFE6;
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
      }
    }
    // 左中
    .center {
      margin: 0 15px 15px;
      background-color: #fff;
      .header {
        border: 1px solid #DCDFE6;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border-bottom: none;
        padding: 10px 15px;
      }
      .body {
        padding: 15px;
        border: 1px solid #DCDFE6;
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
        display: flex;
        justify-content: space-around;
        div {
          flex: 1;
          padding: 10px;
          margin: 0 10px;
          text-align: center;
          background-color: rgba(149, 242, 4, 0.2);
        }
      }
    }
    // 左下
    .bottom {
      margin: 0 15px 15px;
      background-color: #fff;
      .header {
        border: 1px solid #DCDFE6;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border-bottom: none;
        padding: 10px 15px;
      }
      .body {
        padding: 15px;
        border: 1px solid #DCDFE6;
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
      }
    }
  }
  // 大右
  .right {
    width: 35%;
    // 右上
    .top {
      margin: 0 15px 15px 0;
      background-color: #fff;
      .header {
        border: 1px solid #DCDFE6;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border-bottom: none;
        padding: 10px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .body {
        border: 1px solid #DCDFE6;
        .top {
          padding: 10px 0 8px 0;
          border-bottom: 1px solid #DCDFE6;
        }
        .content {
          padding-left: 20px;
          padding-bottom: 15px;
        }
      }
    }
  }
  
}
// 下
.bottom {
  font-size: 12px;
  margin: 0 15px 15px 15px;
  background-color: #fff;
  .header {
    border: 1px solid #DCDFE6;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border-bottom: none;
    padding: 10px 15px;
  }
  .body {
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    display: flex;
    text-align: center;
    div {
      box-sizing: border-box;
      border: 1px solid #DCDFE6;
      border-right: none;
      width: 50%;
      :last-child {
        color: #7f7f7f;
      }
    }
  }
}
.aaa14 {
  color: #aaa;
  margin-right: 20px;
  display: inline-block;
  margin-top: 10px;
  margin-bottom: 10px;
}
/deep/ .el-step__title {
  font-size: 12px;
}
.log {
  font-size: 12px;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 10px 20px;
  margin-bottom: 10px;
}
/deep/ .el-step__icon {
  width: 20px;
  height: 20px;
}
</style>
