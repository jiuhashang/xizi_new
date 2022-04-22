<template>
  <!-- 项目信息 -->
  <div>
    <div class="xian">
      <div>项目信息</div>
    </div>
    <el-row :gutter="20" style="margin-top:30px;">
      <el-col :span="8">
        <el-row :gutter="20">
          <el-col :span="7" class="span13">创建时间</el-col>
          <el-col :span="16" class="span130">{{ $route.query.createTime }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="20">
          <el-col :span="6" class="span13">负责人</el-col>
          <el-col :span="16" class="span130">{{ $route.query.createUserNickName }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="20">
          <el-col :span="5" class="span13" style="padding-right:15px;">负责人电话</el-col>
          <el-col :span="16" class="span130" style="padding-left:0;">{{ $route.query.createUserPhone }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top:30px;margin-bottom:30px;">
      <el-col :span="8">
        <el-row :gutter="20">
          <el-col :span="7" class="span13">项目名称</el-col>
          <el-col :span="16" class="span130">{{ $route.query.projectName }}</el-col>
        </el-row>
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
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style lang="scss" scoped>

</style>