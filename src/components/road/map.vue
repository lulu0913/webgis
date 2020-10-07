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
      :events="events">

      <!-- 画出来的是直线 -->
      <!-- <el-amap-polyline
        v-for="(path, index) in polyline.mypath"
        :extData="index"
        :editable="polyline.editable"
        :path="path"
        :events="polyline.events"
        :key="{id: 1}">
      </el-amap-polyline>   -->

      <!-- 画出来的是多边形 -->
      <el-amap-marker v-for="marker in markers" :position="marker" :key="marker"></el-amap-marker>
      <el-amap-polygon
        v-for="(polygon, index) in polygons"
        :path="polygon.path"
        :draggable="polygon.draggable"
        :events="polygon.events"
        :key="index"
        :extData="polygon.rid"
        fillColor="#FFC0CB"
        fillOpacity="0.5"
        strokeColor="#FF0000">
      </el-amap-polygon>

    </el-amap>

    <!-- 在地图上进行编辑的工具栏   -->
    <div class="toolbar">
      <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
      <div class="toolbar-inner">
        <el-button type="primary" name="button" title="显示本地json文件保存的路径信息" v-on:click="showpath" plain round>显示已有标注</el-button>
        <!-- 保存标注即将现有的路径的经纬度点坐标和路况信息传给后端 -->
        <el-button type="success" name="button" title="保存当前地图上的路径信息" v-on:click="savepath" plain round>保存标注</el-button>
        <el-button type="primary" name="button" title="测试" v-on:click="testpath" plain round>测试路段划分</el-button>
        <el-select v-model="RoadOption" @change="handleRoadOption" placeholder="请选择切换路段">
          <el-option
          v-for="item in RoadOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="side-bar">
      <div class="side-bar-title">
        路段信息（点击相应路段后显示）
        <el-button v-if="roadData" type="text" @click="updateRoadInfo">保存修改</el-button>
      </div>
      <div v-if="roadData" class="side-bar-head">
        <div class="side-bar-head-raw">
          <div class="side-bar-head-title">路段ID:</div>
          <el-input placeholder="请输入内容" v-model="roadData.rid" :disabled="true" size="mini" style="margin-right: 10px"></el-input>
        </div>
        <div class="side-bar-head-raw">
          <div class="side-bar-head-title">区域:</div>
          <el-input placeholder="请输入内容" v-model="roadData.part.region" :disabled="true" size="mini" style="margin-right: 10px"></el-input>
        </div>
        <div class="side-bar-head-raw">
          <div class="side-bar-head-title">道路:</div>
          <el-input placeholder="请输入内容" v-model="roadData.part.road" :disabled="true" size="mini" style="margin-right: 10px"></el-input>
        </div>
        <div class="side-bar-head-raw">
          <div class="side-bar-head-title">车道数:</div>
          <el-input placeholder="请输入内容" v-model="roadData.part.roadNum" :disabled="true" size="mini" style="margin-right: 10px"></el-input>
        </div>
        <div class="side-bar-head-raw">
          <div class="side-bar-head-title">路段长度:</div>
          <el-input placeholder="请输入内容" v-model="roadData.attribute.length" :disabled="true" size="mini" style="margin-right: 10px"></el-input>
        </div>
        <div class="side-bar-head-raw">
          <div class="side-bar-head-title">损坏等级:</div>
          <el-input placeholder="请输入内容" v-model="roadData.attribute.level" :disabled="true" size="mini" style="margin-right: 10px"></el-input>
        </div>
        <div class="side-bar-head-raw">
          <div class="side-bar-head-title">备注:</div>
          <el-input placeholder="请输入内容" v-model="roadData.attribute.note" :disabled="false" size="mini" style="margin-right: 10px"></el-input>
        </div>
        <div class="side-bar-head-raw">
          <div class="side-bar-head-title">路面类型:</div>
          <el-input placeholder="请输入内容" v-model="roadData.attribute.type?'沥青路':'水泥路'" :disabled="true" size="mini" style="margin-right: 10px"></el-input>
        </div>
      </div>
      <el-tabs v-if="roadData" class="side-bar-content" v-model="activeName" @tab-click="handleClick" tab-position="right" type="border-card" :stretch="true">
        <el-tab-pane v-for="index in roadData.part.roadNum" :label="'车道 '+String(index)" :name="String(index)" :key="index">
          <el-collapse v-model="activeNames" accordion>
            <el-collapse-item v-for="(option, i) in PitchTornOptions" :title="option.title" :name="String(i)" :key="i">
              <el-form :model="roadData.streets[index-1]" label-width="50px"  size="mini" :key="index">
                <el-form-item v-for="content in option.content" :label="content.name" class="title-font-size" :key="content.name">
                  <el-select v-model="roadData.streets[index-1].torn[option.idx][content.idx]" placeholder="请选择损坏等级">
                    <el-option v-for="l in 4" :label="'level '+String(l-1)" :value="l-1" :key="l"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style>
