<template>
  <div class="amap-page-container">
    <el-amap vid="amap" :zoom="zoom" :center="center" class="amap-demo" :events="events">
      <el-amap-polyline v-for="(path, index) in polyline.mypath" :editable="polyline.editable"  :path="path" :events="polyline.events" :key="index"></el-amap-polyline>
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
      let self = this;
      return {
        zoom: 16,
        center: [114.22109, 30.729849],
        lng: 0.0,
        lat: 0.0,
        polyline: {
          mypath: [[]],
          events: {
            click(e) {
              alert('click polyline');
              // console.log(self.lng, self.lat)
              self.sendlnglat();
            },
            end: (e) => {
              let newPath = e.target.getPath().map(point => [point.lng, point.lat]);
              console.log(newPath);
            }
          },
          editable: false
        },
        events: {
          click(e) {
            let { lng, lat } = e.lnglat;
            mypaths = self.polyline.mypath;
            console.log(mypaths.length)
            mylength = mypaths.length
            self.polyline.mypath[mylength-1].push([lng, lat]);
            console.log(mypaths[mylength-1])
            // console.log('path:', self.polyline.path[0].lng)
            if(mypaths[mylength-1][0][0]){
              self.lng = mypaths[mylength-1][0][0];
              self.lat = mypaths[mylength-1][0][1];
              // console.log('ddd:', mypaths[mylength-1][0][0])
              console.log('ddd:', self.lng)
              console.log('ddd:', self.lat)
            }
          },
          rightclick(e){
            mypaths = self.polyline.mypath;
            mylength = mypaths.length;
            if(self.polyline.mypath[mylength-1].length  ){
              self.polyline.mypath.push([]);
            }
          }
        },
      };
    },
    methods: {
      changeEditable() {
        this.polyline.editable = !this.polyline.editable;
      },

      sendlnglat() {
        alert('successful');
        lng = this.lng;
        lat = this.lat;
        self.$axios.post('/api//road/add',{
          lng: lng,
          lat: lat }) //向后端发送经纬度，经纬度信息是起始端点信息
        .then((response) => {
                        
        }).then((error) => {
            console.log(error);
        })
      },
    }
  };
</script>