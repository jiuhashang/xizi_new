import request from '@/utils/request'

// 获取项目列表
export function getList ( params ) {
  return request({
    url: '/admin/seEpcProjectInfo/getList',
    method: 'get',
    params
  })
}

// 获取项目相关人员
export function getEpcEachUser ( params ) {
  return request({
    url: '/admin/seEpcProjectUserInfo/getEpcEachUser',
    method: 'get',
    params
  })
}

// 确定立项
export function addOrUpdateOne ( params ) {
  return request.post('/admin/seEpcProjectInfo/addOrUpdateOne', 
  params
  )
}

// 获取项目详情
export function getOne ( params ) {
  return request({
    url: '/admin/seEpcProjectInfo/getOne',
    method: 'get',
    params
  })
}

// 团队成员
// 获取项目成员列表
export function getPersonList ( params ) {
  return request({
    url: '/admin/seEpcProjectUserInfo/getList',
    method: 'get',
    params
  })
}

// 添加成员
export function addOne ( params ) {
  return request.post('/admin/seEpcProjectUserInfo/addOne', 
  params
  )
}

// 删除团队成员
export function deleteOne ( params ) {
  return request({
    url: '/admin/seEpcProjectUserInfo/deleteOne',
    method: 'get',
    params
  })
}

// 图纸管理
// 获取图纸列表
export function getImgList ( params ) {
  return request({
    url: '/admin/seEpcProjectImageInfo/getList',
    method: 'get',
    params
  })
}

// 上传图纸
export function addImg ( params ) {
  return request.post('/admin/seEpcProjectImageInfo/addOne', 
  params
  )
}

// 删除图纸
export function deleteImg ( params ) {
  return request({
    url: '/admin/seEpcProjectImageInfo/deleteOne',
    method: 'get',
    params
  })
}

// 文件材料
// 获取文件列表
export function getFileList ( params ) {
  return request({
    url: '/admin/seEpcProjectFileInfo/getList',
    method: 'get',
    params
  })
}

// 上传文件
export function addFile ( params ) {
  return request.post('/admin/seEpcProjectFileInfo/addOne', 
  params
  )
}

// 删除文件
export function deleteFile ( params ) {
  return request({
    url: '/admin/seEpcProjectFileInfo/deleteOne',
    method: 'get',
    params
  })
}

// 任务管理
// 获取任务管理列表
export function getProjectAllTask ( params ) {
  return request({
    url: '/admin/seEpcProjectTaskInfo/getProjectAllTask',
    method: 'get',
    params
  })
}

// 选择模板
export function addTemplateTask ( params ) {
  return request({
    url: '/admin/seEpcProjectTaskInfo/addTemplateTask',
    method: 'get',
    params
  })
}

// 添加一/二级任务
export function addProjectTask ( params ) {
  return request.post('/admin/seEpcProjectTaskInfo/addProjectTask', 
  params
  )
}

// 删除任务
export function deleteTask ( params ) {
  return request({
    url: '/admin/seEpcProjectTaskInfo/deleteOne',
    method: 'get',
    params
  })
}

// 关闭任务
export function closeTask ( params ) {
  return request({
    url: '/admin/seEpcProjectTaskInfo/editStatus',
    method: 'get',
    params
  })
}

// 获取进度记录
export function getLog ( params ) {
  return request({
    url: '/admin/seEpcProjectProgressLog/getList',
    method: 'get',
    params
  })
}

// 获取进度记录
export function editProjectProgress ( params ) {
  return request({
    url: '/admin/seEpcProjectInfo/editProjectProgress',
    method: 'get',
    params
  })
}

// 项目状态修改
export function editProjectStatus ( params ) {
  return request({
    url: '/admin/seEpcProjectInfo/editProjectStatus',
    method: 'get',
    params
  })
}

// 获取任务情况数据
export function getProjectTaskCount ( params ) {
  return request({
    url: '/admin/seEpcProjectInfo/getProjectTaskCount',
    method: 'get',
    params
  })
}

// 项目看板数据
export function getEpcProjectCount ( params ) {
  return request({
    url: '/admin/seEpcProjectInfo/getEpcProjectCount',
    method: 'get',
    params
  })
}