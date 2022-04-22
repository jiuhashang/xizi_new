<template>
  <div>
    <div class="shang">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>审批中心</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="back">
        <div @click="$router.back()" style="width:240px;">
          <h2>&lt; {{ $route.meta.title }}</h2>
        </div>
      </div>
    </div>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="审核材料" name="first">
          <div class="xian">
            <div>项目信息</div>
          </div>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">创建时间</el-col>
                <el-col :span="16" class="span130">{{ $route.query.createTime }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">负责人</el-col>
                <el-col :span="16" class="span130">{{ $route.query.createUserNickName }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">负责人电话</el-col>
                <el-col :span="16" class="span130">{{ $route.query.createUserPhone }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">项目名称</el-col>
                <el-col :span="16" class="span130">{{ $route.query.projectName }}</el-col>
              </el-row>
            </el-col>
          </el-row>

          <div class="xian">
            <div>业主信息</div>
          </div>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">公司名称</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">统一社会信用代码</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">注册资本</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">公司性质</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">建站地址</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">详细地址</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">公司联系人</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">联系人手机号</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>

          <div class="xian">
            <div>屋面信息</div>
          </div>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">屋面总面积</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">建筑物个数</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">屋面正南遮挡物</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">屋顶使用年限</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">屋面材质</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">彩钢瓦类型</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">彩钢瓦比水泥顶</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">其他屋面材质说明</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>

          <div class="xian">
            <div>供电现状</div>
          </div>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">供电类型</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">变压器容量</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">变压器台数</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">预估装机容量</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">法定节假日是否休息</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">周末生产情况</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">中午设备是否停机</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">其他供电说明</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-card style="margin-bottom:50px;">
            <div slot="header" class="clearfix">
              <span>变压器各台容量（选填）</span>
            </div>
            <div>
              <el-table style="width: 100%" :header-cell-style="{background:'#f2f2f2',color:'#555'}">
                <el-table-column label="变压器名称" />
                <el-table-column label="容量（kVA）" />
                <!-- <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="danger" size="small" @click="deleteData(scope.row)">删除</el-button>
                    <el-button type="info" size="small" @click="editData(scope.row)">编辑</el-button>
                  </template>
                </el-table-column> -->
              </el-table>
            </div>
          </el-card>
          
          <div class="xian">
            <div>合作模式</div>
          </div>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">合作模式</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>

          <div class="xian">
            <div>相关材料</div>
          </div>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">不动产权证或三证</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">近12个月电费复核单</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">结构图</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">配电室内部照片</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">建筑图</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">总平图</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">厂房内部照片</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">厂名正面照片</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">屋顶细节照片</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">厂房内屋顶照片</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">项目发起额外材料</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">项目发起额外说明</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>

          <div class="xian" style="margin-top:20px;">
            <div>其他材料</div>
          </div>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">近3年财务报告</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">材料补充额外材料</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">额外说明</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>

          <div class="xian" style="margin-top:20px;">
            <div>立项补充</div>
          </div>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">能源管理合同</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">项目建议书</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">备案文件</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">接入文件</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">营业执照</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">关联项目公司</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">额外说明</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>

        </el-tab-pane>

        <el-tab-pane label="收益测算" name="second">
          <div class="xian">
            <div>项目数据</div>
          </div>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">建站地址</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">年日照</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">预估装机容量</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">屋顶使用年限</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">屋面材质</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">彩钢瓦类型</el-col>
                <el-col :span="16" class="span130">
                  <el-select multiple placeholder="请选择(可多选)" class="width100">
                    <el-option label="直立锁边" :value="1"></el-option>
                    <el-option label="角驰" :value="2"></el-option>
                    <el-option label="T型" :value="3"></el-option>
                    <el-option label="其它" :value="4"></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">彩钢瓦比水泥顶</el-col>
                <el-col :span="16" class="span130">
                  <el-input class="width100" placeholder="请输入">
                  <span slot="suffix">%</span>
                </el-input>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

          <div class="xian">
            <div>合作模式</div>
          </div>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">合作模式</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>

          <div class="xian" style="display:flex;justify-content:space-between;">
            <div>参数配置</div>
            <el-button type="primary" size="mini">测算数据</el-button>
          </div>
          <el-form ref="form" label-width="130px">
            <el-row :gutter="20" style="margin:30px 30px 0 30px;">
              <el-col :span="8">
                <el-row :gutter="20">
                  <el-col :span="8" class="span13">脱硫煤电价</el-col>
                  <el-col :span="16" class="span130">0.2220 元/KWH</el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-form-item label="加权电价">
                  <el-input>
                    <span slot="suffix">元/KWH</span>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-row :gutter="20">
                  <el-col :span="8" class="span13">折后电价</el-col>
                  <el-col :span="16" class="span130">0.2220 元/KWH</el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin:30px;">
              <el-col :span="8">
                <el-form-item label="每年固定运维费用">
                  <el-input>
                    <span slot="suffix">元/瓦</span>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="第10年运维费用">
                  <el-input>
                    <span slot="suffix">元/瓦</span>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="第15年运维费用">
                  <el-input>
                    <span slot="suffix">元/瓦</span>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin:0 30px 30px 30px;">
              <el-col :span="8">
                <el-form-item label="自发自用比例">
                  <el-input>
                    <span slot="suffix">%</span>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="单瓦价格">
                  <el-input>
                    <span slot="suffix">元/瓦</span>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="并网电压类型">
                  <el-select placeholder="请选择" class="width100">
                    <el-option label="高压" :value="1"></el-option>
                    <el-option label="低压" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <div class="xian">
            <div>测算结果</div>
          </div>
          <div style="margin-top:15px;display:flex;justify-content:space-around;">
            <div class="t1" style="background-color:#b4bbc5;">
              <h3>全投资内部收益率</h3>
              <h1>12.00%</h1>
            </div>
            <div class="t1" style="background-color:#b4bbc5;">
              <h3>投资偿还期（年）</h3>
              <h1>12.00%</h1>
            </div>
            <div class="t1" style="background-color:#b4bbc5;">
              <h3>总投资费用（万元）</h3>
              <h1>12.00%</h1>
            </div>
            <div class="t1" style="background-color:#b4bbc5;">
              <h3>首年发电量</h3>
              <h1>12.00%</h1>
            </div>
          </div>
          <div style="margin-top:15px;display:flex;justify-content:space-around;">
            <div class="b1">
              <div style="display:flex;justify-content:space-between;">
                <p>发电总效益（万元）</p>
                <h3>1212.12</h3>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <p>每年均值（万元）</p>
                <h3>1212.12</h3>
              </div>
            </div>
            <div class="b1">
              <div style="display:flex;justify-content:space-between;">
                <p>总净利润（万元）</p>
                <h3>1212.12</h3>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <p>每年均值（万元）</p>
                <h3>1212.12</h3>
              </div>
            </div>
            <div class="b1">
              <div style="display:flex;justify-content:space-between;">
                <p>投资方总收入（万元）</p>
                <h3>1212.12</h3>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <p>每年均值（万元）</p>
                <h3>1212.12</h3>
              </div>
            </div>
            <div class="b1">
              <div style="display:flex;justify-content:space-between;">
                <p>自投总收入（万元）</p>
                <h3>1212.12</h3>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <p>每年均值（万元）</p>
                <h3>1212.12</h3>
              </div>
            </div>
          </div>
          <el-table border style="width: 100%;margin-top:50px;" :header-cell-style="{background:'#f2f2f2',color:'#555'}">
            <el-table-column label="年份" />
            <el-table-column label="发电量" />
            <el-table-column label="企业自用电量" />
            <el-table-column label="企业用电收入万元" />
            <el-table-column label="余电上网电量" />
            <el-table-column label="余电上网收入万元" />
            <el-table-column label="自投总收入万元" />
            <el-table-column label="企业用电收益万元" />
            <el-table-column label="投资方收入万元" />
            <el-table-column label="企业分享节能效益" />
            <el-table-column label="运维支出万元" />
            <el-table-column label="净利润万元" />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PreviewDetail',
  data() {
      return {
        activeName: 'first'
      }
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event)
      }
    }
}
</script>

