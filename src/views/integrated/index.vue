<template>
  <el-container>
    <!-- 一级菜单下面所拥有的二级菜单 -->
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <el-menu :default-active="toIndex()" router :collapse="isCollapse" :collapse-transition="false" :default-openeds="openeds">
        <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" style="font-size:25px; cursor:pointer;margin:10px 0 0 20px;" @click="handleCollapse"></i>
        <el-menu-item index="user">
          <i class="el-icon-user"></i>
          <span slot="title">个人中心</span>
        </el-menu-item>
        <el-submenu index="1" v-show="meunId.indexOf('51') > -1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>账户管理</span>
          </template>
          <el-menu-item index="role" v-show="meunId.indexOf('511') > -1">角色管理</el-menu-item>
          <el-menu-item index="account" v-show="meunId.indexOf('512') > -1">账户管理</el-menu-item>
        </el-submenu>
        <el-submenu index="2" v-show="meunId.indexOf('52') > -1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>机构管理</span>
          </template>
          <el-menu-item index="organization" v-show="meunId.indexOf('521') > -1">投资机构</el-menu-item>
          <!-- <el-menu-item index="2-4-2">项目公司</el-menu-item> -->
        </el-submenu>
        <el-submenu index="3" v-show="meunId.indexOf('53') > -1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>其他</span>
          </template>
          <el-menu-item index="download" v-show="meunId.indexOf('531') > -1">下载管理</el-menu-item>
          <el-menu-item index="task" v-show="meunId.indexOf('532') > -1">任务模板</el-menu-item>
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