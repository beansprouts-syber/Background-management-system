import Vue from 'vue'
import App from './App.vue'
// 完整引入
// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 按需引入
import { Button, 
         Container, 
         Main, 
         Header, 
         Aside, 
         Menu, 
         Submenu, 
         MenuItem, 
         MenuItemGroup, 
         Dropdown, 
         DropdownMenu, 
         DropdownItem, 
         Row, 
         Col, 
         Card, 
         Table, 
         TableColumn, 
         Breadcrumb, 
         BreadcrumbItem, 
         Tag,
         Form,
         FormItem,
         Input,
         DatePicker,
         Select,
         Option,
         Switch,
         Dialog,
         Pagination,
         Message,
         MessageBox
        } from 'element-ui';
import router from '../router'
import store from '../store'
import http from 'axios'
import '../api/mock.js'
import './assets/less/index.less'

Vue.config.productionTip = false

import VueRouter from 'vue-router'
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
return routerPush.call(this, location).catch(error=> error)
}
Vue.use(VueRouter)


Vue.use(Button)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(DatePicker)
Vue.use(Input)
Vue.use(Select)
Vue.use(Switch)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.component(Message.name, Message)
Vue.component(MessageBox.name, MessageBox)


Vue.prototype.$http = http
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

// 导航守卫
router.beforeEach((to, from, next) => {
  // 防止页面刷新之后丢失token信息
  store.commit('getToken')
  // 拿到token
  const token = store.state.user.token
  // token不存在，以及当前url不是login时，跳转回login页面
  if(!token && to.name !== 'login') {
    next({name: 'login'})
  }
  // 当处于登录状态,要去往login页面时,返回首页
  else if(token && to.name === 'login') {
    next({name: 'home'})
  }
  else {next()}
})

new Vue({
  router,
  store,
  render: h => h(App),
  // 涉及到生命周期的知识,在此时刷新页面
  created(){
    store.commit('addMenu', router)
  }
}).$mount('#app')
