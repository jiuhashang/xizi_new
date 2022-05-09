<template>
  <!-- 任务管理 -->
  <el-card>
    <div class="top">
      <el-radio-group v-model="label" size="mini">
        <el-radio-button label="列表"></el-radio-button>
        <el-radio-button label="视图" disabled></el-radio-button>
      </el-radio-group>
      <div>
        <el-button type="primary" size="mini" @click="chooseTemplate">选择模板</el-button>
        <el-button type="primary" size="mini" @click="handleAddOne">添加一级任务</el-button>
        <el-button type="primary" size="mini" @click="handleAddTwo">添加二级任务</el-button>
      </div>
    </div>
    <!-- 列表 -->
    <el-table :data="tableData" v-loading="loading" row-key="id" stripe default-expand-all :tree-props="{children: 'seEpcProjectTaskInfoList', hasChildren: 'hasChildren'}" :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="mini" v-show="label === '列表'">
      <el-table-column prop="taskName" label="任务名称" fixed width="190" />
      <el-table-column prop="sortNum" label="排序" align="center" />
      <el-table-column label="计划日期" align="center" width="210">
        <template slot-scope="scope">
          <span v-if="scope.row.startTime && scope.row.endTime">{{ scope.row.startTime }} 至 {{ scope.row.endTime }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalDay" label="总计工期" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.totalDay ? scope.row.totalDay : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="剩余工期" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status != 3 && scope.row.status != 2">{{ scope.row.endTime ? shengyu(scope.row.endTime) : ' - ' }}</span>
          <span v-else> - </span>
        </template>
      </el-table-column>
      <el-table-column label="完成日期" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.finishTime ? scope.row.finishTime : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工期偏差" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.differenceDay ? scope.row.differenceDay : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1" style="color:#70B603;">进行中</span>
          <span v-else-if="scope.row.status == 2" style="color:#1890FF;">已解决</span>
          <span v-else-if="scope.row.status == 3" style="color:#aaa;">已关闭</span>
        </template>
      </el-table-column>
      <el-table-column label="负责人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.personUse ? scope.row.personUse : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务级别" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.wornFlag == 1">主要任务</span>
          <span v-else>一般任务</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="210" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" :disabled="scope.row.status == 2 || scope.row.startTime == null" @click="handleResolve(scope.row)">解决</el-button>
          <el-button type="text" :disabled="scope.row.status == 1" @click="handleActive(scope.row.id)">激活</el-button>
          <el-button type="text" :disabled="scope.row.status == 3" @click="handleClose(scope.row.id)">关闭</el-button>
          <el-button type="text" :disabled="scope.row.status == 2" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" style="color:red;" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 视图 -->
    <div v-show="label === '视图'">
      <!-- <el-table :data="tableData" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="small">
        <el-table-column label="任务名称" fixed />
        <el-table-column label="计划时间" />
        <el-table-column label="完成时间" />
        <el-table-column label="时间偏差" />
        <el-table-column label="剩余时间" />
        <el-table-column label="任务状态" />
        <el-table-column label="操作">
          <template>
            <el-button type="text">确认完成</el-button>
            <el-button type="text">关闭任务</el-button>
            <el-button type="text">编辑时间</el-button>
          </template>
        </el-table-column>
      </el-table> -->
      <div class="container">
        <!-- <Gantt class="left-container" :tasks="tasks" /> -->
        <h5>正在开发中...</h5>
      </div>
    </div>

    <!-- 选择模板 -->
    <el-dialog title="选择模板" :visible.sync="templateDialogVisible" :close-on-click-modal="false" width="50%">
      <el-alert title="变更模板后将替换现有任务，并需要重新管理任务安排，请谨慎操作。" type="success" :closable="false" />
      <el-table :data="tempalateData" v-loading="dialogLoading" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="mini" style="margin-top:15px;">
        <el-table-column prop="templateName" label="模板名称" />
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="handleChoose(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="templateDialogVisible = false" size="mini">关 闭</el-button>
      </span>
    </el-dialog>

    <!-- 添加/编辑一级任务 -->
    <el-dialog :title="oneTitle" :visible.sync="oneAddDialogVisible" :close-on-click-modal="false" width="40%" @close="resetForm('oneRef')">
      <el-form ref="oneRef" :model="oneInfo" :rules="oneRules" label-width="100px" size="mini" class="width95">
        <el-form-item label="任务名称" prop="taskName">
          <el-input v-model="oneInfo.taskName" placeholder="请输入任务名称" clearable />
        </el-form-item>
        <el-form-item label="任务级别" prop="wornFlag">
          <el-select v-model="oneInfo.wornFlag" placeholder="请选择" class="width100">
            <el-option label="主要任务" :value="1"></el-option>
            <el-option label="一般任务" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sortNum">
          <el-input type="number" v-model="oneInfo.sortNum" placeholder="限整数数字" clearable />
        </el-form-item>
        <el-form-item label="计划开始" prop="startTime">
          <el-date-picker type="date" placeholder="起始日期" v-model="oneInfo.startTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :picker-options="pickerOptionsOneStart" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="计划结束" prop="endTime">
          <el-date-picker type="date" placeholder="结束日期" v-model="oneInfo.endTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :picker-options="pickerOptionsOneEnd" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="总计工期" prop="totalDay">
          <el-input v-model="oneInfo.totalDay" @input="changeDay" placeholder="限大于 0 整数数字" clearable />
        </el-form-item>
        <el-form-item label="负责人姓名" prop="personUse">
          <el-input v-model="oneInfo.personUse" placeholder="请输入负责人姓名" clearable />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="oneAddDialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleAddOneTask" size="mini">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加/编辑二级任务 -->
    <el-dialog :title="twoTitle" :visible.sync="twoAddDialogVisible" :close-on-click-modal="false" width="40%"  @close="resetForm('twoRef')">
      <el-form ref="twoRef" :model="twoInfo" :rules="twoRules" label-width="100px" size="mini" class="width95">
        <el-form-item label="任务名称" prop="taskName">
          <el-input v-model="twoInfo.taskName" placeholder="请输入任务名称" clearable />
        </el-form-item>
        <el-form-item label="任务级别" prop="wornFlag">
          <el-select v-model="twoInfo.wornFlag" placeholder="请选择" class="width100">
            <el-option label="主要任务" :value="1"></el-option>
            <el-option label="一般任务" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="父级任务" prop="parentId">
          <el-select v-model="twoInfo.parentId" placeholder="请选择" class="width100">
            <el-option :label="item.taskName" :value="item.id" v-for="item in tableData" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sortNum">
          <el-input type="number" v-model="twoInfo.sortNum" placeholder="限整数数字" clearable />
        </el-form-item>
        <el-form-item label="计划开始" prop="startTime">
          <el-date-picker type="date" placeholder="起始日期" v-model="twoInfo.startTime" value-format="yyyy-MM-dd" :picker-options="pickerOptionsTwoStart" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="计划结束" prop="endTime">
          <el-date-picker type="date" placeholder="结束日期" v-model="twoInfo.endTime" value-format="yyyy-MM-dd" :picker-options="pickerOptionsTwoEnd" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="总计工期" prop="totalDay">
          <el-input v-model="twoInfo.totalDay" placeholder="限大于 0 整数数字" clearable />
        </el-form-item>
        <el-form-item label="负责人姓名" prop="personUse">
          <el-input v-model="twoInfo.personUse" placeholder="请输入负责人姓名" clearable />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="twoAddDialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleAddTwoTask" size="mini">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 解决 -->
    <el-dialog title="解决任务" :visible.sync="resolveDialogVisible" :close-on-click-modal="false" width="30%" @close="resetForm('resolveRef')">
      <el-form ref="resolveRef" :model="resolveForm" :rules="resolveRules" label-width="80px" size="mini">
        <el-form-item label="完成日期" prop="finishTime">
          <el-date-picker type="date" placeholder="选择日期" v-model="resolveForm.finishTime" style="width: 100%;" value-format="yyyy-MM-dd" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resolveDialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleResolveTask" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import Gantt from '@/components/Gantt/Gantt.vue'
import { getProjectAllTask, addTemplateTask, addProjectTask, deleteTask, closeTask } from '@/api/epc'
import { getList } from '@/api/integrated'

import _ from 'lodash'
import moment from "moment"
export default {
  name: 'TaskManagement',
  props: ['id'],
  components: { Gantt },
  data() {
    var check = (rule, value, callback) => {
      const reg = /^([0-9]{1,2}|100)$/
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('限 0 - 100 整数'))
      }
    }
    var checkBai = (rule, value, callback) => {
      const reg = /^([1-9]\d?|100)$/
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('限 1 - 100 整数'))
      }
    }
    return {
      label: '列表',
      projectId: undefined,
      tableData: [],
      loading: true,

      // 选择模板
      templateDialogVisible: false,
      dialogLoading: true,
      tempalateInfo: {
        templateId: undefined,
        projectId: undefined
      },
      tempalateData: [],

      // 添加/编辑一级任务
      oneAddDialogVisible: false,
      oneTitle: '',
      oneInfo: {
        id: undefined,
        projectId: this.id,
        taskLevel: 0, // 一级任务
        parentId: 0, // 父
        taskName: undefined, // 任务名称
        wornFlag: undefined, // 任务级别
        sortNum: undefined, // 排序
        startTime: undefined,
        endTime: undefined,
        totalDay: undefined,
        personUse: undefined
      },
      oneRules: {
        taskName: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        wornFlag: [{ required: true, message: '请选择任务级别', trigger: 'change' }],
        sortNum: [{ required: true, validator: check, trigger: 'blur' }],
        startTime: [{ required: true, message: '请选择起始日期', trigger: 'change' }],
        endTime: [{ required: true, message: '请选择结束日期', trigger: 'change' }],
        totalDay: [{ required: true, validator: checkBai, trigger: 'blur' }]
      },
      // 开始结束日期限制
      pickerOptionsOneStart: {
        disabledDate: (time) => {
          if (this.oneInfo.endTime) {
            return (
              time.getTime() > new Date(this.oneInfo.endTime).getTime()
            );
          }
        }
      },
      // 结束日期限制
      pickerOptionsOneEnd: {
        disabledDate: (time) => {
          if (this.oneInfo.startTime) {
            return (
              time.getTime() < new Date(this.oneInfo.startTime).getTime() - 86400000
            )
          }
        }
      },

      // 添加/编辑二级任务
      twoAddDialogVisible: false,
      twoTitle: '',
      twoInfo: {
        id: undefined,
        projectId: this.id, 
        parentId: undefined, // 父模板id
        taskLevel: 1, // 二级任务
        taskName: undefined, // 任务名称
        wornFlag: undefined, // 任务级别
        sortNum: undefined, // 排序
        startTime: undefined, // 开始时间
        endTime: undefined, // 结束时间
        totalDay: undefined,
        personUse: undefined
      },
      twoRules: {
        taskName: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        wornFlag: [{ required: true, message: '请选择任务级别', trigger: 'change' }],
        parentId: [{ required: true, message: '请选择父级任务', trigger: 'change' }],
        sortNum: [{ required: true, validator: check, trigger: 'blur' }],
        startTime: [{ required: true, message: '请选择起始日期', trigger: 'change' }],
        endTime: [{ required: true, message: '请选择结束日期', trigger: 'change' }],
        totalDay: [{ required: true, validator: checkBai, trigger: 'blur' }]
      },
      // 开始结束日期限制
      pickerOptionsTwoStart: {
        disabledDate: (time) => {
          if (this.twoInfo.endTime) {
            return (
              time.getTime() >= new Date(this.twoInfo.endTime).getTime()
            )
          }
        }
      },
      // 结束日期限制
      pickerOptionsTwoEnd: {
        disabledDate: (time) => {
          if (this.twoInfo.startTime) {
            return (
              time.getTime() <= new Date(this.twoInfo.startTime).getTime() - 86400000
            )
          }
        }
      },
      
      // 解决
      resolveDialogVisible: false,
      resolveForm: {
        id: '',
        status: 2,
        finishTime: ''
      },
      resolveRules: {
        finishTime: [{ required: true, message: '请选择日期',  trigger: 'change' }]
      },

      // 甘特图
      tasks: {
        data: [
          {id: 1, text: 'Task #1', start_date: '2020-01-17', duration: 3, progress: 0.6},
          {id: 2, text: 'Task #2', start_date: '2021-01-20', duration: 3, progress: 0.4}
        ],
        links: [
          {id: 1, source: 1, target: 2, type: '0'}
        ]
      },
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      getProjectAllTask({ projectId: this.id }).then( res => {
        // console.log(res)
        this.tableData = res.data
        this.loading = false
      })
    },
    // 选择模板对话框
    chooseTemplate () {
      getList().then( res => {
        this.tempalateData = res.data.records
        this.dialogLoading = false
      })
      this.templateDialogVisible = true
    },
    // 选择模板
    handleChoose ( row ) {
      this.$confirm('是否选择该模板?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tempalateInfo.templateId = row.id
        this.tempalateInfo.projectId = this.id
        addTemplateTask( this.tempalateInfo ).then( res => {
          this.getList()
          this.templateDialogVisible = false
          this.$message.success( res.msg )
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消选择'
        })      
      })
    },

    // 添加一级任务
    // 转换一级任务时间
    // 添加对话框
    handleAddOne () {
      this.oneTitle = '添加一级任务'
      this.oneAddDialogVisible = true
    },
    handleAddOneTask () {
      this.$refs.oneRef.validate( valid => {
        if ( valid ) {
          addProjectTask( this.oneInfo ).then( res => {
            this.getList()
            this.$message.success( res.msg )
            this.oneAddDialogVisible = false
          })
        }
      })
    },

    handleEdit ( row ) {
      if ( row.taskLevel == 0 ) {
        this.oneTitle = '编辑任务'
        this.oneInfo = _.cloneDeep( row )
        this.oneInfo.seEpcProjectTaskInfoList = []
        this.oneAddDialogVisible = true
      } else if ( row.taskLevel == 1 ) {
        this.twoTitle = '编辑任务'
        this.twoInfo = _.cloneDeep( row )
        this.twoAddDialogVisible = true
      }
    },

    // 添加二级任务
    handleAddTwo () {
      this.twoTitle = '添加二级任务'
      this.twoAddDialogVisible = true
    },
    handleAddTwoTask () {
      this.$refs.twoRef.validate( valid => {
        if ( valid ) {
          addProjectTask( this.twoInfo ).then( res => {
            this.getList()
            this.$message.success( res.msg )
            this.twoAddDialogVisible = false
          })
        }
      })
    },

    // 清空对话框
    resetForm(formName) {
      this.$refs[formName].resetFields()
       this.oneInfo = {
        id: undefined,
        projectId: this.id,
        taskLevel: 0, // 一级任务
        parentId: 0, // 父
        taskName: undefined, // 任务名称
        wornFlag: undefined, // 任务级别
        sortNum: undefined, // 排序
        startTime: undefined,
        endTime: undefined,
        totalDay: undefined,
        personUse: undefined
      }
      this.twoInfo = {
        id: undefined,
        projectId: this.id, 
        parentId: undefined, // 父模板id
        taskLevel: 1, // 二级任务
        taskName: undefined, // 任务名称
        wornFlag: undefined, // 任务级别
        sortNum: undefined, // 排序
        startTime: undefined, // 开始时间
        endTime: undefined, // 结束时间
        totalDay: undefined,
        personUse: undefined
      }
    },

    // 删除任务
    handleDelete ( id ) {
      this.$confirm('删除任务将同时删除子任务，不可还原。是否确定删除该任务？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTask({ id }).then( res => {
          this.getList()
          this.$message.success( res.msg )
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })       
      })
    },
    // 关闭
    handleClose ( id ) {
      this.$confirm('确定要关闭该任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        closeTask({ id , status: 3 }).then( res => {
          this.getList()
          this.$message.success( res.msg ) 
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消关闭'
        })       
      })
    },
    // 解决
    handleResolve ( row ) {
      this.resolveForm.id = row.id
      this.resolveDialogVisible = true
    },
    handleResolveTask () {
      this.$refs.resolveRef.validate( valid => {
        if ( valid ) {
          closeTask( this.resolveForm ).then( res => {
            this.getList()
            this.$message.success( res.msg )
            this.resolveDialogVisible = false
          })
        }
      })
    },
    // 激活
    handleActive ( id ) {
      this.$confirm('确定要激活该任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        closeTask({ id , status: 1 }).then( res => {
          this.getList()
          this.$message.success( res.msg ) 
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消激活'
        })       
      })
    },

    // 剩余工期
    shengyu ( a ) {
      let t = Date.parse( new Date( a ) )
      let now = new Date().toLocaleDateString()
      if ( t + 86400000 < Date.now() ) {
        return '已延期'
      } else {
        return this.datedifference( now, a )
      }
    },
    datedifference ( sDate1, sDate2 ) { // 计算总计   //sDate1和sDate2是2006-12-18格式 
      var dateSpan, iDays;
        sDate1 = Date.parse( sDate1 )
        sDate2 = Date.parse( sDate2 )
        dateSpan = sDate2 - sDate1
        dateSpan = Math.abs( dateSpan )
        iDays = Math.floor( dateSpan / ( 24 * 3600 * 1000 ) )
      return iDays + 1
    },
    addCount ( sDate, day ) { // 计算结束
      return moment(sDate).add(day, 'days').format('YYYY-MM-DD')
    },
    subCount ( sDate, day ) { // 计算开始
      return moment(sDate).subtract(day, 'days').format('YYYY-MM-DD')
    }
  },
  watch: {
    'oneInfo.startTime': function ( newVal, oldVal ) {
      if (newVal && this.oneInfo.endTime) {
        this.oneInfo.totalDay = this.datedifference( newVal, this.oneInfo.endTime )
        return
      }
      if (newVal && this.oneInfo.totalDay) {
        this.oneInfo.endTime = this.addCount( newVal, this.oneInfo.totalDay - 1)
        return
      }
    },
    'oneInfo.endTime': function ( newVal, oldVal ) {
      if (this.oneInfo.startTime && newVal) {
        this.oneInfo.totalDay = this.datedifference( this.oneInfo.startTime, newVal )
        return
      }
      if (this.oneInfo.totalDay && newVal) {
        this.oneInfo.startTime = this.subCount( newVal, this.oneInfo.totalDay - 1)
        return
      }
    },
    'oneInfo.totalDay': function ( newVal, oldVal ) {
      if (newVal && this.oneInfo.startTime) {
        let day2 = newVal -1
        this.oneInfo.endTime = this.addCount( this.oneInfo.startTime, day2)
        return
      }
      if (newVal && this.oneInfo.endTime) {
        let day2 = parseInt (this.oneInfo.totalDay)
        this.oneInfo.startTime = this.subCount( this.oneInfo.endTime, day2)
        return
      }
    },

    'twoInfo.startTime': function ( newVal, oldVal ) {
      if (newVal && this.twoInfo.endTime) {
        this.twoInfo.totalDay = this.datedifference( newVal, this.twoInfo.endTime )
        return
      }
      if (newVal && this.twoInfo.totalDay) {
        this.twoInfo.endTime = this.addCount( newVal, this.twoInfo.totalDay - 1)
        return
      }
    },
    'twoInfo.endTime': function ( newVal, oldVal ) {
      if (this.twoInfo.startTime && newVal) {
        this.twoInfo.totalDay = this.datedifference( this.twoInfo.startTime, newVal )
        return
      }
      if (this.twoInfo.totalDay && newVal) {
        this.twoInfo.startTime = this.subCount( newVal, this.twoInfo.totalDay - 1 )
        return
      }
    },
    'twoInfo.totalDay': function ( newVal, oldVal ) {
      if (newVal && this.twoInfo.startTime) {
        let day2 = newVal -1
        this.twoInfo.endTime = this.addCount( this.twoInfo.startTime, day2)
        return
      }
      if (newVal && this.twoInfo.endTime) {
        let day2 = parseInt (this.twoInfo.totalDay)
        this.twoInfo.startTime = this.subCount( this.twoInfo.endTime, day2)
        return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.container {
  height: 300px;
  width: 100%;
}
.left-container {
  overflow: hidden;
  position: relative;
  height: 100%;
}
.el-card {
  margin-top: 0;
}
</style>