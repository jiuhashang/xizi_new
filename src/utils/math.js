/* eslint-disable */
export default {
  // 保留小数位向下取整
  RoundDown: function(num, m) {
    return this.Division(Math.floor(this.Multiply(num, Math.pow(10, m))), Math.pow(10, m))
  },
  // 保留小数位向上取整
  RoundUp: function(num, m) {
    return this.Division(Math.ceil(this.Multiply(num, Math.pow(10, m))), Math.pow(10, m))
  },
  // 保留小数位四舍五入
  Round: function(num, len) {
    return this.Division(Math.round(this.Multiply(num, Math.pow(10, len))), Math.pow(10, len))
  },
  // 精度浮点加法
  Add: function(arg1, arg2) {
    arg1 = arg1 || 0
    arg2 = arg2 || 0
    let r1, r2, m, c
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    c = Math.abs(r1 - r2)
    m = Math.pow(10, Math.max(r1, r2))
    if (c > 0) {
      const cm = Math.pow(10, c)
      if (r1 > r2) {
        arg1 = Number(arg1.toString().replace('.', ''))
        arg2 = Number(arg2.toString().replace('.', '')) * cm
      } else {
        arg1 = Number(arg1.toString().replace('.', '')) * cm
        arg2 = Number(arg2.toString().replace('.', ''))
      }
    } else {
      arg1 = Number(arg1.toString().replace('.', ''))
      arg2 = Number(arg2.toString().replace('.', ''))
    }
    return (arg1 + arg2) / m
  },
  // 精度浮点减法
  Subtract: function(arg1, arg2) {
    arg1 = arg1 || 0
    arg2 = arg2 || 0
    let r1, r2, m, n
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2)) // last modify by deeka //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2
    return ((arg1 * m - arg2 * m) / m).toFixed(n)
  },
  // 精度浮点乘法
  Multiply: function(arg1, arg2) {
    arg1 = arg1 || 0
    arg2 = arg2 || 0
    let m = 0; const s1 = arg1.toString(); const s2 = arg2.toString()
    try {
      m += s1.split('.')[1].length
    } catch (e) {
    }
    try {
      m += s2.split('.')[1].length
    } catch (e) {
    }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
  },
  // 精度浮点除法
  Division: function(arg1, arg2) {
    arg1 = arg1 || 0
    arg2 = arg2 || 0
    let t1 = 0; let t2 = 0; let r1; let r2
    try {
      t1 = arg1.toString().split('.')[1].length
    } catch (e) {
    }
    try {
      t2 = arg2.toString().split('.')[1].length
    } catch (e) {
    }
    r1 = Number(arg1.toString().replace('.', ''))
    r2 = Number(arg2.toString().replace('.', ''))
    return this.Multiply((r1 / r2), Math.pow(10, t2 - t1))
  },
  // 精度浮点取余
  Remainder: function(arg1, arg2) {
    arg1 = arg1 || 0
    arg2 = arg2 || 0
    let t1 = 0; let t2 = 0; let t3
    try {
      t1 = arg1.toString().split('.')[1].length
    } catch (e) {
    }
    try {
      t2 = arg2.toString().split('.')[1].length
    } catch (e) {
    }
    t3 = t1 > t2 ? t1 : t2
    return this.Multiply(arg1, Math.pow(10, t3)) % this.Multiply(arg2, Math.pow(10, t3)) / Math.pow(10, t3)
  }
}
