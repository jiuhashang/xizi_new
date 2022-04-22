<template>
  <div>
    <ProjectTitle title="参数配置" />
    <el-row :gutter="20" style="margin-top:15px;margin-bottom:15px;">
      <el-col :span="8">
        <span style="font-size: 14px;color: #aaa;margin:0 10px 0 55px;">脱硫煤电价</span>
        <span style="font-size: 14px;">{{ seProjectProfitConfig.desulfurizeElectricityPrice }} 元/KWH</span>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 14px;color: #aaa;margin:0 10px 0 60px;">加权电价</span>
        <span style="font-size: 14px;">{{ seProjectProfitConfig.weightElectricityPrice }} 元/KWH</span>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 14px;color: #aaa;margin:0 10px 0 50px;">折后电价</span>
        <span style="font-size: 14px;">{{ seProjectProfitConfig.discountElectricityPrice }} 元/KWH</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <span style="font-size: 14px;color: #aaa;margin:0 10px 0 12px;">每年固定运维费用</span>
        <span style="font-size: 14px;">{{ seProjectProfitConfig.yearRepairPrice }} 元/瓦</span>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 14px;color: #aaa;margin:0 10px 0 18px;">第10年运维费用</span>
        <span style="font-size: 14px;">{{ seProjectProfitConfig.tenRepairPrice }} 元/瓦</span>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 14px;color: #aaa;margin:0 10px 0 5px;">第15年运维费用</span>
        <span style="font-size: 14px;">{{ seProjectProfitConfig.fifteenRepairPrice }} 元/瓦</span>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top:15px;margin-bottom:15px;">
      <el-col :span="8">
        <span style="font-size: 14px;color: #aaa;margin:0 10px 0 40px;">自发自用比例</span>
        <span style="font-size: 14px;">{{ seProjectProfitConfig.selfUseScale }} %</span>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 14px;color: #aaa;margin:0 10px 0 63px;">单瓦价格</span>
        <span style="font-size: 14px;">{{ seProjectProfitConfig.unitPrice }} 元/瓦</span>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 14px;color: #aaa;margin:0 10px 0 22px;">并网电压类型</span>
        <span style="font-size: 14px;">{{ seProjectProfitConfig.voltageType ? '高压' : '低压'}} </span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ParamInfo',
  props: {
    seProjectProfitConfig: {
      type: Object,
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

</style>