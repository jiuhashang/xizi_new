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
          <el-button size="small" @click="approval">审批记录</el-button>
          <el-button size="small" type="warning" v-show="thirdExamine == 0 || thirdExamine == 2" @click="save">保 存</el-button>
          <el-button size="small" type="primary" v-show="thirdExamine == 0 || thirdExamine == 2" @click="sub">提交审核</el-button>
        </div>
      </div>
    </div>
    <el-card>
      <ProjectInfo />
      <OwnerInfo :seProjectCompanyInfo="seProjectCompanyInfo" />

      <div class="xian">
        <div>近3年销售与利润</div>
      </div>
      <table style="width: 100%;text-align:center;font-size:14px;" class="ht" cellpadding="0" cellspacing="0">
        <tr style="background:#f2f2f2;">
          <td style="height:30px;"></td>
          <td>2019年</td>
          <td>2020年</td>
          <td>2021年</td>
        </tr>
        <tr>
          <td style="height:40px;">年销售额（万元）</td>
          <td>
            <el-input v-model="first.sellMoney" type="number" :disabled="thirdExamine == 1 || thirdExamine == 3 || thirdExamine == 99" placeholder="请输入" size="mini">
              <span slot="suffix">万元</span>
            </el-input>
          </td>
          <td>
            <el-input v-model="second.sellMoney" type="number" :disabled="thirdExamine == 1 || thirdExamine == 3 || thirdExamine == 99" placeholder="请输入" size="mini">
              <span slot="suffix">万元</span>
            </el-input>
          </td>
          <td>
            <el-input v-model="three.sellMoney" type="number" :disabled="thirdExamine == 1 || thirdExamine == 3 || thirdExamine == 99" placeholder="请输入" size="mini">
              <span slot="suffix">万元</span>
            </el-input>
          </td>
        </tr>
        <tr>
          <td style="height:40px;">年利润额（万元）</td>
          <td>
            <el-input v-model="first.profix" type="number" :disabled="thirdExamine == 1 || thirdExamine == 3 || thirdExamine == 99" placeholder="请输入" size="mini">
              <span slot="suffix">万元</span>
            </el-input>
          </td>
          <td>
            <el-input v-model="second.profix" type="number" :disabled="thirdExamine == 1 || thirdExamine == 3 || thirdExamine == 99" placeholder="请输入" size="mini">
              <span slot="suffix">万元</span>
            </el-input>
          </td>
          <td>
            <el-input v-model="three.profix" type="number" :disabled="thirdExamine == 1 || thirdExamine == 3 || thirdExamine == 99" placeholder="请输入" size="mini">
              <span slot="suffix">万元</span>
            </el-input>
          </td>
        </tr>
      </table>
      <el-form :disabled="thirdExamine == 1 || thirdExamine == 3 || thirdExamine == 99" :model="seProjectFinanceOtherMessage" label-width="150px" size="mini">
        <el-row :gutter="20">
          <el-col>
            <el-form-item label="近3年销售与利润说明">
              <el-input v-model="seProjectFinanceOtherMessage.financeOtherMessage" type="textarea" autosize placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div class="xian">
        <div>相关材料</div>
      </div>
      <el-alert title="如文件较多，可将文件进行压缩打包上传，并等待文件完成上传。" type="success" :closable="false" />
      <el-form ref="relevantFileForm" :rules="relevantFileRules" :disabled="thirdExamine == 1 || thirdExamine == 3 || thirdExamine == 99" :model="seProjectRelevantFile" label-width="130px" size="mini">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="配电室内部照片">
              <file-upload-string v-model="seProjectRelevantFile.electricityRoomInsideFile" :limit="1" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="建筑图">
              <file-upload-string v-model="seProjectRelevantFile.buildFile" :limit="1" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="总平图">
              <file-upload-string v-model="seProjectRelevantFile.generalLayoutFile" :limit="1" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="厂房内部照片">
              <file-upload-string v-model="seProjectRelevantFile.workShopInsideFile" :limit="1" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="厂名正面照片">
              <file-upload-string v-model="seProjectRelevantFile.workShopFrontFile" :limit="1" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="屋顶细节照片">
              <file-upload-string v-model="seProjectRelevantFile.houseTopDetailFile" :limit="1" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="厂房内屋顶照片">
              <file-upload-string v-model="seProjectRelevantFile.workShopInsideTopFile" :limit="1" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目发起额外材料">
              <file-upload-string v-model="seProjectRelevantFile.projectOtherFile" :limit="1" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="项目发起额外说明">
          <el-input type="textarea" autosize v-model="seProjectRelevantFile.projectOtherMessage" placeholder="请输入" maxlength="200"></el-input>
        </el-form-item>
      </el-form>

      <div class="xian">
        <div>其他材料</div>
      </div>
      <el-form :model="seProjectSupplementFile" :disabled="thirdExamine == 1 || thirdExamine == 3 || thirdExamine == 99" label-width="130px" size="mini" style="margin-top:15px;">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="近3年财务报告" class="must-form-item">
              <file-upload-string v-model="seProjectSupplementFile.nearThreeYearFinanceReport" :limit="1" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="材料补充额外材料">
              <file-upload-string v-model="seProjectSupplementFile.otherFile" :limit="1" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="补充说明">
          <el-input type="textarea" autosize v-model="seProjectSupplementFile.otherMessage" placeholder="请输入" maxlength="200"></el-input>
        </el-form-item>
      </el-form>
      
      <!-- 审批记录 -->
      <ApprovalLog :logVisible.sync="logVisible" :activities="activities" />
    </el-card>
  </div>
