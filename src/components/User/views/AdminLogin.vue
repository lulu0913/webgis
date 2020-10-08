<template>
<body>
  <el-image 
    class="background-img"
    src="https://gitee.com/Zam-0703/BlogImage/raw/master/background.jpg"
    fit="cover"
  />
  <div id="div_login">
    <div id="div_title">
      <br>
      <div><h1>管理员登录</h1></div>
    </div>
    <div id="midden">
      <br>
    <el-input placeholder="请输入管理员账号" type="text" name="account" v-model="ruleForm.account" class="inputinfo"></el-input>
      <br>
    <el-input placeholder="请输入密码" type="text" name="password" v-model="ruleForm.password" class="inputinfo" show-password></el-input>
    <el-row><el-button @click="submitForm('ruleForm')" value="登录" class="submitbutton_login" type="warning">登录</el-button></el-row>
    <el-row><el-button @click="handleCommand()" value="注册" class="submitbutton_registered" type="warning">注册</el-button></el-row>
    <div>
      <br>
      <el-link @click="myedit()" value="修改密码" class=submitbutton_edit>修改密码</el-link><el-link @click="adminLogin()" value="管理员登录" class=submitbutton_adminLogin>普通用户登录</el-link>
    </div>
  </div>
</div>
</body>
</template>

<script>
import {config} from '../../../config/config.js'
export default {
  name: 'User',
  data () {
    return {
        errorInfo : false,
        ruleForm: {
            account: '',
            password: '',                   
        },
        rules: {
            account: [
                { required: true, message: '请输入用户名', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' }
            ],
        }
    }
  },
  methods: {
    submitForm(ruleForm) {
      const self = this;
      localStorage.setItem('ms_username',self.ruleForm.account);
      localStorage.setItem('ms_user',JSON.stringify(self.ruleForm));
      console.log(JSON.stringify(self.ruleForm));
      if(self.ruleForm.account == ''){
        this.$alert('用户名不能为空', '注意⚠️', {
          confirmButtonText: '确定',})
      }
      else if(self.ruleForm.password == ''){
        this.$alert('密码不能为空', '注意⚠️', {
          confirmButtonText: '确定',})
      }                        
      else{self.$axios.post( config.IP + '/account/login',self.ruleForm) //前端接口
        .then((response) => {
            console.log(response);
            console.log(response.data.code)
            if (response.data.code == -1) {
                self.errorInfo = true;
                this.$alert(response.data.msg, '注意⚠️', {
            confirmButtonText: '确定',})
            }
            else if (response.data.code == 1){
              self.$axios.post(config.IP + '/account/accounts',{"condition":{"account":self.ruleForm.account}})
              .then((response => {
                if(response.data.accounts[0].level != 1){
                  this.$alert("权限不足，请联系系统管理员提升权限！", '注意⚠️', {
                  confirmButtonText: '确定',})
                }
                else{
                  this.$cookies.set('Adminaccount', this.ruleForm.account)
                  this.$cookies.set('Adminpassword', this.ruleForm.password)
                  this.$router.push('/AdminSystemPage');  // 登录成功，跳转到功能界面
                }
              })).then((error)=>{
                console.log(error);
              })
            }                          
        }).then((error) => {
          console.log(error);
        })
      }
    },
    handleCommand() {
        this.$router.push('/account/register');
    },
    myedit() {
        this.$router.push('/account/passwordChange');
    },
    adminLogin() {
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
  #div_login{
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
  #midden{
      font-family: "宋体-简";
      width:300px;
      height: 325px;
      background-color: #f0f0f0;
      border-bottom-right-radius:10px;
      border-bottom-left-radius:10px;
  }
  .el-menu-demo{
      font-family: 宋体;
      display:inline-block;
      width:100px;
      height:50px;
      font-weight:bold;
      color:rgb(64,158,255);
      background-color:rgba(58,58,58,0.5);
      text-align:center;
      padding:4px;
      text-decoration:none;
      text-transform:uppercase;
  }
  .inputinfo{
      width: 260px;
      height:25px;
      margin:10px 20px 25px 20px;
  }
  .submitbutton_login{
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
  .submitbutton_registered{
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
  .submitbutton_adminLogin{
      display: inline;
      font-family: "华文黑体";
      font-size: 14px;
      margin: 0px 0px 0px 32px;
  }
  .submitbutton_edit{
      display: inline;
      font-family: "华文黑体";
      font-size: 14px;
      margin: 0px 77px 0px 0px;
  }
</style>

