<template>
  <div>
    <top-bar></top-bar>
    <router-view/>
  </div>
</template>
<script>
import {config} from '../../config/config.js'
import TopBar from '@/components/navMenu/TopUserBar'
export default {
  name: 'SystemPage',
  components: {
    TopBar:TopBar
  },
  data(){
    return {}
  },
  mounted(){
    // var that = this;
    // var data = {
    //   account: this.$cookies.get('account'),
    //   password: this.$cookies.get('password')
    // }
    // console.log(data)
    // if (data.account == null || data.password == null){
    //   that.$message({
    //     message: '请先登录',
    //     type: 'info'
    //   })
    //   that.$router.push('/account/login')
    // }
    // else {
    //   this.$axios.post(config.IP + '/account/login', data)
    //   .then((response) => {
    //     if (response.data.code != 1){
    //       that.$message({
    //         message: '请先登录',
    //         type: 'info'
    //       })
    //       that.$router.push('/account/login')
    //     }
    //   }).catch(
    //     function(error){
    //       that.$message({
    //         message: '网络错误，请稍后重试',
    //         type: 'error'
    //       })
    //       that.$router.push('/account/login')
    //     }
    //   )
    // }
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