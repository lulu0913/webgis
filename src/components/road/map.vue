<template>
  <div class="amap-page-container">
    <el-amap vid="amap" :zoom="zoom" :center="center" class="amap-demo">
      <el-amap-polyline :editable="polyline.editable"  :path="polyline.path" :events="polyline.events"></el-amap-polyline>
    </el-amap>

    <div class="toolbar">
      <button type="button" name="button" v-on:click="changeEditable">change editable</button>
    </div>
  </div>
</template>

<style>
  .amap-demo {
    height: 300px;
  }
  .el-vue-amap-container.amap-demo{
    width: 100%;
    height: 100vh;
  }
  .search-box {
    position: absolute;
    top: 25px;
    left: 20px;
  }
  .amap-page-container {
    position: relative;
  }
</style>

<script>
  module.exports = {
    data: function() {
      return {
        zoom: 12,
        center: [121.5273285, 31.25515044],
        polyline: {
          path: [[121.5389385, 31.21515044], [121.5389385, 31.29615044], [121.5273285, 31.21515044]],
          events: {
            click(e) {
              alert('click polyline');
            },
            end: (e) => {
              let newPath = e.target.getPath().map(point => [point.lng, point.lat]);
              console.log(newPath);
            }
          },
          editable: false
        }
      };
    },
    methods: {
      changeEditable() {
        this.polyline.editable = !this.polyline.editable;
      }
    }
  };
</script>