.side-bar-content .el-tabs__content{
  padding: 0px 15px 0px 15px;
}
.side-bar-head-title{
  width: 80px;
  padding: 0px 10px 0px 10px;
}
.side-bar-head-raw{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  padding-bottom: 10px;
}
.side-bar-head{
  background-color: #eeeeee;
  padding: 10px 10px 5px 10px;
}
.side-bar-submit-button{
  position: absolute;
  bottom: 50px;
  float: bottom;
}
.title-font-size .el-form-item__label{
  font-size: 12px;
}
.title-font-size-head .el-form-item__label{
  font-size: 12px;
}
.side-bar-choice-title{
  height: 20px;
}
.side-bar-content{
  height: 100%;
  overflow: scroll;
}
.side-bar{
  position: absolute;
  top: 0px;
  right: 0px;
  width: 20%;
  height: 93.6vh;
  z-index: 2;
  background-color: white;
  display: flex;  
  flex-direction: column;
}
.side-bar-title{
  height: 8vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px 0px 20px;
  /* padding: 10px 0px 10px 0px; */
  font-weight: bold;
  /* border-bottom: 1px rgb(187, 187, 187) solid; */
}
.el-vue-amap-container.amap-demo{
  width: 80%;
  height: 93.6vh;
}
.search-box {
  margin: 0px 20px 0px 0px;
}
.amap-page-container {
  position: relative;
  height: 90%;
}
.info{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
}
.toolbar{
  height: 100px;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 2;
  top: 0px;
  left: 30px;
}
</style>

<script>
import {config} from '../../config/config.js'
const PitchCrackOptions = [{name: '线裂', idx: 'c1'},
                            {name: '网裂', idx: 'c2'},
                            {name: '龟裂', idx: 'c3'},
                          ];
const PitchShapeOptions = [{name: '拥包', idx: 's1'},
                            {name: '车辙', idx: 's2'},
                            {name: '沉陷', idx: 's3'},
                            {name: '翻浆', idx: 's4'},
                          ];
const PitchLooseOptions = [{name: '剥落', idx: 'l1'},
                            {name: '坑槽', idx: 'l2'},
                            {name: '啃边', idx: 'l3'},
                          ];
const PitchOtherOptions = [{name: '路框差', idx: 'o1'},
                            {name: '唧浆', idx: 'o2'},
                            {name: '泛油', idx: 'o3'},
                          ];
const PitchTornOptions = [{
    title: '有裂缝',
    idx: 'crack',
    content: PitchCrackOptions,
  },{
    title: '有变形',
    idx: 'shape',
    content: PitchShapeOptions,
  },{
    title: '有松散',
    idx: 'loose',
    content: PitchLooseOptions,
  },{
    title: '其他情况',
    idx: 'others',
    content: PitchOtherOptions,
  },
];
// 水泥路面情况
const CementTornOptions = ['有裂缝', '有接缝破坏', '有表面破坏', '其他情况', '无异常'];
const CementCrackOptions = ['线裂', '板角断裂', '边角裂缝', '交叉裂缝和破碎板'];
const CementJointOptions = ['接缝料损坏', '边角剥落'];
const CementSurfaceOptions = ['坑洞', '表面纹裂', '层状剥落'];
const CementOtherOptions = ['错台', '拱胀', '唧浆', '路框差', '沉陷'];

