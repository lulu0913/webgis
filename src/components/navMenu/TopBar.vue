<template>
  <div class="top-bar">
    <el-menu
    mode="horizontal">
      <div class='logo-bar'>
        <div class='linkt-logo'><img style="height: 100%" src="../../assets/LKT-Logo.png" fit="cover"/></div>
        <div class="logo-text">临空新城道路养护管理系统</div>
      </div>
    <el-menu-item>道路养护</el-menu-item>
    <el-menu-item>审核模式</el-menu-item>
    <el-menu-item>维护日志</el-menu-item>
    <el-menu-item>已完成路段评测</el-menu-item>
    </el-menu>
  </div>
</template>
<script>

</script>

<style>
.top-bar{
  background-color: #f0f0f0;
  z-index: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 57px;
  flex-direction: row;
  justify-content: space-between;
}
.logo-bar{
  display: flex;
  padding-top: 0px;
  margin-right: 28%;
  margin-left: 13%;
  float: left;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.logo-text{
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.2rem;
  color: rgb(53, 53, 53);
  margin-right: 5rem;
}
.linkt-logo{
  padding-top: 5px;
  width: auto;
  height: 50px;
}
</style>