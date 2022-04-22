<template>
  <el-container>
    <!-- 一级菜单下面所拥有的二级菜单 -->
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <el-menu :default-active="toIndex()" router :collapse="isCollapse" :collapse-transition="false">
        <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" style="font-size:25px; cursor:pointer;margin:10px 0 0 20px;" @click="handleCollapse"></i>
        <el-menu-item index="1">项目看板</el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <span>项目监管</span>
          </template>
          <el-menu-item index="2-4-1">全部项目</el-menu-item>
          <el-menu-item index="2-4-2">团队情况</el-menu-item>
          <el-menu-item index="2-4-3">数据报表</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <!-- 以及二级菜单所对应的页面 -->
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      isCollapse: false,
      meunId: window.sessionStorage.getItem('menuId').split(',')
    }
  },
  methods: {
    toIndex(){
      return this.$route.path.split('/')[2]
    },
    handleCollapse (){
      this.isCollapse = ! this.isCollapse
    }
  }
}
</script>

<style scoped>
</style>