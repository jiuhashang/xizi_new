<template>
  <div>
    <ProjectTitle title="项目信息" />
    <el-row :gutter="20" style="margin-top:15px;margin-bottom:15px;">
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 60px;">创建时间</span>
        <span style="font-size: 12px;">{{ $route.query.createTime }}</span>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 78px;">负责人</span>
        <span style="font-size: 12px;">{{ $route.query.createUserNickName }}</span>
      </el-col>
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 45px;">负责人电话</span>
        <span style="font-size: 12px;">{{ $route.query.createUserPhone }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-bottom: 15px;">
      <el-col :span="8">
        <span style="font-size: 12px;color: #aaa;margin:0 10px 0 60px;">项目名称</span>
        <span style="font-size: 12px;">{{ $route.query.projectName }}</span>
      </el-col>
      <el-col :span="8" class="yi">
        <slot></slot>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ProjectInfo',
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>