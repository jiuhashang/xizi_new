<template>
  <div class="wrap">
    <el-tabs v-model="cValue" :type="type" @change="handleChange">
      <slot />
    </el-tabs>
  </div>

</template>

<script>
export default {
  name: 'CTabs',
  model: {
    prop: 'value',
    trigger: 'change'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'card'
    }
  },
  data() {
    return {
      cValue: ''
    }
  },
  watch: {
    value(newVal) {
      if (newVal !== this.cValue) {
        this.cValue = newVal
      }
    }
  },
  created() {
    if (this.value) {
      this.cValue = this.value
    } else {
      const defaultValue = this?.$slots?.default?.[0]?.componentOptions?.propsData?.name
      this.cValue = defaultValue
    }
  },
  methods: {
    handleChange(...args) {
      this.$emit('change', ...args)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
  // margin: 20px;

  ::v-deep {
    .el-tabs__header {
      position: absolute;
      left: 40px;
      right: 40px;
      top: 20px;
      height: 41px;
      z-index: 2;
    }
    .el-tabs__content {
      // padding-top: 56px;

      > div {

        .el-card:first-child {
          padding-top: 56px;
          margin-top: 0;
        }

      }
    }
  }
}
</style>
