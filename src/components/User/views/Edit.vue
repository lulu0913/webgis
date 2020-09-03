<template>
  <div>
    <el-image 
    class="background-img"
    src="https://gitee.com/Zam-0703/BlogImage/raw/master/background.jpg"
    fit="cover"
    />
    <form id = "app">
      <div class="top-bar"
      :width='webWidth'>
      <div class='logo-bar'>
              <div class='linkt-logo'><img src="../../../assets/LKT-Logo.png" fit="cover"/></div>
      </div>
      <div class='logo-text'>临空新城道路养护管理系统</div>
      </div>
      <div id="div_title">
        <br>
        <div><h1>用户信息修改</h1></div>
      </div>
        <div id="mid">
        <br>
        <p v-if="seen_1">账户名：</p><input v-if="seen_1" class="form-control" type="text" placeholder="请输入账户名"  name="account" v-model="account">
        <el-row v-if="seen_1" ><el-button @click="submitQuery" value="查询用户" class="submitbutton" type="warning">查询用户</el-button></el-row>
        <p v-if="seen_2">用户名：</p><input v-if="seen_2" class="form-control" type="text" placeholder="用户名"  name="username" v-model="username">
        <p v-if="seen_2">密码：</p><input v-if="seen_2" class="form-control" type="text" placeholder="请设置新密码，若无需修改请忽略" name="password" v-model="password">
        <p v-if="seen_2">权限：</p><input v-if="seen_2" class="form-control" type="text" placeholder="权限等级" name="level" v-model="level">
        <p v-if="seen_2">审核状态：</p>
        <select v-if="seen_2" v-model="status_text">
          <option v-for="(status_text, index) in status_texts" :key='index'>{{status_text}}</option>
        </select>
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
      password: '',
      level: 1,
      status_text: '未审核通过',
      status_texts: ['未审核通过','已审核通过']
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
        //假想传入account，若查询失败，返回code0，若查询成功，返回code1与对应的name, level以及status。
        account: account
      },{}).then((response) => {
        console.log(response);
        if(response.code==0){
          this.$alert('查询失败，账户名不存在，请重新输入', '注意⚠️', {
          confirmButtonText: '确定',}
          )
        }
        else {
          var obj_mid = document.getElementById("mid")
          obj_mid.style.height = "400px"
          var obj_app = document.getElementById("app")
          obj_app.style.height = "400px"
          this.seen_1 = false;
          this.seen_2 = true;
          this.username = response.name;
          this.level = response.level;
          if(response.status == 0){
            this.status_text = '未审核通过'
          }
          else{
            this.status_text = '已审核通过'
          }
        }
      })
      }
    },
    submitEdit() {
      let username = this.username;
      let password = this.password;
      let level = this.level;
      if(this.status_text == '已审核通过'){
        var status = 1;
      }
      else{
        var status = 0;
      }
      
      if(username == ''){
          this.$alert('修改后用户名不能为空', '注意⚠️', {
          confirmButtonText: '确定',}
        )
      }
      //此处权限可以判断是否为合法等级，但是等级区分不明，故先判断是否为空
      else if(level == '')
      {
          this.$alert('修改后权限不能为空', '注意⚠️', {
          confirmButtonText: '确定',}
        )
      }
      else{
        this.$axios.post(config.IP + '/account/infoChange', { //后端接口路由
        //若password为空则表示不修改
        username: username,
        password: password,
        level: level,
        status: status
      },{}).then((response) => {
        console.log(response);
        if(response.data==-1){
          alert('修改失败，用户权限不足');
        }
        else{
          alert('修改成功');
        }
        this.$router.push('/login');
      })
      }
    }
  }
}
</script>

<style scoped>
.top-bar{
  background-color: #f0f0f0;
  z-index: 20;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  flex-direction: row;
  justify-content: space-between;
}
.logo-bar{
  display: flex;
  padding-top: 0px;
  padding-left: 10%;
  float: left;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.logo-text{
  margin-top: 9px;
  float: left;
  color: #101010;
  font-size: 20px;
}
.linkt-logo{
  padding-top: 5px;
  width: auto;
  height: 50px;
}
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
      height:180px;
      background-color: #f0f0f0;
      border-bottom-right-radius:10px;
      border-bottom-left-radius:10px;
    }
  
    .form-control{
        width: 260px;
        height:20px;
        margin:10px 20px 10px 20px;
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
