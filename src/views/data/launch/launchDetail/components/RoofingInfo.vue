<template>
  <!-- 屋面信息 -->
  <div>
    <div class="xian">
      <div>屋面信息</div>
    </div>
    <el-form ref="companyBuildInfoForm" :rules="CompanyBuildInfoRules" :model="seProjectCompanyBuildInfo" label-width="130px">
      <el-row :gutter="20" style="margin:30px 30px 0 30px;">
        <el-col :span="8">
          <el-form-item label="屋顶总面积" prop="houseArea" class="must-form-item">
            <el-input v-model="seProjectCompanyBuildInfo.houseArea">
              <span slot="suffix">㎡</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建筑物个数" prop="buildNum" class="must-form-item">
            <el-input v-model="seProjectCompanyBuildInfo.buildNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="屋面正南遮挡物" prop="houseSouthScreenFlag" class="must-form-item">
            <el-select v-model="seProjectCompanyBuildInfo.houseSouthScreenFlag" placeholder="请选择" class="width100">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:30px;">
        <el-col :span="8">
          <el-form-item label="屋顶使用年限" prop="useYears" class="must-form-item">
            <el-select v-model="seProjectCompanyBuildInfo.useYears" placeholder="请选择" class="width100">
              <el-option label="0-5年" :value="0"></el-option>
              <el-option label="6-10年" :value="1"></el-option>
              <el-option label="11-15年" :value="2"></el-option>
              <el-option label="16-20年" :value="3"></el-option>
              <el-option label="21-25年" :value="4"></el-option>
              <el-option label="26-30年" :value="5"></el-option>
              <el-option label="31年以上" :value="6"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="屋面材质" prop="housePartType" class="must-form-item">
            <el-select v-model="housePartType"
              @change="housePartTypeChange"
              multiple
              clearable
              placeholder="请选择(可多选)"
              class="width100">
              <el-option label="瓦砾屋面" value="0"></el-option>
              <el-option label="混凝土屋面" value="1"></el-option>
              <el-option label="彩钢瓦屋面" value="2"></el-option>
              <el-option label="其它" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="彩钢瓦类型" prop="colorSteelType" class="must-form-item">
            <el-select v-model="colorSteelType"
              @change="colorSteelTypeChange"
              multiple
              clearable
              placeholder="请选择(可多选)" 
              class="width100"
              :disabled="houseDis">
              <el-option label="直立锁边" value="1"></el-option>
              <el-option label="角驰" value="2"></el-option>
              <el-option label="T型" value="3"></el-option>
              <el-option label="其它" value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:0 30px 30px 30px;">
        <el-col :span="8">
          <el-form-item label="彩钢瓦比水泥顶" prop="colorSteelCementTopScale" class="must-form-item">
            <el-input v-model="seProjectCompanyBuildInfo.colorSteelCementTopScale">
              <span slot="suffix">%</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="其他屋面材质说明">
            <el-input v-model="seProjectCompanyBuildInfo.otherMessage"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'RoofingInfo',

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