<template>
  <div>
    <div class="shang">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{ $route.matched[1].meta.title }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="back">
        <div @click="$router.back()" style="width:240px;">
          <h3>&lt; {{ $route.meta.title }}</h3>
        </div>
        <div class="btnnn">
          <el-button size="small" @click="handleApproval">审批记录</el-button>
          <el-button size="small" type="danger" @click="handleReject" v-show="secondExamine == 1">驳回审核</el-button>
          <el-button size="small" type="primary" @click="handlePass" v-show="secondExamine == 1">审核通过</el-button>
        </div>
      </div>
    </div>
    <el-card>
      <ProjectInfo />
      <OwnerInfo :seProjectCompanyInfo="seProjectCompanyInfo" />
      <RoofInfo :seProjectCompanyBuildInfo="seProjectCompanyBuildInfo" />
      <PowerInfo :seProjectPowerInfo="seProjectPowerInfo" />
      <ModeInfo :seProjectCooperate="seProjectCooperate">
        <div style="margin:15px 0;" class="yi">
          <span style="font-size: 14px;color: #aaa;margin:0 10px 0 70px;">合作说明</span>
          <el-tooltip class="item" effect="dark" :content="seProjectCooperate.otherMessage" placement="top">
            <span style="font-size: 14px;">{{ seProjectCooperate.otherMessage }}</span>
          </el-tooltip>
        </div>
      </ModeInfo>
      <ThreeInfo :seProjectNearThreeYearSellProfixList="seProjectNearThreeYearSellProfixList" :seProjectFinanceOtherMessage="seProjectFinanceOtherMessage" />
      <MaterialInfo :seProjectRelevantFile="seProjectRelevantFile" />
      <LoadInfo :seProjectRelevantFile="seProjectRelevantFile" />
    </el-card>
    <!-- 操作 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" @close="handleClose">
      <el-alert :title="alert" type="success" :closable="false" style="margin-top:0;" />
      <el-input type="textarea" :rows="3" placeholder="最多输入200字符（选填）" v-model="message" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 审批记录 -->
    <ApprovalLog :logVisible.sync="logVisible" :activities="activities" />
  </div>
</template>

<script>
import { getProjectInfo, getProjectExamineLog } from '@/api/listProject'
import { projectSecondExamine } from '@/api/center'

export default {
  name: 'ReviewDetail',
  data() {
    return {
      secondExamine: '',
      province: '',
      city:'',
      activeName: 'first',
      projectId: '',
      seProjectCompanyInfo: {},
      seProjectCompanyBuildInfo: {}, 
      seProjectPowerInfo: {}, 
      seProjectPowerTransformInfoList: [], 
      seProjectCooperate: {}, 
      seProjectRelevantFile: {},
      yearSunShine: '',
      mayInstallVolume: '',
      seProjectProfitConfig: {
        projectId: this.$route.query.projectId,
        weightElectricityPrice: undefined,
      }, // 参数配置
      projectTotalProfitModel: {}, // 收益统计
      seProjectProfitCountList: [], //  收益表格数据
      seProjectNearThreeYearSellProfixList: [],
      seProjectFinanceOtherMessage: {},
      // 审核
      dialogVisible: false,
      title: '',
      message: '',
      alert: '',
      type: '',
      secondExamineReport: '', // 荷载报告
      // 审批记录
      logVisible: false,
      activities: []
    }
  },
  created() {
    this.secondExamine = this.$route.query.secondExamine
    this.projectId = this.$route.query.projectId
    this.getProjectInfo(this.projectId)
  },
  methods: {
    getProjectInfo() {
      getProjectInfo({ projectId: this.projectId }).then(res => {
        const { seProjectCompanyInfo, seProjectCompanyBuildInfo, seProjectPowerInfo, seProjectPowerTransformInfoList, seProjectCooperate, seProjectRelevantFile, seProjectNearThreeYearSellProfixList, seProjectFinanceOtherMessage } = res.data
        this.seProjectNearThreeYearSellProfixList = seProjectNearThreeYearSellProfixList
        this.seProjectFinanceOtherMessage = { ...seProjectFinanceOtherMessage }
        this.seProjectCompanyInfo = seProjectCompanyInfo
        this.seProjectCompanyBuildInfo = seProjectCompanyBuildInfo
        if(seProjectCompanyBuildInfo.housePartType) {
          this.seProjectCompanyBuildInfo.colorSteelType = seProjectCompanyBuildInfo.colorSteelType.split(',')
        }
        this.seProjectPowerInfo = seProjectPowerInfo
        this.seProjectPowerTransformInfoList = seProjectPowerTransformInfoList
        this.seProjectCooperate = seProjectCooperate
        if(seProjectCooperate.electricityDiscountFlag == 1) {
          this.seProjectCooperate.electricityDiscountFlag = true
        }
        if(seProjectCooperate.houseLeaseFlag == 1) {
          this.seProjectCooperate.houseLeaseFlag = true
        }
        if(seProjectCooperate.ownPutFlag == 1) {
          this.seProjectCooperate.ownPutFlag = true
        }
        this.seProjectRelevantFile = seProjectRelevantFile
      })
    },
    // 审批记录
    handleApproval() {
      getProjectExamineLog({ projectId: this.projectId }).then(res => {
        this.activities = res.data
      })
      this.logVisible = true
    },

    // 审核
    handleReject() {
      this.dialogVisible = true
      this.title = '驳回审核'
      this.alert = '审核驳回处理，请输入驳回理由'
      this.type = 0
    },
    handlePass() {
      this.dialogVisible = true
      this.title = '审核通过'
      this.alert = '进行审核通过处理，将项目提交至材料补充，请输入审核详情。'
      this.type = 1
    },
    handleConfirm() {
      projectSecondExamine({
        projectId: this.projectId,
        type: this.type,
        message: this.message,
        secondExamineReport: this.secondExamineReport
      }).then(res => {
        if( this.type == 0 ) {
          this.$message.success('项目已驳回')
          this.dialogVisible = false
          this.$router.back()
        } else if( this.type == 1 ) {
          // console.log(res)
          this.$message.success('项目已通过')
          this.dialogVisible = false
          this.$router.back()
        }
      }).catch( err => {
        this.dialogVisible = false
      })
    },
    handleDown(url) {
      window.open(url)
    },
    handleClose() {
      this.title = '',
      this.message = '',
      this.alert = ''
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
  color: #1890FF;
  border-bottom: 1px solid #1890FF;
  padding-bottom: 5px;
  div {
    border-left: 4px solid #1890FF;
    padding-left: 15px;
  }
}
.mt5 {
  margin-top: 5px;
}
.span13 {
  font-size: 13px;
  color: #aaa;
  text-align: right;
}
.span130 {
  font-size: 13px;
  color: #000;
}
.el-alert {
  margin: 15px 0;
}
/deep/  .el-checkbox__label {
  padding-left: 0;
}
.custom-upload-files {
  text-align: left;
}
.ht {
  border-collapse:collapse;
  border: 1px solid #DCDFE6;
  td {
    width: 25%;
    height: 35px;
    border: 1px solid #DCDFE6;
  }
}
/deep/ .el-button--primary.is-disabled {
  background-color: #eee;
  border-color: #eee;
}
</style>