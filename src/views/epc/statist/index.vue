<template>
  <div>
    <Bread />
    <el-row>
      <el-col :span="9">
        <el-card>
          <div slot="header">
            <span style="font-size: 13px;font-weight:800;color: #333;">月回款总计</span>
            <el-date-picker
              v-model="monthDate"
              @change="handleChangeMouth"
              type="month"
              :value-format="yyyy-MM"
              placeholder="选择月" 
              size="small"
              style="float:right;margin-right: 10px; width: 40%;" />
          </div>
          <div class="top">
            <div>
              <p>月回款总金额</p>
              <p>￥ {{ paymentTotal.toFixed(2) | money }}</p>
            </div>
            <div>
              <p>月回款总笔数</p>
              <p>{{ paymentSize }}</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="15">
        <el-card style="margin-left: 0px;" class="card">
          <div slot="header">
            <span style="font-size: 13px;font-weight:800;color: #333;">近6个月回款金额（元）与笔数走势</span>
          </div>
          <div>
            <div id="main" style="width: 100%;height:300px;"></div>
          </div>
        </el-card>
      </el-col> 
    </el-row>
      
    <div class="center">
      <div style="margin-left:15px;">
        <p>合同总金额</p>
        <p>￥{{ paymentCollectionPlanTotal.toFixed(2) | money }}</p>
      </div>
      <div>
        <p>扣款总金额</p>
        <p>￥{{ paymentCutTotal.toFixed(2) | money }}</p>
      </div>
      <div>
        <p>应收回款总金额</p>
        <p>￥{{ paymentCollectionShouldTotal.toFixed(2) | money }}</p>
      </div>
      <div>
        <p>待回款总金额</p>
        <p>￥{{ paymentCollectionWaitTotal.toFixed(2) | money }}</p>
      </div>
      <div>
        <p>待回款总金额占比</p>
        <p>{{ paymentCollectionWaitScale.toFixed(2) }} %</p>
      </div>
      <div>
        <p>已回款总金额</p>
        <p>￥{{ paymentCollectionAlreadyTotal == 0 ? '0.00' : paymentCollectionAlreadyTotal.toFixed(2) | money }}</p>
      </div>
      <div style="margin-right: 15px;">
        <p>已回款总金额占比</p>
        <p>{{ paymentCollectionAlreadyScale == 0 ? '0.00' : paymentCollectionAlreadyScale.toFixed(2) }} %</p>
      </div>
    </div>

    <el-card>
      <div style="display:flex;justify-content:space-between;">
        <span style="font-weight:800;font-size:13px;">搜索查询</span>
        <i :class="isShow ? 'el-icon-caret-top' : 'el-icon-caret-bottom'" @click="isShow = !isShow" style="font-size:20px;color:#409eff;cursor:pointer;"></i>
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
                <el-input v-model="tableInfo.createUserName" placeholder="创建人查询" clearable style="width:60%;" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="回款日期">
                <el-date-picker
                  v-model="time"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="handleChange"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                  clearable
                  style="width: 75%;" />
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="2">
              <el-form-item label="记录状态">
                <el-radio-group v-model="tableInfo.status" size="mini">
                  <el-radio-button :label="null">全部</el-radio-button>
                  <el-radio-button :label="0">有效</el-radio-button>
                  <el-radio-button :label="1">已作废</el-radio-button>
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
          <el-table-column label="回款日期" prop="payDate" width="100" />
          <el-table-column label="回款金额" align="right" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.payment.toFixed(2) | money }}</span>
            </template>
          </el-table-column>
          <el-table-column label="所属项目" width="260">
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                width="300"
                trigger="hover"
                :content="scope.row.projectName">
                <span class="yi" slot="reference">{{ scope.row.projectName }}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="回款类别">
            <template slot-scope="scope">
              <span v-if="scope.row.planType == 0">预付款</span>
              <span v-else-if="scope.row.planType == 1">进度款</span>
              <span v-else-if="scope.row.planType == 2">竣工款</span>
              <span v-else-if="scope.row.planType == 3">质保金</span>
              <span v-else-if="scope.row.planType == 4">消缺</span>
              <span v-else-if="scope.row.planType == 5">收电费</span>
              <span v-else>尾款</span>
            </template>
          </el-table-column>
          <el-table-column label="创建人" prop="createUserName" />
          <el-table-column label="记录状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0" style="color: #1890ff;">有效</span>
              <span v-else style="color: red;">已作废</span>
            </template>
          </el-table-column>
          <el-table-column label="回款说明" width="220">
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                width="300"
                trigger="hover"
                :content="scope.row.message">
                <span class="yi" slot="reference">{{ scope.row.message }}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" @click="handleView(scope.row)">查看</el-button>
              <el-button type="text" v-show="scope.row.status == 1" @click="handleCancle(scope.row)">作废说明</el-button>
            </template>
          </el-table-column>
        </el-table>
        <c-pagination ref="pagination" :total="total" :defaultPageSize="5" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
      </div>
    </el-card>
    
    <!-- 查看 -->
    <el-dialog title="回款" :visible.sync="addReceivaDialogVisible" width="40%" :close-on-click-modal="false" :destroy-on-close="true" @close="addReceivaClose">
      <el-form :model="addReceivaForm" ref="addReceivaRef" label-width="100px" size="mini" disabled>
        <el-form-item label="本次回款金额" prop="payment">
          <el-input v-model="addReceivaForm.payment" type="number">
            <span slot="suffix">元</span>
          </el-input>
        </el-form-item>
        <el-form-item label="回款日期" prop="payDate">
          <el-date-picker
            v-model="addReceivaForm.payDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd" 
            style="width: 100%;" />
        </el-form-item>
        <el-form-item label="回款说明">
          <el-input type="textarea" :autosize="{ minRows: 8, maxRows: 50}" v-model="addReceivaForm.message" />
        </el-form-item>
        <el-form-item label="凭证截图">
          <image-upload-string v-model="addReceivaForm.otherImage" :limit="5" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-show="!btnAddShow" type="primary" @click="addReceivaDialogVisible = false" size="mini">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 作废说明 -->
    <el-dialog title="作废说明" :visible.sync="cancleDialogVisible" width="40%" :close-on-click-modal="false" :destroy-on-close="true" @close="cancleClose">
      <el-form :model="cancleForm" ref="cancleRef" label-width="80px" size="mini" disabled>
        <el-form-item label="作废说明" prop="delMessage">
          <el-input type="textarea" :autosize="{ minRows: 8, maxRows: 50}" v-model="cancleForm.delMessage" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancleDialogVisible = false" size="mini">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { getTotalCount, getTotalPaymentCollectionMonth, getNearSixMonthPaymentCollection, getRecevivaLog } from '@/api/epc'
