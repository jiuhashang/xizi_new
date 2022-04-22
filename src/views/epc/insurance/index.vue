<template>
  <div>
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
              <el-input v-model="form.name" placeholder="项目名称查询"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目经理">
              <el-input v-model="form.name" placeholder="项目经理查询"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目类型">
              <el-select v-model="form.region" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="保险状态">
              <el-radio-group v-model="form" size="mini">
                <el-radio-button label="全 部"></el-radio-button>
                <el-radio-button label="存续期"></el-radio-button>
                <el-radio-button label="即将过期"></el-radio-button>
                <el-radio-button label="已过期"></el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="保险类型">
              <el-radio-group v-model="form" size="mini">
                <el-radio-button label="全 部"></el-radio-button>
                <el-radio-button label="项目保险"></el-radio-button>
                <el-radio-button label="施工保险"></el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="14">
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
      <div class="h">
        <div class="top">
          <span>浙江西子联合工程项目</span>
          <div>
            <div>2012121212122</div>
            <el-button round size="mini">未超期</el-button>
            <el-button type="primary" round size="mini">进行中</el-button>
          </div>
        </div>
        <div class="bottom">
          <div class="f">
            <div class="mb10">
              <span class="mr10">项目类型</span>
              <span>1232</span>
            </div>
            <div>
              <span class="mr10">项目经理</span>
              <span>1214</span>
            </div>
          </div>
          <div class="f">
            <div class="mb10">
              <span class="mr10">优先级别</span>
              <span>1232</span>
            </div>
            <div>
              <span class="mr10">紧急程度</span>
              <span>1214</span>
            </div>
          </div>
          <div class="f">
            <div class="mb10">
              <span class="mr10">计划工时</span>
              <span>1215</span>
            </div>
            <div>
              <span class="mr10">项目阶段</span>
              <span>1214</span>
            </div>
          </div>
          <div class="f">
            <div class="mb10">
              <span class="mr10">保险问题</span>
              <span>1232</span>
            </div>
            <div>
              <span class="mr10">合同问题</span>
              <span>1214</span>
            </div>
          </div>
          <div class="f" style="width:25%;"> 
            <div class="mb10">
              <span class="mr10">时间进度</span>
              <el-progress :percentage="50" style="width:70%;margin-top:8px;"></el-progress>
            </div>
            <div>
              <span class="mr10">自评进度</span>
              <el-progress :percentage="50" style="width:70%;margin-top:8px;"></el-progress>
            </div>
          </div>
        </div>
      </div>
       <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Insurance',

  data() {
    return {
      isShow: false,
      form: {},
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