</template>

<script>
import { getProjectInfo, getProjectExamineLog, relevantInput, relevantInputSubmit } from '@/api/listProject'

import ApprovalLog from '@/components/Log/ApprovalLog.vue'
import ProjectInfo from '@/components/Project/ProjectInfo.vue'
import OwnerInfo from '@/components/Project/OwnerInfo.vue'

export default {
  name: 'MaterialDetail',
  data() {
    return {
      thirdExamine: '',
      projectId: '',
      seProjectCompanyInfo: { }, // 业主信息
      first: {
        id: undefined,
        projectId: this.$route.query.projectId,
        yearNum: 2019,
        sellMoney: undefined,
        profix: undefined
      },
      second: {
        id: undefined,
        projectId: this.$route.query.projectId,
        yearNum: 2020,
        sellMoney: undefined,
        profix: undefined
      },
      three: {
        id: undefined,
        projectId: this.$route.query.projectId,
        yearNum: 2021,
        sellMoney: undefined,
        profix: undefined
      },
      seProjectNearThreeYearSellProfixList: [],
      logVisible: false, // 审批记录
      activities: [],
      seProjectCompanyBuildInfo: {}, // 屋面信息
      seProjectCooperate: {}, // 合作模式
      seProjectNearThreeYearSellProfixList: [], // 近三年
      seProjectFinanceOtherMessage: {
        projectId: this.$route.query.projectId,
        financeOtherMessage: ''
      },
      seProjectPowerInfo: {}, // 供电现状
      seProjectPowerTransformInfoList: [], // 变压器列表
      seProjectRelevantFile: {}, // 相关材料
      seProjectSupplementFile: {  // 其他材料
        projectId: this.$route.query.projectId
      }, 
    }
  },
  components: { ApprovalLog, ProjectInfo, OwnerInfo },
  created() {
    this.thirdExamine = this.$route.query.thirdExamine
    this.projectId = this.$route.query.projectId
    this.getProjectInfo(this.projectId)
  },
  watch: {
    seProjectNearThreeYearSellProfixList(newVal, oldVal) {
      if(newVal.length > 0) {
        this.first = newVal[0]
        this.second = newVal[1]
        this.three = newVal[2]
      }
    }
  },
  methods: {
    getProjectInfo() {
      getProjectInfo({ projectId: this.projectId }).then(res => {
        const { seProjectCompanyInfo, seProjectCompanyBuildInfo, seProjectCooperate, seProjectNearThreeYearSellProfixList, seProjectFinanceOtherMessage, seProjectPowerInfo, seProjectPowerTransformInfoList, seProjectRelevantFile, seProjectSupplementFile } = res.data
        this.seProjectCompanyInfo = { ...seProjectCompanyInfo }
        this.seProjectNearThreeYearSellProfixList = seProjectNearThreeYearSellProfixList
        this.seProjectFinanceOtherMessage = { ...seProjectFinanceOtherMessage }
        if( seProjectSupplementFile ) { this.seProjectSupplementFile = { ...seProjectSupplementFile }}
        this.seProjectCompanyBuildInfo = seProjectCompanyBuildInfo
        this.seProjectCooperate = seProjectCooperate
        this.seProjectPowerInfo = seProjectPowerInfo
        this.seProjectPowerTransformInfoList = seProjectPowerTransformInfoList
        this.seProjectRelevantFile = seProjectRelevantFile
      })
    },
    front(msg) {
      this.seProjectNearThreeYearSellProfixList.push(this.first, this.second, this.three)
      relevantInput({
        projectId: this.projectId,
        seProjectSupplementFile: this.seProjectSupplementFile,
        seProjectCompanyInfo: this.seProjectCompanyInfo,
        seProjectCompanyBuildInfo: this.seProjectCompanyBuildInfo,
        seProjectCooperate: this.seProjectCooperate,
        seProjectNearThreeYearSellProfixList: this.seProjectNearThreeYearSellProfixList,
        seProjectFinanceOtherMessage: this.seProjectFinanceOtherMessage,
        seProjectPowerInfo: this.seProjectPowerInfo,
        seProjectPowerTransformInfoList: this.seProjectPowerTransformInfoList,
        seProjectRelevantFile: this.seProjectRelevantFile
      }).then(res => {
        if(res.code && !msg) { 
          this.$message.success('保存成功')
        }
        this.getProjectInfo(this.projectId)
      })
    },
    // 保存
    save() {
      this.seProjectNearThreeYearSellProfixList.push(this.first, this.second, this.three)
      relevantInput({
        projectId: this.projectId,
        seProjectSupplementFile: this.seProjectSupplementFile,
        seProjectCompanyInfo: this.seProjectCompanyInfo,
        seProjectCompanyBuildInfo: this.seProjectCompanyBuildInfo,
        seProjectCooperate: this.seProjectCooperate,
        seProjectNearThreeYearSellProfixList: this.seProjectNearThreeYearSellProfixList,
        seProjectFinanceOtherMessage: this.seProjectFinanceOtherMessage,
        seProjectPowerInfo: this.seProjectPowerInfo,
        seProjectPowerTransformInfoList: this.seProjectPowerTransformInfoList,
        seProjectRelevantFile: this.seProjectRelevantFile
      }).then(res => {
        this.$message.success('保存成功')
        this.getProjectInfo(this.projectId)
      })
    },
    // 提交
    async sub() {
      this.front(1)
       const confirmResult = await this.$confirm('是否提交审核?', '提示', {
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        type: 'warning'
      }).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消')
      }
      relevantInputSubmit({ projectId: this.projectId }).then(res => {
        if(res.code == 0) {
          this.$message.success('提交成功')
          this.$router.back()
        }
      }).catch(err => err)
    },
    // 审批记录
    approval() {
      getProjectExamineLog({ projectId: this.projectId }).then( res => {
        this.activities = res.data
      })
      this.logVisible = true
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
  .el-alert {
    margin: 15px 0;
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
  .custom-upload-files {
    text-align: left;
  }
  .must-form-item {
    /deep/ .el-form-item__label:before {
      content: '*';
      color: red;
      margin-right: 4px;
    }
  }
  table {
    width: 100%;
    margin: 15px 0;
    border-collapse:collapse; 
    border: 1px solid #aaa;
    tr {
      border: 1px solid #aaa;
      td {
        border: 1px solid #aaa;
        width: 25%;
      }
    }
  }
  .el-input {
    width: 90%;
  }
  /deep/ .el-input__suffix {
    top: 5px;
  }
  .ht {
    border: 1px solid red;
    td {
      border: 1px solid #DCDFE6;
    }
  }
  
/deep/ .el-button--primary.is-disabled {
  background-color: #eee;
  border-color: #eee;
}
</style>
