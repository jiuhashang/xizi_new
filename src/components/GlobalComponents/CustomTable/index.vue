<template>
  <div :id="`table_${componentKey}`" :class="maxHeight?'fluid-table':'table-view'">
    <el-table
      :ref="`table_${componentKey}`"
      v-loading="loading"
      :data="tableData"
      :height="tableHeight || customHeight"
      :default-sort="defaultSort"
      :max-height="maxHeight"
      :highlight-current-row="highlightCurrentRow"
      :row-class-name="setRowIndex"
      :border="border"
      :header-cell-style="{background:'#f2f2f2',color:'#555'}"
      :span-method="spanMethod"
      fit
      stripe
      header-row-class-name="table-header"
      @selection-change="handleSelectionChange"
      @current-change="handleCurrentChange"
      @sort-change="sortChange"
      @cell-click="editCell"
    >
      <!-- 单选按钮列 -->
      <el-table-column
        v-if="highlightCurrentRow"
        fixed
        prop="index"
        label="选择"
        align="center"
        width="55"
      >
        <template slot-scope="scope">
          <el-radio v-model="rowIndex" :label="scope.row.index"><i /></el-radio>
        </template>
      </el-table-column>

      <!-- 多选按钮列(无法与单选列同时显示,单选/多选同时设置启用时,默认只启用单选列) -->
      <el-table-column
        v-if="selection && !highlightCurrentRow"
        fixed
        align="center"
        type="selection"
        width="55"
      />

      <!-- 序号列，使表格每行数据可以取到index属性 -->
      <el-table-column
        v-if="indexVisible"
        type="index"
        label="序号"
        align="center"
        width="50"
      />

      <slot name="beforeSlot" />

      <template v-for="(item, index) in columnList">
        <select-column
          v-if="item.type && item.type === 'selection'"
          :key="index"
          :column="item"
          :index="index"
        />

        <general-column
          v-else
          :key="index"
          :column="item"
          :index="index"
          :empty-cell="emptyCell"
          @cellInputBlur="cellInputBlur"
        />
      </template>

      <slot />

    </el-table>
  </div>
</template>

<script>
import * as props from './props.js'
import GeneralColumn from './GeneralColumn'
import SelectColumn from './SelectColumn'

