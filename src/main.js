// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import Vueresource from 'vue-resource'
import AMap from 'vue-amap';
import VueCookies from 'vue-cookies'
import ElementUI from 'element-ui';

Vue.use(ElementUI)
Vue.use(VueCookies);
Vue.use(Vueresource);
// Vue.prototype.$ajax=axios
Vue.prototype.$axios = axios;
import QS from 'qs'
Vue.prototype.qs = QS;

Vue.config.productionTip = false

Vue.prototype.changeData = function (){//changeData是函数名
  alert('执行成功');
}

Vue.use(AMap);

  // 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key
  key: '3de0ac7816d5b21247ce23da7cd17d3e',
  // 插件集合 （插件按需引入）
  // plugin: ['AMap.Geolocation']
  plugin: ['AMap.Geocoder','AMap.Geolocation','AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  resizeEnable: true,
  rotateEnable:true,
  pitchEnable:true,
  viewMode:'3D',
  pitch:80,
  rotation:-15,
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})