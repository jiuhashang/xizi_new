<template>
  <el-container>
    <!-- 一级菜单下面所拥有的二级菜单 -->
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <el-menu :default-active="toIndex()" router :collapse="isCollapse" :collapse-transition="false" :default-openeds="openeds">
        <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" style="font-size:25px; cursor:pointer;margin:10px 0 0 20px;" @click="handleCollapse"></i>
        <el-submenu index="1" v-show="meunId.indexOf('11') > -1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>项目开发</span>
          </template>
          <el-menu-item index="launch" v-show="meunId.indexOf('111') > -1">项目发起</el-menu-item>
          <el-menu-item index="material" v-show="meunId.indexOf('112') > -1">材料补充</el-menu-item>
          <el-menu-item index="added" v-show="meunId.indexOf('113') > -1">立项补充</el-menu-item>
        </el-submenu>
        <el-submenu index="2" v-show="meunId.indexOf('12') > -1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>审批管理</span>
          </template>
          <el-menu-item index="first" v-show="meunId.indexOf('121') > -1">项目初审</el-menu-item>
          <el-menu-item index="review" v-show="meunId.indexOf('122') > -1">图纸复核</el-menu-item>
          <el-menu-item index="final" v-show="meunId.indexOf('123') > -1">项目终审</el-menu-item>
          <el-menu-item index="overview" v-show="meunId.indexOf('124') > -1">项目总览</el-menu-item>
        </el-submenu>
        <el-submenu index="3" v-show="meunId.indexOf('13') > -1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>其他管理</span>
          </template>
          <el-menu-item index="share" v-show="meunId.indexOf('131') > -1">项目分享</el-menu-item>
          <el-menu-item index="statist" v-show="meunId.indexOf('132') > -1">项目统计</el-menu-item>
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
      openeds: ['1', '2', '3'],
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