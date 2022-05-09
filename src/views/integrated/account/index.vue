<template>
  <div>
    <div class="shang">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{ $route.matched[1].meta.title }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <h3>{{ $route.meta.title }}</h3>
    </div>
    <el-card>
      <div style="display:flex;justify-content:space-between;">
        <el-form ref="ruleForm" :model="tableInfo" inline size="mini">
          <el-form-item>
            <el-input v-model="tableInfo.phone" placeholder="手机号码查询" clearable />
          </el-form-item>
          <el-form-item>
            <el-input v-model="tableInfo.userName" placeholder="持有人姓名查询" clearable />
          </el-form-item>
          <el-form-item>
            <el-select v-model="tableInfo.status" clearable placeholder="全部状态">
              <el-option label="启用" value="1"></el-option>
              <el-option label="停用" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleQuery" icon="el-icon-search">查 询</el-button>
            <el-button @click="reset">重 置</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-button type="primary" @click="create" size="mini" icon="el-icon-plus">创建账号</el-button>
        </div>
      </div>
      <!-- <el-alert title="所有账号默认可以创建项目、上传材料，如需设定其他权限请绑定角色。" type="success" :closable="false" /> -->
      <el-table :data="tableData" v-loading="loading" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" size="mini">
        <el-table-column prop="userName" label="登录手机号" />
        <el-table-column prop="nickName" label="持有人姓名" />
        <el-table-column prop="idCard" label="身份证号码" />
        <el-table-column prop="roleName" label="角色" />
        <el-table-column label="账号状态">
          <template slot-scope="scope">
            <el-tag type="success" v-show="scope.row.status == 1 ">已启用</el-tag>
            <el-tag type="danger" v-show="scope.row.status == 2 ">已禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="companyName" label="所属公司" />
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            <el-button v-show="scope.row.status === 2" type="text" @click="handleEn(scope.row)">启用</el-button>
            <el-button v-show="scope.row.status === 1" type="text" style="color:red;" @click="handleDis(scope.row)">停用</el-button>
          </template>
        </el-table-column> 
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </el-card>
    <!-- 创建账号 -->
    <el-dialog title="创建账号" :visible.sync="createDialogVisible" :close-on-click-modal="false" @close="handleAddClose" width="40%">
      <el-alert title="账号创建后无法删除，手机号码唯一，一人可持有多个账号" type="success" :closable="false" />
      <el-form ref="addRef" :rules="addRules" :model="addForm" label-width="100px" style="position: relative;" size="mini" class="width95">
        <el-form-item prop="userName" label="手机号码">
          <el-input v-model="addForm.userName" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item prop="nickName" label="持有人姓名">
          <el-input v-model="addForm.nickName" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item prop="idCard" label="身份证号码">
          <el-input v-model="addForm.idCard" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password" label="登录密码">
          <el-input v-model="addForm.password" placeholder="限8-12位，由英文与数字组成，区分大小写" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleName">
          <el-select v-model="addForm.roleName" placeholder="请选择" class="width100" clearable @change="handleRole">
            <el-option v-for="(item, index) in options" :label="item.roleName" :value="item.roleId" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="companyName" label="所属公司">
          <el-input v-model="addForm.companyName" placeholder="请输入" @focus="handleAddFocus" clearable></el-input>
        </el-form-item>
        <div class="divul" v-show="addList.length">
          <ul v-show="addList.length" style="list-style: none;">
            <li v-for="(item, index) in addList"
              :key="item.companyId" class="divli"
              :class="{ bgc: index === currentIndex }"
              @click="handleAddSelect(item, index)"
              @mousemove="handleAddMove(index)">
                {{ item.companyName }}
              </li>
          </ul>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createDialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleAdd" size="mini">确 定</el-button>
      </span>
    </el-dialog>
     <!-- 编辑账号 -->
    <el-dialog title="编辑账号" :visible.sync="editDialogVisible" :close-on-click-modal="false" @close="handleEditClose" width="40%">
      <el-alert title="账号创建后无法删除，手机号码唯一，一人可持有多个账号" type="success" :closable="false" />
      <el-form ref="editRef" :rules="editRules" :model="editDeepForm" label-width="100px" size="mini" class="width95">
        <el-form-item prop="userName" label="手机号码">
          <el-input v-model="editDeepForm.userName" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item prop="nickName" label="持有人姓名">
          <el-input v-model="editDeepForm.nickName" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item prop="idCard" label="身份证号码">
          <el-input v-model="editDeepForm.idCard" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item prop="password" label="登录密码">
          <el-input v-model="editDeepForm.password" type="password" placeholder="限8-12位，由英文与数字组成，区分大小写" clearable />
        </el-form-item>
        <el-form-item label="角色" prop="roleName">
          <el-select v-model="editDeepForm.roleName" placeholder="请选择" class="width100" clearable @change="handleEditRole">
            <el-option v-for="(item, index) in options" :label="item.roleName" :value="item.roleId" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="companyName" label="所属公司">
          <el-input v-model="editDeepForm.companyName" placeholder="请输入" @focus="handleEditFocus" clearable />
        </el-form-item>
        <div class="editdiv" v-show="editList.length">
          <ul v-show="editList.length" style="list-style: none;">
            <li v-for="(item, index) in editList"
              :key="item.companyId" class="divli"
              :class="{ bgc: index === currentIndex }"
              @click="handleEditSelect(item, index)"
              @mousemove="handleEditMove(index)">
                {{ item.companyName }}
              </li>
          </ul>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleEdit" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { selectList, addOne, updateAccont, roleList, getCompanyInfoList } from '@/api/integrated'
