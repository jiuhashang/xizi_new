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
          <!-- <el-button size="small">工商数据查看</el-button> -->
          <el-button size="small" @click="handleApproval">审批记录</el-button>
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
          <SuppleInfo :seProjectEndSupplementFile="seProjectEndSupplementFile" />
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
  </div>
</template>

<script>
import { getProjectInfo, getProjectExamineLog } from '@/api/listProject'
import { getProfitMessage } from '@/api/center'

import ProjectInfo from '@/components/Project/ProjectInfo.vue'
import OwnerInfo from '@/components/Project/OwnerInfo.vue'
import ApprovalLog from '@/components/Log/ApprovalLog.vue'

export default {
  name: 'OverDetail',
  data() {
      return {
        city: '',
        province: '',
        yearSunShine: '',
        mayInstallVolume: '',
        seProjectProfitConfig: {},
        projectTotalProfitModel: {},
        seProjectProfitCountList: [],

        activeName: 'first',
        projectId: null,
        seProjectCompanyBuildInfo: {},
        seProjectCompanyInfo: {}, 
        seProjectCooperate: {}, 
        seProjectNearThreeYearSellProfixList: [], 
        seProjectFinanceOtherMessage: {},
        seProjectPowerInfo: {}, 
        seProjectPowerTransformInfoList: [], 
        seProjectRelevantFile: {}, 
        seProjectSupplementFile: {},
        seProjectProfitCountList: [],
        seProjectEndSupplementFile: {},
        // 审批记录
        logVisible: false,
        activities: [],
        // 审核
        dialogVisible: false,
        title: '',
        message: '',
        alert: '',
        type: '',

        first: {
          sellMoney: '',
          profix: ''
        },
        second: {
          sellMoney: '',
          profix: ''
        },
        three: {
          sellMoney: '',
          profix: ''
        },
      }
    },
    components: { ProjectInfo, OwnerInfo, ApprovalLog },
    created() {
      this.projectId = this.$route.query.projectId
      this.getProjectInfo(this.projectId)
      this.getProfitMessage(this.projectId)
    },
    watch: {
      seProjectNearThreeYearSellProfixList(newVal, oldVal) {
        if(newVal) {
          this.first = newVal[0]
          this.second = newVal[1]
          this.three = newVal[2]
        }
      }
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event)
      },
      getProjectInfo() {
        getProjectInfo({ projectId: this.projectId }).then(res => {
          const { seProjectCompanyBuildInfo, seProjectCompanyInfo, seProjectCooperate, seProjectNearThreeYearSellProfixList, seProjectFinanceOtherMessage, seProjectPowerInfo, seProjectPowerTransformInfoList, seProjectRelevantFile, seProjectSupplementFile, seProjectEndSupplementFile } = res.data
          if(seProjectCompanyBuildInfo) { this.seProjectCompanyBuildInfo = { ...seProjectCompanyBuildInfo } }
          if(seProjectCompanyInfo) { this.seProjectCompanyInfo = { ...seProjectCompanyInfo } }
          if(seProjectCooperate) { this.seProjectCooperate = { ...seProjectCooperate } }
          if(this.seProjectCooperate.electricityDiscountFlag && this.seProjectCooperate.electricityDiscountFlag == 1) { this.seProjectCooperate.electricityDiscountFlag = true }
          if(this.seProjectCooperate.houseLeaseFlag && this.seProjectCooperate.houseLeaseFlag == 1) { this.seProjectCooperate.houseLeaseFlag = true }
          if(this.seProjectCooperate.ownPutFlag && this.seProjectCooperate.ownPutFlag == 1) { this.seProjectCooperate.ownPutFlag = true }
          if( seProjectNearThreeYearSellProfixList.length > 0 ) {this.seProjectNearThreeYearSellProfixList = seProjectNearThreeYearSellProfixList }
          if(seProjectPowerInfo) { this.seProjectPowerInfo = { ...seProjectPowerInfo } }
          if(seProjectPowerTransformInfoList) { this.seProjectPowerTransformInfoList = seProjectPowerTransformInfoList }
          if(seProjectRelevantFile) { this.seProjectRelevantFile = { ...seProjectRelevantFile } }
          if(seProjectSupplementFile) { this.seProjectSupplementFile = { ...seProjectSupplementFile } }
          if(seProjectEndSupplementFile) { this.seProjectEndSupplementFile = { ...seProjectEndSupplementFile } }
          this.seProjectFinanceOtherMessage = { ...seProjectFinanceOtherMessage }
        }).catch(err => err)
      },
      getProfitMessage() {
        getProfitMessage({ projectId: this.projectId}).then(res => { // 收益试算
          const { province, city, yearSunShine, mayInstallVolume, seProjectProfitConfig, projectTotalProfitModel, seProjectProfitCountList } = res.data
          this.province = province
          this.city = city
          this.yearSunShine = yearSunShine
          this.mayInstallVolume = mayInstallVolume
          this.seProjectProfitConfig = { ...seProjectProfitConfig }
          this.projectTotalProfitModel = { ...projectTotalProfitModel }
          this.seProjectProfitCountList = seProjectProfitCountList
        }).catch(err => err)
      },
      handleApproval() { // 审批记录
        getProjectExamineLog({ projectId: this.projectId }).then(res => {
          this.activities = res.data
        })
        this.logVisible = true
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
  /deep/  .el-checkbox__label {
    padding-left: 0;
  }
  .custom-upload-files {
    text-align: left;
  }
  .t1 {
    width: 25%;
    height: 116px;
    margin: 0 10px;
    color: #fff;
    background-color: #f2f2f2;
  }
  .b1 {
    width: 25%;
    height: 116px;
    box-sizing: border-box;
    margin: 0 10px;
    padding: 0 30px;
    background-color: #f2f2f2;
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