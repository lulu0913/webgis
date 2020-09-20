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
        <div><h1>用户密码修改</h1></div>
      </div>
        <div id="mid">
        <br>
        <p v-if="seen_1">账户名：</p><el-input v-if="seen_1" class="form-control" type="text" placeholder="请输入账户名"  name="account" v-model="account"></el-input>
        <el-row v-if="seen_1" ><el-button @click="submitQuery" value="查询用户" class="submitbutton" type="warning">查询用户</el-button></el-row>
        <div v-if="seen_1">
          <br>
          <el-link @click="backLogin()" value="返回登录界面" class=submitbutton_adminLogin>返回登录界面</el-link>
        </div>
        <p v-if="seen_2">用户名：</p><el-input v-if="seen_2" class="form-control" type="text" placeholder="用户名"  name="username" v-model="username" disabled></el-input>
        <p v-if="seen_2">旧密码：</p><el-input v-if="seen_2" class="form-control" type="text" placeholder="请输入旧密码" name="oldpassword" v-model="oldpassword" show-password></el-input>
        <p v-if="seen_2">新密码：</p><el-input v-if="seen_2" class="form-control" type="text" placeholder="请输入新密码" name="newpassword" v-model="newpassword" show-password></el-input>
        <p v-if="seen_2">确认密码：</p><el-input v-if="seen_2" class="form-control" type="text" placeholder="请再次输入新密码" name="newpassword_confirm" v-model="newpassword_confirm" show-password></el-input>
        <el-row v-if="seen_2" ><el-button @click="submitEdit" value="提交修改" class="submitbutton" type="warning">提交修改</el-button></el-row>
        </div>
    </form>
  </div>
</template>

<script>
import {config} from '../../../config/config.js'
export default {
  name: 'Edit',
  data () {
    return {
      seen_1: true,
      seen_2: false,
      account: '',
      username: '',
      oldpassword: '',
      newpassword: '',
      newpassword_confirm: ''
    }
  },
  methods: {
    submitQuery(){
      let account = this.account;
      if(account == ''){
          this.$alert('查询账户名不能为空', '注意⚠️', {
          confirmButtonText: '确定',}
        )
      }
      else{
        this.$axios.post(config.IP + '/account/accounts', { //后端接口路由
        "condition":{
          "account": this.account
        }
      },{}).then((response) => {
        console.log(response);
        if(response.data.accounts.length==0){
          this.$alert('账户名不存在，请重新输入！', '注意⚠️', {
          confirmButtonText: '确定',}
          )
        }
        else{
          var obj_mid = document.getElementById("mid")
          obj_mid.style.height = "430px"
          var obj_app = document.getElementById("app")
          obj_app.style.height = "430px"
          this.seen_1 = false;
          this.seen_2 = true;
          this.username = response.data.accounts[0].account;
        }
      })
      }
    },
    submitEdit() {
      if(this.oldpassword == ''){
        this.$alert('未输入旧密码！', '注意⚠️', {
        confirmButtonText: '确定',}
        )
      }
      else if(this.newpassword == ''){
        this.$alert('未设置新密码！', '注意⚠️', {
        confirmButtonText: '确定',}
        )
      }
      else if(this.newpassword != this.newpassword_confirm){
        this.$alert('新密码两次输入不一致，请重新输入！', '注意⚠️', {
        confirmButtonText: '确定',}
        )
      }
      else{
        this.$axios.post(config.IP + '/account/passwordChange', { //后端接口路由
        "account": this.username,
        "oldPassword": this.oldpassword,
        "newPassword": this.newpassword
      },{}).then((response) => {
        console.log(response);
        if(response.data.code == -2){
          this.$alert('输入的原密码错误，请重新输入！', '注意⚠️', {
          confirmButtonText: '确定',})
        }
        else if(response.data.code == -1){
          this.$alert('输入的用户名不存在，请重新输入！', '注意⚠️', {
          confirmButtonText: '确定',})
        }
        else if(response.data.code == 1){
          this.$alert('修改密码成功！', '成功✔️', {
          confirmButtonText: '确定',})
          this.$router.push('/account/login');
        }
      })
      }
    },
    backLogin() {
        this.$router.push('/account/login');
    },
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
      height:220px;
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
