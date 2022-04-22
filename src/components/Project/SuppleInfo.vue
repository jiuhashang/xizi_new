<template>
  <div>
    <ProjectTitle title="立项补充" />
    <el-row :gutter="20" style="margin-top:15px;margin-bottom:15px;">
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 30px;">能源管理合同</span>
        <el-button size="mini" type="primary" @click="handleDown(seProjectEndSupplementFile.energyContractFile)"
          :disabled="seProjectEndSupplementFile.energyContractFile == '' || seProjectEndSupplementFile.energyContractFile == null ">下载<i class="el-icon-download el-icon--right"></i></el-button>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 50px;">项目建议书</span>
        <el-button size="mini" type="primary" @click="handleDown(seProjectEndSupplementFile.adviseBookFile)"
          :disabled="seProjectEndSupplementFile.adviseBookFile == '' || seProjectEndSupplementFile.adviseBookFile == null ">下载<i class="el-icon-download el-icon--right"></i></el-button>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 66px;">备案文件</span>
        <el-button size="mini" type="primary" @click="handleDown(seProjectEndSupplementFile.recordFile)"
          :disabled="seProjectEndSupplementFile.recordFile == '' || seProjectEndSupplementFile.recordFile == null ">下载<i class="el-icon-download el-icon--right"></i></el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 54px;">接入文件</span>
        <el-button size="mini" type="primary" @click="handleDown(seProjectEndSupplementFile.insertFile)"
          :disabled="seProjectEndSupplementFile.insertFile == '' || seProjectEndSupplementFile.insertFile == null ">下载<i class="el-icon-download el-icon--right"></i></el-button>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 64px;">营业执照</span>
        <el-button size="mini" type="primary" @click="handleDown(seProjectEndSupplementFile.businessFile)"
          :disabled="seProjectEndSupplementFile.businessFile == '' || seProjectEndSupplementFile.businessFile == null ">下载<i class="el-icon-download el-icon--right"></i></el-button>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 44px;">关联项目公司</span>
        <span style="font-size: 12px;">{{ seProjectEndSupplementFile.projectCompanyName }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top:15px;margin-bottom:15px;" class="yi">
      <span style="font-size: 12px;color: #aaa;margin:0 10px 0 64px;">额外说明</span>
      <el-tooltip class="item" effect="dark" :content="seProjectEndSupplementFile.otherMessage" placement="top">
        <span style="font-size: 12px;">{{ seProjectEndSupplementFile.otherMessage }}</span>
      </el-tooltip>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'SuppleInfo',
  props: {
    seProjectEndSupplementFile: {
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