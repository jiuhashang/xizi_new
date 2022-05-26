import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import './assets/css/global.css'
// import axios from 'axios'

import glComponents from '../src/utils/global-components' // 引入全局组件
Vue.use(glComponents) // 注册全局组件

// element
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)

// axios.defaults.baseURL = 'http://10.11.32.30:7701'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.filter('money', function (val) {
  val = val.toString().replace(/[$,]/g, '');
  if (isNaN(val)) {
      val = '0';
  }
  let sign = val == (val = Math.abs(val));
  val = Math.floor(val * 100 + 0.50000000001);
  let cents = val % 100;
  val = Math.floor(val / 100).toString();
  if (cents < 10) {
      cents = '0' + cents;
  }
  for (var i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
      val = val.substring(0, val.length - (4 * i + 3)) + ',' + val.substring(val.length - (4 * i + 3));
  }

  return (((sign) ? '' : '-') + val + '.' + cents);
});

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
