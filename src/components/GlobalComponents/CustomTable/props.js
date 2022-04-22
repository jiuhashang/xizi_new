// el-table的原始配置项,配置有效值可直接参考element-ui官方文档
export const originalProps = {
  // 表格数据（格式为[{..},{..}...]）
  tableData: {
    type: Array,
    default() {
      return []
    }
  },

  // 默认的排序列的 prop 和顺序。它的prop属性指定默认的排序的列，order指定默认排序的顺序
  defaultSort: {
    type: Object,
    default() {
      return {}
    }
  },

  // Table 的最大高度(流体高度)。有效值为数字或者单位为 px 的高度。
  maxHeight: {
    type: Number
  },

  // 纵向边框的显示状态（true: 显示, false: 隐藏）
  border: {
    type: Boolean,
    default: true
  },

  // 是否开启表格单选功能（高亮当前行,并显示单选按钮列）
  highlightCurrentRow: {
    type: Boolean,
    default: false
  }
}

// CustomTable组件的自定义配置项
export const customProps = {
  // 表头数据(格式为[{prop: 'xx', label: 'xx'}...],具体配置参见Column.vue=>props=>column注释)
  columnList: {
    type: Array,
    default() {
      return []
    }
  },

  // 自定义表格高度(单位px)
  customHeight: {
    type: Number,
    default: 0
  },

  // 表格内所有无内容单元格的占位文本(允许写入字符串形式的html代码)
  emptyCell: {
    type: String,
    default: ''
  },

  // 组件key（作用与v-for中的key一致,用作组件的唯一标识）
  componentKey: {
    type: Number,
    default: 0
  },

  // 序号列显示状态(true:显示序号列, false: 隐藏序号列)
  indexVisible: {
    type: Boolean,
    default: false
  },

  // 是否开启表格的多选功能(true:显示checkbox列, false: 隐藏checkbox列)
  selection: {
    type: Boolean,
    default: false
  },

  // 表格的loading
  loading: {
    type: Boolean,
    default: false
  },

  // 默认勾选的表格项(由勾选的行数据组成)
  selectedList: {
    type: Array,
    default() {
      return []
    }
  },

  // 自定义的单元格合并规则
  mergeMethod: {
    type: Function,
    default() {
      return new Function()
    }
  }
}

