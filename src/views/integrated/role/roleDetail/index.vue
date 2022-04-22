<template>
  <div>
    <div class="shang">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{ $route.matched[1].meta.title }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="id">编辑角色</el-breadcrumb-item>
        <el-breadcrumb-item v-else>创建角色</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="back">
        <div @click="$router.back()" style="width:240px;">
          <h3>&lt; 角色管理</h3>
        </div>
        <div class="btnnn">
          <el-button size="small" @click="$router.back()">取 消</el-button>
          <el-button v-if="id" size="small" type="primary" @click="handleSave">保 存</el-button>
          <el-button v-else size="small" type="primary" @click="handleAddRole">创 建</el-button>
        </div>
      </div>
    </div>
     <el-card>
        <h3>角色信息</h3>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-row :gutter="20">
              <el-col :span="8" style="font-size:12px;text-align:right;margin-top:5px;"><span style="color:red;">*</span> 角色名称</el-col>
              <el-col :span="16">
                <el-input v-model="addRoleInfo.roleName" placeholder="请输入角色名称" size="mini" />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:10px;">
          <el-col :span="8">
            <el-row :gutter="20">
              <el-col :span="8" style="font-size:12px;text-align:right;margin-top:5px;">备注</el-col>
              <el-col :span="16">
                <el-input v-model="addRoleInfo.remark" placeholder="请输入备注" size="mini" />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <h3>权限配置</h3>
        <div style="margin-left:100px;">
          <el-tree ref="treeRef" :data="data" node-key="id" :props="defaultProps" show-checkbox default-expand-all :default-checked-keys="defKeys" />
        </div>
        <h3>数据权限</h3>
        <el-alert title="目前数据权限仅控制【项目统计】模块的数据显示范围" type="success" :closable="false" />
        <div style="margin-left:110px;">
          <el-radio v-model="addRoleInfo.rootFlag" label="1" style="margin: 15px 0 10px 0;">全部数据开放</el-radio><br>
          <el-radio v-model="addRoleInfo.rootFlag" label="0" style="margin-bottom: 50px;">仅账号所属公司数据开放</el-radio>
        </div>
      </el-card>
  </div>
</template>

<script>
import { getRoleList, addRole, updateOne } from '@/api/integrated'
export default {
  name: 'RoleDetail',
  data() {
    return {
      addRoleInfo: {
        id: '',
        roleName: '',
        roleType: '',
        remark: '',
        menuId: '',
        rootFlag: '1'
      },
      data: [
        {
          id: 1,
          label: '项目开发',
          children: [
            {
              id: 11,
              label: '项目开发',
              children: [
                {
                  id: 111,
                  label: '项目发起'
                },
                {
                  id: 112,
                  label: '材料补充'
                },
                {
                  id: 113,
                  label: '立项补充'
                },
              ]
            },
            {
              id: 12,
              label: '审批管理',
              children: [
                {
                  id: 121,
                  label: '项目初审'
                },
                {
                  id: 122,
                  label: '图纸复核'
                },
                {
                  id: 123,
                  label: '项目终审'
                },
                {
                  id: 124,
                  label: '项目总览'
                }
              ]
            },
            {
              id: 13,
              label: '其他管理',
              children: [
                {
                  id: 131,
                  label: '项目分享'
                },
                {
                  id: 132,
                  label: '项目统计'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: 'EPC管理',
          children: [
            {
              id: 21,
              label: '项目监管',
              children: [
                {
                  id: 211,
                  label: '全部项目'
                },
                {
                  id: 212,
                  label: '我的项目'
                },
                {
                  id: 213,
                  label: '团队情况'
                },
                {
                  id: 214,
                  label: '保险数据'
                }
              ]
            }
          ]
        },
        {
          id: 5,
          label: '系统设置',
          children: [
            {
              id: 51,
              label: '账户管理',
              children: [
                {
                  id: 511,
                  label: '角色管理'
                },
                {
                  id: 512,
                  label: '账户管理'
                }
              ]
            },
            {
              id: 52,
              label: '机构管理',
              children: [
                {
                  id: 521,
                  label: '投资机构'
                }
              ]
            },
            {
              id: 53,
              label: '其他',
              children: [
                {
                  id: 531,
                  label: '下载管理'
                },
                {
                  id: 532,
                  label: '任务模板'
                }
              ]
            }
          ]
        },
      ],
      defKeys: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    this.id = this.$route.query.id
    if( this.id ) {
      this.getRoleList()
    }
  },
  methods: {
    getRoleList() {
      getRoleList({ id: this.id }).then(res => {
        const { id, roleName, roleType, remark, menuId, rootFlag } = res.data
        this.addRoleInfo.id = id
        this.addRoleInfo.roleName = roleName
        this.addRoleInfo.roleType = roleType
        this.addRoleInfo.remark = remark
        this.addRoleInfo.rootFlag = rootFlag + ''
        let arr = menuId.split(',')
        let defKey = []
        for ( let i=0; i < arr.length; i++ ) {
          if ( (parseInt(arr[i])) > 100 ) {
            defKey.push( parseInt(arr[i]) )
          }
        }
        this.defKeys = defKey
      })
    },

    handleAddRole() { // 创建角色
      this.addRoleInfo.menuId = [ ...this.$refs.treeRef.getCheckedKeys(), ...this.$refs.treeRef.getHalfCheckedKeys() ].join(',')
      if ( this.addRoleInfo.menuId.length < 1 ) { return this.$message.warning('权限至少需要勾选一项才可以创建') }
      addRole( this.addRoleInfo ).then( res => {
        this.$message.success( res.msg )
        this.$router.back()
      })
    },
    handleSave() { // 编辑角色
    this.addRoleInfo.menuId = [ ...this.$refs.treeRef.getCheckedKeys(), ...this.$refs.treeRef.getHalfCheckedKeys() ].join(',')
    console.log(this.addRoleInfo.menuId)
      if ( this.addRoleInfo.menuId.length < 1 ) { return this.$message.warning('权限至少需要勾选一项才可以保存') }
      updateOne( this.addRoleInfo ).then( res => {
        this.$message.success( res.msg )
        this.$router.back()
      })
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
  /deep/ .el-tree-node__label {
    font-size: 12px;
  } 
  /deep/ .el-radio__label {
    font-size: 12px;
  }
</style>