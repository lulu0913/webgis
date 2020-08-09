<template>
    <div class="amap-page-container">
        <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
        <el-amap
        vid="amapDemo"  
        :center="center"
        :zoom="zoom"  
        class="amap-demo"
        :events="events">
        <el-amap-marker :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable"></el-amap-marker>
        </el-amap>
        <div class="toolbar">position: [{{ lng }}, {{ lat }}] address: {{ address }}</div>
    </div>
</template>

<script>
    module.exports = {
      data: function() {
        let self = this;
        return {
          zoom: 20,
          center: [114.22109, 30.729849],
          searchOption: {
            city: '全国',
            citylimit: true
          },
          marker: {
            position: [121.52014, 31.198862]
          },
          address: '',
          events: {
            click(e) {
              let { lng, lat } = e.lnglat;
              self.lng = lng;
              self.lat = lat;
              self.marker.position = [lng, lat]
              // 这里通过高德 SDK 完成。
              var geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
              });        
              geocoder.getAddress([lng ,lat], function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                  if (result && result.regeocode) {
                    self.address = result.regeocode.formattedAddress;
                    self.$nextTick();
                  }
                }
              });        
            }
          },
          lng: 0,
          lat: 0
        };
      },
      methods: {
        onSearchResult(pois) {
          console.log(pois,'pois')
          var lng = pois[0].lng
          var lat = pois[0].lat
          this.center = [lng, lat];
          this.marker.position = [lng, lat]
        }
      }
    };
</script>

<style>
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