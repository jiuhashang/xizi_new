<template>
  <div>
    <ProjectTitle title="合作模式" />
    <el-row :gutter="20" style="margin:15px 0;">
    <el-col :span="8">
      <span style="font-size: 12px;color: #aaa;margin:0 10px 0 60px;">合作模式</span>
      <span style="font-size: 12px;" v-if="seProjectCooperate.cooperateType == 0">业主投资</span>
      <span style="font-size: 12px;" v-else>其他投资</span>
    </el-col>
    <el-col :span="8" v-show="seProjectCooperate.cooperateType == 0">
      <el-checkbox v-model="seProjectCooperate.ownPutFlag" disabled />
      <span style="font-size: 12px;margin-left:10px;">业主自投，预算 : {{ seProjectCooperate.ownPutMoney }} 万元</span>
    </el-col>
    <el-col :span="8" v-show="seProjectCooperate.cooperateType == 1">
      <el-checkbox v-model="seProjectCooperate.electricityDiscountFlag" disabled />
      <span style="font-size: 12px;margin-left:10px;">电费折扣，比例 : {{ seProjectCooperate.electricityDiscountScale }} %</span>
    </el-col>
    <el-col :span="8" v-show="seProjectCooperate.cooperateType == 1">
      <el-checkbox v-model="seProjectCooperate.houseLeaseFlag" disabled />
      <span style="font-size: 12px;margin-left:10px;">出租屋面，租金 : {{ seProjectCooperate.houseLeaseMoney }} 万元/年</span>
    </el-col>
    </el-row>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ModeInfo',
  props: {
    seProjectCooperate: {
      type: Object,
      default: () =>{}
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