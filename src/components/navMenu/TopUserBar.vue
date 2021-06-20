<template>
  <div class="top-bar">
    <div class='logo-bar'>
      <div class='linkt-logo'><img style="height: 100%" src="../../assets/LKT-Logo.png" fit="cover"/></div>
      <div class="logo-text">临空新城道路养护管理系统</div>
    </div>
    <div class='logo-bar-list' v-if="!omit">
      <el-menu :default-active="activeIndex" mode="horizontal">
        <el-menu-item index="1" @click="jumpTo('map')">道路养护</el-menu-item>
        <el-menu-item index="2" @click="jumpTo('RoadLog')">维护日志查询</el-menu-item>
        <el-menu-item index="3" @click="jumpTo('RoadForm')">已完成路段评测</el-menu-item>
        <el-menu-item index="4" @click="jumpTo('GPSImport')">GPS 数据导入</el-menu-item>
        <el-menu-item @click="jumpTo('Login')">注销登录</el-menu-item>
      </el-menu>
    </div>
    <div class='logo-bar-list' v-if="omit">
      <el-dropdown  trigger="click">
        <el-menu mode="horizontal">
          <el-menu-item>
            功能菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </el-menu-item>
        </el-menu>
          <el-dropdown-menu :default-active="activeIndex" slot="dropdown">
            <el-dropdown-item index="1" @click.native="jumpTo('map')">道路养护</el-dropdown-item>
            <el-dropdown-item index="2" @click.native="jumpTo('RoadLog')">维护日志查询</el-dropdown-item>
            <el-dropdown-item index="3" @click.native="jumpTo('RoadForm')">已完成路段评测</el-dropdown-item>
            <el-dropdown-item index="4" @click.native="jumpTo('GPSImport')">GPS 数据导入</el-dropdown-item>
            <el-dropdown-item @click.native="jumpTo('Login')">注销登录</el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TopBar',
  data(){
    return{
      omit: true,
      screenWidth: document.body.clientWidth,
      activeIndex: '1'
    }
  },
  mounted(){
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }
    if(that.screenWidth < 1350){
      this.omit = true
    }
    else{
      this.omit = false
    }
  },
  methods:{ 
    jumpTo(name){
      console.log(name)
      if(name == 'Login'){
        this.$confirm('确认注销账户？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.$cookies.set('account', '')
          this.$cookies.set('password', '')
          this.$router.push({name: name});
          this.$message({
            type: 'success',
            message: '注销成功!'
          })
        }).catch(()=>{
          this.$message({
            type: 'info',
            message: '已取消注销'
          });
        });
      }
      else{
        this.$router.push({name: name});
      }
    }
  },
  watch:{
    screenWidth(val){
      if(val < 1350){
        this.omit = true
      }
      else{
        this.omit = false
      }
    }
  }
}
</script>

<style>
.top-bar{
  background-color: #ffffff;
  z-index: 1;
  position: fixed;
  top: 0;
  width: 100%;
  /* height: 57px; */
  flex-direction: row;
  justify-content: space-between;
}
.logo-bar-list{
  display: flex;
  z-index: 1;
  padding-top: 0px;
  margin-right: 10vw;
  /* margin-left: 13%; */
  float: right;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.logo-bar{
  display: flex;
  z-index: 1;
  padding-top: 0px;
  /* margin-right: 28%; */
  margin-left: 10vw;
  float: left;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.logo-text{
  display: flex;
  z-index: 1;
  flex-direction: row;
  align-items: center;
  font-size: 1.2rem;
  color: rgb(53, 53, 53);
  margin-right: 5rem;
}
.linkt-logo{
  padding-top: 5px;
  z-index: 1;
  width: auto;
  height: 50px;
}
</style>