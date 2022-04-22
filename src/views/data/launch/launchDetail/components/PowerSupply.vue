<template>
  <!-- 供电现状 -->
  <div>
    <div class="xian">
      <div>供电现状</div>
    </div>
    <el-form ref="powerInfoForm" :rules="powerInfoRules" :model="seProjectPowerInfo" label-width="140px">
      <el-row :gutter="20" style="margin:30px 30px 0 30px;">
        <el-col :span="8">
          <el-form-item label="供电类型" prop="prowerType" class="must-form-item">
            <el-select v-model="seProjectPowerInfo.prowerType" placeholder="请选择"  class="width100">
              <el-option label="工业" :value="0"></el-option>
              <el-option label="商业" :value="1"></el-option>
              <el-option label="农用" :value="2"></el-option>
              <el-option label="居民用电" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="变压器容量" prop="transformerVolume" class="must-form-item">
            <el-input v-model="seProjectPowerInfo.transformerVolume">
              <span slot="suffix">kVA</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="变压器台数" prop="transformerNum" class="must-form-item">
            <el-input v-model="seProjectPowerInfo.transformerNum">
              <span slot="suffix">台</span>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:30px;">
        <el-col :span="8">
          <el-form-item label="预估装机容量" prop="mayInstallVolume" class="must-form-item">
            <el-input v-model="seProjectPowerInfo.mayInstallVolume">
              <span slot="suffix">kW</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="法定节假日是否休息" prop="legalHolidayFlag" class="must-form-item">
            <el-select v-model="seProjectPowerInfo.legalHolidayFlag" placeholder="请选择"  class="width100">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="周末生产情况" prop="weekendFlag" class="must-form-item">
            <el-select v-model="seProjectPowerInfo.weekendFlag" placeholder="请选择"  class="width100">
              <el-option label="单班" :value="0"></el-option>
              <el-option label="双班" :value="1"></el-option>
              <el-option label="连续生产" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:0 30px 30px 30px;">
        <el-col :span="8">
          <el-form-item label="中午设备是否停机" prop="noonEquipmentFlag" class="must-form-item">
            <el-select v-model="seProjectPowerInfo.noonEquipmentFlag" placeholder="请选择"  class="width100">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="其他供电说明">
            <el-input v-model="seProjectPowerInfo.otherMessage"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-card style="margin-bottom:50px;">
      <div slot="header" class="clearfix">
        <span>变压器各台容量（选填）</span>
      </div>
      <div>
        <el-button type="primary" size="small" @click="open">添加变压器</el-button>
        <el-table :data="seProjectPowerTransformInfoList" style="width: 100%" :header-cell-style="{background:'#f2f2f2',color:'#555'}">
          <el-table-column prop="transformName" label="变压器名称" />
          <el-table-column prop="transformVolume" label="容量（kVA）" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="danger" size="small" @click="deleteData(scope.row)">删除</el-button>
              <el-button type="info" size="small" @click="editData(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PowerSupply',

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