<template>
  <div>
    <ProjectTitle title="测算结果" />
    <div style="margin-top:15px;display:flex;justify-content:space-around;">
      <div class="t1" style="background-color:#3C4563;">
        <p style="font-size: 14px;margin-left:30px;">全投资内部收益率</p>
        <p style="font-size: 36px;font-weight:900;text-align:center;margin-top:25px;">{{ projectTotalProfitModel.innerScal ? projectTotalProfitModel.innerScal.toFixed(2) + ' % ' : ' - ' }}</p>
      </div>
      <div class="t1" style="background-color:#8892DF;">
        <p style="font-size: 14px;margin-left:30px;">投资偿还期（年）</p>
        <p style="font-size: 36px;font-weight:900;text-align:center;margin-top:25px;">{{ projectTotalProfitModel.investNum ? projectTotalProfitModel.investNum.toFixed(2) : ' - ' }}</p>
      </div>
      <div class="t1" style="background-color:#6FACFD;">
        <p style="font-size: 14px;margin-left:30px;">总投资费用（万元）</p>
        <p style="font-size: 36px;font-weight:900;text-align:center;margin-top:25px;">{{ projectTotalProfitModel.totalInvestPrice ? projectTotalProfitModel.totalInvestPrice.toFixed(2) : ' - ' }}</p>
      </div>
      <div class="t1" style="background-color:#ED7E77;">
        <p style="font-size: 14px;margin-left:30px;">首年发电量</p>
        <p style="font-size: 36px;font-weight:900;text-align:center;margin-top:25px;">{{ projectTotalProfitModel.firstElectric ? projectTotalProfitModel.firstElectric.toFixed(2) : ' - ' }}</p>
      </div>
    </div>
    <div style="margin-top:15px;display:flex;justify-content:space-around;">
      <div class="b1">
        <div style="display:flex;justify-content:space-between;">
          <p class="fs14">发电总效益(万元)</p>
          <p class="fw800">{{ projectTotalProfitModel.totalElectricUseIncomeScal ? projectTotalProfitModel.totalElectricUseIncomeScal.toFixed(2) : ' - ' }}</p>
        </div>
        <div style="display:flex;justify-content:space-between;">
          <p class="fs14">每年均值(万元)</p>
          <p class="fw800">{{ projectTotalProfitModel.averageElectricUseIncomeScal ? projectTotalProfitModel.averageElectricUseIncomeScal.toFixed(2) : ' - ' }}</p>
        </div>
      </div>
      <div class="b1">
        <div style="display:flex;justify-content:space-between;">
          <p class="fs14">总净利润(万元)</p>
          <p class="fw800">{{ projectTotalProfitModel.totalCleanProfit ? projectTotalProfitModel.totalCleanProfit.toFixed(2) : ' - ' }}</p>
        </div>
        <div style="display:flex;justify-content:space-between;">
          <p class="fs14">每年均值(万元)</p>
          <p class="fw800">{{ projectTotalProfitModel.averageCleanProfit ? projectTotalProfitModel.averageCleanProfit.toFixed(2) : ' - ' }}</p>
        </div>
      </div>
      <div class="b1">
        <div style="display:flex;justify-content:space-between;">
          <p class="fs14">投资方总收入(万元)</p>
          <p class="fw800">{{ projectTotalProfitModel.totalInvestorIncome ? projectTotalProfitModel.totalInvestorIncome.toFixed(2) : ' - ' }}</p>
        </div>
        <div style="display:flex;justify-content:space-between;">
          <p class="fs14">每年均值(万元)</p>
          <p class="fw800">{{ projectTotalProfitModel.averageInvestorIncome ? projectTotalProfitModel.averageInvestorIncome.toFixed(2) : ' - ' }}</p>
        </div>
      </div>
      <div class="b1">
        <div style="display:flex;justify-content:space-between;">
          <p class="fs14">自投总收入(万元)</p>
          <p class="fw800">{{ projectTotalProfitModel.totalOwnIncome ? projectTotalProfitModel.totalOwnIncome.toFixed(2) : ' - ' }}</p>
        </div>
        <div style="display:flex;justify-content:space-between;">
          <p class="fs14">每年均值(万元)</p>
          <p class="fw800">{{ projectTotalProfitModel.averageOwnIncome ? projectTotalProfitModel.averageOwnIncome.toFixed(2) : ' - ' }}</p>
        </div>
      </div>
    </div>
    <el-table :data="seProjectProfitCountList" border stripe style="margin-top:20px;" :header-cell-style="{background:'#f2f2f2',color:'#555'}" size="mini">
      <el-table-column prop="yearNum" label="年份" width="60px;" />
      <el-table-column prop="electricYear" label="发电量" width="100px;" />
      <el-table-column prop="electricYearSelfUse" label="企业自用电量" width="130px;" />
      <el-table-column prop="electricUseIncome" label="企业用电收入（万元）" />
      <el-table-column prop="electricYearBeLeft" label="余电上网电量" width="130px;" />
      <el-table-column prop="electricYearBeLeftIncome" label="余电上网收入（万元）" />
      <el-table-column prop="ownInvestIncome" label="自投总收入（万元）" />
      <el-table-column prop="electricUseIncomeScale" label="企业用电收益（万元）" />
      <el-table-column prop="investorIncome" label="投资方收入（万元）" />
      <el-table-column prop="shareEnergyEfficiency" label="企业分享节能效益" />
      <el-table-column prop="repairOutPrice" label="运维支出（万元）" />
      <el-table-column prop="cleanProfit" label="净利润（万元）" />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'MeasureInfo',
  props: {
    projectTotalProfitModel: {
      type: Object,
      default: () => {}
    },
    seProjectProfitCountList: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss" scoped>
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
    margin: 0 10px;
    padding: 0 15px;
    background-color: #f2f2f2;
  }
</style>