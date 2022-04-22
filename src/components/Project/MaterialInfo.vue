<template>
  <div>
    <ProjectTitle title="相关材料" />
    <el-row :gutter="20" style="margin:15px 0;">
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 5px;">不动产权证或三证</span>
        <el-button size="mini" type="primary" @click="handleDown(seProjectRelevantFile.realPropertyRightFile)"
          :disabled="seProjectRelevantFile.realPropertyRightFile == '' || seProjectRelevantFile.realPropertyRightFile == null ">下载<i class="el-icon-download el-icon--right"></i></el-button>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 -8px;">近12个月电费复核单</span>
        <el-button size="mini" type="primary" @click="handleDown(seProjectRelevantFile.nearYearElectricityBill)"
          :disabled="seProjectRelevantFile.nearYearElectricityBill == '' || seProjectRelevantFile.nearYearElectricityBill == null ">下载<i class="el-icon-download el-icon--right"></i></el-button>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 75px;">结构图</span>
        <el-button size="mini" type="primary" @click="handleDown(seProjectRelevantFile.structureFile)"
          :disabled="seProjectRelevantFile.structureFile == '' || seProjectRelevantFile.structureFile == null ">下载<i class="el-icon-download el-icon--right"></i></el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin:15px;">
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 2px;">配电室内部照片</span>
        <el-button size="mini" type="primary" @click="handleDown(seProjectRelevantFile.electricityRoomInsideFile)"
          :disabled="seProjectRelevantFile.electricityRoomInsideFile == '' || seProjectRelevantFile.electricityRoomInsideFile == null ">下载<i class="el-icon-download el-icon--right"></i></el-button>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 62px;">建筑图</span>
        <el-button size="mini" type="primary" @click="handleDown(seProjectRelevantFile.buildFile)"
          :disabled="seProjectRelevantFile.buildFile == '' || seProjectRelevantFile.buildFile == null ">下载<i class="el-icon-download el-icon--right"></i></el-button>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 80px;">总平图</span>
        <el-button size="mini" type="primary" @click="handleDown(seProjectRelevantFile.generalLayoutFile)"
          :disabled="seProjectRelevantFile.generalLayoutFile == '' || seProjectRelevantFile.generalLayoutFile == null ">下载<i class="el-icon-download el-icon--right"></i></el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin:15px;">
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 14px;">厂房内部照片</span>
        <el-button size="mini" type="primary" @click="handleDown(seProjectRelevantFile.workShopInsideFile)"
          :disabled="seProjectRelevantFile.workShopInsideFile == '' || seProjectRelevantFile.workShopInsideFile == null ">下载<i class="el-icon-download el-icon--right"></i></el-button>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 26px;">厂名正面照片</span>
        <el-button size="mini" type="primary" @click="handleDown(seProjectRelevantFile.workShopFrontFile)"
          :disabled="seProjectRelevantFile.workShopFrontFile == '' || seProjectRelevantFile.workShopFrontFile == null ">下载<i class="el-icon-download el-icon--right"></i></el-button>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 44px;">屋顶细节照片</span>
        <el-button size="mini" type="primary" @click="handleDown(seProjectRelevantFile.houseTopDetailFile)"
          :disabled="seProjectRelevantFile.houseTopDetailFile == '' || seProjectRelevantFile.houseTopDetailFile == null ">下载<i class="el-icon-download el-icon--right"></i></el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin:15px;">
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 2px;">厂房内屋顶照片</span>
        <el-button size="mini" type="primary" @click="handleDown(seProjectRelevantFile.workShopInsideTopFile)"
          :disabled="seProjectRelevantFile.workShopInsideTopFile == '' || seProjectRelevantFile.workShopInsideTopFile == null ">下载<i class="el-icon-download el-icon--right"></i></el-button>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 3px;">项目发起额外材料</span>
        <el-button size="mini" type="primary" @click="handleDown(seProjectRelevantFile.projectOtherFile)"
          :disabled="seProjectRelevantFile.projectOtherFile == '' || seProjectRelevantFile.projectOtherFile == null ">下载<i class="el-icon-download el-icon--right"></i></el-button>
      </el-col>
    </el-row>
    <div style="margin:15px 0;" class="yi">
      <span style="font-size: 12px;color: #aaa;margin:0 10px 0 14px;">项目发起额外说明</span>
      <el-tooltip class="item" effect="dark" :content="seProjectRelevantFile.projectOtherMessage" placement="top">
        <span style="font-size: 12px;">{{ seProjectRelevantFile.projectOtherMessage }}</span>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MaterialInfo',
  props: {
    seProjectRelevantFile: {
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