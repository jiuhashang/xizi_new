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
          <el-button size="small" @click="handleOver" v-show="thirdExamine == 1">终止项目</el-button>
          <el-button size="small" @click="handleApproval">审批记录</el-button>
          <el-button size="small" type="danger" @click="handleReject" v-show="thirdExamine == 1">驳回审核</el-button>
          <el-button size="small" type="primary" @click="handlePass" v-show="thirdExamine == 1">审核通过</el-button>
        </div>
      </div>
    </div>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="审核材料" name="first">
          <ProjectInfo />
          <OwnerInfo :seProjectCompanyInfo="seProjectCompanyInfo" />
          <RoofInfo :seProjectCompanyBuildInfo="seProjectCompanyBuildInfo" />
          <PowerInfo :seProjectPowerInfo="seProjectPowerInfo" :seProjectPowerTransformInfoList="seProjectPowerTransformInfoList" />  
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
          <OtherInfo :seProjectSupplementFile="seProjectSupplementFile" />
          <LoadInfo :seProjectRelevantFile="seProjectRelevantFile" />
        </el-tab-pane>
        <el-tab-pane label="收益测算" name="second">
          <DataInfo :province="province" :city="city" :yearSunShine="yearSunShine" :mayInstallVolume="mayInstallVolume" :seProjectCompanyBuildInfo="seProjectCompanyBuildInfo" />
          <ModeInfo :seProjectCooperate="seProjectCooperate" />
          <ParamInfo :seProjectProfitConfig="seProjectProfitConfig" />
          <MeasureInfo :projectTotalProfitModel="projectTotalProfitModel" :seProjectProfitCountList="seProjectProfitCountList" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 审批记录 -->
    <ApprovalLog :logVisible.sync="logVisible" :activities="activities" />
    <!-- 审核操作 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" @close="handleClose">
      <el-alert :title="alert" type="success" :closable="false" style="margin-top:0;" />
      <el-input type="textarea" :rows="3" placeholder="最多输入200字符（选填）" v-model="message" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getProjectInfo, getProjectExamineLog } from '@/api/listProject'
import { getProfitMessage, projectThirdExamine } from '@/api/center'
import OtherInfo from '@/components/Project/OtherInfo.vue'
import ParamInfo from '@/components/Project/ParamInfo.vue'

export default {
  components: { OtherInfo, ParamInfo },
  name: 'FinalDetail',
  data() {
      return {
        thirdExamine: '',
        city: '',
        province: '',
        yearSunShine: '',
        mayInstallVolume: '',
        seProjectProfitConfig: {},
        projectTotalProfitModel: {},
        seProjectProfitCountList: [],
        activeName: 'first',
        projectId: '',
        seProjectCompanyBuildInfo: {},
        seProjectCompanyInfo: {}, 
        seProjectCooperate: {
          electricityDiscountFlag: '',
          houseArea: ''
        }, 
        seProjectNearThreeYearSellProfixList: [], 
        seProjectFinanceOtherMessage: {},
        seProjectPowerInfo: {}, 
        seProjectPowerTransformInfoList: [], 
        seProjectRelevantFile: {}, 
        seProjectSupplementFile: {},
        seProjectProfitCountList: [],
        // 审批记录
        logVisible: false,
        activities: [],
        // 审核
        dialogVisible: false,
        title: '',
        message: '',
        alert: '',
        type: ''
      }
    },
    created() {
      this.thirdExamine = this.$route.query.thirdExamine
      this.projectId = this.$route.query.projectId
      this.getProjectInfo(this.projectId)
      this.getProfitMessage(this.projectId)
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event)
      },
      getProjectInfo() {
        getProjectInfo({ projectId: this.projectId }).then(res => {
          const { seProjectCompanyBuildInfo, seProjectCompanyInfo, seProjectCooperate, seProjectNearThreeYearSellProfixList, seProjectPowerInfo, seProjectFinanceOtherMessage, seProjectPowerTransformInfoList, seProjectRelevantFile, seProjectSupplementFile } = res.data
          this.seProjectCompanyBuildInfo = seProjectCompanyBuildInfo
          this.seProjectCompanyInfo = seProjectCompanyInfo
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
          if( seProjectNearThreeYearSellProfixList.length > 0 ) { this.seProjectNearThreeYearSellProfixList = seProjectNearThreeYearSellProfixList }
          this.seProjectFinanceOtherMessage = { ...seProjectFinanceOtherMessage }
          this.seProjectPowerInfo = seProjectPowerInfo
          this.seProjectPowerTransformInfoList = seProjectPowerTransformInfoList
          this.seProjectRelevantFile = { ...seProjectRelevantFile }
          this.seProjectSupplementFile = { ...seProjectSupplementFile }
        })
      },
      getProfitMessage() {
        getProfitMessage({ projectId: this.projectId}).then(res => { // 收益试算
          const { province, city, yearSunShine, mayInstallVolume, seProjectProfitConfig, projectTotalProfitModel, seProjectProfitCountList } = res.data
          this.province = province
          this.city = city
          this.yearSunShine = yearSunShine
          this.mayInstallVolume = mayInstallVolume
          this.seProjectProfitConfig = seProjectProfitConfig
          this.projectTotalProfitModel = projectTotalProfitModel
          this.seProjectProfitCountList = seProjectProfitCountList
        })
      },
      handleApproval() { // 审批记录
        getProjectExamineLog({ projectId: this.projectId }).then(res => {
          this.activities = res.data
        })
        this.logVisible = true
      },
      // 审核
      handleOver() {
        this.dialogVisible = true
        this.title = '驳回审核'
        this.alert = '终止项目，请输入终止理由'
        this.type = 2
      },
      handleReject() {
        this.dialogVisible = true
        this.title = '驳回审核'
        this.alert = '审核驳回处理，请输入驳回理由'
        this.type = 0
      },
      handlePass() {
        this.dialogVisible = true
        this.title = '审核通过'
        this.alert = '进行审核通过处理，将项目提交至立项补充，请输入审核详情。'
        this.type = 1
      },
      handleConfirm() {
        projectThirdExamine({
          projectId: this.projectId,
          type: this.type,
          message: this.message
        }).then(res => {
          if( this.type == 0 ) {
            this.$message.success('项目已审核驳回')
            this.dialogVisible = false
            this.$router.back()
          } else if( this.type == 1 ) {
            this.$message.success('项目已审核成功')
            this.dialogVisible = false
            this.$router.back()
          } else if( this.type == 2 ) {
            this.$message.success('项目已终止')
            this.dialogVisible = false
            this.$router.back()
          }
        }).catch( err => {
          this.dialogVisible = false
        })
      },
      handleClose() {
        this.title = '',
        this.message = '',
        this.alert = ''
      },
      handleDown(url) {
        window.open(url)
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
  .el-alert {
    margin: 15px 0;
  }
  /deep/  .el-checkbox__label {
    padding-left: 0;
  }
  .custom-upload-files {
    text-align: left;
  }
  /deep/ .el-button--primary.is-disabled {
    background-color: #eee;
    border-color: #eee;
  }
</style>