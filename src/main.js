// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import VueClipboard from 'vue-clipboard2'
import {post,get,remove,put} from './utils/http'
import _global from './utils/global.js'
import './assets/icon/iconfont.css'

Vue.prototype.$global = _global;
//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$remove = remove;
Vue.prototype.$put = put;
Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.use(VueClipboard);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
