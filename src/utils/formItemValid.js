export const checkPhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('手机号不能为空'))
  } else {
    const reg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的手机号'))
    }
  }
}

export const checkName = (rule, value, callback) => {
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

export const checkId = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('身份证号码不能为空'))
  } else {
    const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    // console.log(reg.test(value))
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的身份证号码'))
    }
  }
}

export const checkPwd = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('登录密码不能为空'))
  } else {
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
    // console.log(reg.test(value))
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入长度在6到12位,且包含数字和字母的密码'))
    }
  }
}

export const checkChangePwd = (rule, value, callback) => {
  if (!value) {
    callback()
  }
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
  // console.log(reg.test(value))
  if (reg.test(value)) {
    callback()
  } else {
    return callback(new Error('请输入长度在6到12位,且包含数字和字母的密码'))
  }
}
