<template>
  <div>
    <el-image 
    class="background-img"
    src="https://gitee.com/Zam-0703/BlogImage/raw/master/background.jpg"
    fit="cover"
    />
    <form id = "app">
      <div id="div_title">
        <br>
        <div><h1>用户注册</h1></div>
      </div>
        <div id="mid">
        <br>
        <el-input class="form-control" type="text" placeholder="账户名"  name="account" v-model="account"></el-input>
        <br>
        <el-input class="form-control" type="text" placeholder="请设置密码" name="password" v-model="password" show-password></el-input>
        <br>
        <el-input class="form-control" type="text" placeholder="请再次输入密码" name="password" v-model="password_confirm" show-password></el-input>
        <br>
        <el-row><el-button @click="addUser" value="注册" class="submitbutton" type="warning">注册</el-button></el-row>
        <el-row><el-button @click="goUser" class="submitbutton" type="warning">已有账号，前往登录</el-button></el-row>
        </div>
    </form>
  </div>
  
</template>

<script>
import {config} from '../../../config/config.js'
export default {
  name: 'Register',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      account: '',
      password: '',
      password_confirm: '',
      el:''
    }
  },
  methods: {
    addUser() {
      console.log('my IP is: ', config.IP);
      let account = this.account;
      let password = this.password;
      let password_confirm = this.password_confirm;
      var pattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&+=\(\)-]).{8,20}$/;
      if(account == ''){
          this.$alert('账户名不能为空', '注意⚠️', {
          confirmButtonText: '确定',}
        )
      }
      else if(account.length < 6 || account.length > 10){
        this.$alert('账户名长度限制为 6-10 位', '注意⚠️', {
          confirmButtonText: '确定',}
        )
      }
      else if(password == '')
      {
          this.$alert('密码不能为空', '注意⚠️', {
          confirmButtonText: '确定',}
        )
      }
      else if(!pattern.test(password)){
        this.$alert('密码长度限制为 8-20 位且同时包含数字、大小写字母、符号（@#$%^&+=()-）三类字符', '注意⚠️', {
          confirmButtonText: '确定',}
        )
      }
      else if(password != password_confirm)
      {
          this.$alert('两次密码输入不一致，请重新输入', '注意⚠️', {
          confirmButtonText: '确定',}
        )
      }
      else{
        this.$axios.post( config.IP + '/account/register', { //后端接口路由
        account: account,
        password: password
      },{}).then((response) => {
        console.log(response);
        if(response.data.code==-1){
          this.$alert(response.data.msg, '注意⚠️', {
          confirmButtonText: '确定',})
        }
        else{
          this.$alert('注册成功，请等待管理员审核', '成功✔️', {
          confirmButtonText: '确定',})
          this.$router.push('/account/login');
        }
      })
      }
    },
    goUser(){
      this.$router.push('/account/login');
    }

  }
}
</script>
<style scoped>
.background-img{
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
}
    #app{
      width:300px;
      height:80px;
      background-color:rgba(250, 250, 250, 0.5);
      float:right;
      margin:70px 70px;
      padding: 0px;
      border-top-left-radius:10px;
      border-top-right-radius:10px;
    }
    #div_title{
      font-family:"华文黑体";
      width: 100%;
      height: 80px;
      background-color:rgba(250,250,250,0.7);
      text-align: center;
      line-height:25px;
      color:rgb(64,154,214);
      border-top-left-radius:10px;
      border-top-right-radius:10px;
  }
  img{  
      width: auto;  
      height: auto;  
      max-width: 90%;  
      max-height: 90%;     
  }
  *{
    margin:0px;
    padding: 0px;
  }
  #mid{
    font-family: "宋体-简";
    width:300px;
    height: 325px;
    background-color: #f0f0f0;
    border-bottom-right-radius:10px;
    border-bottom-left-radius:10px;
  }
  
  .form-control{
    width: 260px;
    height:20px;
    margin:10px 20px 25px 20px;
  }
  .submitbutton{
    font-family: "华文黑体";
    width: 260px;
    height:35px;
    margin:20px 20px 0px 20px;
    background-color:rgb(64,158,255);
    border-color: rgb(64,158,255);
    border-top-left-radius:5px;
    border-top-right-radius:5px;
    border-bottom-right-radius:5px;
    border-bottom-left-radius:5px;
  }
</style>
