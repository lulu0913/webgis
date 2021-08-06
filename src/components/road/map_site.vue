<template>
  <div class="amap-page-container">
    <el-amap vid="amap" :resizeEnable="resizeEnable"
      :pitchEnable="pitchEnable"
      :rotateEnable="rotateEnable"
      :viewMode="viewMode"
      :plugin="plugin"
      :expandZoomRange="expandZoomRange"
      :zooms="zooms"
      :zoom="zoom"
      :center="center"
      :pitch="pitch"
      :rotation="rotation"
      class="amap-demo"
      :events="mapEvents">
    </el-amap>
    <el-container class="sidabar-outer-container" v-if="true">
      <el-aside class="sidabar-aside" style="width: 25rem;">
        <el-container class="sidebar-inner-container">
          <el-container class="sidebar-inner-block">
            <div class="sidebar-inner-block-title">
              <div class="sidebar-inner-block-title-inner">
                <i class="el-icon-place" style="padding-right: 5px;"></i>
                项目简介
              </div>
            </div>
            <div class="sidebar-inner-block-item-align">
              <span class="title">施工单位</span>
              <span class="item">巴哈啥事肯德基</span>
            </div>
            <div class="sidebar-inner-block-item-align">
              <span class="title">施工单位</span>
              <span class="item">巴哈啥事肯德基</span>
            </div>
            <div class="sidebar-inner-block-item-align">
              <span class="title">施工单位</span>
              <span class="item">巴哈啥事肯德基</span>
            </div>
            <div class="sidebar-inner-block-item-align">
              <span class="title">施工单位</span>
              <span class="item">巴哈啥事肯德基</span>
            </div>
          </el-container>
          <el-container class="sidebar-inner-block">
            <div class="sidebar-inner-block-title">
              <div class="sidebar-inner-block-title-inner">
                <i class="el-icon-place" style="padding-right: 5px;"></i>
                塔吊状态
              </div>
            </div>
            <el-tabs style="background-color: rgba(0, 0, 0, 0.411)" type="border-card" class="sidebar-tabs">
              <el-tab-pane label="塔吊1">
                <div class="sidebar-inner-block-item">
                  GPS: 123123123123123123
                </div>
                <div class="sidebar-inner-block-item">
                  运行状态: 123123123123123123
                </div>
                <div class="sidebar-inner-block-item">
                  碰撞距离: 123123123123123123
                </div>
              </el-tab-pane>
              <el-tab-pane label="塔吊2">塔吊2</el-tab-pane>
            </el-tabs>
          </el-container>
          <el-container class="sidebar-inner-block">
            <div class="sidebar-inner-block-title">
              <div class="sidebar-inner-block-title-inner">
                <i class="el-icon-place" style="padding-right: 5px;"></i>
                入场情况
              </div>
            </div>
            <div class='sidebar-inier-block-flexblock'>
              <div class="item">
                <i class="el-icon-place" style="padding-right:5px;font-size:30px;"></i>
                <div class="container">
                  <div class='title'>现场人数</div>
                  <span class='content'>45/5</span><span class="title">人</span>
                </div>
              </div>
              <div class="item">
                <i class="el-icon-place" style="padding-right:5px;font-size:30px;"></i>
                <div class="container">
                  <div class='title'>现场人数</div>
                  <span class='content'>45/50</span><span class="title">人</span>
                </div>
              </div>
              <div class="item">
                <i class="el-icon-place" style="padding-right:5px;font-size:30px;"></i>
                <div class="container">
                  <div class='title'>现场人数</div>
                  <span class='content'>45/50</span><span class="title">人</span>
                </div>
              </div>
              <div class="item">
                <i class="el-icon-place" style="padding-right:5px;font-size:30px;"></i>
                <div class="container">
                  <div class='title'>现场人数</div>
                  <span class='content'>45/50</span><span class="title">人</span>
                </div>
              </div>
              <div class="item">
                <i class="el-icon-place" style="padding-right:5px;font-size:30px;"></i>
                <div class="container">
                  <div class='title'>现场人数</div>
                  <span class='content'>45/50</span><span class="title">人</span>
                </div>
              </div>
              <div class="item">
                <i class="el-icon-place" style="padding-right:5px;font-size:30px;"></i>
                <div class="container">
                  <div class='title'>现场人数</div>
                  <span class='content'>45/50</span><span class="title">人</span>
                </div>
              </div>
            </div>
          </el-container>
          <el-container class="sidebar-inner-block">
            <div class="sidebar-inner-block-title">
              <div class="sidebar-inner-block-title-inner">
                <i class="el-icon-place" style="padding-right: 5px;"></i>
                安全天数
              </div>
            </div>
            <el-progress 
              stroke-linecap="round" 
              stroke-width="20" 
              width="180" 
              class="dashboard"
              type="dashboard" 
              :percentage="80" 
              status="success">
            </el-progress>
            <div class="safe-days">
              128天
            </div>
          </el-container>
        </el-container>
      </el-aside>
    </el-container>
    <el-container class="sidabar-outer-container-right">
      <el-aside class="sidabar-aside" style="width: 25rem;">
        <el-container class="sidebar-inner-container">
          <el-container class="sidebar-inner-block">
            <div class="sidebar-inner-block-title">
              <div class="sidebar-inner-block-title-inner">
                <i class="el-icon-place" style="padding-right: 5px;"></i>
                设备报警
              </div>
            </div>
            <el-container class='table-container'>
              <el-main style="padding: 0rem">
                <el-table :data="tableData" class='table' height="185" size="small">
                  <el-table-column align="center" prop="date" label="日期" width="100" height="10">
                  </el-table-column>
                  <el-table-column align="center"prop="name" label="姓名" width="100">
                  </el-table-column>
                  <el-table-column align="center"prop="address" label="地址">
                  </el-table-column>
                </el-table>
              </el-main>
            </el-container>
          </el-container>
          <el-container class="sidebar-inner-block">
            <div class="sidebar-inner-block-title">
              <div class="sidebar-inner-block-title-inner">
                <i class="el-icon-place" style="padding-right: 5px;"></i>
                违章操作
              </div>
            </div>
            <el-container class='table-container'>
              <el-main style="padding: 0rem">
                <el-table :data="tableData" class='table' height="185" size="small">
                  <el-table-column align="center" prop="date" label="日期" width="100" height="10">
                  </el-table-column>
                  <el-table-column align="center" prop="name" label="姓名" width="100">
                  </el-table-column>
                  <el-table-column align="center" prop="address" label="描述">
                  </el-table-column>
                </el-table>
              </el-main>
            </el-container>
          </el-container>
          <el-container class="sidebar-inner-block">
            <div class="sidebar-inner-block-title">
              <div class="sidebar-inner-block-title-inner">
                <i class="el-icon-place" style="padding-right: 5px;"></i>
                环境监测
              </div>
            </div>
            <div class='sidebar-inier-block-flexblock'>
              <div class="item">
                <i class="el-icon-place" style="padding-right:5px;font-size:30px;"></i>
                <div class="container">
                  <div class='title'>现场人数</div>
                  <span class='content'>45/5</span><span class="title">人</span>
                </div>
              </div>
              <div class="item">
                <i class="el-icon-place" style="padding-right:5px;font-size:30px;"></i>
                <div class="container">
                  <div class='title'>现场人数</div>
                  <span class='content'>45/50</span><span class="title">人</span>
                </div>
              </div>
              <div class="item">
                <i class="el-icon-place" style="padding-right:5px;font-size:30px;"></i>
                <div class="container">
                  <div class='title'>现场人数</div>
                  <span class='content'>45/50</span><span class="title">人</span>
                </div>
              </div>
              <div class="item">
                <i class="el-icon-place" style="padding-right:5px;font-size:30px;"></i>
                <div class="container">
                  <div class='title'>现场人数</div>
                  <span class='content'>45/50</span><span class="title">人</span>
                </div>
              </div>
              <div class="item">
                <i class="el-icon-place" style="padding-right:5px;font-size:30px;"></i>
                <div class="container">
                  <div class='title'>现场人数</div>
                  <span class='content'>45/50</span><span class="title">人</span>
                </div>
              </div>
              <div class="item">
                <i class="el-icon-place" style="padding-right:5px;font-size:30px;"></i>
                <div class="container">
                  <div class='title'>现场人数</div>
                  <span class='content'>45/50</span><span class="title">人</span>
                </div>
              </div>
            </div>
          </el-container>
          <el-container class="sidebar-inner-block">
            <div class="sidebar-inner-block-title">
              <div class="sidebar-inner-block-title-inner">
                <i class="el-icon-place" style="padding-right: 5px;"></i>
                视频监控
              </div>
            </div>
          </el-container>
        </el-container>
      </el-aside>
    </el-container>
  </div>
