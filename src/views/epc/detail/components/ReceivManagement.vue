<template>
  <div>
    <div class="top">
      <div style="margin-left:15px;">
        <p>回款计划总金额 (合同)</p>
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
        <p>￥{{ paymentCollectionAlreadyTotal.toFixed(2) | money }}</p>
      </div>
      <div>
        <p>已回款总金额占比</p>
        <p>{{ paymentCollectionAlreadyScale.toFixed(2) }} %</p>
      </div>
    </div>

    <el-card>
      <div slot="header">
        <el-radio-group v-model="radio1" size="mini" style="margin-left: 10px;">
          <el-radio-button label="回款计划"></el-radio-button>
          <el-radio-button label="扣款记录"></el-radio-button>
          <el-radio-button label="回款记录"></el-radio-button>
        </el-radio-group>
        <el-button type="primary" style="float: right;margin-right: 10px;" size="mini" @click="handleAdd">新增回款计划</el-button>
      </div>
      <div>
        <!-- 回款计划 -->
        <el-table  v-show="radio1 == '回款计划'" v-loading="loading" :data="seEpcProjectPaymentCollectionPlanList" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="mini">
          <el-table-column fixed label="回款类别">
            <template slot-scope="scope">
              <span v-if="scope.row.type == 0">预付款</span>
              <span v-else-if="scope.row.type == 1">进度款</span>
              <span v-else-if="scope.row.type == 2">竣工款</span>
              <span v-else-if="scope.row.type == 3">质保金</span>
              <span v-else-if="scope.row.type == 4">消缺</span>
              <span v-else-if="scope.row.type == 5">收电费</span>
              <span v-else>尾款</span>
            </template>
          </el-table-column>
          <el-table-column fixed label="回款计划金额" width="120" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.paymentCollectionPlan.toFixed(2) | money }}</span>
            </template>
          </el-table-column>
          <el-table-column label="整体占比" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.scale == 0 ? '0.00 %' : scope.row.scale.toFixed(2) + ' %' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="回款条件说明" width="300">
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                width="400"
                trigger="hover"
                :content="scope.row.paymentExplain">
                <span class="yi" slot="reference">{{ scope.row.paymentExplain }}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="回款状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0">待回款</span>
              <span v-else-if="scope.row.status == 1" style="color: red;">请催收</span>
              <span v-else style="color: #4DA9FF;">已回款</span>
            </template>
          </el-table-column>
          <el-table-column label="扣款项金额" width="120" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.paymentCut == 0 ? '0.00' : scope.row.paymentCut.toFixed(2) | money }}</span>
            </template>
          </el-table-column>
          <el-table-column label="应收回款金额" width="120" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.paymentCollectionShould.toFixed(2) | money }}</span>
            </template>
          </el-table-column>
          <el-table-column label="待回款金额" width="120" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.paymentCollectionWait == 0 ? '0.00' : scope.row.paymentCollectionWait.toFixed(2) | money }}</span>
            </template>
          </el-table-column>
          <el-table-column label="已回款金额" width="120" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.paymentCollectionAlready.toFixed(2) | money }}</span>
            </template>
          </el-table-column>
          <el-table-column label="关联任务" width="180">
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                width="300"
                trigger="hover"
                :content="scope.row.taskName">
                <span class="yi" slot="reference">{{ scope.row.taskName }}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="最晚回款日期" width="100" prop="lastPaymentCollectionTime" align="center" />
          <el-table-column label="提前提醒天数" width="100" prop="wornDay" align="right" />
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" @click="handlePlanLog(scope.row)">记录</el-button>
              <el-button type="text" @click="handleView(scope.row)">查看</el-button>
              <el-button type="text" @click="handleEdit(scope.row)">修改</el-button>
              <el-button type="text" style="color:red;" @click="handleRemove(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 扣款记录 -->
        <el-table  v-show="radio1 == '扣款记录'" :data="deductTableData" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="mini">
          <el-table-column label="扣款日期" prop="payDate" />
          <el-table-column label="扣款金额">
            <template slot-scope="scope">
              <span>{{ scope.row.payment.toFixed(2) | money }}</span>
            </template>
          </el-table-column>
          <el-table-column label="扣款类别">
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
          <el-table-column label="扣款说明" width="280">
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
              <el-button type="text" @click="viewAddDeduct(scope.row)">查看</el-button>
              <el-button v-if="scope.row.status == 0" type="text" style="color:red;" @click="handleCancle(scope.row)">作废</el-button>
              <el-button v-else type="text" @click="viewCancle(scope.row)">作废说明</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 回款记录 -->
        <el-table v-show="radio1 == '回款记录'" :data="receivaTableData" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="mini">
          <el-table-column label="回款日期" prop="payDate" />
          <el-table-column label="回款金额">
            <template slot-scope="scope">
              <span>{{ scope.row.payment.toFixed(2) | money }}</span>
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
          <el-table-column label="回款说明" width="280">
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
              <el-button type="text" @click="viewAdd(scope.row)">查看</el-button>
              <el-button v-if="scope.row.status == 0" type="text" style="color: red;" @click="handleCancle(scope.row)">作废</el-button>
              <el-button v-else type="text" @click="viewCancle(scope.row)">作废说明</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- 新增/修改/查看回款计划 -->
    <el-dialog :title="planTitle" :visible.sync="planDialogVisible" width="40%" :close-on-click-modal="false" :destroy-on-close="true" @close="handleClose">
      <el-form :model="planForm" :rules="planRules" ref="planRef" label-width="100px" size="mini" :disabled="isDisabled">
        <el-form-item label="回款类别" prop="type">
          <el-select v-model="planForm.type" placeholder="请选择" class="width100" clearable>
            <el-option label="预付款" :value="0"></el-option>
            <el-option label="进度款" :value="1"></el-option>
            <el-option label="竣工款" :value="2"></el-option>
            <el-option label="质保金" :value="3"></el-option>
            <el-option label="消缺" :value="4"></el-option>
            <el-option label="收电费" :value="5"></el-option>
            <el-option label="尾款" :value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="回款计划金额" prop="paymentCollectionPlan">
          <el-input v-model="planForm.paymentCollectionPlan" type="number" placeholder="请输入回款计划金额" clearable>
            <span slot="suffix">元</span>
          </el-input>
        </el-form-item>
        <el-form-item label="关联任务">
          <el-select v-model="planForm.taskId" placeholder="请选择" class="width100" @change="handleSelect" clearable>
            <el-option v-for="item in tasks" :label="item.taskName" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最晚回款日期">
          <el-date-picker
            v-model="planForm.lastPaymentCollectionTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            clearable 
            style="width: 100%;" />
        </el-form-item>
        <el-form-item label="提前提醒天数">
          <el-input v-model="planForm.wornDay" type="number" clearable>
            <span slot="suffix">天</span>
          </el-input>
        </el-form-item>
        <el-form-item label="回款条件说明">
          <el-input type="textarea" :autosize="{ minRows: 8, maxRows: 50}" v-model="planForm.paymentExplain" />
        </el-form-item>
        <el-form-item label="合同截图">
          <image-upload-string v-model="planForm.contractImage" :limit="5" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-show="btnShow" @click="planDialogVisible = false" size="mini">取 消</el-button>
        <el-button v-show="btnShow" type="primary" @click="add" size="mini">确 定</el-button>
        <el-button v-show="!btnShow" type="primary" @click="planDialogVisible = false" size="mini">关 闭</el-button>
      </span>
    </el-dialog>

    <!-- 回款计划记录列表 -->
    <el-dialog title="记录" :visible.sync="logDialogVisible" :close-on-click-modal="false"  width="70%" @close="handleLogClose">
      <el-card>
        <div slot="header">
          <el-radio-group v-model="radio2" size="mini" style="margin-left: 10px;">
            <el-radio-button label="回款记录"></el-radio-button>
            <el-radio-button label="扣款记录"></el-radio-button>
            <el-radio-button label="跟进记录"></el-radio-button>
          </el-radio-group>
        </div>

        <div v-show="radio2 == '回款记录'">
          <el-button type="primary" style="float: right; margin-bottom: 15px;" size="mini" @click="handleAddReceiva">新增回款</el-button>
          <el-table :data="receivaLogTableData" v-loading="loading2" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="mini">
            <el-table-column label="回款日期" prop="payDate" />
            <el-table-column label="回款金额">
              <template slot-scope="scope">
                <span>{{ scope.row.payment.toFixed(2) | money }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作人" prop="createUserName" />
            <el-table-column label="记录状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status == 0" style="color: #1890ff;">有效</span>
                <span v-else style="color: red;">已作废</span>
              </template>
            </el-table-column>
            <el-table-column label="回款描述" width="260">
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
                <el-button type="text" @click="viewAdd(scope.row)">查看</el-button>
                <el-button v-if="scope.row.status == 0" type="text" style="color: red;" @click="handleCancle(scope.row)">作废</el-button>
                <el-button v-else type="text" @click="viewCancle(scope.row)">作废说明</el-button>
              </template>
            </el-table-column>
          </el-table>
          <c-pagination ref="pagination1" :defaultPageSize="5" :total="total1" @sendsize="handleSizeChange1" @sendpage="handleCurrentChange1" />
        </div>

        <div v-show="radio2 == '扣款记录'">
          <el-button type="primary" style="float: right; margin-bottom: 15px;" size="mini" @click="handleDeduction">新增扣款</el-button>
          <el-table :data="deductLogTableData" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="mini">
            <el-table-column label="扣款日期" prop="payDate" />
            <el-table-column label="扣款金额">
              <template slot-scope="scope">
                <span>{{ scope.row.payment.toFixed(2) | money }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作人" prop="createUserName" />
            <el-table-column label="记录状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status == 0" style="color: #1890ff;">有效</span>
                <span v-else style="color: red;">已作废</span>
              </template>
            </el-table-column>
            <el-table-column label="扣款描述" width="260">
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
                <el-button type="text" @click="viewAddDeduct(scope.row)">查看</el-button>
                <el-button v-if="scope.row.status == 0" type="text" style="color: red;" @click="handleCancle(scope.row)">作废</el-button>
                <el-button v-else type="text" @click="viewCancle(scope.row)">作废说明</el-button>
              </template>
            </el-table-column>
          </el-table>
          <c-pagination ref="pagination2" :total="total2" :defaultPageSize="5" @sendsize="handleSizeChange2" @sendpage="handleCurrentChange2" />
        </div>

        <div v-show="radio2 == '跟进记录'">
          <el-button type="primary" style="float: right; margin-bottom: 15px;" size="mini" @click="handleFollow">跟进</el-button>
          <el-table :data="followTableData" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="mini">
            <el-table-column label="记录日期" prop="createTime" />
            <el-table-column label="跟进人" prop="createUserName" />
            <el-table-column label="备注" width="280">
              <template slot-scope="scope">
                <el-popover
                  placement="top-start"
                  width="300"
                  trigger="hover"
                  :content="scope.row.followMessage">
                  <span class="yi" slot="reference">{{ scope.row.followMessage }}</span>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" @click="viewFollow(scope.row)">查看</el-button>
                <el-button type="text" style="color: red;" @click="deleteFollow(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <c-pagination ref="pagination3" :total="total3" :defaultPageSize="5" @sendsize="handleSizeChange3" @sendpage="handleCurrentChange3" />
        </div>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog" type="primary" size="mini">关 闭</el-button>
      </span>
    </el-dialog>

    <!-- 新增/查看 回款 -->
    <el-dialog :title="addTitle" :visible.sync="addReceivaDialogVisible" width="40%" :close-on-click-modal="false" :destroy-on-close="true" @close="addReceivaClose">
      <el-form :model="addReceivaForm" :rules="addReceivaRules" ref="addReceivaRef" label-width="100px" size="mini" :disabled="addReceivaIsDisabled">
        <el-form-item label="待收回款金额" prop="paymentCollectionWait" v-show="isView">
          <el-input v-model="addReceivaForm.paymentCollectionWait" disabled>
            <span slot="suffix">元</span>
          </el-input>
        </el-form-item>
        <el-form-item label="本次回款金额" prop="payment">
          <el-input v-model="addReceivaForm.payment" type="number" placeholder="请输入本次回款金额" clearable>
            <span slot="suffix">元</span>
          </el-input>
        </el-form-item>
        <el-form-item label="回款日期" prop="payDate">
          <el-date-picker
            v-model="addReceivaForm.payDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            clearable 
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
        <el-button v-show="btnAddShow" @click="addReceivaDialogVisible = false" size="mini">取 消</el-button>
        <el-button v-show="btnAddShow" type="primary" @click="addReceiva" size="mini">确 定</el-button>
        <el-button v-show="!btnAddShow" type="primary" @click="addReceivaDialogVisible = false" size="mini">关 闭</el-button>
      </span>
    </el-dialog>

    <!-- 新增/查看 扣款 -->
    <el-dialog :title="addTitle" :visible.sync="addDeductDialogVisible" width="40%" :close-on-click-modal="false" :destroy-on-close="true" @close="addDeductClose">
      <el-form :model="addDeductForm" :rules="addDeductRules" ref="addDeductRef" label-width="100px" size="mini" :disabled="addDeductDisabled">
        <el-form-item label="待收回款金额" prop="paymentCollectionWait" v-show="isView">
          <el-input v-model="addDeductForm.paymentCollectionWait" disabled>
            <span slot="suffix">元</span>
          </el-input>
        </el-form-item>
        <el-form-item label="扣款金额" prop="payment">
          <el-input v-model="addDeductForm.payment" type="number" placeholder="请输入扣款金额" clearable>
            <span slot="suffix">元</span>
          </el-input>
        </el-form-item>
        <el-form-item label="扣款日期" prop="payDate">
          <el-date-picker
            v-model="addDeductForm.payDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            clearable 
            style="width: 100%;" />
        </el-form-item>
        <el-form-item label="扣款说明">
          <el-input type="textarea" :autosize="{ minRows: 8, maxRows: 50}" v-model="addDeductForm.message" />
        </el-form-item>
        <el-form-item label="凭证截图">
          <image-upload-string v-model="addDeductForm.otherImage" :limit="5" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-show="btnAddShow" @click="addDeductDialogVisible = false" size="mini">取 消</el-button>
        <el-button v-show="btnAddShow" type="primary" @click="addReduct" size="mini">确 定</el-button>
        <el-button v-show="!btnAddShow" type="primary" @click="addDeductDialogVisible = false" size="mini">关 闭</el-button>
      </span>
    </el-dialog>

    <!-- 回款/扣款 作废 -->
    <el-dialog :title="cancleTitle" :visible.sync="cancleDialogVisible" width="40%" :close-on-click-modal="false" :destroy-on-close="true" @close="cancleClose">
      <el-form :model="cancleForm" :rules="cancleRules" ref="cancleRef" label-width="80px" size="mini" :disabled="cancleDisabled">
        <el-form-item label="作废说明" prop="delMessage">
          <el-input type="textarea" :autosize="{ minRows: 8, maxRows: 50}" v-model="cancleForm.delMessage" placeholder="请输入作废说明，限2-500字符" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-show="btnAddShow" @click="cancleDialogVisible = false" size="mini">取 消</el-button>
        <el-button v-show="btnAddShow" type="primary" size="mini" @click="confirmCancle">确定作废</el-button>
        <el-button v-show="!btnAddShow" type="primary" @click="cancleDialogVisible = false" size="mini">关 闭</el-button>
      </span>
    </el-dialog>

    <!-- 跟进 -->
    <el-dialog :title="addTitle" :visible.sync="followDialogVisible" width="40%" :close-on-click-modal="false" :destroy-on-close="true" @close="followClose">
      <el-form :model="addFollowForm" :rules="addFollowRules" ref="addFollowRef" label-width="100px" size="mini" :disabled="followDisabled">
        <el-form-item label="跟进说明" prop="followMessage">
          <el-input type="textarea" :autosize="{ minRows: 8, maxRows: 50}" v-model="addFollowForm.followMessage" placeholder="请输入跟进说明，限2-500字符" />
        </el-form-item>
        <el-form-item label="其他截图">
          <image-upload-string v-model="addFollowForm.image" :limit="5" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-show="btnAddShow" @click="followDialogVisible = false" size="mini">取 消</el-button>
        <el-button v-show="btnAddShow" type="primary" @click="addFollow" size="mini">确 定</el-button>
        <el-button v-show="!btnAddShow" type="primary" @click="followDialogVisible = false" size="mini">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCollectionPlan, addPlan, getProjectAllTask, deletePlan, getRecevivaLog, getAmount, addPayment, getFollow, addFollowLog, deleteFollow, cancleLog } from '@/api/epc'
export default {
  name: 'ReceivManagement',
  props: ['id'],
  data() {
    var checkPrice = (rule, value, callback) => {
      const reg = /^([1-9]\d*(\.\d{1,2})?|([0](\.([0][1-9]|[1-9]\d{0,1}))))$/
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('限数字，小数点后2位'))
      }
    }
    return {
      radio1: '回款计划',
      projectId: this.id,
      paymentCollectionAlreadyScale: 0,
      paymentCollectionAlreadyTotal: 0,
      paymentCollectionPlanTotal: 0,
      paymentCollectionShouldTotal: 0,
      paymentCollectionWaitScale: 0,
      paymentCollectionWaitTotal: 0,
      paymentCutTotal: 0,

      seEpcProjectPaymentCollectionPlanList: [], // 回款计划列表
      loading: false,
      // 新增/修改/查看回款计划
      planTitle: '',
      btnShow: true,
      isDisabled: false,
      planDialogVisible: false,
      tasks: [],
      planForm: {
        id: undefined,
        projectId: this.id,
        type: undefined,
        paymentCollectionPlan: undefined,
        taskId: undefined,
        taskName: undefined,
        wornDay: undefined,
        lastPaymentCollectionTime: undefined,
        paymentExplain: undefined,
        contractImage: null
      },
      planRules: {
        type: [{ required: true, message: '请选择回款类别', trigger: 'change' }],
        paymentCollectionPlan: [
          { required: true, message: '请输入回款计划金额', trigger: 'blur' },
          { validator: checkPrice, trigger: 'blur' }
        ]
      },
      // 回款计划 回款/扣款 记录
      loading2: false,
      logForm: {
        projectId: this.id,
        planId: undefined,
        type: undefined,
        pageIndex: 1,
        pageSize: 5
      },
      deductTableData: [], // 扣款记录
      receivaTableData: [], // 回款记录

      // 记录
      amountId: undefined, // 获取待收金额id
      logDialogVisible: false,
      radio2: '回款记录',
      receivaLogTableData: [], // 回款
      total1: 0,
      deductLogTableData: [], // 扣款
      total2: 0,
      followTableData: [], // 跟进
      total3: 0,

      // 控制查看
      isView: true,

      // 新增/查看 回款
      addReceivaDialogVisible: false,
      btnAddShow: true,
      addTitle: '',
      addReceivaForm: {
        id: undefined,
        planId: undefined,
        projectId: this.id,
        type: undefined,
        paymentCollectionWait: undefined,
        payment: undefined,
        payDate: undefined,
        message: undefined,
        otherImage: undefined
      },
      addReceivaRules: {
        payment: [
          { required: true, message: '请输入本次回款金额', trigger: 'blur' },
          { validator: checkPrice, trigger: 'blur' }
        ],
        payDate: [{ required: true, message: '请选择回款日期', trigger: 'change' }],
      },
      addReceivaIsDisabled: false,

      // 新增/查看 扣款
      addDeductDialogVisible: false,
      addDeductForm: {
        id: undefined,
        planId: undefined,
        projectId: this.id,
        type: undefined,
        paymentCollectionWait: undefined,
        payment: undefined,
        payDate: undefined,
        message: undefined,
        otherImage: undefined
      },
      addDeductRules: {
        payment: [
          { required: true, message: '请输入本次回款金额', trigger: 'blur' },
          { validator: checkPrice, trigger: 'blur' }
        ],
        payDate: [{ required: true, message: '请选择回款日期', trigger: 'change' }],
      },
      addDeductDisabled: false,
      
      // 回款/扣款 作废
      cancleDialogVisible: false,
      cancleTitle: '',
      cancleDisabled: false,
      cancleForm: {
        id: undefined,
        planId: undefined,
        delMessage: undefined
      },
      cancleRules: {
        delMessage: [
          { required: true, message: '请输入作废说明，限2-500字符', trigger: 'blur' },
          { min: 2, max: 500, message: '长度在 2 到 500 个字符', trigger: 'blur' }
        ]
      },

      // 跟进
      followForm: {
        planId: undefined,
        pageIndex: 1,
        pageSize: 5
      },
      followDialogVisible: false,
      addFollowForm: {
        id: undefined,
        planId: undefined,
        projectId: this.id,
        followMessage: undefined,
        image: undefined
      },
      addFollowRules: {
        followMessage: [
          { required: true, message: '请输入跟进说明，限2-500字符', trigger: 'blur' },
          { min: 2, max: 500, message: '长度在 2 到 500 个字符', trigger: 'blur' }
        ]
      },
      followDisabled: false
    }
  },
  // created() {
  //   this.getList()
  //   this.getLog({ ...this.logForm, type: 1 }, 'deductTableData')
  //   this.getLog({ ...this.logForm, type: 0 }, 'receivaTableData')
  // },
  methods: {
    // 获取回款计划列表
    getList() {
      this.loading = true
      getCollectionPlan({ projectId: this.projectId }).then( res => {
        const { paymentCollectionAlreadyScale, paymentCollectionAlreadyTotal, paymentCollectionPlanTotal, paymentCollectionShouldTotal, paymentCollectionWaitScale, paymentCollectionWaitTotal, paymentCutTotal, seEpcProjectPaymentCollectionPlanList } = res.data
        this.paymentCollectionAlreadyScale = paymentCollectionAlreadyScale,
        this.paymentCollectionAlreadyTotal = paymentCollectionAlreadyTotal,
        this.paymentCollectionPlanTotal = paymentCollectionPlanTotal,
        this.paymentCollectionShouldTotal = paymentCollectionShouldTotal,
        this.paymentCollectionWaitScale = paymentCollectionWaitScale,
        this.paymentCollectionWaitTotal = paymentCollectionWaitTotal,
        this.paymentCutTotal = paymentCutTotal
        this.seEpcProjectPaymentCollectionPlanList = seEpcProjectPaymentCollectionPlanList
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 获取回款/扣款 记录
    getLog(form, data, total) {
      this.loading2 = true
      getRecevivaLog(form).then( res => {
        this.loading2 = false
        this[data] = res.data.records
        this[total] = res.data.total
      })
    },
    // 新增回款计划
    handleAdd() {
      this.planTitle = '新增回款计划'
      this.getTask()
      this.planDialogVisible = true
    },
    // 查看回款计划
    handleView(row) {
      this.$nextTick(() => {
        this.planForm = _.cloneDeep(row)
      })
      this.planTitle = '查看回款计划'
      this.btnShow = false
      this.isDisabled = true
      this.planDialogVisible = true
    },
    // 修改回款计划
    handleEdit(row) {
      this.$nextTick(() => {
        this.planForm = _.cloneDeep(row)
      })
      this.getTask()
      this.planTitle = '修改回款计划'
      this.planDialogVisible = true
    },
    // 新增/修改 回款计划
    add() {
      this.$refs.planRef.validate( valid => {
        if (valid) {
          addPlan(this.planForm).then( res => {
            this.$message.success(res.msg)
            this.getList()
            this.planDialogVisible = false
          })
        }
      })
    },
    // 删除回款计划
    handleRemove(id) {
      this.$confirm('此操作将永久删除该计划, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePlan({ id }).then( res => {
          this.getList()
          this.getLog({ ...this.logForm, type: 1 }, 'deductTableData')
          this.getLog({ ...this.logForm, type: 0 }, 'receivaTableData')
          this.$message.success(res.msg)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })        
      })
    },
    // 新增/修改计划 关闭清空重置
    handleClose() {
      this.$refs.planRef.resetFields()
      this.planForm = {
        id: undefined,
        projectId: this.id,
        type: undefined,
        paymentCollectionPlan: undefined,
        taskName: undefined,
        wornDay: undefined,
        lastPaymentCollectionTime: undefined,
        paymentExplain: undefined,
        contractImage: null
      }
      this.isDisabled = false
      this.btnShow = true
      this.tasks = []
    },
    // 新增/修改计划 taskName值
    handleSelect(value) {
      this.tasks.forEach((val, i ,arr) => {
        if (val.id == value) {
          this.planForm.taskName = arr[i].taskName
        }
      })
    },
    // 获取关联任务
    getTask() {
      getProjectAllTask({ projectId: this.projectId }).then( res => {
        let arr = res.data
        
        for(let i = 0; i < arr.length; i++) {
          this.tasks.push(arr[i])
          if (arr[i].seEpcProjectTaskInfoList !== null) {
            let { seEpcProjectTaskInfoList } = arr[i]
            for (let j = 0; j < seEpcProjectTaskInfoList.length; j++) {
              this.tasks.push(seEpcProjectTaskInfoList[j])
            }
          }
        }
      })
    },

    // 获取回款/扣款 记录
    closeDialog() {
      this.getList()
      this.getLog({ ...this.logForm, type: 1 }, 'deductTableData')
      this.getLog({ ...this.logForm, type: 0 }, 'receivaTableData')
      this.logDialogVisible = false
    },
    handlePlanLog(row) {
      this.amountId = row.id
      this.getLog({ ...this.logForm, planId: row.id, type: 0 }, 'receivaLogTableData', 'total1') // 回款
      this.getLog({ ...this.logForm, planId: row.id, type: 1 }, 'deductLogTableData', 'total2') // 扣款
      this.addFollowForm.planId = row.id
      this.getFollowLog(row.id)
      this.logDialogVisible = true
    },
    handleSizeChange1(val) {
      this.logForm.pageSize = val
      this.getLog({ ...this.logForm, planId: this.amountId, type: 0 }, 'receivaLogTableData', 'total1')
    },
    handleCurrentChange1(val) {
      this.logForm.pageIndex = val
      this.getLog({ ...this.logForm, planId: this.amountId, type: 0 }, 'receivaLogTableData', 'total1')
    },
    handleSizeChange2(val) {
      this.logForm.pageSize = val
      this.getLog({ ...this.logForm, planId: this.amountId, type: 1 }, 'deductLogTableData', 'total2')
    },
    handleCurrentChange2(val) {
      this.logForm.pageIndex = val
      this.getLog({ ...this.logForm, planId: this.amountId, type: 1 }, 'deductLogTableData', 'total2')
    },
    handleSizeChange3(val) {
      this.followForm.pageSize = val
      this.getFollowLog(this.amountId)
    },
    handleCurrentChange3(val) {
      this.followForm.pageIndex = val
      this.getFollowLog(this.amountId)
    },
    // 关闭清空记录
    handleLogClose() {
      this.radio2 = '回款记录'
    },
    
    // 新增/查看 回款
    // 获取待收回款金额
    getDuein(form) {
      getAmount({id: this.amountId}).then( res => {
        this[form].planId = res.data.id
        this[form].paymentCollectionWait = res.data.paymentCollectionWait
        return res.data.paymentCollectionWait
      })
    },
    handleAddReceiva() {
      this.getDuein('addReceivaForm')
      this.addReceivaForm.type = 0 
      this.addTitle = '新增回款'
      this.addReceivaDialogVisible = true
    },
    addReceiva() {
      if(this.addReceivaForm.payment > this.addReceivaForm.paymentCollectionWait) {
        return this.$message.error('本次回款金额不能超过待收回款金额')
      } else {
        this.$refs.addReceivaRef.validate( valid => {
          if (valid) {
            addPayment(this.addReceivaForm).then( res => {
              this.$message.success(res.msg)
              this.getLog({ ...this.logForm, planId: this.addReceivaForm.planId, type: 0 }, 'receivaLogTableData', 'total1') // 回款
              this.addReceivaDialogVisible = false
            })
          }
        })
      }
    },
    viewAdd(row) {
      this.addReceivaIsDisabled = true
      this.isView = false
      this.btnAddShow = false
      this.addTitle = '回款'
      this.addReceivaForm = _.cloneDeep(row)
      this.addReceivaDialogVisible = true
    },
    addReceivaClose() {
      this.$refs.addReceivaRef.resetFields()
      this.addReceivaIsDisabled = false
      this.btnAddShow = true
      this.isView = true
      this.addReceivaForm = {
        id: undefined,
        planId: undefined,
        projectId: this.id,
        type: undefined,
        paymentCollectionWait: undefined,
        payment: undefined,
        payDate: undefined,
        message: undefined,
        otherImage: undefined
      }
    },

    // 新增/查看 扣款
    handleDeduction() {
      this.getDuein('addDeductForm')
      this.addDeductForm.type = 1
      this.addTitle = '新增扣款'
      this.addDeductDialogVisible = true
    },
    addReduct() {
      if(this.addDeductForm.payment > this.addDeductForm.paymentCollectionWait) {
        return this.$message.error('本次扣款金额不能超过待收回款金额')
      } else {
        this.$refs.addDeductRef.validate( valid => {
          if (valid) {
            addPayment(this.addDeductForm).then( res => {
              this.$message.success(res.msg)
              this.getLog({ ...this.logForm, planId: this.addDeductForm.planId, type: 1 }, 'deductLogTableData', 'total2') // 扣款
              this.addDeductDialogVisible = false
            })
          }
        })
      }
    },
    viewAddDeduct(row) {
      this.isView = false
      this.addDeductDisabled = true
      this.btnAddShow = false
      this.addTitle = '扣款'
      this.addDeductForm = _.cloneDeep(row)
      this.addDeductDialogVisible = true
    },
    addDeductClose() {
      this.$refs.addDeductRef.resetFields()
      this.addDeductDisabled = false
      this.btnAddShow = true
      this.isView = true
      this.addDeductForm = {
        id: undefined,
        planId: undefined,
        projectId: this.id,
        type: undefined,
        paymentCollectionWait: undefined,
        payment: undefined,
        payDate: undefined,
        message: undefined,
        otherImage: undefined
      }
    },

    // 回款/扣款 作废
    handleCancle(row) {
      this.cancleForm.id = row.id
      this.cancleForm.planId = row.planId
      this.cancleTitle = '作废'
      this.cancleDialogVisible = true
    },
    confirmCancle() {
      this.$refs.cancleRef.validate( valid => {
        if(valid) {
          cancleLog(this.cancleForm).then(res => {
            this.$message.success(res.msg)
            if (this.radio2 == '回款记录') {
              this.getLog({ ...this.logForm, planId: this.cancleForm.planId, type: 0 }, 'receivaLogTableData', 'total1') // 回款
            } else if (this.radio2 == '扣款记录') {
              this.getLog({ ...this.logForm, planId: this.cancleForm.planId, type: 1 }, 'deductLogTableData', 'total2') // 扣款
            }
            this.getLog({ ...this.logForm, type: 0 }, 'receivaTableData')
            this.getLog({ ...this.logForm, type: 1 }, 'deductTableData')
            this.getList()
            this.cancleDialogVisible = false
          })
        }
      })
    },
    viewCancle(row) {
      this.cancleForm = row
      this.cancleTitle = '作废说明'
      this.btnAddShow = false
      this.cancleDisabled = true
      this.cancleDialogVisible = true
    },
    cancleClose() {
      this.cancleTitle = ''
      this.cancleDisabled = false
      this.btnAddShow = true
      this.cancleForm = {
        id: undefined,
        planId: undefined,
        delMessage: undefined
      }
      this.$refs.cancleRef.resetFields()
    },

    // 跟进
    // 获取跟进记录
    getFollowLog(planId) {
      getFollow({...this.followForm, planId}).then( res => {
        this.followTableData = res.data.records
        this.total3 = res.data.total
      })
    },
    handleFollow() {
      this.addTitle = '跟进'
      this.followDialogVisible = true
    },
    addFollow() {
      this.$refs.addFollowRef.validate( valid => {
        if (valid) {
          addFollowLog(this.addFollowForm).then( res => {
            this.$message.success(res.msg)
            this.getFollowLog(this.addFollowForm.planId)
            this.followDialogVisible = false
          })
        }
      })
    },
    viewFollow(row) {
      this.addTitle = '跟进'
      this.btnAddShow = false
      this.followDisabled = true
      this.addFollowForm = _.cloneDeep(row)
      this.followDialogVisible = true
    },
    deleteFollow(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteFollow({id}).then( res => {
          this.$message.success(res.msg)
          this.getFollowLog(this.addFollowForm.planId)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })       
      })
    },
    followClose() {
      this.$refs.addFollowRef.resetFields()
      this.followDisabled = false
      this.btnAddShow = true
      this.addFollowForm = {
        id: undefined,
        planId: undefined,
        projectId: this.id,
        followMessage: undefined,
        image: undefined
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .top {
    margin-right: 5px;
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
</style>