export default {
  components: {
    GeneralColumn,
    SelectColumn
  },
  props: {
    ...props.originalProps,
    ...props.customProps
  },
  data() {
    return {
      tableHeight: 0, // 表格的默认高度
      rowIndex: 0 // 组件单选功能的选中值
    }
  },
  watch: {
    // 监听tableData的异步请求结果变化
    tableData: {
      handler(nv, ov) {
        // 若组件开启单行选择,并且tableData不为空数组
        if (nv.length > 0 && this.highlightCurrentRow) {
          // 向父组件发送初始的选中行数据
          this.$emit('currentChange', nv[this.rowIndex])
        }
        // 解决表格出现滚动条之后table表格表头与内容列不对齐问题
        this.fixLayout()
      },
      deep: true,
      immediate: true
    },

    // 监听表格勾选项的变化
    selectedList: {
      handler(nv, ov) {
        if (nv.length > 0) {
          // 设置表格的默认选中项
          this.toggleSelection(nv)
        }
      },
      deep: true,
      immediate: true
    },

    // 监听loading的变化
    loading: {
      handler(nv, ov) {
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    // 计算自适应表格的高度
    this.setHeight()
    window.onresize = this.$utils.debounce(() => {
      this.setHeight()
    }, 300)

    // 监听页面中本组件的componentKey是否重复
    this.componentKeyWasRepeat()
  },
  methods: {
    // 禁止页面中出现重复的componentKey
    componentKeyWasRepeat() {
      // 页面中同id的本组件数量
      const keys = document.querySelectorAll(`#table_${this.componentKey}`).length
      if (keys > 1) {
        const error = new Error()
        // 错误提示: 值为'xxx'的'componentKey'出现重复。请为每个'custom-table'组件设置不同的'componentKey'
        error.message = `The 'componentKey' value of ${this.componentKey} is repeated. please set a different 'componentKey' for each 'custom-table' component`
        // 抛出错误
        throw (error)
      }
    },

    // 解决表格出现滚动条之后table表格表头与内容列不对齐问题
    fixLayout() {
      setTimeout(() => {
        try {
          this.$refs.table.doLayout()
        } catch (error) {
          // throw (error)
        }
      }, 1500)
    },

    // 自动设置表格高度
    setHeight() {
      this.$nextTick(() => {
        // 没有设置max-height时才计算固定高度
        if (!this.maxHeight) {
          this.tableHeight = document.getElementById(`table_${this.componentKey}`).offsetHeight
        }
      })
    },

    // 指定表格多选项的勾选状态批量切换
    toggleSelection(rows) {
      if (rows.length > 0) {
        rows.forEach(row => {
          this.$nextTick(() => {
            this.$refs[`table_${this.componentKey}`].toggleRowSelection(row)
          })
        })
      } else {
        this.$refs[`table_${this.componentKey}`].clearSelection()
      }
    },

    // 获取勾选项
    handleSelectionChange(row) {
      // row: 行数据
      this.$emit('getSelectionChange', row)
    },

    // 清除勾选项
    clearSelection() {
      this.$refs[`table_${this.componentKey}`].clearSelection()
    },

    // 通过row-class-name的回调函数给每一行数据设置index属性
    setRowIndex({ row, rowIndex }) {
      row.index = rowIndex
    },

    // 表格单行选择事件
    handleCurrentChange(row) {
      console.log(row, '表格单行选择事件')
      if (row) {
        // 更改radios的选中值
        this.rowIndex = row.index
        this.$emit('currentChange', row)
      }
    },

    /**
     * @method 当表格的排序条件发生变化的时候会触发该事件
     * @argument {Object} 回调函数返回的参数
     * @param {Object} column: 当前点击的列
     * @param {String} prop: 当前列对应的字段名称
     * @param {String} order: 当前列的排序状态(ascending: 升序，descending：降序)
     */
    sortChange({ column, prop, order }) {
      this.$emit('sortChange', { column, prop, order })
    },

    // 合并单元格
    spanMethod({ row, column, rowIndex, columnIndex }) {
      return this.mergeMethod({ row, column, rowIndex, columnIndex, tableData: this.tableData })
    },

    // 单元格点击事件
    editCell(row, column, cell, event) {
      // console.log(row)
      this.$emit('cellClick', { row, column, cell, event })
    },

    // 单元格内的输入框失去焦点时触发
    cellInputBlur({ e, row, column }) {
      // console.log(e.target.value, row, column)
      this.$emit('cellInputBlur', { e, row, column })
    }
  }
}
</script>

<style lang="scss">
  %tableStyle {
    width: 100%;

    .el-table {
      width: 100%;

      .el-radio__label {
        padding: 0px; /* 清除el-radio组件默认的内边距 */
      }

      .cell {
        width: 100% !important;
      }
    }
        .custom-upload {
      /* 解决图片上传后单元格变形问题 */
      ::deep .el-upload-list {
        line-height: 0px;
      }
    }

    /* 解决element-ui的table表格表头与内容列不对齐问题 */
    th.gutter {
      display: table-cell !important;
    }

    /* 解决element-ui的fixed列错位问题 */
    .el-table__fixed {
      display: table-cell !important;
      height: 100% !important;

      .el-table__fixed-body-wrapper {
        top: 48px !important;
      }
    }
  }

  .table-view {
    @extend %tableStyle;
    flex: 1;
  }

  .fluid-table {
    @extend %tableStyle;
    height: max-content;

    .el-table {
      height: 100% !important;
    }
  }
</style>
