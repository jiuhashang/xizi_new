<template>
  <!-- 合作模式 -->
  <div>
    <div class="xian">
      <div>合作模式</div>
    </div>
    <el-alert title="请选择投资模式，在其他投资情况下，折扣与租金可以多选。" type="success" :closable="false" />
    <el-form ref="cooperateForm" :rules="cooperateRules" :model="seProjectCooperate" label-width="130px">
      <el-row :gutter="20" style="margin:30px 30px 0 30px;">
        <el-col :span="8">
          <el-form-item label="合作模式" prop="cooperateType" class="must-form-item">
            <el-select v-model="seProjectCooperate.cooperateType" placeholder="请选择" class="width100">
              <el-option label="业主投资" :value="0"></el-option>
              <el-option label="其他投资" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-show="seProjectCooperate.cooperateType == 0">
          <el-checkbox v-model="seProjectCooperate.ownPutFlag">
            <el-form-item label="业主自投，预算">
              <el-input v-model="seProjectCooperate.ownPutMoney" class="width100" placeholder="请输入">
                <span slot="suffix">万元</span>
              </el-input>
            </el-form-item>
          </el-checkbox>
        </el-col>
        <el-col :span="8" v-show="seProjectCooperate.cooperateType == 1">
          <el-checkbox v-model="seProjectCooperate.electricityDiscountFlag">
            <el-form-item label="电费折扣，比例">
              <el-input v-model="seProjectCooperate.electricityDiscountScale" class="width100" placeholder="请输入">
                <span slot="suffix">%</span>
              </el-input>
            </el-form-item>
          </el-checkbox>
        </el-col>
        <el-col :span="8" v-show="seProjectCooperate.cooperateType == 1">
          <el-checkbox v-model="seProjectCooperate.houseLeaseFlag">
            <el-form-item label="出租屋面，租金">
              <el-input v-model="seProjectCooperate.houseLeaseMoney" class="width100" placeholder="请输入">
                <span slot="suffix">万元/年</span>
              </el-input>
            </el-form-item>
          </el-checkbox>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CooperationMode',

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