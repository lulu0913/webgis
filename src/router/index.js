import Vue from 'vue'
import Router from 'vue-router'

import Register from '@/components/User/views/Register'
import Login from '@/components/User/views/Login'
import Edit from '@/components/User/views/Edit'
import AdminLogin from '@/components/User/views/AdminLogin'
import AdminSystem from '@/components/User/views/AdminSystemPage'
import RegisterForm from '@/components/User/components/AdminRegisterForm'
import RoadForm from '@/components/User/components/AdminRoadForm'

import map from '@/components/road/map'
import SystemPage from '@/components/road/SystemPage'

import vueRsource from 'vue-resource'
import axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'jquery'
 
Vue.use(ElementUI);
 
Vue.use(vueRsource);

Vue.use(Router);

Vue.prototype.$ajax=axios;
Vue.prototype.$qs = qs;
 
 
Vue.config.productionTip = false

export default new Router({
  routes: [
    {
      path: '/account/register',
      name: 'Register',
      component:Register 
    },  
    {
      path:'/',
      redirect:'/account/login'
    },
    {
      path: '/account/login',
      name: 'Login',
      component:Login
    },
    {
      path:'/account/adminlogin',
      name: 'AdminLogin',
      component:AdminLogin
    },
    {
      path: '/account/passwordChange',
      name: 'Edit',
      component:Edit
    },
    {
      path: '/AdminSystemPage',
      name: 'AdminSystemPage',
      component: AdminSystem,
      children:[
        {
          path: '/AdminSystemPage/',
          name: 'RegisterForm',
          component: RegisterForm
        },
        {
          path: '/AdminSystemPage/',
          name: 'RoadForm',
          component: RoadForm
        }
      ]
    },
    {
      path: '/road/map',
      name: 'SystemPage',
      component: SystemPage,
      children:[
        {
          path: '/road/map',
          name: 'map',
          component: map
        }
      ]
    },
  ]
})
