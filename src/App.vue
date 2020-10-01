<template>
  <div id="app">
    <logo-bar></logo-bar>
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import LogoBar from '@/components/navMenu/LogoBar'

export default {
  name: 'App',
  components:{
    LogoBar:LogoBar
  },
  provide(){
    return {
      reload: this.reload
    }
  },
  data(){
    return{
      isRouterAlive: true
    }
  },
  methods: {
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body{
  margin: 0px;
  border: 0px;
  padding: 0px;
}
</style>
