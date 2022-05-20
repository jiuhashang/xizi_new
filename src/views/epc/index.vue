<template>
  <el-container>
    <!-- 一级菜单下面所拥有的二级菜单 -->
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <el-menu :default-active="toIndex()" router :collapse="isCollapse" :collapse-transition="false" :default-openeds="openeds">
        <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" style="font-size:25px; cursor:pointer;margin:10px 0 0 20px;" @click="handleCollapse"></i>
        <el-menu-item index="kanban">
          <i class="el-icon-s-data"></i>
          <span slot="title">项目看板</span>
        </el-menu-item>
        <el-submenu index="2" v-show="meunId.indexOf('21') > -1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>项目监管</span>
          </template>
          <el-menu-item index="all" v-show="meunId.indexOf('211') > -1">全部项目</el-menu-item>
          <el-menu-item index="my" v-show="meunId.indexOf('212') > -1">我的项目</el-menu-item>
          <el-menu-item index="statist" v-show="meunId.indexOf('213') > -1">回款统计</el-menu-item>
          <!-- <el-menu-item index="team" v-show="meunId.indexOf('213') > -1">团队情况</el-menu-item> -->
          <!-- <el-menu-item index="insurance" v-show="meunId.indexOf('214') > -1">保险数据</el-menu-item> -->
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
      openeds: ['2'],
      isCollapse: false,
      meunId: window.sessionStorage.getItem('menuId').split(',')
    }
  },
  methods: {
    toIndex () {
      return this.$route.path.split( '/' )[2]
    },
    handleCollapse () {
      this.isCollapse = ! this.isCollapse
    }
  }
}
</script>

<style scoped>
</style>