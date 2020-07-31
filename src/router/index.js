import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Edit from '@/components/Edit'
import vueRsource from 'vue-resource'
import axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
 
Vue.use(ElementUI);
 
Vue.use(vueRsource);

Vue.use(Router);

Vue.prototype.$ajax=axios;
Vue.prototype.$qs = qs;

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'Register',
      component:Register 
    },  
    {
      path:'/',
      redirect:'/Login'
    },
    {
      path: '/Login',
      name: 'Login',
      component:Login
    },
    {
      path: '/Edit',
      name: 'Edit',
      component:Edit
    },
  ]
})