import moment from 'moment'
export default {
  name: 'Statist',
  data() {
    return {
      monthDate: undefined,
      paymentTotal: 0.00,
      paymentSize: 0,
      
      paymentCollectionPlanTotal: 0.00,
      paymentCutTotal: 0.00,
      paymentCollectionShouldTotal: 0.00,
      paymentCollectionWaitTotal: 0.00,
      paymentCollectionWaitScale: 0.00,
      paymentCollectionAlreadyTotal: 0.00,
      paymentCollectionAlreadyScale: 0.00,

      months: [],
      paymentTotals: [],
      paymentSizes: [],

      isShow: false,
      tableInfo: {
        type: 0,
        projectName: undefined,
        createUserName: undefined,
        startTime: undefined,
        endTime: undefined,
        status: null,
        pageIndex: 1,
        pageSize: 5
      },
      loading: false,
      tableData: [],
      total: 0,
      time: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      // 查看
      addReceivaDialogVisible: false,
      addReceivaForm: {
        payment: undefined,
        payDate: undefined,
        message: undefined,
        otherImage: undefined
      }, 
      // 作废
      cancleDialogVisible: false,
      cancleForm: {
        delMessage: undefined
      }
    }
  },
  created() {
    this.getList()
    this.monthDate = moment().format('YYYY-MM')
    this.getTotleMonth(this.monthDate)
    this.getLogList()
  },
  mounted() {
    let chartDom = document.getElementById('main')
    let myChart = echarts.init(chartDom)
    
    getNearSixMonthPaymentCollection().then(res => {
      res.data.forEach((val , i, arr) => {
        this.months.unshift(arr[i].month)
        this.paymentTotals.unshift(arr[i].paymentTotal)
        this.paymentSizes.unshift(arr[i].paymentSize)
      })
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: ['近6个月回款金额(元)', '笔数']
        },
        xAxis: [
          {
            type: 'category',
            data: this.months,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false
            },
            min: 0
          },
          {
            type: 'value',
            splitLine: {
              show: false
            },
            min: 0
          }
        ],
        series: [
          {
            name: '近6个月回款金额(元)',
            type: 'bar',
            barWidth:30,
            data: this.paymentTotals
          },
          {
            name: '笔数',
            type: 'line',
            yAxisIndex: 1,
            data: this.paymentSizes
          }
        ]
      }
      option && myChart.setOption(option)
      window.addEventListener("resize", () => {
        myChart.resize()
      })
    })
  },
  methods: {
    getList () {
      getTotalCount().then(res => {
        const { paymentCollectionPlanTotal, paymentCutTotal, paymentCollectionShouldTotal, paymentCollectionWaitTotal, paymentCollectionWaitScale, paymentCollectionAlreadyTotal, paymentCollectionAlreadyScale } = res.data
        this.paymentCollectionPlanTotal = paymentCollectionPlanTotal
        this.paymentCutTotal = paymentCutTotal
        this.paymentCollectionShouldTotal = paymentCollectionShouldTotal
        this.paymentCollectionWaitTotal = paymentCollectionWaitTotal
        this.paymentCollectionWaitScale = paymentCollectionWaitScale
        this.paymentCollectionAlreadyTotal = paymentCollectionAlreadyTotal
        this.paymentCollectionAlreadyScale = paymentCollectionAlreadyScale
      })
    },
    getTotleMonth(monthDate) {
      getTotalPaymentCollectionMonth({monthDate}).then(res => {
        const { paymentTotal, paymentSize } = res.data
        this.paymentTotal = paymentTotal
        this.paymentSize = paymentSize
      })
    },
    handleChangeMouth(val) {
      this.monthDate = moment(val).format('YYYY-MM')
      this.getTotleMonth(this.monthDate)
    },
    getLogList() {
      this.loading = true
      getRecevivaLog(this.tableInfo).then(res => {
        const {records, total} = res.data
        this.tableData = records
        this.total = total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleQuery() {
      this.getLogList()
    },
    reset() {
      this.tableInfo = {
        type: 0,
        projectName: undefined,
        createUserName: undefined,
        startTime: undefined,
        endTime: undefined,
        status: null,
        pageIndex: 1,
        pageSize: 5
      },
      this.getLogList()
    },
    handleChange(val) {
      if (val) {
        this.tableInfo.startTime = val[0]
        this.tableInfo.endTime = val[1]
      } else {
        this.tableInfo.startTime = undefined
        this.tableInfo.endTime = undefined
      }
    },
    // 查看
    handleView(row) {
      this.addReceivaForm = row
      this.addReceivaDialogVisible = true
    },
    addReceivaClose() {
      this.addReceivaForm = {
        paymentCollectionWait: undefined,
        payment: undefined,
        payDate: undefined,
        message: undefined,
        otherImage: undefined
      }
    },
    // 作废
    handleCancle(row) {
      this.cancleForm = row
      this.cancleDialogVisible = true
    },
    cancleClose() {
      this.cancleForm = {
        delMessage: undefined
      }
    },
    handleSizeChange(val) {
      this.tableInfo.pageSize = val
      this.getLogList()
    },
    handleCurrentChange(val) {
      this.tableInfo.pageIndex = val
      this.getLogList()
    }
  }
}
</script>

<style lang="scss" scoped>
  .top {
    :first-child {
      margin-bottom: 18px;
    }
    div {
      padding: 18px 0;
      padding-left: 20px;
      border: 1px solid rgba(233, 233, 233, 1);
      :first-child {
        font-size: 12px;
        color: #7f7f7f;
      }
      :last-child {
        font-size: 16px;
        font-weight: bold;
        color: #000;
      }
    }
  }
  .center {
    display: flex;
    justify-content: space-around;
    div {
      width: 100%;
      border-radius: 3px;
      margin-right: 10px;
      padding-left: 15px;
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
  /deep/ .card .el-card__body{
    padding: 0 15px;
  }
</style>