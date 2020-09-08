<template>
  <div class='admin-left-bar'>
    <el-menu 
      default-active="1-4-1" 
      class="el-menu-vertical-demo admin-left-bar-style" 
      :width="100"
      @open="handleOpen" 
      @close="handleClose" 
      :collapse="isCollapse">
      <el-menu-item
        :width="100"
        @click="redirect()">
        <i class="el-icon-s-order"></i>
        <span slot="title">退出登录</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'LeftBar',
  data() {
      return {
        isCollapse: false,
      };
    },
  methods: {
    redirect(){
      this.$cookies.remove('account')
      this.$router.push('/account/adminlogin')
    },
  }
}
</script>

<style>
body{
  margin:0px;
  height: 1rem;
}
.admin-left-bar{
  margin-top: 1rem;
}
.admin-left-bar .el-menu-item {
  padding: 0px;
  width: 10rem !important;
}
.admin-left-bar .el-menu-vertical-demo{
  padding: 0px;
  width: 10rem !important;
}
.admin-left-bar .el-menu-vertical-demo:not(.el-menu--collapse){
  width: 10rem !important;
}
.my-adminleft-bar-title{
  margin: 2rem;
  font-weight: bold;
  font-size: 1.2rem;
  color: rgb(36, 36, 36);
}
.my-adminleft-bar{
  width: 15rem;
  margin-bottom: 2rem;
}
</style>
