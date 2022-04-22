import isNumber from 'lodash/isNumber'

export default function plugin(Vue) {
  if (plugin.installed) {
    return
  }

  const map = {
    loadmore
  }
  Object.keys(map).forEach((key) => {
    Vue.directive(key, map[key]())
  })
}

function loadmore() {
  return {
    bind(el, binding) {
      // 获取element-ui定义好的scroll盒子
      let differ = 200
      if (binding.arg && +binding.arg >= 0 && isNumber(+binding.arg) && !isNaN(+binding.arg)) {
        differ = +binding.arg
      }
      const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
      SELECTWRAP_DOM.addEventListener('scroll', function() {
        const CONDITION = this.scrollHeight - this.scrollTop - differ <= this.clientHeight
        if (CONDITION) {
          binding.value()
        }
      })
    },
    unbind() {

    }
  }
}
