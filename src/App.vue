<template>
  <div id="app">
    <top-bar></top-bar>
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import TopBar from '@/components/navMenu/TopBar'

export default {
  name: 'App',
  components: {
    TopBar:TopBar
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
