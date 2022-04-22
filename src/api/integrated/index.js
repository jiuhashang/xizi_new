import request from '@/utils/request'

// 获取用户列表
export function selectList(params) {
  return request({
    url: '/admin/seAdminUser/selectList',
    method: 'get',
    params
  })
}

// 获取公司列表
export function getCompanyInfoList(params) {
  return request({
    url: '/admin/seAdminUser/getCompanyInfoList',
    method: 'get',
    params
  })
}

// 添加账号
export function addOne(params) {
  return request.post('/admin/seAdminUser/addOne', 
  params
  )
}

// 编辑账号
export function updateAccont(params) {
  return request.post('/admin/seAdminUser/updateOne', 
  params
  )
}

// 获取角色列表
export function roleList(params) {
  return request({
    url: '/admin/seAdminRoleInfo/selectList',
    method: 'get',
    params
  })
}

// 删除角色
export function deleteRole(params) {
  return request({
    url: '/admin/seAdminRoleInfo/deleteOne',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params
  })
}

// 获取角色详情
export function getRoleList(params) {
  return request({
    url: '/admin/seAdminRoleInfo/selectOne',
    method: 'get',
    params
  })
}

// 新增角色
export function addRole(params) {
  return request.post('/admin/seAdminRoleInfo/addOne', 
  params
  )
}

// 编辑角色
export function updateOne(params) {
  return request.post('/admin/seAdminRoleInfo/updateOne', 
  params
  )
}

// 下载列表查询
export function selectDownFileList(data, params) {
  return request({
    url: '/admin/seProjectDownFile/selectDownFileList', 
    method: 'post',
    data,
    params,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

// 下载删除
export function deleteDownFileList(params) {
  return request.post('/admin/seProjectDownFile/deleteDownFileList', 
  params
  )
}

// 文件打包预下载
export function readyDownFile(params) {
  return request.post('/admin/seProjectDownFile/readyDownFile', 
  params
  )
}

// 获取机构列表
export function getBankList(params) {
  return request({
    url: '/admin/seBankUser/selectList',
    method: 'get',
    params
  })
}

// 添加机构
export function addSeBankUser(params) {
  return request.post('/admin/seBankUser/addSeBankUser', 
  params
  )
}

// 修改机构
export function updateBank(params) {
  return request.post('/admin/seBankUser/updateOne', 
  params
  )
}

// 获取分享列表
export function getShareBankProjectList(params) {
  return request({
    url: '/admin/seProjectBankShare/getShareBankProjectList',
    method: 'get',
    params
  })
}

// 已分享机构列表
export function getShareBankList(params) {
  return request({
    url: '/admin/seProjectBankShare/getShareBankList',
    method: 'get',
    params
  })
}

// 获取机构列表(过滤已分享（机构）)
export function getBank(params) {
  return request({
    url: '/admin/seProjectBankShare/getBankList',
    method: 'get',
    params
  })
}

// 分享机构
export function shareBankProject(params) {
  return request.post('/admin/seProjectBankShare/shareBankProject', 
  params
  )
}

// 移除分享
export function deleteShare(params) {
  return request({
    url: '/admin/seProjectBankShare/deleteOne',
    method: 'get',
    params
  })
}

// 修改权限、延长时间
export function editOne(params) {
  return request({
    url: '/admin/seProjectBankShare/editOne',
    method: 'get',
    params
  })
}

// 修改密码
export function editPassword(params) {
  return request({
    url: '/admin/seAdminUser/editPassword',
    method: 'get',
    params
  })
}


// 获取任务模板列表
export function getList(params) {
  return request({
    url: '/admin/seEpcProjectTemplateInfo/getList',
    method: 'get',
    params
  })
}

// 创建模板
export function addOrUpdateOne(params) {
  return request.post('/admin/seEpcProjectTemplateInfo/addOrUpdateOne', 
  params
  )
}

// 删除模板
export function deleteOne(params) {
  return request({
    url: '/admin/seEpcProjectTemplateInfo/deleteOne',
    method: 'get',
    params
  })
}

// 获取模板任务信息（1、2级）
export function getAllList(params) {
  return request({
    url: '/admin/seEpcProjectTemplateTaskInfo/getAllList',
    method: 'get',
    params
  })
}

// 添加修改任务
export function addOrUpdateOneTask(params) {
  return request.post('/admin/seEpcProjectTemplateTaskInfo/addOrUpdateOne', 
  params
  )
}

// 删除任务模板
export function deleteTask(params) {
  return request({
    url: '/admin/seEpcProjectTemplateTaskInfo/deleteOne',
    method: 'get',
    params
  })
}

// 获取一级任务列表
export function getParentList(params) {
  return request({
    url: '/admin/seEpcProjectTemplateTaskInfo/getList',
    method: 'get',
    params
  })
}