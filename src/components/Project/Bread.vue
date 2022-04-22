<template>
  <div class="shang">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{ $route.matched[1].meta.title }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <h3>{{ $route.meta.title }}</h3>
  </div>
</template>

<script>
export default {
  name: 'Bread',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.shang {
  height: 70px;
  background-color: #fff;
  .el-breadcrumb {
    padding: 10px 0 0 25px;
  }
  h3 {
    text-align: left;
    padding-left: 25px;
  }
}
</style>