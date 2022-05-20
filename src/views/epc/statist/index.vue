<template>
  <div>
    <Bread />
    <el-row>
      <el-col :span="8">
        <el-card>
          <div slot="header">
            <span style="font-size: 13px;font-weight:800;color: #333;">月回款总计</span>
            <el-date-picker
              v-model="value2"
              type="month"
              placeholder="选择月" 
              size="small"
              style="float:right;" />
          </div>
          <div>
            
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <div slot="header">
            <span style="font-size: 13px;font-weight:800;color: #333;">近6个月回款金额（元）与笔数走势</span>
          </div>
          <div>
            
          </div>
        </el-card>
      </el-col> 
    </el-row>
      
    <div class="center">
      <div style="margin-left:15px;">
        <p>合同总金额</p>
        <p>￥ 0.00</p>
      </div>
      <div>
        <p>扣款总金额</p>
        <p>￥ 0.00</p>
      </div>
      <div>
        <p>应收回款总金额</p>
        <p>￥ 0.00</p>
      </div>
      <div>
        <p>待回款总金额</p>
        <p>￥ 0.00</p>
      </div>
      <div>
        <p>待回款总金额占比</p>
        <p>0.00 %</p>
      </div>
      <div>
        <p>已回款总金额</p>
        <p>￥ 0.00</p>
      </div>
      <div>
        <p>已回款总金额占比</p>
        <p>0.00 %</p>
      </div>
    </div>

    <el-card>
      <div style="display:flex;justify-content:space-between;">
        <span style="font-weight:800;font-size:13px;">搜索查询</span>
        <i :class="isShow ? 'el-icon-caret-top' : 'el-icon-caret-bottom'" @click="handleShow" style="font-size:20px;color:#409eff;cursor:pointer;"></i>
      </div>
      <div v-show="isShow" style="margin-top:20px;">
        <el-form ref="form" :model="tableInfo" label-width="80px" size="mini">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="项目名称">
                <el-input v-model="tableInfo.projectName" placeholder="项目名称查询" clearable style="width:60%;" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建人">
                <el-input v-model="tableInfo.nickName" placeholder="创建人查询" clearable style="width:60%;" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="回款日期">
                <el-col :span="11" style="padding-left:0px !important;">
                  <el-date-picker type="date" placeholder="起始日期" v-model="tableInfo.startTimeFrom" value-format="yyyy-MM-dd" style="width: 100%;" />
                </el-col>
                <el-col :span="2">
                  <span>-</span>
                </el-col>
                <el-col :span="11" style="padding-left:0px !important;">
                  <el-date-picker type="date" placeholder="截止日期" v-model="tableInfo.startTimeTo" value-format="yyyy-MM-dd" style="width: 100%;" />
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="2">
              <el-form-item label="记录状态">
                <el-radio-group v-model="tableInfo.projectType" size="mini">
                  <el-radio-button :label="null">全部</el-radio-button>
                  <el-radio-button :label="0">有效</el-radio-button>
                  <el-radio-button :label="0">已作废</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <div style="text-align:right;">
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">查 询</el-button>
              <el-button size="mini" @click="reset">重 置</el-button>
          </div>
        </el-form>
      </div>
    </el-card>

    <el-card>
      <div slot="header">
        <span style="font-size: 13px;font-weight:800;color: #333;">回款记录</span>
      </div>
      <div>
        <el-table :data="tableData" v-loading="loading" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="mini">
          <el-table-column label="回款日期" />
          <el-table-column label="回款金额" />
          <el-table-column label="所属项目" />
          <el-table-column label="回款类别" />
          <el-table-column label="创建人" />
          <el-table-column label="记录状态" />
          <el-table-column label="回款说明" />
          <el-table-column label="操作">
            <template>
              <el-button type="text">查看</el-button>
              <el-button type="text">作废说明</el-button>
            </template>
          </el-table-column>
        </el-table>
        <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Statist',
  data() {
    return {
      tableInfo: {},
      isShow: false,
    }
  },
  methods: {
    getList () {},
    handleShow () {
      this.isShow = !this.isShow
    },
    handleSizeChange(val) {
      this.tableInfo.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.tableInfo.pageIndex = val
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
  .top {

  }
  .center {
    display: flex;
    justify-content: space-around;
    div {
      width: 100%;
      margin-right: 15px;
      padding-left: 20px;
      border: 1px solid rgba(233, 233, 233, 1);
      background-color: #fff;
      :first-child {
        font-size: 12px;
        color: #7f7f7f;
      }
      :last-child {
        font-size: 16px;
        font-weight: 800;
        color: #000;
      }
    }
  }
  /deep/ .el-card__header {
    padding: 10px;
  }
  .el-date-editor {
    margin-top: -5px;
  }
</style>