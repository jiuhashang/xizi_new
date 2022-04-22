<template>
  <div>
    <ProjectTitle title="荷载报告" />
    <div style="margin:15px 0;">
      <span style="font-size: 12px;color: #aaa;margin:0 10px 0 62px;">荷载报告</span>
      <el-button size="mini" type="primary" @click="handleDown(seProjectRelevantFile.secondExamineReport)"
        :disabled="seProjectRelevantFile.secondExamineReport == '' || seProjectRelevantFile.secondExamineReport == null ">下载<i class="el-icon-download el-icon--right"></i></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadInfo',
  props: {
    seProjectRelevantFile: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      
    }
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