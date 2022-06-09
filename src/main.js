import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//导入toast全局组件
import toast from 'components/common/toast/index'

Vue.config.productionTip = false

//新建一个公共事件总线
Vue.prototype.$bus = new Vue()

//安装toast插件
Vue.use(toast)

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


//继承代码（ES6知识）
// class Animal {
//   run(){
//
//   }
// }
//
// class Person extends Animal {
//   // run() {
//   //
//   // }
// }


