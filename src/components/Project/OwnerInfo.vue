<template>
  <div>
    <ProjectTitle title="业主信息" />
    <el-row :gutter="20" style="margin-top:15px;">
      <el-col :span="8" class="yi">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 60px;">公司名称</span>
        <el-tooltip class="item" effect="dark" :content="seProjectCompanyInfo.companyName" placement="top">
          <span style="font-size: 12px;">{{ seProjectCompanyInfo.companyName }}</span>
        </el-tooltip>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 15px;">统一社会信用代码</span>
        <span style="font-size: 12px;">{{ seProjectCompanyInfo.sameCreditCode }}</span>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 60px;">注册资本</span>
        <span style="font-size: 12px;">{{ seProjectCompanyInfo.registerMoney }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top:15px;">
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 60px;">公司性质</span>
        <span style="font-size: 12px;" v-show="seProjectCompanyInfo.companyType == 0">央企</span>
        <span style="font-size: 12px;" v-show="seProjectCompanyInfo.companyType == 1">外资</span>
        <span style="font-size: 12px;" v-show="seProjectCompanyInfo.companyType == 2">国企</span>
        <span style="font-size: 12px;" v-show="seProjectCompanyInfo.companyType == 3">上市公司</span>
        <span style="font-size: 12px;" v-show="seProjectCompanyInfo.companyType == 4">股份制</span>
        <span style="font-size: 12px;" v-show="seProjectCompanyInfo.companyType == 5">其他</span>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 65px;">建站地址</span>
        <span style="font-size: 12px;">{{seProjectCompanyInfo.province}} {{seProjectCompanyInfo.city}}</span>
      </el-col>
      <el-col :span="8" class="yi">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 60px;">详细地址</span>
        <el-tooltip class="item" effect="dark" :content="seProjectCompanyInfo.setAddress" placement="top">
          <span style="font-size: 12px;">{{ seProjectCompanyInfo.setAddress }}</span>
        </el-tooltip>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top:15px;margin-bottom:15px;">
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 45px;">公司联系人</span>
        <span style="font-size: 12px;">{{ seProjectCompanyInfo.legalPerson }}</span>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 40px;">联系人手机号</span>
        <span style="font-size: 12px;">{{ seProjectCompanyInfo.companyPhone }}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'OwnerInfo',
  props: {
    seProjectCompanyInfo: {
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