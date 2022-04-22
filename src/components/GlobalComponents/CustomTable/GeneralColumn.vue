<template>
  <!-- 普通数据列 -->
  <el-table-column
    v-if="showGeneralColumn"
    :prop="column.prop"
    :label="column.label"
    :width="column.width"
    :sortable="column.sortable"
    :show-overflow-tooltip="column.showOverflowTooltip"
    :fixed="fixed"
    :align="align"
    :formatter="column.formatter"
    :type="column.type"
    class="columns"
  >
    <template slot-scope="scope">
      <!-- 如果非空单元格(内容数据不为undefined,null,''等,内容为0的情况不算)配置了filter,则显示该部分内容 -->
      <span v-if="(Boolean(getValue(scope.row,column.prop)) || typeof(getValue(scope.row,column.prop)) === 'number' || typeof (getValue(scope.row,column.prop)) === 'boolean') && column.filter">
        {{ filter(getValue(scope.row,column.prop), column.filter.args) }}
      </span>

      <!-- column的type设置为upload时,单元格内显示图片上传组件 -->
      <!-- fileList 接受的数据是Array,所以赋值时先判断getValue(scope.row,column.prop)是否有值，如果有值设置为数组-->
      <image-upload
        v-else-if="column.type === 'upload'"
        :key="scope.row.id"
        :file-list="getValue(scope.row,column.prop) ? [getValue(scope.row,column.prop)] : getValue(scope.row,column.prop)"
        width="60px"
        height="60px"
        margin="0px"
        @change="change($event, scope.row, column.prop)"
      />

      <!-- column的type设置为edit时,单元格内显示输入框 -->
      <el-input
        v-else-if="column.type === 'edit'"
        v-model="scope.row[column.prop]"
        :disabled="disabledInput(scope.row, column.prop)"
        @blur="handleCellEdit($event,scope.row, scope.column)"
      />

      <!-- column的type设置为image时,单元格内显示图片 -->
      <el-image
        v-else-if="column.type === 'image'"
        :src="getValue(scope.row,column.prop)"
        :preview-src-list="[getValue(scope.row,column.prop)]"
        class="image-cell"
        alt="暂无图片..."
      />

      <!-- 没有对column配置filter的,列类型也不是'upload'的,则展示原始数据 -->
      <span v-else>{{ getValue(scope.row,column.prop) }}</span>

      <!-- 全表空单元格占位内容(单元格内容为数字0时不视为空单元格);表格配置项（绑定在table上的配置属性）中声明了emptyCell内容,则显示该部分内容 -->
      <span
        v-show="(!Boolean(getValue(scope.row,column.prop)) && typeof(getValue(scope.row,column.prop)) !== 'number' && typeof(getValue(scope.row,column.prop)) !== 'boolean') && emptyCell && !column.emptyCell"
        v-html="emptyCell"
      >
        {{ emptyCell }}
      </span>

      <!-- 单列空单元格占位内容(单元格内容为数字0时不视为空单元格);column配置项(下面props里面传入的)中声明了emptyCell内容,则显示该部分内容 -->
      <span
        v-show="(!Boolean(getValue(scope.row,column.prop)) && typeof(getValue(scope.row,column.prop)) !== 'number' && typeof(getValue(scope.row,column.prop)) !== 'boolean') && column.emptyCell"
        v-html="column.emptyCell"
      >
        {{ column.emptyCell }}
      </span>

    </template>
  </el-table-column>
</template>

<script>
export default {
  props: {
    /**
     * @argument {Object} column: 表格每列的配置属性集合(下列注释末尾带(*)的为自定义配置项,其他则是el-table的原始配置项,其有效值可直接参考官方文档)
     * @param {Boolean|String} fixed: 列是否固定在左侧或者右侧，true 表示固定在左侧(true/'left'/'right')
     * @param {Boolean} showOverflowTooltip: 当内容过长被隐藏时显示 tooltip
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
    // 本列数据的显示状态(true: 显示, false: 隐藏)
    show() {
      return this.column.show === undefined ? true : this.column.show
    },

    // 列是否固定在左侧或者右侧，true 表示固定在左侧(true, left, right)
    fixed() {
      return this.column.fixed || false
    },

    // 对齐方式(left/center/right)
    align() {
      return this.column.align || 'center'
    },

    // 自定义过滤器
    filter() {
      return (value, args) => {
        // 尝试执行this.column中filter属性的method
        try {
          // 若filter属性中的args为数组形式的多个参数
          if (args && Array.isArray(args)) {
            // 将args展开后再传入过滤方法
            return this.column.filter.method(value, ...args)
          } else {
            return this.column.filter.method(value, args)
          }
        } catch (error) {
          // 若filter属性没有声明method,则直接执行filter属性,该情况下不存在args（例如{prop:xx, label:xx, filter: {args:xxx}}是无效的设置）
          return this.column.filter(value)
        }
      }
    },

    // 普通数据列的显示状态
    showGeneralColumn() {
      // 当前列的显示状态被设置为false
      if (!this.show) {
        return false
      }
      // 特殊数据列
      const specialColumns = ['selection']
      if (specialColumns.some(v => {
        return v === this.column.type
      })) {
        // 当前数据列类型是特殊类型时不显示普通数据列
        return false
      }
      return true
    }
  },
  methods: {
    // 对多层的prop进行处理
    getValue(_key, prop) {
      if (prop) {
        const arr = prop.split('.')
        if (arr.length > 1) {
          arr.forEach(item => {
            _key = getVal(_key, item)
          })
        } else {
          return _key[prop]
        }
        return _key
      } else {
        return ''
      }
      function getVal(a, b) {
        return a[b] || ''
      }
    },

    // 处理图片上传列的上传结果
    change(e, row, prop) {
      // 将图片上传的结果(图片地址)赋值给行数据中对应的属性
      // console.log(e, row, prop)
      row[prop] = e[0]
    },

    // 单元格内的输入框失去焦点时触发
    handleCellEdit(e, row, column) {
      // console.log(e.target.value, row, column)
      this.$emit('cellInputBlur', { e, row, column })
    },

    // 当前行数据为勾选状态的时候，禁用修改价格的input输入框(也就是cloumn.prop === 'price')
    disabledInput(row, prop) {
      // console.log(row, prop)
      if (prop === 'price') {
        // checked作为活动商品"勾选状态"字段(0:未勾选,1:已勾选)
        if (row.checked === 0) {
          return false
        } else {
          return true
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.image-cell {
  width: 60px;
  height: 60px;
  color: #cccccc;
}
</style>
