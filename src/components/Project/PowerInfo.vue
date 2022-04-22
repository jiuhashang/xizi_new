<template>
  <div>
    <ProjectTitle title="供电现状" />
    <el-row :gutter="20" style="margin:15px 0;">
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 50px;">供电类型</span>
        <span style="font-size: 12px;">{{ seProjectPowerInfo.prowerType }}</span>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 45px;">变压器容量</span>
        <span style="font-size: 12px;">{{ seProjectPowerInfo.transformerVolume }} kVA</span>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 55px;">变压器台数</span>
        <span style="font-size: 12px;">{{ seProjectPowerInfo.transformerNum }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin:15px 0;">
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 25px;">预估装机容量</span>
        <span style="font-size: 12px;">{{ seProjectPowerInfo.mayInstallVolume }} kW</span>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 -2px;">法定节假日是否休息</span>
        <span style="font-size: 12px;" v-if="seProjectPowerInfo.legalHolidayFlag == 1">是</span>
        <span style="font-size: 12px;" v-else>否</span>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 42px;">周末生产情况</span>
        <span style="font-size: 12px;" v-if="seProjectPowerInfo.weekendFlag == 0">单班</span>
        <span style="font-size: 12px;" v-else-if="seProjectPowerInfo.weekendFlag == 1">双班</span>
        <span style="font-size: 12px;" v-else>连续生产</span>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin:15px 0;">
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 0;">中午设备是否停机</span>
        <span style="font-size: 12px;" v-if="seProjectPowerInfo.noonEquipmentFlag == 1">是</span>
        <span style="font-size: 12px;" v-else>否</span>
      </el-col>
      <el-col :span="16" class="yi">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 35px;">其他供电说明</span>
        <el-tooltip class="item" effect="dark" :content="seProjectPowerInfo.otherMessage" placement="top">
          <span style="font-size: 12px;">{{ seProjectPowerInfo.otherMessage }}</span>
        </el-tooltip>
      </el-col>
    </el-row>
    <el-card style="margin-bottom:30px;">
      <div slot="header" class="clearfix">
        <span>变压器各台容量（选填）</span>
      </div>
      <div>
        <el-table :data="seProjectPowerTransformInfoList" :header-cell-style="{background:'#f2f2f2',color:'#555'}" size="mini">
          <el-table-column prop="transformName" label="变压器名称" />
          <el-table-column prop="transformVolume" label="容量（kVA）" />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PowerInfo',
  props: {
    seProjectPowerInfo: {
      type: Object,
      default: () => {}
    },
    seProjectPowerTransformInfoList: {
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

</style>