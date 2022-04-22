<template>
  <div>
    <ProjectTitle title="其他材料" />
    <el-row :gutter="20" style="margin:15px;">
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 0px;">近3年财务报告</span>
        <el-button size="mini" type="primary" @click="handleDown(seProjectSupplementFile.nearThreeYearFinanceReport)"
          :disabled="seProjectSupplementFile.nearThreeYearFinanceReport == '' || seProjectSupplementFile.nearThreeYearFinanceReport == null ">下载<i class="el-icon-download el-icon--right"></i></el-button>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 3px;">材料补充额外材料</span>
        <el-button size="mini" type="primary" @click="handleDown(seProjectSupplementFile.otherFile)"
          :disabled="seProjectSupplementFile.otherFile == '' || seProjectSupplementFile.otherFile == null ">下载<i class="el-icon-download el-icon--right"></i></el-button>
      </el-col>
    </el-row>
    <div style="margin:15px 0;" class="yi">
      <span style="font-size: 12px;color: #aaa;margin:0 10px 0 56px;">额外说明</span>
      <el-tooltip class="item" effect="dark" :content="seProjectSupplementFile.otherMessage" placement="top">
        <span style="font-size: 12px;">{{ seProjectSupplementFile.otherMessage }}</span>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OtherInfo',
  props: {
    seProjectSupplementFile: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  methods: {
    handleDown(url) {
      window.open(url)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>