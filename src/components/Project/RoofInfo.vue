<template>
  <div>
    <ProjectTitle title="屋面信息" />
    <el-row :gutter="20" style="margin:15px 0;">
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 35px;">屋面总面积</span>
        <span style="font-size: 12px;">{{ seProjectCompanyBuildInfo.houseArea }} m²</span>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 45px;">建筑物个数</span>
        <span style="font-size: 12px;">{{ seProjectCompanyBuildInfo.buildNum }}</span>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 30px;">屋面正南遮挡物</span>
        <span style="font-size: 12px;" v-if="seProjectCompanyBuildInfo.houseSouthScreenFlag ==0">否</span>
        <span style="font-size: 12px;" v-else>是</span>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin:15px 0;">
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 20px;">屋顶使用年限</span>
        <span style="font-size: 12px;" v-if="seProjectCompanyBuildInfo.useYears == 0">0-5年</span>
        <span style="font-size: 12px;" v-else-if="seProjectCompanyBuildInfo.useYears == 1">6-10年</span>
        <span style="font-size: 12px;" v-else-if="seProjectCompanyBuildInfo.useYears == 2">11-15年</span>
        <span style="font-size: 12px;" v-else-if="seProjectCompanyBuildInfo.useYears == 3">16-20年</span>
        <span style="font-size: 12px;" v-else-if="seProjectCompanyBuildInfo.useYears == 4">21-25年</span>
        <span style="font-size: 12px;" v-else-if="seProjectCompanyBuildInfo.useYears == 5">26-30年</span>
        <span style="font-size: 12px;" v-else>31年以上</span>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 60px;">屋面材质</span>
        <span style="font-size: 12px;" v-show="seProjectCompanyBuildInfo.housePartType && seProjectCompanyBuildInfo.housePartType.indexOf(0) !== -1">瓦铄屋面&nbsp;</span>
        <span style="font-size: 12px;" v-show="seProjectCompanyBuildInfo.housePartType && seProjectCompanyBuildInfo.housePartType.indexOf(1) !== -1">混凝土屋面&nbsp;</span>
        <span style="font-size: 12px;" v-show="seProjectCompanyBuildInfo.housePartType && seProjectCompanyBuildInfo.housePartType.indexOf(2) !== -1">彩钢瓦屋面&nbsp;</span>
        <span style="font-size: 12px;" v-show="seProjectCompanyBuildInfo.housePartType && seProjectCompanyBuildInfo.housePartType.indexOf(3) !== -1">其他</span>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 55px;">彩钢瓦类型</span>
        <span style="font-size: 12px;" v-show="seProjectCompanyBuildInfo.colorSteelType && seProjectCompanyBuildInfo.colorSteelType.indexOf(0) !== -1">无&nbsp;</span>
        <span style="font-size: 12px;" v-show="seProjectCompanyBuildInfo.colorSteelType && seProjectCompanyBuildInfo.colorSteelType.indexOf(1) !== -1">直立锁边&nbsp;</span>
        <span style="font-size: 12px;" v-show="seProjectCompanyBuildInfo.colorSteelType && seProjectCompanyBuildInfo.colorSteelType.indexOf(2) !== -1">角驰&nbsp;</span>
        <span style="font-size: 12px;" v-show="seProjectCompanyBuildInfo.colorSteelType && seProjectCompanyBuildInfo.colorSteelType.indexOf(3) !== -1">T型&nbsp;</span>
        <span style="font-size: 12px;" v-show="seProjectCompanyBuildInfo.colorSteelType && seProjectCompanyBuildInfo.colorSteelType.indexOf(4) !== -1">其他</span>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin:15px 0;">
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 10px;">彩钢瓦比水泥顶</span>
        <span style="font-size: 12px;">{{ seProjectCompanyBuildInfo.colorSteelCementTopScale }} %</span>
      </el-col>
      <el-col :span="16" class="yi">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 10px;">其他屋面材质说明</span>
        <el-tooltip class="item" effect="dark" :content="seProjectCompanyBuildInfo.otherMessage" placement="top">
          <span style="font-size: 12px;">{{ seProjectCompanyBuildInfo.otherMessage }}</span>
        </el-tooltip>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'RoofInfo',
  props: {
    seProjectCompanyBuildInfo: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style>

</style>