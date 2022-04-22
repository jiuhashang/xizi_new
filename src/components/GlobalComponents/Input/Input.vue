<template>
  <el-input-number
    :value="cValue"
    v-bind="$attrs"
    @change="emitChange"
  />
</template>
<script>
import Emitter from 'element-ui/src/mixins/emitter'
import MathUtil from '@/utils/math'

export default {
  name: 'CustomInputNumber',
  mixins: [Emitter],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Number,
      default: undefined
    },
    multiple: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      cValue: undefined
    }
  },
  watch: {
    value(newVal) {
      this.setChildValue(newVal)
    }
  },
  created() {
    this.setChildValue(this.value)
  },
  methods: {
    setChildValue(nVal) {
      if (isNaN(+nVal) || typeof nVal === 'undefined' || nVal === null || nVal === '') {
        this.cValue = undefined
        return
      }
      nVal = +nVal
      const m = MathUtil.Multiply(nVal, this.multiple)
      if (m === this.cValue) {
        return
      }
      this.cValue = m
    },
    emitChange(value) {
      this.cValue = value
      const nextValue = typeof value === 'undefined' ? undefined : MathUtil.Division(value, this.multiple)
      this.$emit('change', nextValue)
      this.dispatch('ElFormItem', 'el.form.change', nextValue)
    }
  }
}
</script>
