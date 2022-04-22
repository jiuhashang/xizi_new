<template>
  <div class="pagination">
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[1, 3, 5, 10, 15]"
      :page-size="pageSize"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      prev-text="上一页"
      next-text="下一页"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    defaultPageSize: {
      type: Number,
      default: 10
    },
    pageIndex: {
      type: Number,
      default: undefined
    }
  },
  data() {
    return {
      currentPage: 1, // 当前页码
      pageSize: 10
    }
  },
  watch: {
    pageIndex(newVal) {
      if (newVal && newVal !== this.currentPage) {
        this.currentPage = newVal
      }
    }
  },
  created() {
    if (this.defaultPageSize) {
      this.pageSize = this.defaultPageSize
    }
  },
  methods: {
    // 每页显示数据条数改变时触发
    handleSizeChange(val) {
      this.pageSize = val
      // console.log(this.pageSize)
      this.$emit('sendsize', this.pageSize)
    },
    // 当前页码改变时触发
    handleCurrentChange(val) {
      this.currentPage = val
      // console.log(this.currentPage)
      this.$emit('sendpage', this.currentPage)
    },
    resetOption(page = 0, size = 10) {
      this.currentPage = page
      this.pageSize = size
    }
  }
}
</script>
<style lang="scss" deep>
  .pagination {
    background: white;
    width: 100%;

    .el-pagination {
      display: flex;
      height: 60px;
      align-items: center;
      justify-content: flex-end;
      max-width: 100%;
      overflow: auto;
      line-height: 60px;
    }

    .el-pagination__sizes {
      margin-right: 40px;
    }

    .el-pager,.el-pagination button, .el-pagination span:not([class*=suffix]) {
      display: flex;
    }
  }

</style>