export default {
  data(){
    return {
      RoadOptions:[{value: '景云路',label: '景云路'},
                  {value: '宋家岗东路',label: '宋家岗东路'},
                  {value: '航城西路',label: '航城西路'},
                  ],
      RoadOption:'',
      PitchCrackOptions: [{name: '线裂', idx: 'c1'},
                                {name: '网裂', idx: 'c2'},
                                {name: '龟裂', idx: 'c3'},
                                ],
      PitchShapeOptions: [{name: '拥包', idx: 's1'},
                                {name: '车辙', idx: 's2'},
                                {name: '沉陷', idx: 's3'},
                                {name: '翻浆', idx: 's4'},
                                ],
      PitchLooseOptions: [{name: '剥落', idx: 'l1'},
                                {name: '坑槽', idx: 'l2'},
                                {name: '啃边', idx: 'l3'},
                                ],
      PitchOtherOptions: [{name: '路框差', idx: 'o1'},
                                {name: '唧浆', idx: 'o2'},
                                {name: '泛油', idx: 'o3'},
                                ],
      PitchTornOptions: [{
          title: '有裂缝',
          idx: 'crack',
          content: PitchCrackOptions,
        },{
          title: '有变形',
          idx: 'shape',
          content: PitchShapeOptions,
        },{
          title: '有松散',
          idx: 'loose',
          content: PitchLooseOptions,
        },{
          title: '其他情况',
          idx: 'others',
          content: PitchOtherOptions,
        },
      ],
      roadData: false,
      streets:[
        {
          rid: 'abc002',
          index: 1,
          torn: {
            crack:{
              c1: 1,
              c2: 1,
              c3: 1,
            },
            shape:{
              s1: 1,
              s2: 1,
              s3: 1,
              s4: 1,
            },
            loose:{
              l1: 1,
              l2: 1,
              l3: 1,
            },
            other:{
              o1: 1,
              o2: 1,
              o3: 1,
            }
          }
        },
        {
          rid: 'abc002',
          index: 1,
          torn: {
            crack:{
              c1: 1,
              c2: 1,
              c3: 1,
            },
            shape:{
              s1: 1,
              s2: 1,
              s3: 1,
              s4: 1,
            },
            loose:{
              l1: 1,
              l2: 1,
              l3: 1,
            },
            other:{
              o1: 1,
              o2: 1,
              o3: 1,
            }
          }
        },
        {
          rid: 'abc002',
          index: 1,
          torn: {
            crack:{
              c1: 1,
              c2: 1,
              c3: 1,
            },
            shape:{
              s1: 1,
              s2: 1,
              s3: 1,
              s4: 1,
            },
            loose:{
              l1: 1,
              l2: 1,
              l3: 1,
            },
            other:{
              o1: 1,
              o2: 1,
              o3: 1,
            }
          }
        },
        {
          rid: 'abc002',
          index: 1,
          torn: {
            crack:{
              c1: 1,
              c2: 1,
              c3: 1,
            },
            shape:{
              s1: 1,
              s2: 1,
              s3: 1,
              s4: 1,
            },
            loose:{
              l1: 1,
              l2: 1,
              l3: 1,
            },
            other:{
              o1: 1,
              o2: 1,
              o3: 1,
            }
          }
        },
      ],
      activeNames: '0',
      activeName: '1',
      status: [1, 0, 1],
      plugin:[{
        pName: 'MapType',
        defaultType: 0,
        showRoad: true,
        events: {
          init(instance) {
            console.log(instance);
          }
        }},
      {
        pName: 'Geolocation',
        events: {
          init(o) {
            // o 是高德地图定位插件实例
            o.getCurrentPosition((status, result) => {
              if (result && result.position) {
                self.lng = result.position.lng;
                self.lat = result.position.lat;
                self.center = [self.lng, self.lat];
                self.loaded = true;
                self.$nextTick();
              }
            });
        }
        }
      },
      {
        pName: 'ToolBar',
        position: 'RB',
        events: {
          init(instance) {
            console.log(instance);
          }
        }
      }
      ],
      form:{
        name: '',
        targetid: '',
      },
      PitchDialogVisible: false,
      CementDialogVisible: false,
      resizeEnable: true,
      rotateEnable:true,
      pitchEnable:true,
      pitch:80,
      rotation:-15,
      viewMode: '3D',
      expandZoomRange: true,
      zooms: [3, 20],
      zoom: 16,
      center: [114.22109, 30.729849],
      lng: 0.0,
      lat: 0.0,
      // 在地图上画多边形
      polygons: [
        {
          draggable: true,
          // path: [[114.21106824846075, 30.731150108132034], [114.21125932978109, 30.73072762352457], [114.2111748328596, 30.730689407260503], [114.21098375153926, 30.731111891867968]],
          path: [],
          rid: '156485',
          events: {
            click:(e) => {
              self.form.targetid = e.target.getExtData()
          }
        },
        }
      ],

      // 在地图上画直线(该功能已删除，改成画多边形)
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

      // 点击地图发生事件
      events: {
        click(e) {
          let { lng, lat } = e.lnglat;
          mypaths = self.polygons;
          mylength = mypaths.length
          console.log('length: ', mylength)
          self.polygons[mylength-1].path.push([lng, lat]);
          // console.log('polygons: ', mypaths[mylength-1])

          var url = 'static/hcx-coords.json';
          self.$axios.get(url).then(res =>{
            // console.log(res.data['sjg-test-0'])
            var testdata = res.data['sjg-test-0'];
            self.mypath=res.data['sjg-test-0'];
            // console.log(self.mypath)
          })
        },
        // 右键完成当前的区域规划
        rightclick(e){
          mypaths = self.polygons;
          mylength = mypaths.length;
          if(self.polygons[mylength-1].path.length){
            self.polygons[mylength-1].key = "key"; // 这里的key要根据之后统一的道路命名规则来进行修改
            self.newpath();
          }
          console.log(self.polygons)
        }
      },
      markers: [

      ],
      searchOption: {
      city: '武汉',
      citylimit: true
      },
    };
  },
    methods: {
      // 初始化沥青路面信息
      handleClick(tab, event) {
        console.log(tab, event);
      },
      updateRoadInfo(){
        console.log(this.roadData)
        this.$axios.post(config.IP + '/road/infoUpdate', this.roadData) //向后端更新道路信息
        .then((response) => {
          console.log(response)
          this.$message({
            message: '保存成功',
            type: 'success'
          });
        }).then((error) => {
            console.log(error);
        })
      },

      flushData(rid) {
        // console.log(rid)
        var that = this
        this.$axios.get(config.IP + '/road', {params: {rid: rid}})
        .then((response) => {
          // console.log(response)
          that.roadData = response.data.data
          // this.roadData.streets = this.streets
          console.log(that.roadData)

          
        }).then((error) => {
            console.log(error);
        })
      },

      UpdatePitchInfo(){
        console.log(this.status)
        var updateInfo = {
          // 以下为测试常量
          rid: "abc001", //路段编号
          part: {  //路段所属区域
            region: "临空新城路段",
            road: "临空东路",
            roadNum: 1  //n行道划分
          },
          attribute: {  //路段属性
            length: 10, //路段长度
            level: 3, //破损等级
            note: "无", //备注
            type: this.roadType //道路类型，1为沥青路面，0为水泥路面
          },
          points:[
            {
              longitude: 114.1111,
              latitude: 114.1111
            },
          ],
          streets:[]
        };

        var streetInfos = [];
        console.log(updateInfo)
        this.$axios.post(config.IP + '/road/infoUpdate',updateInfo) //向后端更新道路信息
        .then((response) => {
            this.$alert('更新路段信息成功', '成功✔', {
          confirmButtonText: '确定',})
        }).then((error) => {
            console.log(error);
        })
        this.PitchDialogVisible = false
      },

      // 改变道路上画直线的可编辑性
      changeEditable() {
        this.polyline.editable = !this.polyline.editable;
      },

      // 向后端传送经纬度等道路信息
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

      // 读取本地的道路经纬度信息的json文件，并在地图上显示道路划分
      showpath(){
        this.clearpath();
        // var url = 'static/hcx-coords.json';
        this.$axios.post(config.IP + '/road/roads', {params:{condition:{}}}).then(res =>{
          var dataTemp = res.data.data;
          for(var key in dataTemp){
            var paths = {};
            paths.path = dataTemp[key].points;  //向地图中添加标注点
            paths.rid = dataTemp[key].rid;
            paths.events = {
              click:(e) => {
                var rid = e.target.getExtData()
                this.flushData(rid)
              }
            };
            paths.key = key;
            this.polygons.push(paths);
          }
        }).then((error) => {
            // console.log(error);
        })
      },

      // 初始化一条路径
      newpath(){
        var temp = {};
        temp.path = [];

        temp.events = {
          click:(e) => {
            this.form.targetid = e.target.getExtData()
            this.flushStreetOption()
            if(this.roadType == 1){
              //初始化沥青路面破损情况数据，之后可以根据后端返回数据更改
              this.flushPitchData()
            }
            else{
              //初始化水泥路面破损情况数据，之后可以根据后端返回数据更改
              this.flushCementData()
            }
          }
        };
        this.polygons.push(temp);
      },

      // 保存当前地图上的路径信息，传给后端
      savepath(){
        var pathdata = self.polygons;
        self.$axios.post('/api//road/add',{
          pathdata }) //向后端发送经纬度，经纬度信息是起始端点信息
        .then((response) => {

        }).then((error) => {
            console.log(error);
        })
      },

      // 清除当前道路上的所有路径标注
      clearpath(){
        this.polygons = [];
      },
      addMarker: function() {
        let lng = 114.22109 + Math.round(Math.random() * 1000) / 10000;
        let lat = 30.729849 + Math.round(Math.random() * 500) / 10000;
        this.markers.push([lng, lat]);
      },
      onSearchResult(pois) {
        let latSum = 0;
        let lngSum = 0;
        if (pois.length > 0) {
          pois.forEach(poi => {
            let {lng, lat} = poi;
            lngSum += lng;
            latSum += lat;
            this.markers.push([poi.lng, poi.lat]);
          });
          let Mapcenter = {
            lng: lngSum / pois.length,
            lat: latSum / pois.length
          };
          this.center = [Mapcenter.lng, Mapcenter.lat];
        }
      },
      testpath(){
        this.clearpath();
        var url = 'static/sjg-coords.json';
        this.$axios.get(url).then(res =>{
          console.log(res.data)
          var dataTemp = res.data;
          for(var key in dataTemp){
            console.log(key)
            var paths = {};
            paths.path = dataTemp[key];  //向地图中添加标注点
            // paths.rid = dataTemp[key].rid;
            paths.events = {
              click:(e) => {
                var rid = e.target.getExtData()
                this.flushData(rid)
              }
            };
            paths.key = key;
            this.polygons.push(paths);
          }
        }).then((error) => {
            // console.log(error);
        })   
      },
      handleRoadOption(){
        if(this.RoadOption == "航城西路"){
          this.center = [114.22109, 30.729849];
        }
        else if(this.RoadOption == "景云路"){
          console.log("景云路")
        }
        else if(this.RoadOption == "宋家岗东路"){
          console.log("宋家岗东路")
        }
        else{
          console.log("RoadOption Error")
        }
      }
    }
}
</script>