<style lang="scss" scoped> 
  .shang {
    height: 97px;
    background-color: #fff;
    .el-breadcrumb {
      padding: 15px 0 0 25px;
    }
    .back {
      position: relative;
      .btnnn {
        position: absolute;
        bottom: 0;
        right: 15px;
      }
    }
    h2 {
      padding-left: 25px;
      cursor: pointer;
    }
  }

  .xian {
    color: #1890FF;
    border-bottom: 1px solid #1890FF;
    padding-bottom: 5px;
    div {
      border-left: 4px solid #1890FF;
      padding-left: 15px;
    }
  }
  .span13 {
    font-size: 13px;
    color: #aaa;
    text-align: right;
  }
  .span130 {
    font-size: 13px;
    color: #000;
  }
  .el-alert {
    margin: 15px 0;
  }
  /deep/  .el-checkbox__label {
    padding-left: 0;
  }
  .custom-upload-files {
    text-align: left;
  }
  .t1 {
    width: 312px;
    height: 116px;
    color: #fff;
    background-color: #f2f2f2;
    h3 {
      margin-left: 15px;
    }
    h1 {
      text-align: center;
    }
  }
  .b1 {
    width: 312px;
    height: 116px;
    box-sizing: border-box;
    padding: 0 20px;
    background-color: #f2f2f2;
  }
</style>