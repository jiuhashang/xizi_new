<template>
  <!-- 表格数据列 -->
  <el-table-column
    :prop="column.prop"
    :label="column.label"
    :width="column.width"
    :fixed="fixed"
    :align="align"
    :type="column.type"
    :selectable="selectable"
  />
</template>

<script>
export default {
  props: {
    /**
     * @argument {Object} column: 表格每列的配置属性集合(下列注释末尾带(*)的为自定义配置项,其他则是el-table的原始配置项,其有效值可直接参考官方文档)
     * @param {Boolean|String} fixed: 列是否固定在左侧或者右侧，true 表示固定在左侧(true/'left'/'right')
     * @param {String} align: 对齐方式('left'/'center'/'right')
     * @param {object|Function} filter: 自定义列数据过滤器,可以直接赋值为过滤方法(function),也可以设置为一个含有method和args两个属性的Object。filter.method:过滤方法(Function); filter.args:过滤方法所需的额外参数(待过滤的值不需要在args中声明,过滤方法会将其作为默认参数)(*)
     * @param {Boolean} show: 本列数据的显示状态(true: 显示, false: 隐藏)(*)
     * @param {String} emptyCell: 本列空单元格的占位文本(允许写入字符串形式的html代码,本配置项的权重要高于表格中配置的emptyCell)(*)
     */
    column: {
      type: Object,
      default() {
        return {}
      }
    },

    // 组件key
    index: {
      type: Number,
      default: 0
    },

    // 表格单元格内容为空时显示的占位文本(允许写入字符串形式的html代码)
    emptyCell: {
      type: String,
      default: '-'
    }
  },
  computed: {
    // 列是否固定在左侧或者右侧，true 表示固定在左侧(true, left, right)
    fixed() {
      return this.column.fixed || false
    },

    // 对齐方式(left/center/right)
    align() {
      return this.column.align || 'center'
    }
  },
  methods: {
    // 禁用表格复选框
    selectable(row, index) {
      if (this.column.selectable) {
        return this.column.selectable({ row, index })
      } else {
        return true
      }
    }
  }
}
</script>
