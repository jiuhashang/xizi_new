<template>
  <keep-alive v-if="alive">
    <router-view v-bind="$attrs" />
  </keep-alive>
  <router-view v-else v-bind="$attrs" />
</template>
<script>

export default {
  name: 'CustomKeepAliveRoute',
  data() {
    return {
      alive: false
    }
  },
  watch: {
    '$route.meta.keepAlive'(newVal) {
      this.alive = newVal || false
    }
  }
}
</script>
