<template>
  <div>
    <!-- mianbaoxie -->
    <Bread />
    <!-- 搜索区域 -->
    <div class="search">
      <span>搜索查询</span>
      <i :class="isShow ? 'el-icon-caret-top' : 'el-icon-caret-bottom'" @click="handleShow"></i>
    </div>
    <div class="searchContent" v-show="isShow">
      <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="项目名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目经理">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="参与人员">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目类型">
              <el-select v-model="form.region" placeholder="请选择活动区域" class="width100">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="人员状态">
              <el-radio-group v-model="form" size="mini">
                <el-radio-button label="全 部"></el-radio-button>
                <el-radio-button label="空闲"></el-radio-button>
                <el-radio-button label="未空闲"></el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="12">
            <el-button type="primary" icon="el-icon-search" size="mini">查 询</el-button>
            <el-button size="mini">重 置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 列表 -->
    <div class="list">
      <span>项目列表</span>
    </div>
    <div class="content">
      <el-table :data="tableData" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="small">
        <el-table-column prop="projectName" label="人员" />
        <el-table-column prop="companyName" label="手机号码" />
        <el-table-column prop="messageInputSubmitTime" label="总计负责项目" />
        <el-table-column prop="createUserNickName" label="总计参与项目" />
        <el-table-column prop="createUserNickName" label="当前未结束项目" />
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Team',

  data() {
    return {
      isShow: false,
      form: {},
      tableData: [],
      total: 0
    };
  },

  mounted() {
    
  },

  methods: {
    handleShow() {
      this.isShow = !this.isShow
    },
    handleRegister() {
      this.$router.push({name: 'Register'})
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.tableInfo.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.tableInfo.pageIndex = val
      this.getList()
    }
  },
};
</script>

<style lang="scss" scoped>
// 搜索
.search {
  border: 1px solid #DCDFE6;
  border-radius: 3px;
  margin: 10px 15px 0;
  padding: 5px 15px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-weight: 800;
  }
  i {
    font-size: 20px;
    color: blue;
    cursor: pointer;
  }
}
.searchContent {
  border: 1px solid #DCDFE6;
  margin: 0 15px;
  padding: 10px 10px 0;
  background-color: #fff;
  border-top: none;
}
// 列表
.list {
  border: 1px solid #DCDFE6;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  margin: 10px 15px 0;
  padding: 5px 15px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-weight: 800;
  }
}
.content {
  border: 1px solid #DCDFE6;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  margin: 0 15px;
  padding: 10px;
  border-top: none;
  background-color: #fff;
  .h {
    &:hover {
      border: 1px solid rgb(8, 8, 8);
      cursor: pointer;
    }
  }
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #DCDFE6;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    padding: 5px 15px;
    background-color: #fff;
    border-bottom: none;
    div {
      padding: 0 15px;
      display: flex;
      align-items: center;
    }
  }
  .bottom {
    border: 1px solid #DCDFE6;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    padding: 10px 0;
    display: flex;
    justify-content: space-around;
    .f {
      div {
        display: flex;
      }
    }
  }
}
.mr10 {
  margin-right: 10px;
  color: #aaa;
}
.mb10 {
  margin-bottom: 10px;
}
</style>