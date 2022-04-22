<template>
  <!-- 业主信息 -->
  <div>
    <div class="xian">
      <div>业主信息</div>
    </div>
    <el-form ref="companyInfoForm" :rules="companyInfoRules" :model="seProjectCompanyInfo" label-width="130px">
      <el-row :gutter="20" style="margin-top:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="7" class="span13">公司名称</el-col>
            <el-col :span="16" class="span130">{{ $route.query.companyName }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="6" class="span13">统一社会信用代码</el-col>
            <el-col :span="16" class="span130">{{ seProjectCompanyInfo.sameCreditCode }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="5" class="span13" style="padding-right:15px;">注册资本</el-col>
            <el-col :span="16" class="span130" style="padding-left:0;">{{ seProjectCompanyInfo.registerMoney }}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:30px;">
        <el-col :span="8">
          <el-form-item label="公司性质" prop="companyType" class="must-form-item">
            <el-select v-model="seProjectCompanyInfo.companyType" placeholder="请选择" class="width100">
              <el-option label="央企" :value="0"></el-option>
              <el-option label="外资" :value="1"></el-option>
              <el-option label="国企" :value="2"></el-option>
              <el-option label="上市公司" :value="3"></el-option>
              <el-option label="股份制" :value="4"></el-option>
              <el-option label="其他" :value="5"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建站地址" class="must-form-item">
            <el-cascader
              v-model="value"
              :options="options"
              :props="{ expandTrigger: 'hover', label:'province', value: 'province', children:'cities' }"
              @change="handleChange"
              clearable
              class="width100" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="详细地址">
            <el-input v-model="seProjectCompanyInfo.setAddress"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:0 30px 30px 30px;">
        <el-col :span="8">
          <el-form-item label="公司联系人">
            <el-input v-model="seProjectCompanyInfo.legalPerson"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系人手机号">
            <el-input v-model="seProjectCompanyInfo.companyPhone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'OwnerInfo',

  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style lang="scss" scoped>

</style>