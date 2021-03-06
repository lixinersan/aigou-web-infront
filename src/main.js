import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
//禁用mock ，就不会拦截请求了
// import Mock from './mock'
// Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'

//自己映入的
// 引用axios，并设置基础URL为后端服务api地址
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:2000/services'  //对应后端网关统一地址
//axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5d3f1040d9a2be1b3f25ad65/plat'   这个是在模拟数据进行访问
//axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5d3f156a39c8210e7cdf6262/aigou-fi'   是用户api文档进行的，没有通过网关

// 将API方法绑定到全局  /plat/login
Vue.prototype.$http = axios
Vue.config.productionTip = false


Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueQuillEditor);

import VueQuillEditor  from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

