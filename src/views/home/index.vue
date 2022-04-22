<template>
  <el-container>
    <el-header>
      <div class="left">
        <svg t="1646897968879" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17205" width="34" height="34"><path d="M512 448m-320 0a320 320 0 1 0 640 0 320 320 0 1 0-640 0Z" fill="#FFAD32" opacity=".6" p-id="17206"></path><path d="M674.197333 592H349.802667L301.013333 832H192v64h640v-64h-109.013333l-48.789334-240z" fill="#FFAD32" p-id="17207"></path><path d="M524.288 352l-8.213333 25.877333-14.08 44.949334-6.784 21.568-5.888 18.922666-41.045334 130.410667c-0.896 2.496 0.362667 4.458667 3.2 4.458667h37.845334c1.237333 0 2.133333 0.341333 2.666666 1.066666 0.896 0.896 1.066667 2.133333 0.533334 3.584l-39.061334 94.72c-1.066667 2.496-0.362667 3.029333 1.429334 0.896l123.626666-140.224c1.792-2.154667 1.066667-3.754667-1.6-3.754666L536.405333 554.666667l-7.466666 0.170666c-2.688 0-3.946667-1.962667-2.517334-4.266666l38.528-68.693334 9.109334-16.426666 10.517333-18.901334 22.485333-39.786666 12.842667-23.189334a245.930667 245.930667 0 0 0-95.616-31.573333zM341.333333 448l8.213334 34.453333L384 490.666667l-34.453333 8.213333L341.333333 533.333333l-8.213333-34.453333L298.666667 490.666667l34.453333-8.213334L341.333333 448zM725.333333 362.666667l8.213334 34.453333L768 405.333333l-34.453333 8.213334L725.333333 448l-8.213333-34.453333L682.666667 405.333333l34.453333-8.213333L725.333333 362.666667zM288 341.333333l6.165333 25.856L320 373.333333l-25.834667 6.144L288 405.333333l-6.165333-25.856L256 373.333333l25.834667-6.144L288 341.333333z" fill="#FFFFFF" p-id="17208"></path></svg>
        <div style="margin-right:100px;font-size:16px;font-weight:bold;">西子光能智慧能源</div>
        <el-menu :default-active="toIndex()" mode="horizontal" active-text-color="#fff" @select="handleSelect">
          <el-menu-item index="dashboard" style="padding: 0 30px;">首 页</el-menu-item>
          <el-menu-item index="data" style="padding: 0 30px;" v-show="meunId.indexOf('1') > -1">项目开发</el-menu-item>
          <el-menu-item index="epc" style="padding: 0 30px;" v-show="meunId.indexOf('2') > -1">EPC管理</el-menu-item>
          <el-menu-item index="integrated" style="padding: 0 30px;" v-show="meunId.indexOf('5') > -1">系统设置</el-menu-item>
        </el-menu>
      </div>
      <div class="right">
        <el-dropdown>
          <span class="el-dropdown-link">
            <img :src="image" alt="" />
            <h3 style="display: inline-block">{{ nickName }}</h3>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleOpen">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <!-- 页面左侧二级菜单栏，和主体内容区域部分 -->
    <el-main>
      <router-view />
    </el-main>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      @close="handleClose"
      width="30%"
    >
      <div style="padding: 0 35px">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="refForm"
          label-width="100px"
          class="demo-ruleForm">
          <el-form-item label="当前密码" prop="oldPassword">
            <el-input
              v-model="ruleForm.oldPassword"
              placeholder="请输入原密码"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input
              v-model="ruleForm.newPassword"
              placeholder="新密码限8-12位，由英文与数字组成，区分大小写"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="rePassword">
            <el-input
              v-model="ruleForm.rePassword"
              placeholder="请再次输入新密码"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import { editPassword } from '@/api/integrated'
export default {
  name: 'home',
  data() {
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
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      items: [
        // 水平一级菜单栏的菜单
        { index: 'dashboard', title: '首 页'},
        { index: 'data', title: '项目开发', id: '1' },
        { index: 'epc', title: 'EPC管理', id: '2' },
        // { index: 'test3', title: '采购管理' },
        // { index: 'test4', title: '运维管理' },
        { index: 'integrated', title: '系统设置', id: '5' },
      ],
      meunId: window.sessionStorage.getItem('menuId').split(','),

      ruleForm: {
        oldPassword: '',
        newPassword: '',
        rePassword: '',
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 1, max: 20, message: '最长输入20位', trigger: 'blur' },
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: checkPwd, trigger: 'blur' },
        ],
        rePassword: [
          { required: true, validator: validatePass2, trigger: 'blur' },
        ],
      },
      dialogVisible: false,
    }
  },
  methods: {
    toIndex() {
      // console.log(this.$route.path)
      return this.$route.path.split('/')[1]
    },
    handleSelect(key, keyPath) {
      // console.log(key)
      this.$router.push('/' + key)
    },
    loginOut() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    handleOpen() {
      this.dialogVisible = true
    },
    handleEdit() {
      this.$refs.refForm.validate((valid) => {
        if (valid) {
          editPassword(this.ruleForm).then((res) => {
            this.$message.success(res.msg)
            this.dialogVisible = false
          })
        }
      })
    },
    handleClose() {
      this.ruleForm = {
        oldPassword: '',
        newPassword: '',
        rePassword: '',
      }
      this.$refs.refForm.resetFields()
    },
  },
  computed: {
    menuId() {
      return window.sessionStorage.getItem('menuId')
    },
    nickName() {
      return window.sessionStorage.getItem('nickName')
    },
    image() {
      return window.sessionStorage.getItem('image')
    }
  }
}
</script>

<style scoped>
.el-header {
  height: 66px !important;
  display: flex;
  justify-content: space-between;
  border-bottom: 6px solid #1890ff;
}
.el-menu--horizontal {
  border-bottom: none !important;
}
.el-main {
  padding: 0;
  background-color: rgba(240, 242, 245, 1);
}
.left {
  display: flex;
  align-items: center;
}
.right {
  margin-right: 20px;
}
img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 15px;
}
.is-active {
  border-bottom: none !important;
  background-color: #409eff !important;
}
</style>>
