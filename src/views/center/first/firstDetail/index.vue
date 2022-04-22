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
          <el-button size="small" @click="handleTermination" v-show="firstExamine == 1">终止项目</el-button>
          <!-- <el-button size="small" @click="handleView">工商数据查看</el-button> -->
          <el-button size="small" @click="handleApproval">审批记录</el-button>
          <el-button size="small" type="danger" @click="handleReject" v-show="firstExamine == 1">驳回审核</el-button>
          <el-button size="small" type="primary" @click="handleSupplement" v-show="firstExamine == 1">进入补充</el-button>
          <el-button size="small" type="primary" @click="handleFinal" v-show="firstExamine == 1">直接终审</el-button>
          <el-button size="small" type="primary" @click="handleReview" v-show="firstExamine == 1">进入复核</el-button>
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
              <span style="font-size: 12px;color: #aaa;margin:0 10px 0 70px;">合作说明</span>
              <el-tooltip class="item" effect="dark" :content="seProjectCooperate.otherMessage" placement="top">
                <span style="font-size: 12px;">{{ seProjectCooperate.otherMessage }}</span>
              </el-tooltip>
            </div>
          </ModeInfo>
          <ThreeInfo :seProjectNearThreeYearSellProfixList="seProjectNearThreeYearSellProfixList" :seProjectFinanceOtherMessage="seProjectFinanceOtherMessage" />
          <MaterialInfo :seProjectRelevantFile="seProjectRelevantFile" />
          <LoadInfo :seProjectRelevantFile="seProjectRelevantFile" />
        </el-tab-pane>

        <el-tab-pane label="收益测算" name="second">
          <div class="xian">
            <div>项目数据</div>
          </div>
          <el-row :gutter="20" style="margin-bottom:15px;">
            <el-col :span="8">
              <span style="font-size: 12px;color: #aaa;margin:0 10px 0 70px;">建站地址</span>
              <span style="font-size:12px;">{{ seProjectCompanyInfo.province }} {{ seProjectCompanyInfo.city }}</span>
            </el-col>
            <el-col :span="8">
              <span style="font-size: 12px;color: #aaa;margin:0 10px 0 85px;">年日照</span>
              <span style="font-size:12px;">{{ yearSunShine }}</span>
            </el-col>
            <el-col :span="8">
              <span style="font-size: 12px;color: #aaa;margin:0 10px 0 45px;">预估装机容量</span>
              <span style="font-size:12px;">{{ mayInstallVolume }} KW</span>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <span style="font-size: 12px;color: #aaa;margin:0 10px 0 40px;">屋顶使用年限</span>
              <span style="font-size:12px;" v-if="seProjectCompanyBuildInfo.useYears == 0">0-5年</span>
              <span style="font-size:12px;" v-else-if="seProjectCompanyBuildInfo.useYears == 1">6-10年</span>
              <span style="font-size:12px;" v-else-if="seProjectCompanyBuildInfo.useYears == 2">11-15年</span>
              <span style="font-size:12px;" v-else-if="seProjectCompanyBuildInfo.useYears == 3">16-20年</span>
              <span style="font-size:12px;" v-else-if="seProjectCompanyBuildInfo.useYears == 4">21-25年</span>
              <span style="font-size:12px;" v-else-if="seProjectCompanyBuildInfo.useYears == 5">26-30年</span>
              <span style="font-size:12px;" v-else>31年以上</span>
            </el-col>
            <el-col :span="8">
              <span style="font-size: 12px;color: #aaa;margin:0 10px 0 70px;">屋面材质</span>
              <span style="font-size:12px;" v-show="seProjectCompanyBuildInfo.housePartType && seProjectCompanyBuildInfo.housePartType.indexOf(0) !== -1">瓦铄屋面&nbsp;</span>
              <span style="font-size:12px;" v-show="seProjectCompanyBuildInfo.housePartType && seProjectCompanyBuildInfo.housePartType.indexOf(1) !== -1">混凝土屋面&nbsp;</span>
              <span style="font-size:12px;" v-show="seProjectCompanyBuildInfo.housePartType && seProjectCompanyBuildInfo.housePartType.indexOf(2) !== -1">彩钢瓦屋面&nbsp;</span>
              <span style="font-size:12px;" v-show="seProjectCompanyBuildInfo.housePartType && seProjectCompanyBuildInfo.housePartType.indexOf(3) !== -1">其他</span>
            </el-col>
            <el-col :span="8">
              <span style="font-size: 12px;color: #aaa;margin: 10px 5px 0 50px;">彩钢瓦类型</span>
              <el-select v-model="seProjectCompanyBuildInfo.colorSteelType" multiple placeholder="请选择(可多选)" :disabled="firstExamine == 2 || firstExamine == 3 || firstExamine == 99" clearable size="mini">
                <el-option label="无" value="0"></el-option>
                <el-option label="直立锁边" value="1"></el-option>
                <el-option label="角驰" value="2"></el-option>
                <el-option label="T型" value="3"></el-option>
                <el-option label="其它" value="4"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <div style="width: 33%;display:flex;margin-bottom:15px;">
            <div style="font-size: 12px;color:#aaa;margin: 5px 10px 0 25px;">彩钢瓦比水泥顶</div>
            <div>
              <el-input v-model="seProjectCompanyBuildInfo.colorSteelCementTopScale" type="number" class="spanmt" placeholder="请输入" :disabled="firstExamine == 2 || firstExamine == 3 || firstExamine == 99" clearable size="mini">
              <span slot="suffix">%</span>
            </el-input>
            </div>
          </div>

          <ModeInfo :seProjectCooperate="seProjectCooperate" />
          
          <div class="xian">
            <div>参数配置</div>
            <el-button type="primary" size="mini" @click="handleMeasure" :disabled="firstExamine == 2 || firstExamine == 3 || firstExamine == 99">测算数据</el-button>
          </div>
          <el-form ref="seProjectProfitConfigRef" :model="seProjectProfitConfig" :rules="seProjectProfitConfigRules" :disabled="firstExamine == 2 || firstExamine == 3 || firstExamine == 99" label-width="140px" size="mini">
            <el-row :gutter="20">
              <el-col :span="8" style="margin-top:10px;">
                <span style="font-size: 14px;color: #aaa;margin:0 10px 0 60px;">脱硫煤电价</span>
                <span style="font-size: 14px;">{{ seProjectProfitConfig.desulfurizeElectricityPrice ? seProjectProfitConfig.desulfurizeElectricityPrice + ' 元/KWH' : ' - ' }}</span>
              </el-col>
              <el-col :span="8">
                <el-form-item label="加权电价" prop="weightElectricityPrice">
                  <el-input v-model="seProjectProfitConfig.weightElectricityPrice" type="number" @input="handleBlur" placeholder="请输入" clearable>
                    <span slot="suffix">元/KWH</span>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="margin-top:10px;">
                <span style="font-size: 14px;color: #aaa;margin:0 10px 0 70px;">折后电价</span>
                <span style="font-size: 14px;">{{ seProjectProfitConfig.desulfurizeElectricityPrice ? seProjectProfitConfig.desulfurizeElectricityPrice + ' 元/KWH' : ' - ' }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="每年固定运维费用" prop="yearRepairPrice">
                  <el-input v-model="seProjectProfitConfig.yearRepairPrice" type="number" placeholder="请输入" clearable>
                    <span slot="suffix">元/瓦</span>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="第10年运维费用" prop="tenRepairPrice">
                  <el-input v-model="seProjectProfitConfig.tenRepairPrice" type="number" placeholder="请输入" clearable>
                    <span slot="suffix">元/瓦</span>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="第15年运维费用" prop="fifteenRepairPrice">
                  <el-input v-model="seProjectProfitConfig.fifteenRepairPrice" type="number" placeholder="请输入" clearable>
                    <span slot="suffix">元/瓦</span>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="自发自用比例" prop="selfUseScale">
                  <el-input v-model="seProjectProfitConfig.selfUseScale" type="number" placeholder="请输入" clearable>
                    <span slot="suffix">%</span>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="单瓦价格" prop="unitPrice">
                  <el-input v-model="seProjectProfitConfig.unitPrice" type="number" placeholder="请输入" clearable>
                    <span slot="suffix">元/瓦</span>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="并网电压类型" prop="voltageType">
                  <el-select v-model="seProjectProfitConfig.voltageType" placeholder="请选择" class="width100">
                    <el-option label="高压" :value="1"></el-option>
                    <el-option label="低压" :value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <MeasureInfo :projectTotalProfitModel="projectTotalProfitModel" :seProjectProfitCountList="seProjectProfitCountList" />
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-dialog :title="title" :visible.sync="dialogVisible" width="40%" @close="handleClose">
      <el-alert :title="alert" type="success" :closable="false" style="margin-top:0;" />
      <el-input type="textarea" :rows="3" placeholder="最多输入200字符（选填）" v-model="message" />
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleConfirm(type)">确 定</el-button>
      </span>
    </el-dialog>
    <ApprovalLog :logVisible.sync="logVisible" :activities="activities" />
  </div>
</template>

<script>
import { getProjectInfo, getProjectExamineLog } from '@/api/listProject'
import { getProfitMessage, putProfitMessage, projectFirstExamine } from '@/api/center'

export default {
  name: 'FirstDetail',
  data() {
    var checkCe = (rule, value, callback) => {
      const reg = /^(?:100|\d{1,2})(?:\.\d{1,2})?$/ 
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('限数字，0-100之间，小数点后2位'))
      }
    }
    var checkFour = (rule, value, callback) => {
      const reg = /^\d+(\.\d{1,4})?$/ 
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('限数字，若小数最多4位，＞0'))
      }
    }
    return {
      firstExamine: '',
      province: '',
      city:'',
      activeName: 'first',
      projectId: '',
      seProjectCompanyInfo: {},
      seProjectCompanyBuildInfo: {}, 
      seProjectPowerInfo: {}, 
      seProjectPowerTransformInfoList: [], 
      seProjectNearThreeYearSellProfixList: [],
      seProjectFinanceOtherMessage: {},
      seProjectCooperate: {}, 
      seProjectRelevantFile: {},
      yearSunShine: '',
      mayInstallVolume: '',
      seProjectProfitConfig: {
        projectId: this.$route.query.projectId,
      }, // 参数配置
      projectTotalProfitModel: {}, // 收益统计
      seProjectProfitConfigRules: {
        // weightElectricityPrice: [
        //   { required: true, message: '请输入加权电价', trigger: 'blur' },
        //   { validator: checkFour, trigger: 'blur' }
        // ],
        // yearRepairPrice: [
        //   { required: true, message: '请输入每年固定运维费用', trigger: 'blur' },
        //   { validator: checkFour, trigger: 'blur' }
        // ],
        // tenRepairPrice: [
        //   { required: true, message: '请输入第10年运维费用', trigger: 'blur' },
        //   { validator: checkFour, trigger: 'blur' }
        // ],
        // fifteenRepairPrice: [
        //   { required: true, message: '请输入第15年运维费用', trigger: 'blur' },
        //   { validator: checkFour, trigger: 'blur' }
        // ],
        // selfUseScale: [
        //   { required: true, message: '请输入自发自用比例', trigger: 'blur' },
        //   { validator: checkCe, trigger: 'blur' }
        // ],
        // unitPrice: [
        //   { required: true, message: '请输入单瓦价格', trigger: 'blur' },
        //   { validator: checkFour, trigger: 'blur' }
        // ],
        // voltageType: [{ required: true, message: '请选择并网电压类型', trigger: 'change' }]
      },
      seProjectProfitCountList: [], //  收益表格数据

      // 审核
      dialogVisible: false,
      title: '',
      message: '',
      alert: '',
      type: '',
      // 审批记录
      logVisible: false,
      activities: []
    }
  },
  created() {
    this.firstExamine = this.$route.query.firstExamine
    this.projectId = this.$route.query.projectId
    this.getProjectInfo(this.projectId)
  },
  methods: {
    handleClick(tab, event) {
      if(this.activeName == 'second') {
        getProfitMessage({ projectId: this.projectId}).then(res => { // 收益试算
          const { yearSunShine, mayInstallVolume, seProjectProfitConfig, projectTotalProfitModel, seProjectProfitCountList } = res.data
          this.yearSunShine = yearSunShine
          this.mayInstallVolume = mayInstallVolume
          this.projectTotalProfitModel = projectTotalProfitModel
          this.seProjectProfitConfig = { ...seProjectProfitConfig }
          this.seProjectProfitCountList = seProjectProfitCountList
          this.seProjectProfitConfig.voltageType = 0
        })
      }
    },
    getProjectInfo() {
      getProjectInfo({ projectId: this.projectId }).then(res => {
        const { seProjectCompanyInfo, seProjectCompanyBuildInfo, seProjectPowerInfo, seProjectPowerTransformInfoList, seProjectCooperate, seProjectRelevantFile, seProjectNearThreeYearSellProfixList, seProjectFinanceOtherMessage } = res.data
        this.seProjectNearThreeYearSellProfixList = seProjectNearThreeYearSellProfixList
        this.seProjectFinanceOtherMessage = { ...seProjectFinanceOtherMessage }
        this.seProjectCompanyInfo = seProjectCompanyInfo
        this.seProjectCompanyBuildInfo = seProjectCompanyBuildInfo
        if(seProjectCompanyBuildInfo.colorSteelType) {
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
    handleMeasure() { // 测算数据
      // this.$refs.seProjectProfitConfigRef.validate((valid) => {
        // if(!valid) {
        //   this.$message.error('请填写相关测算数据') 
        //   return
        // } else {
          if(this.seProjectCompanyBuildInfo.colorSteelType.length > 1) {
            this.seProjectCompanyBuildInfo.colorSteelType = this.seProjectCompanyBuildInfo.colorSteelType.join(',')
          } else {
            this.seProjectCompanyBuildInfo.colorSteelType = this.seProjectCompanyBuildInfo.colorSteelType[0]
          }
          if(this.seProjectCooperate.electricityDiscountFlag == true) {
            this.seProjectCooperate.electricityDiscountFlag = 1
          }
          if(this.seProjectCooperate.houseLeaseFlag == true) {
            this.seProjectCooperate.houseLeaseFlag = 1
          }
          if(this.seProjectCooperate.ownPutFlag == true) {
            this.seProjectCooperate.ownPutFlag = 1
          }
          putProfitMessage({
            province: this.province,
            city: this.city,
            mayInstallVolume: this.mayInstallVolume,
            yearSunShine: this.yearSunShine,
            seProjectCompanyBuildInfo: this.seProjectCompanyBuildInfo,
            seProjectCooperate: this.seProjectCooperate,
            seProjectProfitConfig: this.seProjectProfitConfig,
            projectTotalProfitModel: this.projectTotalProfitModel,
            seProjectProfitCountList: this.seProjectProfitCountList
          }).then(res => {
            this.$message.success('测算成功')
            getProfitMessage({ projectId: this.projectId}).then(res => { // 收益试算
              const { projectTotalProfitModel, seProjectProfitCountList, seProjectCompanyBuildInfo, seProjectCooperate, yearSunShine } = res.data
              this.yearSunShine = yearSunShine
              this.projectTotalProfitModel = projectTotalProfitModel
              this.seProjectProfitCountList = seProjectProfitCountList
              this.seProjectCompanyBuildInfo = seProjectCompanyBuildInfo
              if(seProjectCompanyBuildInfo.colorSteelType) {
                this.seProjectCompanyBuildInfo.colorSteelType = this.seProjectCompanyBuildInfo.colorSteelType.split(',')
              }
              this.seProjectCooperate = seProjectCooperate
              if(seProjectCooperate.ownPutFlag == 1) {
                this.seProjectCooperate.ownPutFlag = true 
              }
              if(seProjectCooperate.electricityDiscountFlag == 1) {
                this.seProjectCooperate.electricityDiscountFlag = true
              }
              if(seProjectCooperate.houseLeaseFlag == 1) {
                this.seProjectCooperate.houseLeaseFlag = true
              }
            })
          })
        // }
      // })
    },
    handleBlur() { // 计算折后电价
      if(this.seProjectCooperate.electricityDiscountScale) {
          this.seProjectProfitConfig.discountElectricityPrice =  ( this.seProjectProfitConfig.weightElectricityPrice * (( this.seProjectCooperate.electricityDiscountScale )/ 100 )).toFixed(4) - 0
      } else {
          this.seProjectProfitConfig.discountElectricityPrice = ( this.seProjectProfitConfig.weightElectricityPrice * 1 ).toFixed(4) -0 
      }
    },
    handleDown(url) {
      window.open(url)
    },
    handleChange() {},

    // 审核
    handleView() {},  // 工商数据查看
    handleTermination() { // 终止项目
      this.dialogVisible = true
      this.title = '终止项目详情'
      this.alert = '终止项目，请输入终止理由'
      this.type = 4
    },
    handleReject() {  // 驳回审核
      this.dialogVisible = true
      this.title = '驳回审核详情'
      this.alert = '审核驳回处理，请输入驳回理由'
      this.type = 0
    },
    handleSupplement() { // 进入补充
      this.dialogVisible = true
      this.title = '材料补充详情'
      this.alert = '进行审核通过处理，将项目提交至材料补充，请输入审核详情。'
      this.type = 1
    },
    handleFinal() { // 直接终审
      this.dialogVisible = true
      this.title = '直接终审详情'
      this.alert = '进行审核通过处理，将项目提交至项目终审，请输入审核详情。'
      this.type = 3
    },
    handleReview() {  // 进入复核
      this.dialogVisible = true
      this.title = '进入复核详情'
      this.alert = '进行审核通过处理，将项目提交至图纸复核，请输入审核详情。'
      this.type = 2
    },
    handleConfirm() {
      projectFirstExamine({
        projectId: this.projectId,
        type: this.type,
        message: this.message
      }).then(res => {
        if( this.type == 0 ) {
            this.$message.success('项目已审核驳回')
            this.dialogVisible = false
            this.$router.back()
          } else if( this.type == 1 ) {
            this.$message.success('项目已进入材料补充')
            this.dialogVisible = false
            this.$router.back()
          } else if( this.type == 2 ) {
            this.$message.success('项目已进入图纸复核')
            this.dialogVisible = false
            this.$router.back()
          } else if( this.type == 3 ) {
            this.$message.success('项目已进入项目终审')
            this.dialogVisible = false
            this.$router.back()
          } else if( this.type == 4 ) {
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
      this.alert = '',
      this.type = ''
    },
    handleApproval() { // 记录
      getProjectExamineLog({ projectId: this.projectId }).then(res => {
        this.activities = res.data 
      })
      this.logVisible = true
    }
  },
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
    display: flex;
    justify-content: space-between;
    color: #1890FF;
    border-bottom: 1px solid #1890FF;
    padding-bottom: 5px;
    margin-bottom: 20px;
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
  
  /deep/ .el-input-number__decrease {
    display: none;
  }
  /deep/ .el-input-number__increase {
    display: none;
  }
  .spanmt {
    /deep/ .el-input__suffix {
      margin-top: 7px;
    }
  }
/deep/ .el-button--primary.is-disabled {
  background-color: #eee;
  border-color: #eee;
}
</style>