</template>

<style>
.sidebar-inner-block .safe-days{
  font-size: 24px;
  top: -30px;
  position: relative;
  color:rgb(255, 255, 255);
  font-weight: bolder;
}
.el-table--enable-row-hover .el-table__body tr:hover>td{
  background-color: rgba(82, 137, 255, 0.411);
}
.el-table--border::after, .el-table--group::after, .el-table::before{
  background-color: rgba(0, 0, 0, 0.411);
}
.el-table td, .el-table th.is-leaf{
  border-color: rgba(0, 0, 0, 0.411);
  color:rgb(255, 255, 255);
}
.el-table th, .el-table tr{
  background-color: rgba(0, 0, 0, 0.411);
  border-color: rgba(0, 0, 0, 0.411);
}
.el-table, .el-table__expanded-cell{
  background-color: rgba(0, 0, 0, 0.411);
}
.sidebar-inner-block .table-container{
  width: 23rem;
  padding: 0.5rem 0rem 0.5rem 0rem;
  height: 4rem;
  /* background-color: rgba(0, 0, 0, 0.411); */
}
.sidebar-inner-block .table{
  background-color: rgba(0, 0, 0, 0.411);
}
.sidabar-outer-container-right{
  position: absolute;
  right: 0;
  top: 0;
}
.sidebar-inner-block .dashboard{
  margin-top:1rem;
}
.sidebar-inier-block-flexblock .item .content{
  display: inline-flex;
  justify-content: flex-start;
  width: 3rem;
  font-size: 18px;
  font-weight: bolder;
}
.sidebar-inier-block-flexblock .item .title{
  display: inline-flex;
  justify-content: flex-start;
  color: rgba(240, 248, 255, 0.596);
}
.sidebar-inier-block-flexblock .item{
  padding-left: 2rem;
  width: 8rem;
  height: 2rem;
  color: aliceblue;
  margin: 0;
  display: flex;
  flex-direction: raw;
  align-items: center;
}
.sidebar-inier-block-flexblock{
  margin-top: 0.5rem;
  background-color: rgba(0, 0, 0, 0.411);
  height: 10rem;
  display: flex;
  flex-direction: raw;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.sidebar-inner-block-item-align .title{
  background-color: rgba(255, 205, 40, 0.212);
  padding: 0.5rem 1rem 0.5rem 1rem;
  color: rgb(255, 209, 27);
  width: 6rem;
  margin-right: 10px;
}
.sidebar-inner-block-item-align .item{
  background-color: rgba(40, 158, 255, 0.342);
  padding: 0.5rem 1rem 0.5rem 1rem;
  color: rgba(130, 226, 255, 0.993);
  width: 15rem;
  margin: 0;
}
.sidebar-inner-block-item-align{
  margin-top: 5px;
  width: 23rem;
  display: flex;
  justify-content: flex-start;
}
.sidebar-inner-block-item{
  color: aliceblue;
  padding-bottom: 10px;
}
.sidebar-inner-block-title-inner{
  height: 2rem;
  display: flex;
  align-items: center;
  flex-direction: raw;
}
.sidebar-inner-block-title{
  color: aliceblue;
  width: 23rem;
  border: 1px rgba(192, 214, 255, 0.452) solid;
  border-radius: 10rem;
  height: 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.sidebar-inner-block{
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.164);
  width: 24rem;
  height: 15rem;
}
.sidebar-tabs{
  width: 23rem;
  border-color: rgba(0, 0, 0, 0.411);
  background-color: rgba(0, 0, 0, 0.158);
}
.sidabar-outer-container{
  position: absolute;
  left: 0;
  top: 0;
}
.sidebar-inner-container{
  padding-top: 2vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 25rem;
  height: 98vh;
}
.sidabar-aside{
  background-color: rgba(0, 10, 150, 0.411);
  width: 25rem;
}
.el-vue-amap-container.amap-demo{
  width: 100%;
  height: 100vh;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
.el-tabs--border-card>.el-tabs__header{
  border-color: rgba(0, 0, 0, 0.411);
  background-color: rgba(0, 0, 0, 0.411);
}
.el-tabs__nav-wrap.is-scrollable{
  border-color: rgba(0, 0, 0, 0.411);
  background-color: rgba(0, 0, 0, 0.411);
}
.el-tabs__nav{
  border-color: rgba(0, 0, 0, 0.411);
  background-color: rgba(0, 0, 0, 0.411);
}
.el-tabs__item{
  border-color: rgba(0, 0, 0, 0.411);
  background-color: rgba(0, 0, 0, 0.411);}
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
  border-color: rgba(0, 0, 0, 0.411);
  background-color: rgba(0, 0, 0, 0.411);
}
.el-tabs__header{
  border-color: rgba(0, 0, 0, 0.411);
  background-color: rgba(0, 0, 0, 0.411);
}
.el-tabs__nav-wrap{
  border-color: rgba(0, 0, 0, 0.411);
  background-color: rgba(0, 0, 0, 0.411);
}
</style>

<script>
import {config} from '../../config/config.js'
import {
  AMapManager
} from 'vue-amap';
import VueAMap from 'vue-amap'
let amapManager = new VueAMap.AMapManager();

export default {
  data(){
    let self = this;
    return {
      tableData: [
        {
          "date": "2021/07/05",
          "name": "哈哈哈",
          "address": "阿斯达四大", 
        },
        {
          "date": "2021/07/05",
          "name": "哈哈哈",
          "address": "阿斯达四大", 
        },
        {
          "date": "2021/07/05",
          "name": "哈哈哈",
          "address": "阿斯达四大", 
        },
        {
          "date": "2021/07/05",
          "name": "哈哈哈",
          "address": "阿斯达四大", 
        },
        {
          "date": "2021/07/05",
          "name": "哈哈哈",
          "address": "阿斯达四大", 
        },
        {
          "date": "2021/07/05",
          "name": "哈哈哈",
          "address": "阿斯达四大", 
        },
        {
          "date": "2021/07/05",
          "name": "哈哈哈",
          "address": "阿斯达四大", 
        },
      ],
      PitchDialogVisible: false,
      CementDialogVisible: false,
      resizeEnable: true,
      rotateEnable:true,
      pitchEnable:true,
      pitch:80,
      rotation:-15,
      viewMode: '2D',
      expandZoomRange: true,
      zooms: [3, 20],
      zoom: 16,
      center: [114.219659, 30.725282],
      lng: 0.0,
      lat: 0.0,
      plugin:[
        // {
        //   pName: 'MapType',
        //   defaultType: 0,
        //   showRoad: true,
        //   events: {
        //     init(instance) {
        //       console.log(instance);
        //     }
        //   }
        // },
        // {
        //   pName: 'Geolocation',
        //   events: {
        //     init(o) {
        //       // o 是高德地图定位插件实例
        //       o.getCurrentPosition((status, result) => {
        //         if (result && result.position) {
        //           self.lng = result.position.lng;
        //           self.lat = result.position.lat;
        //           self.center = [self.lng, self.lat];
        //           self.loaded = true;
        //           self.$nextTick();
        //         }
        //       });
        //     }
        //   }
        // },
        // {
        //   pName: 'ToolBar',
        //   position: 'RB',
        //   events: {
        //     init(instance) {
        //       console.log(instance);
        //     }
        //   }
        // }
      ],
      amapManager,
      mapEvents: {
        init(o) {
          o.setMapStyle('amap://styles/darkblue');//自定义的高德地图的样式，我选的是马卡龙
        }
      }
    }
  },
  methods: {
    
  },
}
</script>
