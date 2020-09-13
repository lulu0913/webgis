<template>
  <div>
    <div class="my-adminform-main-contain-col" :style="{width:adjustWidth}">
      <div class="my-adminform-main-contain-row">
        <LeftBar/>
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
import LeftBar from '@/components/User/components/AdminLeftBar.vue'
import {config} from '../../../config/config.js'

export default {
  name: 'AdminForm',
  components:{
    LeftBar:LeftBar,
  },
  data(){
    return{
      adjustWidth:'',
    }
  },
  mounted(){
    var that = this;
    var is_mobi = navigator.userAgent.toLowerCase().match(/(ipod|ipad|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i) != null;
    if(is_mobi){
      this.adjustWidth = '80rem'
    }else{
      this.adjustWidth = '100%'
    }
    var data = {
      account: this.$cookies.get('Adminaccount'),
      password: this.$cookies.get('Adminpassword')
    }
    console.log(data)
    if (data.account == null || data.password == null){
      that.$message({
        message: '请先登录',
        type: 'info'
      })
      that.$router.push('/account/adminlogin')
    }
    else {
      this.$axios.post(config.IP + '/account/login', data)
      .then((response) => {
        if (response.data.code != 1){
          that.$message({
            message: '请先登录',
            type: 'info'
          })
          that.$router.push('/account/adminlogin')
        }
      }).catch(
        function(error){
          that.$message({
            message: '网络错误，请稍后重试',
            type: 'error'
          })
          that.$router.push('/account/adminlogin')
        }
      )
    }
  },
  methods:{
    temp(){
      jQuery.post(
        'http://' + IP + '/',
        data,
        function (res) {
        }
      )
    }
  }
}
</script>

<style>
.my-adminform-main-contain-col{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70rem;
}
.my-adminform-main-contain-row{
  display: flex;
  width: 70rem;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