import _ from 'lodash'
export default {
  name: 'Account',
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
        // console.log(reg.test(value))
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('姓名不能为空'))
      } else {
        const reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
        // console.log(reg.test(value))
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的姓名'))
        }
      }
    }
    var checkId = (rule, value, callback) => {
      const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      if (value == '' || value == undefined || value == null) {
        callback()
      } else {
        if (!reg.test(value)) {
          callback(new Error('请输入正确的身份证号码'))
        } else {
          callback()
        }
      }
    }
    var checkPwd = (rule, value, callback) => {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$/
      if (value == '' || value == undefined || value == null) {
        callback()
      } else {
        if (!reg.test(value)) {
          callback(new Error('限8-12位，由英文与数字组成，区分大小写'))
        } else {
          callback()
        }
      }
    }
    return {
      tableInfo: {
        phone: '',
        userName: '',
        status: '',
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      loading: true,
      total: 0,

      roleList: {
        pageIndex: 1,
        pageSize: 10,
        roleName: '',
        id:' '
      },
      options: [],
      // 创建账号
      addForm: {},
      addRules: {
        userName: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' }
        ],
        idCard: [{ validator: checkId, trigger: 'blur' }],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { validator: checkPwd, trigger: 'blur' }
        ],
        roleName: [{ required: true, message: '请选择角色', trigger: 'change' }],
        companyName: [
          { required: true, message: '请输入所属公司', trigger: ['blur', 'change'] },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ]
      },
      createDialogVisible: false,
      currentIndex: null,
      addList: [],
      // 编辑账号
      editForm: {},
      editDeepForm: {},
      editRules: {
        userName: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' }
        ],
        idCard: [{ validator: checkId, trigger: 'blur' }],
        password: [{ validator: checkPwd, trigger: 'blur' }],
        roleName: [{ required: true, message: '请选择角色', trigger: 'change' }],
        companyName: [
          { required: true, message: '请输入所属公司', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
      },
      editDialogVisible: false,
      editList: []
    }
  },
  created() {
    this.selectList()
  },
  methods: {
    // 列表请求
    selectList () {
      selectList( this.tableInfo ).then(res => {
        const { records, total } = res.data
        this.tableData = records
        this.total = total
        this.loading = false
      })
    },
    // 创建账号
    create () {
      this.createDialogVisible = true
      roleList(this.roleList).then(res => { // 获取角色
        res.data.records.map(item => {
          let a = {
            roleName: item.roleName,
            roleId: item.id
          }
          this.options.push(a)
        })
      })
    },
    handleRole(val) {
      this.addForm.roleId = val
      let handleRole = {}
      handleRole = this.options.find((item)=>{
        return item.roleId === val;
      })
       this.addForm.roleName = handleRole.roleName
    },
    handleAdd() {
      this.$refs.addRef.validate( valid => {
        if(valid) {
          addOne(this.addForm).then(res => {
            this.$message.success('添加成功')
            this.createDialogVisible = false
            this.selectList()
          })
        }
      })
    },
    handleAddFocus() {
      getCompanyInfoList().then(res => {
        this.addList = res.data.records
      })
    },
    handleAddMove(index) {
      this.currentIndex = index
    },
    handleAddSelect(item) {
      this.$set(this.addForm, 'companyName', item.companyName)
      this.$set(this.addForm, 'companyId', item.companyId)
      this.addList = []
    },
    handleAddClose() {
      this.addForm = {}
      this.options = []
      this.addList = []
      this.$refs.addRef.resetFields()
    },
    // 编辑账号
    edit(row) {
      this.editDeepForm = _.cloneDeep(row)
      this.editDialogVisible = true
      roleList(this.roleList).then(res => { // 获取角色
        res.data.records.map(item => {
          let a = {
            roleName: item.roleName,
            roleId: item.id
          }
          this.options.push(a)
        })
      })
    },
    handleEditRole(val) {
      this.editDeepForm.roleId = val
      let handleEditRole = {}
        handleEditRole = this.options.find((item)=>{
        return item.roleId === val;
      })
       this.editDeepForm.roleName = handleEditRole.roleName
    },
    handleEditFocus() {
      getCompanyInfoList().then(res => {
        this.editList = res.data.records
      })
    },
    handleEdit() {
      this.$refs.editRef.validate(valid => {
        if(valid) {
          updateAccont(this.editDeepForm).then(res => {
            this.$message.success('编辑成功')
            this.editDialogVisible = false
            this.selectList()
          })
        }
      })
    },
    handleEditSelect(item) {
      this.$set(this.editDeepForm, 'companyName', item.companyName)
      this.$set(this.editDeepForm, 'companyId', item.companyId)
      this.editList = []
    },
    handleEditMove(index) {
      this.currentIndex = index
    },
    handleEditClose() {
      this.editDeepForm = {}
      this.options = []
      this.editList = []
      this.$refs.editRef.clearValidate()
    },

    async handleEn(row) { // 启用
      const confirmResult = await this.$confirm('是否启用该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消操作')
      }
      this.editForm = row
      this.editForm.status = 1
      updateAccont(this.editForm).then(res => {
        console.log(res)
        this.$message.success('状态修改成功')
        this.selectList()
      })
    },
    async handleDis(row) { // 禁用
      const confirmResult = await this.$confirm('禁用账号后，该账号无法登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消操作')
      }
      this.editForm = row
      this.editForm.status = 2
      updateAccont(this.editForm).then(res => {
        this.$message.success('状态修改成功')
        this.selectList()
      }) 
    },
    // 表dan查询
    handleQuery() {
      this.tableInfo.pageIndex = 1
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.selectList()
    },
    // 表dan重置
    reset() {
      this.tableInfo = {
        companyName: '',
        firstExamine: '',
        firstExamine: '',
        pageIndex: 1,
        pageSize: 10
      }
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.selectList()
    },

    handleSizeChange(val) {
      this.tableInfo.pageSize = val
      this.selectList()
    },
    handleCurrentChange(val) {
      this.tableInfo.pageIndex = val
      this.selectList()
    },
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
    h3 {
      text-align: left;
      padding-left: 25px;
    }
  }
  .el-alert {
    margin-bottom: 20px;
  }
  .divul {
    max-width: 600px;
    min-width: 200px;
    list-style: none;
    background-color: #fff;
    position: absolute;
    top: 270px;
    left: 100px;
    border:1px solid #DCDFE6;
    border-radius: 5px;
    overflow: auto;
  }
  .divli {
    margin-bottom: 10px;
    cursor: pointer;
    width: 100%;
  }
  .bgc:hover {
    color: blue;
  }
  .editdiv {
    max-width: 600px;
    min-width: 200px;
    list-style: none;
    background-color: #fff;
    position: absolute;
    top: 420px;
    left: 120px;
    border:1px solid #DCDFE6;
    border-radius: 5px;
    overflow: auto;
  }
  /deep/ .el-form-item__label {
    font-size: 12px;
  }
</style>