function plugin(Vue) {
  if (plugin.installed) {
    return
  }

  const map = {
    projectStatus,
    loanStatus,
    dueDiligenceStatus,
    messageUploadStatus,
    builderTeamCheckStatus,
    elementSNCheckStatus
  }
  Object.keys(map).forEach((key) => {
    Vue.filter(key, map[key])
  })
}

// 项目进度
function projectStatus(status) {
  if (status === 0) {
    return '待录入'
  } else if (status === 1) {
    return '待审核'
  } else if (status === 2) {
    return '审核驳回'
  } else if (status === 3) {
    return '审核通过'
  } else if (status === 4) {
    return '施工进行中'
  } else if (status === 5) {
    return '待审核'
  } else if (status === 6) {
    return '审核驳回'
  } else if (status === 7) {
    return '审核通过'
  } else if (status === 8) {
    return '并网信息待录入'
  } else if (status === 9) {
    return '并网信息待审核'
  } else if (status === 10) {
    return '并网信息驳回'
  } else if (status === 11) {
    return '并网信息审核通过'
  }
  return '未知项目进度'
}

// 放款进度
function loanStatus(status) {
  if (status === 0) {
    return '后台待审核'
  } else if (status === 1) {
    return '后台审核驳回'
  } else if (status === 2) {
    return '后台审核通过(银行待审核)'
  } else if (status === 3) {
    return '银行审核驳回'
  } else if (status === 4) {
    return '银行审核通过'
  } else if (status === 5) {
    return '后台强制通过'
  }
  return '未知放款状态'
}

// 尽调录入状态
function dueDiligenceStatus(status) {
  if (status === 0) {
    return '待录入'
  } else if (status === 1) {
    return '已完善'
  }
  return '未知录入状态'
}

// 项目初审状态
function messageUploadStatus(status) {
  switch (status) {
    case 0:
      return '初审待审核'
    case 1:
      return '初审驳回'
    case 2:
      return '银行待审核'
    case 3:
      return '银行驳回'
    case 4:
      return '银行通过'
    case 5:
      return '强制通过'
    default:
      return '未知审核状态'
  }
}

// 施工单位审核情况
function builderTeamCheckStatus(status) {
  switch (status) {
    case 0:
      return '未提交'
    case 1:
      return '待审核'
    case 2:
      return '已驳回'
    case 3:
      return '已通过'
    default:
      return '未知状态'
  }
}

// 组件SN码 识别类型
function elementSNCheckStatus(status) {
  // 0：未核对；1：已核对；2：临时添加
  switch (status) {
    case 0:
      return '未核对'
    case 1:
      return '匹配'
    case 2:
      return '临时添加'
    default:
      return '未知状态'
  }
}

export default plugin
