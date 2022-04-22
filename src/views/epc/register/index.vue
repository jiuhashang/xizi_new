<template>
  <div>
    <div class="shang">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{ $route.matched[1].meta.title }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="back">
        <div @click="$router.back()" style="width:240px;">
          <h3>&lt; {{ $route.meta.title }}</h3>
        </div>
        <div class="btnnn">
          <el-button size="small" @click="handleQx">取 消</el-button>
          <el-button size="small" type="primary" @click="handleConfirm">确 定</el-button>
        </div>
      </div>
    </div>
    <el-card>
      <ProjectTitle title="项目信息" />
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" size="small" style="margin-top:20px;">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="EPC项目名称" prop="projectName">
              <el-input v-model="form.projectName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司名称" prop="companyName">
              <el-input v-model="form.companyName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="建站地址" prop="value">
              <el-cascader
                v-model="form.value"
                :options="options"
                :props="{ expandTrigger: 'hover', label:'province', value: 'province', children:'cities' }"
                @change="handleChange"
                class="width100" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="项目来源" prop="projectSource">
              <el-select v-model="form.projectSource" placeholder="请选择" style="width:100%;">
                <el-option label="自主投资" :value="0"></el-option>
                <el-option label="EPC项目" :value="1"></el-option>
                <el-option label="其他项目" :value="9"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目类型" prop="projectType">
              <el-select v-model="form.projectType" placeholder="请选择" style="width:100%;">
                <el-option label="分布式项目" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否有EPC合同" prop="isEpcContract">
              <el-select v-model="form.isEpcContract" placeholder="请选择" style="width:100%;">
                <el-option label="有" :value="1"></el-option>
                <el-option label="无" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="优先级别" prop="firstLevel">
              <el-select v-model="form.firstLevel" placeholder="请选择" style="width:100%;">
                <el-option label="高" :value="2"></el-option>
                <el-option label="中" :value="1"></el-option>
                <el-option label="低" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="紧急级别" prop="urgentLevel">
              <el-select v-model="form.urgentLevel" placeholder="请选择" style="width:100%;">
                <el-option label="非常紧急" :value="2"></el-option>
                <el-option label="紧急" :value="1"></el-option>
                <el-option label="一般" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      <!-- </el-form> -->
      <ProjectTitle title="项目说明" />
      <!-- <el-form ref="form" :model="form" :rules="rules" label-width="120px" size="small" style="margin-top:15px;"> -->
        <el-row :gutter="10" style="margin-top:20px;">
          <el-col :span="8">
            <el-form-item label="计划开始">
              <el-date-picker
                v-model="form.startTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
                clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="计划结束">
              <el-date-picker
                v-model="form.endTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
                clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col>
            <el-form-item label="立项说明" prop="setProjectMessage">
              <el-input type="textarea" placeholder="请输入" v-model="form.setProjectMessage" maxlength="500" show-word-limit />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <ProjectTitle title="关联项目">
        <div>
          <el-button size="mini" @click="handleCancel" :disabled="!form.seProjectInfo.projectName">取消关联</el-button>
          <el-button type="primary" size="mini" @click="handleAssoc">关联项目</el-button>
        </div>
      </ProjectTitle>
      <el-alert title="若关联已经市场开发的项目，可自动带入项目名称、公司名称、建站地址。立项成功后可在项目管理中修改关联项目" type="success" :closable="false" style="margin-top:15px;" />
      <el-form :model="seProjectInfo" label-width="120px" size="small" style="margin-top:20px;" disabled>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="项目名称">
              <el-input v-model="form.seProjectInfo.projectName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司名称">
              <el-input v-model="form.seProjectInfo.companyName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="建站地址">
              <el-input v-model="form.seProjectInfo.value" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="负责人">
              <el-input v-model="form.seProjectInfo.createUserNickName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目发起时间">
              <el-input v-model="form.seProjectInfo.createTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="当前进度">
              <el-input v-model="form.seProjectInfo.step"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!-- 关联项目弹框列表 -->
    <el-dialog title="关联项目" :visible.sync="dialogVisible" width="75%" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form ref="ruleForm" :model="tableInfo" inline size="mini">
        <el-form-item>
          <el-input v-model="tableInfo.projectName" placeholder="项目名称查询" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="tableInfo.companyName" placeholder="公司名称查询" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery" icon="el-icon-search">查 询</el-button>
          <el-button @click="reset">重 置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" v-loading="loading" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="mini">
        <el-table-column prop="projectName" label="项目名称" />
        <el-table-column prop="companyName" label="公司名称" />
        <el-table-column label="建站地址">
          <template slot-scope="scope">
            {{ scope.row.province }} - {{ scope.row.city }}
          </template>
        </el-table-column>
        <el-table-column prop="createUserNickName" label="负责人" />
        <el-table-column prop="createTime" label="项目发起时间" />
        <el-table-column label="当前进度">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0 || scope.row.status == 2">待录入</span>
            <span v-else-if="scope.row.status == 1">初审审核</span>
            <span v-else-if="( scope.row.status == 3 && scope.row.firstExamineType == 1 )">图纸复核</span>
            <span v-else-if="scope.row.status == 5 || (scope.row.status == 3 && scope.row.firstExamineType == 2 )">材料补充</span>
            <span v-else-if="scope.row.status == 6 || ( scope.row.status == 3 && scope.row.firstExamineType == 3 )">终审审核</span>
            <span v-else-if="scope.row.status == 7">立项补充</span>
            <span v-else-if="scope.row.status == 99">项目终止</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleChoose(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false" size="small">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getProvinceCity } from '@/api/listProject'
import { selectListAll } from '@/api/center'
import { addOrUpdateOne } from '@/api/epc'
export default {
  name: 'Register',
  data() {
    return {
      form: {
        projectName: undefined,
        companyName: undefined,
        province: undefined,
        city: undefined,
        projectSource: undefined,
        projectType: undefined,
        isEpcContract: undefined,
        firstLevel: undefined,
        urgentLevel: undefined,
        startTime: undefined,
        endTime: undefined,
        setProjectMessage: undefined,
        projectId: undefined,
        value: [],
        seProjectInfo: {
          value: '',
          step: ''
        }
      },
      rules: {
        projectName: [
          { required: true, message: '请输入EPC项目名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        companyName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        value: [{ type: 'array', required: true, message: '请选择建站地址', trigger: 'change' }],
        projectSource: [{ required: true, message: '请选择项目来源', trigger: 'change' }],
        projectType: [{ required: true, message: '请选择项目类型', trigger: 'change' }],
        isEpcContract: [{ required: true, message: '请选择是否有EPC合同', trigger: 'change' }],
        firstLevel: [{ required: true, message: '请选择优先级别', trigger: 'change' }],
        urgentLevel: [{ required: true, message: '请选择紧急级别', trigger: 'change' }]
      },
      dialogVisible: false,
      tableInfo: {
        projectName: '',
        companyName: ''
      },
      tableData: [],
      loading: true,
      options: []
    }
  },
  created () {
    if ( this.$route.query.detailInfo && this.$route.query.detailInfo.id ) {
      this.form = { ...this.$route.query.detailInfo } 
      this.form.seProjectInfo = { ...this.$route.query.detailInfo.seProjectInfo }
      this.form.value = [ this.form.province, this.form.city ]
      if ( this.form.seProjectInfo.province != null ) {
        this.form.seProjectInfo.value = this.$route.query.detailInfo.seProjectInfo.province + this.$route.query.detailInfo.seProjectInfo.city 
      }
      if ( this.form.seProjectInfo.status == 0 || this.form.seProjectInfo.status == 2 ) {
        this.form.seProjectInfo.step = '待录入'
      } else if ( this.form.seProjectInfo.status == 1 ) {
        this.form.seProjectInfo.step = '初审审核'
      } else if ( this.form.seProjectInfo.status == 3 && this.form.seProjectInfo.firstExamineType == 1 ) {
        this.form.seProjectInfo.step = '图纸复核'
      } else if (this.form.seProjectInfo.status == 5 || ( this.form.seProjectInfo.status == 3 && this.form.seProjectInfo.firstExamineType == 2 )) {
        this.form.seProjectInfo.step = '材料补充'
      } else if ( this.form.seProjectInfo.status == 6 || ( this.form.seProjectInfo.status == 3 && this.form.seProjectInfo.firstExamineType == 3 )) {
        this.form.seProjectInfo.step = '终审审核'
      } else if ( this.form.seProjectInfo.status == 7 ) {
        this.form.seProjectInfo.step = '立项补充'
      } else if ( this.form.seProjectInfo.status == 99 ) {
        this.form.seProjectInfo.step = '项目终止'
      }
    }
    this.getProvinceCity()
  },
  methods: {
    // 确定立项
    handleConfirm () {
      this.$refs.form.validate( valid => {
        if ( valid ) {
          addOrUpdateOne( this.form ).then( res => {
            this.$message.success(res.msg)
            this.$router.back()
          })
        }
      })
    },
    // 取消立项
    handleQx () {
      this.$confirm('是否取消立项登记 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.back()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })       
      })
    },
    // 获取建站地址
    getProvinceCity () {
      getProvinceCity().then( res => {
        this.options = res.data
      })
    },
    // 取消关联
    handleCancel () {
      this.$confirm('此操作将取消关联, 是否继续 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form.projectId = ''
        this.form.seProjectInfo = {
          value: [],
          step: ''
        }
        this.$message.success('已取消关联')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })          
      })
    },
    // 关联项目弹框
    handleAssoc () {
      this.getList()
      this.dialogVisible = true
    },
    // 选择关联项目
    handleChoose ( row ) {
      this.$confirm(`确定关联 【 ${ row.projectName } 】 吗, 是否继续 ?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form.projectId = row.projectId
        this.form.seProjectInfo = row
        this.form.seProjectInfo.value = row.province + ' ' + row.city
        if ( row.status == 0 || row.status == 2 ) {
          this.form.seProjectInfo.step = '待录入'
        } else if ( row.status == 1 ) {
          this.form.seProjectInfo.step = '初审审核'
        } else if ( row.status == 3 && row.firstExamineType == 1 ) {
          this.form.seProjectInfo.step = '图纸复核'
        } else if (row.status == 5 || ( row.status == 3 && row.firstExamineType == 2 )) {
          this.form.seProjectInfo.step = '材料补充'
        } else if ( row.status == 6 || ( row.status == 3 && row.firstExamineType == 3 )) {
          this.form.seProjectInfo.step = '终审审核'
        } else if ( row.status == 7 ) {
          this.form.seProjectInfo.step = '立项补充'
        } else if ( row.status == 99 ) {
          this.form.seProjectInfo.step = '项目终止'
        }
        this.$message.success('关联项目成功')
        this.dialogVisible = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })       
      })
    },
    handleChange ( val ) {
      this.form.province = val[0]
      this.form.city = val[1]
    },
    // 获取关联项目列表
    getList () {
      selectListAll( this.tableInfo ).then( res => {
        const { records, total } = res.data
        this.tableData = records
        this.total = total
        this.loading = false
      })
    },
    // 表dan查询
    handleQuery() {
      this.tableInfo.pageIndex = 1
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.getList()
    },
    // 表dan重置
    reset() {
      this.tableInfo = {
        projectName: '',
        companyName: ''
      }
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.getList()
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
.shang {
    height: 70px;
    background-color: #fff;
    .el-breadcrumb {
      padding: 10px 0 0 25px;
    }
    .back {
      position: relative;
      .btnnn {
        position: absolute;
        bottom: 0;
        right: 15px;
      }
    }
    h3 {
      padding-left: 25px;
      cursor: pointer;
    }
  }
  /deep/ .el-form-item__label {
    font-size: 13px;
  }
</style>