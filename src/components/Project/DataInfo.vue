<template>
  <div>
    <ProjectTitle title="项目数据" />
    <el-row :gutter="20" style="margin-top:15px;margin-bottom:15px;">
      <el-col :span="8">
        <span style="font-size: 14px;color: #aaa;margin:0 10px 0 68px;">建站地址</span>
        <span style="font-size: 14px;">{{ province }} {{ city }}</span>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 14px;color: #aaa;margin:0 10px 0 75px;">年日照</span>
        <span style="font-size: 14px;">{{ yearSunShine }}</span>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 14px;color: #aaa;margin:0 10px 0 25px;">预估装机容量</span>
        <span style="font-size: 14px;">{{ mayInstallVolume }} KW</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <span style="font-size: 14px;color: #aaa;margin:0 10px 0 38px;">屋顶使用年限</span>
        <span style="font-size: 14px;" v-if="seProjectCompanyBuildInfo.useYears == 0">0-5年</span>
        <span style="font-size: 14px;" v-else-if="seProjectCompanyBuildInfo.useYears == 1">6-10年</span>
        <span style="font-size: 14px;" v-else-if="seProjectCompanyBuildInfo.useYears == 2">11-15年</span>
        <span style="font-size: 14px;" v-else-if="seProjectCompanyBuildInfo.useYears == 3">16-20年</span>
        <span style="font-size: 14px;" v-else-if="seProjectCompanyBuildInfo.useYears == 4">21-25年</span>
        <span style="font-size: 14px;" v-else-if="seProjectCompanyBuildInfo.useYears == 5">26-30年</span>
        <span style="font-size: 14px;" v-else>31年以上</span>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 14px;color: #aaa;margin:0 10px 0 62px;">屋面材质</span>
        <span style="font-size: 14px;" v-show="seProjectCompanyBuildInfo.housePartType && seProjectCompanyBuildInfo.housePartType.indexOf(0) !== -1">瓦铄屋面 &nbsp;</span>
        <span style="font-size: 14px;" v-show="seProjectCompanyBuildInfo.housePartType && seProjectCompanyBuildInfo.housePartType.indexOf(1) !== -1">混凝土屋面 &nbsp;</span>
        <span style="font-size: 14px;" v-show="seProjectCompanyBuildInfo.housePartType && seProjectCompanyBuildInfo.housePartType.indexOf(2) !== -1">彩钢瓦屋面 &nbsp;</span>
        <span style="font-size: 14px;" v-show="seProjectCompanyBuildInfo.housePartType && seProjectCompanyBuildInfo.housePartType.indexOf(3) !== -1">其他</span>
      </el-col>
      <el-col :span="8">
        <sapn style="font-size: 14px;color: #aaa;margin:0 10px 0 38px;">彩钢瓦类型</sapn>
        <span style="font-size: 14px;" v-show="seProjectCompanyBuildInfo.colorSteelType && seProjectCompanyBuildInfo.colorSteelType.indexOf(0) !== -1">无 &nbsp;</span>
        <span style="font-size: 14px;" v-show="seProjectCompanyBuildInfo.colorSteelType && seProjectCompanyBuildInfo.colorSteelType.indexOf(1) !== -1">直立锁边 &nbsp;</span>
        <span style="font-size: 14px;" v-show="seProjectCompanyBuildInfo.colorSteelType && seProjectCompanyBuildInfo.colorSteelType.indexOf(2) !== -1">角驰 &nbsp;</span>
        <span style="font-size: 14px;" v-show="seProjectCompanyBuildInfo.colorSteelType && seProjectCompanyBuildInfo.colorSteelType.indexOf(3) !== -1">T型 &nbsp;</span>
        <span style="font-size: 14px;" v-show="seProjectCompanyBuildInfo.colorSteelType && seProjectCompanyBuildInfo.colorSteelType.indexOf(4) !== -1">其他</span>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top:15px;margin-bottom:15px;">
      <el-col :span="8">
        <span style="font-size: 14px;color: #aaa;margin:0 10px 0 25px;">彩钢瓦比水泥顶</span>
        <span style="font-size: 14px;">{{ seProjectCompanyBuildInfo.colorSteelCementTopScale }} %</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'DataInfo',
  props: {
    province: String,
    city: String,
    yearSunShine: Number,
    mayInstallVolume: Number,
    seProjectCompanyBuildInfo: {
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