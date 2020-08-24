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
      <el-amap-polygon
        v-for="(polygon, index) in polygons"
        :path="polygon.path"
        :draggable="polygon.draggable"
        :events="polygon.events"
        :key="index"
        :extData="index"
        fillColor="#FFC0CB"
        fillOpacity="0.5"
        strokeColor="#FF0000">
       </el-amap-polygon>
    </el-amap>

    <!-- 在地图上进行编辑的工具栏   -->
    <div class="toolbar">
      <el-button type="primary" name="button" title="显示本地json文件保存的路径信息" v-on:click="showpath" plain round>显示已有标注</el-button>

      <!-- 保存标注即将现有的路径的经纬度点坐标和路况信息传给后端 -->
      <el-button type="success" name="button" title="保存当前地图上的路径信息" v-on:click="savepath" plain round>保存标注</el-button>
    </div>

    <el-dialog
      class="info"
      title="沥青道路状态"
      :visible.sync="PitchDialogVisible"
      width="30%"
      height=auto
      center>
      <div>
      路面车道选择：<el-radio-group v-model="StreetRatio" @change="CheckPitchStreetOption()" size="medium">
      <el-radio-button v-for="Options in StreetOptions" :label="Options" :key="Options">{{Options}}</el-radio-button>
      </el-radio-group>
      </div>
      <div v-if="seen_PitchTorn">
      <br>
      路面损害情况：<el-checkbox-group v-model="PitchTorncheckboxGroup" @change="CheckPitchOption()" size="medium">
      <el-checkbox-button v-for="Options in PitchTornOptions" :label="Options" :key="Options">{{Options}}</el-checkbox-button>
      </el-checkbox-group>
      </div>
      <div v-if="seen_PitchCrack">
      <br>
      路面裂缝情况：<el-checkbox-group v-model="PitchCrackcheckboxGroup" @change="CheckPitchCrack($event)" size="medium">
      <el-checkbox-button v-for="Options in PitchCrackOptions" :label="Options" :key="Options">{{Options}}</el-checkbox-button>
      </el-checkbox-group>
      </div>
      <div v-if="seen_PitchShape">
      <br>
      路面变形情况：<el-checkbox-group v-model="PitchShapecheckboxGroup" @change="CheckPitchShape($event)" size="medium">
      <el-checkbox-button v-for="Options in PitchShapeOptions" :label="Options" :key="Options">{{Options}}</el-checkbox-button>
      </el-checkbox-group>
      </div>
      <div v-if="seen_PitchLoose">
      <br>
      路面松散情况：<el-checkbox-group v-model="PitchLoosecheckboxGroup" @change="CheckPitchLoose($event)" size="medium">
      <el-checkbox-button v-for="Options in PitchLooseOptions" :label="Options" :key="Options">{{Options}}</el-checkbox-button>
      </el-checkbox-group>
      </div>
      <div v-if="seen_PitchOther">
      <br>
      路面其他情况：<el-checkbox-group v-model="PitchOthercheckboxGroup" @change="CheckPitchOther($event)" size="medium">
      <el-checkbox-button v-for="Options in PitchOtherOptions" :label="Options" :key="Options">{{Options}}</el-checkbox-button>
      </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="PitchDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="UpdatePitchInfo()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      class="info"
      title="水泥道路状态"
      :visible.sync="CementDialogVisible"
      width="30%"
      height=auto
      center>
      <div>
      路面车道选择：<el-radio-group v-model="StreetRatio" @change="CheckCementStreetOption()" size="medium">
      <el-radio-button v-for="Options in StreetOptions" :label="Options" :key="Options">{{Options}}</el-radio-button>
      </el-radio-group>
      </div>
      <div v-if="seen_CementTorn">
      <br>
      路面损害情况：<el-checkbox-group v-model="CementTorncheckboxGroup" @change="CheckCementOption()" size="medium">
      <el-checkbox-button v-for="Options in CementTornOptions" :label="Options" :key="Options">{{Options}}</el-checkbox-button>
      </el-checkbox-group>
      </div>
      <div v-if="seen_CementCrack">
      <br>
      路面裂缝情况：<el-checkbox-group v-model="CementCrackcheckboxGroup" @change="CheckCementCrack($event)" size="medium">
      <el-checkbox-button v-for="Options in CementCrackOptions" :label="Options" :key="Options">{{Options}}</el-checkbox-button>
      </el-checkbox-group>
      </div>
      <div v-if="seen_CementJoint">
      <br>
      路面变形情况：<el-checkbox-group v-model="CementJointcheckboxGroup" @change="CheckCementJoint($event)" size="medium">
      <el-checkbox-button v-for="Options in CementJointOptions" :label="Options" :key="Options">{{Options}}</el-checkbox-button>
      </el-checkbox-group>
      </div>
      <div v-if="seen_CementSurface">
      <br>
      路面松散情况：<el-checkbox-group v-model="CementSurfacecheckboxGroup" @change="CheckCementSurface($event)" size="medium">
      <el-checkbox-button v-for="Options in CementSurfaceOptions" :label="Options" :key="Options">{{Options}}</el-checkbox-button>
      </el-checkbox-group>
      </div>
      <div v-if="seen_CementOther">
      <br>
      路面其他情况：<el-checkbox-group v-model="CementOthercheckboxGroup" @change="CheckCementOther($event)" size="medium">
      <el-checkbox-button v-for="Options in CementOtherOptions" :label="Options" :key="Options">{{Options}}</el-checkbox-button>
      </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="CementDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="UpdateCementInfo()">确 定</el-button>
      </span>
    </el-dialog>
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
  .info{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
  }
  .toolbar{
    position: absolute;
    z-index: 2;
    top: 25px;
    left: 20px;
  }
</style>

<script>
  // 添加删除数组中指定值的方法
  function removeByValue(arr, val) {
    for(var i=0; i<arr.length; i++) {
      if(arr[i] == val) {
        arr.splice(i, 1);
        break;
      }
    }
  }
  // 车道数
  const StreetOptions = ['一车道', '二车道', '三车道', '四车道', '五车道', '六车道', '七车道', '八车道',]
  // 沥青路面情况
  const PitchTornOptions = ['有裂缝', '有变形', '有松散', '其他情况', '无异常'];
  const PitchCrackOptions = ['线裂', '网裂', '龟裂'];
  const PitchShapeOptions = ['拥包', '车辙', '沉陷', '翻浆'];
  const PitchLooseOptions = ['剥落', '坑槽', '啃边'];
  const PitchOtherOptions = ['路框差', '唧浆', '泛油'];
  // 水泥路面情况
  const CementTornOptions = ['有裂缝', '有接缝破坏', '有表面破坏', '其他情况', '无异常'];
  const CementCrackOptions = ['线裂', '板角断裂', 'D边角裂缝', '交叉裂缝和破碎板'];
  const CementJointOptions = ['接缝料损坏', '边角剥落'];
  const CementSurfaceOptions = ['坑洞', '表面纹裂', '层状剥落'];
  const CementOtherOptions = ['错台', '拱胀', '唧浆', '路框差', '沉陷'];
  module.exports = {
    data: function() {
      let self = this;
      return {
        plugin:[{
          pName: 'MapType',
          defaultType: 1,
          showRoad: true,
          events: {
            init(instance) {
              console.log(instance);
            }
          }
        }],
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
        NowStreet: 1,
        PitchRoadInfo: [],
        CementRoadInfo: [],
        // 在地图上画多边形
        polygons: [
          {
            draggable: true,
            // path: [[114.21106824846075, 30.731150108132034], [114.21125932978109, 30.73072762352457], [114.2111748328596, 30.730689407260503], [114.21098375153926, 30.731111891867968]],
            path: [],
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
        // 返回车道数组
        StreetRatio: '',
        StreetOptions: StreetOptions,
        // 沥青道路状态选择
        seen_PitchTorn: false,
        PitchTorncheckboxGroup: ['无异常'],
        PitchTorncheckboxGroupTemp: ['无异常'],
        PitchTornOptions: PitchTornOptions,
        seen_PitchCrack: false,
        PitchCrackcheckboxGroup:[],
        PitchCrackOptions: PitchCrackOptions,
        seen_PitchShape: false,
        PitchShapecheckboxGroup:[],
        PitchShapeOptions: PitchShapeOptions,
        seen_PitchLoose: false,
        PitchLoosecheckboxGroup:[],
        PitchLooseOptions: PitchLooseOptions,
        seen_PitchOther: false,
        PitchOthercheckboxGroup:[],
        PitchOtherOptions: PitchOtherOptions,
        // 水泥道路状态选择
        seen_CementTorn: false,
        CementTorncheckboxGroup: ['无异常'],
        CementTorncheckboxGroupTemp: ['无异常'],
        CementTornOptions: CementTornOptions,
        seen_CementCrack: false,
        CementCrackcheckboxGroup:[],
        CementCrackOptions: CementCrackOptions,
        seen_CementJoint: false,
        CementJointcheckboxGroup:[],
        CementJointOptions: CementJointOptions,
        seen_CementSurface: false,
        CementSurfacecheckboxGroup:[],
        CementSurfaceOptions: CementSurfaceOptions,
        seen_CementOther: false,
        CementOthercheckboxGroup:[],
        CementOtherOptions: CementOtherOptions,
        // 临时变量定义
        roadType: 1,
        streetcount: 4,
      };
    },
    methods: {
      // 初始化沥青路面信息
      flushPitchData() {
        this.PitchRoadInfo = [];
        this.StreetOptions = [];
        var StreetInfo = {};
        for(var i=0; i<this.streetcount; i++) {
          StreetInfo = {}
          this.StreetOptions.push(StreetOptions[i])
          StreetInfo.PitchTorncheckboxGroup = ['无异常'];
          StreetInfo.PitchTorncheckboxGroupTemp = ['无异常'];
          StreetInfo.PitchCrackcheckboxGroup = new Array();
          StreetInfo.PitchShapecheckboxGroup = new Array();
          StreetInfo.PitchLoosecheckboxGroup = new Array();
          StreetInfo.PitchOthercheckboxGroup = new Array();
          this.PitchRoadInfo.push(StreetInfo)
        }
        this.seen_PitchTorn = false;
        this.seen_PitchCrack = false;
        this.seen_PitchShape = false;
        this.seen_PitchLoose = false;
        this.seen_PitchOther = false;
        this.PitchDialogVisible = true;
        this.CementDialogVisible = false;
      },
      // 初始化水泥路面信息
      flushCementData() {
        this.CementRoadInfo = [];
        this.StreetOptions = [];
        var StreetInfo = {};
        for(var i=0; i<this.streetcount; i++) {
          StreetInfo = {}
          this.StreetOptions.push(StreetOptions[i])
          StreetInfo.CementTorncheckboxGroup = ['无异常'];
          StreetInfo.CementTorncheckboxGroupTemp = ['无异常'];
          StreetInfo.CementCrackcheckboxGroup = new Array();
          StreetInfo.CementJointcheckboxGroup = new Array();
          StreetInfo.CementSurfacecheckboxGroup = new Array();
          StreetInfo.CementOthercheckboxGroup = new Array();
          this.CementRoadInfo.push(StreetInfo)
        }
        this.seen_CementTorn = false;
        this.seen_CementCrack = false;
        this.seen_CementJoint = false;
        this.seen_CementSurface = false;
        this.seen_CementOther = false;
        this.PitchDialogVisible = false;
        this.CementDialogVisible = true;
      },

      //实现沥青车道切换功能
      CheckPitchStreetOption() {
        this.PitchTorncheckboxGroup = ['无异常'];
        this.PitchTorncheckboxGroupTemp = ['无异常'];
        this.PitchOthercheckboxGroup = [];
        this.PitchShapecheckboxGroup = [];
        this.PitchCrackcheckboxGroup = [];
        this.PitchLoosecheckboxGroup = [];
        this.seen_PitchTorn = true
        this.NowStreet = this.StreetOptions.indexOf(this.StreetRatio)
        this.seen_PitchCrack = false;
        this.seen_PitchShape = false;
        this.seen_PitchLoose = false;
        this.seen_PitchOther = false;
      },

      //实现水泥车道切换功能
      CheckCementStreetOption() {
        this.CementTorncheckboxGroup = ['无异常'];
        this.CementTorncheckboxGroupTemp = ['无异常'];
        this.CementCrackcheckboxGroup = [];
        this.CementJointcheckboxGroup = [];
        this.CementSurfacecheckboxGroup = [];
        this.CementOthercheckboxGroup = [];
        this.seen_CementTorn = true
        this.NowStreet = this.StreetOptions.indexOf(this.StreetRatio)
        this.seen_CementCrack = false;
        this.seen_CementJoint = false;
        this.seen_CementSurface = false;
        this.seen_CementOther = false;
      },

      CheckCementOption() {
        //const CementTornOptions = ['有裂缝', '有接缝破坏', '有表面破坏', '其他情况', '无异常'];
        if(this.CementTorncheckboxGroupTemp.includes('无异常')&&(this.CementTorncheckboxGroup.includes('有裂缝')||this.CementTorncheckboxGroup.includes('有接缝破坏')
        ||this.CementTorncheckboxGroup.includes('有表面破坏')||this.CementTorncheckboxGroup.includes('其他情况'))){
          removeByValue(this.CementTorncheckboxGroup, '无异常')
        }
        if(this.CementTorncheckboxGroup.includes('无异常')&&(this.CementTorncheckboxGroupTemp.includes('有裂缝')||this.CementTorncheckboxGroupTemp.includes('有接缝破坏')
        ||this.CementTorncheckboxGroupTemp.includes('有表面破坏')||this.CementTorncheckboxGroupTemp.includes('其他情况'))){
          this.CementTorncheckboxGroup = ['无异常']
        }
        this.CementTorncheckboxGroupTemp = this.CementTorncheckboxGroup;
        if(this.CementTorncheckboxGroup.includes('有裂缝')){
          this.seen_CementCrack = true;
        }
        else{
          this.seen_CementCrack = false;
        }
        if(this.CementTorncheckboxGroup.includes('有接缝破坏')){
          this.seen_CementJoint = true;
        }
        else{
          this.seen_CementJoint = false;
        }
        if(this.CementTorncheckboxGroup.includes('有表面破坏')){
          this.seen_CementSurface = true;
        }
        else{
          this.seen_CementSurface = false;
        }
        if(this.CementTorncheckboxGroup.includes('其他情况')){
          this.seen_CementOther = true;
        }
        else{
          this.seen_CementOther = false;
        }
      },

      CheckPitchOption() {
        //const PitchTornOptions = ['有裂缝', '有变形', '有松散', '其他情况', '无异常'];
        if(this.PitchTorncheckboxGroupTemp.includes('无异常')&&(this.PitchTorncheckboxGroup.includes('有裂缝')||this.PitchTorncheckboxGroup.includes('有变形')
        ||this.PitchTorncheckboxGroup.includes('有松散')||this.PitchTorncheckboxGroup.includes('其他情况'))){
          removeByValue(this.PitchTorncheckboxGroup, '无异常')
        }
        if(this.PitchTorncheckboxGroup.includes('无异常')&&(this.PitchTorncheckboxGroup.includes('有裂缝')||this.PitchTorncheckboxGroup.includes('有变形')
        ||this.PitchTorncheckboxGroup.includes('有松散')||this.PitchTorncheckboxGroup.includes('其他情况'))){
          this.PitchTorncheckboxGroup = ['无异常']
        }
        this.PitchTorncheckboxGroupTemp = this.PitchTorncheckboxGroup;
        if(this.PitchTorncheckboxGroup.includes('有裂缝')){
          this.seen_PitchCrack = true;
        }
        else{
          this.seen_PitchCrack = false;
        }
        if(this.PitchTorncheckboxGroup.includes('有变形')){
          this.seen_PitchShape = true;
        }
        else{
          this.seen_PitchShape = false;
        }
        if(this.PitchTorncheckboxGroup.includes('有松散')){
          this.seen_PitchLoose = true;
        }
        else{
          this.seen_PitchLoose = false;
        }
        if(this.PitchTorncheckboxGroup.includes('其他情况')){
          this.seen_PitchOther = true;
        }
        else{
          this.seen_PitchOther = false;
        }
      },

      UpdatePitchInfo(){
        var updateInfo = {
          // 以下为测试常量
          rid: "xxx001", //路段编号
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

        var streetInfo = {};

        for(var i=0; i<this.streetcount; i++) {
          streetInfo = {};
          streetInfo.rid = "xxx001"; //所属路段编号
          streetInfo.index = i; //该路段路面编号
          streetInfo.torn = {};
          streetInfo.torn.crack = {};
          streetInfo.torn.crack.c1 = Number(this.PitchRoadInfo[i].PitchCrackcheckboxGroup.includes('线裂')); //线裂
          streetInfo.torn.crack.c2 = Number(this.PitchRoadInfo[i].PitchCrackcheckboxGroup.includes('网裂')); //网裂
          streetInfo.torn.crack.c3 = Number(this.PitchRoadInfo[i].PitchCrackcheckboxGroup.includes('龟裂')); //龟裂
          streetInfo.torn.shape = {};
          streetInfo.torn.shape.s1 = Number(this.PitchRoadInfo[i].PitchShapecheckboxGroup.includes('拥包')); //拥包
          streetInfo.torn.shape.s2 = Number(this.PitchRoadInfo[i].PitchShapecheckboxGroup.includes('车辙')); //车辙
          streetInfo.torn.shape.s3 = Number(this.PitchRoadInfo[i].PitchShapecheckboxGroup.includes('沉陷')); //沉陷
          streetInfo.torn.shape.s4 = Number(this.PitchRoadInfo[i].PitchShapecheckboxGroup.includes('翻浆')); //翻浆
          streetInfo.torn.loose = {};
          streetInfo.torn.loose.l1 = Number(this.PitchRoadInfo[i].PitchLoosecheckboxGroup.includes('剥落')); //剥落
          streetInfo.torn.loose.l2 = Number(this.PitchRoadInfo[i].PitchLoosecheckboxGroup.includes('坑槽')); //坑槽
          streetInfo.torn.loose.l3 = Number(this.PitchRoadInfo[i].PitchLoosecheckboxGroup.includes('啃边')); //啃边
          streetInfo.torn.others = {};
          streetInfo.torn.others.o1 = Number(this.PitchRoadInfo[i].PitchOthercheckboxGroup.includes('路框差')); //路框差
          streetInfo.torn.others.o2 = Number(this.PitchRoadInfo[i].PitchOthercheckboxGroup.includes('唧浆')); //唧浆
          streetInfo.torn.others.o3 = Number(this.PitchRoadInfo[i].PitchOthercheckboxGroup.includes('泛油')); //泛油
          updateInfo.streets.push(streetInfo);
        }


        this.$axios.post('http://47.107.45.161:8088/road/infoUpdate',updateInfo) //向后端更新道路信息
        .then((response) => {
            this.$alert('更新路段信息成功', '成功✔', {
          confirmButtonText: '确定',})
        }).then((error) => {
            console.log(error);
        })
        this.PitchDialogVisible = false
      },

      UpdateCementInfo(){
        var updateInfo = {
          // 以下为测试常量
          rid: "xxx001", //路段编号
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

        var streetInfo = {};

        for(var i=0; i<this.streetcount; i++) {
          streetInfo = {};
          streetInfo.rid = "xxx001"; //所属路段编号
          streetInfo.index = i; //该路段路面编号
          streetInfo.torn = {};
          streetInfo.torn.crack = {};
          streetInfo.torn.crack.c1 = Number(this.CementRoadInfo[i].CementCrackcheckboxGroup.includes('线裂')); //线裂
          streetInfo.torn.crack.c2 = Number(this.CementRoadInfo[i].CementCrackcheckboxGroup.includes('板角断裂')); //板角断裂
          streetInfo.torn.crack.c3 = Number(this.CementRoadInfo[i].CementCrackcheckboxGroup.includes('D边角裂缝')); //D边角裂缝
          streetInfo.torn.crack.c4 = Number(this.CementRoadInfo[i].CementCrackcheckboxGroup.includes('交叉裂缝和破碎板')); //交叉裂缝和破碎板
          streetInfo.torn.joint = {};
          streetInfo.torn.joint.j1 = Number(this.CementRoadInfo[i].CementJointcheckboxGroup.includes('接缝料损坏')); //接缝料损坏
          streetInfo.torn.joint.j2 = Number(this.CementRoadInfo[i].CementJointcheckboxGroup.includes('边角剥落')); //边角剥落
          streetInfo.torn.surface = {};
          streetInfo.torn.surface.s1 = Number(this.CementRoadInfo[i].CementSurfacecheckboxGroup.includes('坑洞')); //坑洞
          streetInfo.torn.surface.s2 = Number(this.CementRoadInfo[i].CementSurfacecheckboxGroup.includes('表面纹裂')); //表面纹裂
          streetInfo.torn.surface.s3 = Number(this.CementRoadInfo[i].CementSurfacecheckboxGroup.includes('层状剥落')); //层状剥落
          streetInfo.torn.others = {};
          streetInfo.torn.others.o1 = Number(this.CementRoadInfo[i].CementOthercheckboxGroup.includes('错台')); //错台
          streetInfo.torn.others.o2 = Number(this.CementRoadInfo[i].CementOthercheckboxGroup.includes('拱胀')); //拱胀
          streetInfo.torn.others.o3 = Number(this.CementRoadInfo[i].CementOthercheckboxGroup.includes('唧浆')); //唧浆
          streetInfo.torn.others.o4 = Number(this.CementRoadInfo[i].CementOthercheckboxGroup.includes('路框差')); //路框差
          streetInfo.torn.others.o5 = Number(this.CementRoadInfo[i].CementOthercheckboxGroup.includes('沉陷')); //沉陷
          updateInfo.streets.push(streetInfo);
        }

        this.$axios.post('http://47.107.45.161:8088/road/infoUpdate',updateInfo) //向后端更新道路信息
        .then((response) => {
            this.$alert('更新路段信息成功', '成功✔', {
          confirmButtonText: '确定',})
        }).then((error) => {
            console.log(error);
        })
        this.CementDialogVisible = false
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
        var url = 'static/hcx-coords.json';
        this.$axios.get(url).then(res =>{

          var mydata = res.data;
          // console.log(mydata)
          for(key in mydata){
            var paths = {};
            paths.path = mydata[key];  //向地图中添加标注点
            paths.events = {
              click:(e) => {
                this.form.targetid = e.target.getExtData()
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
            paths.key = key;
            this.polygons.push(paths);
          }
          // console.log(this.polygons)
          this.newpath();
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
      
      CheckPitchCrack(data) {
        console.log(this.PitchRoadInfo)
        this.PitchRoadInfo[this.NowStreet].PitchCrackcheckboxGroup = data
      },

      CheckPitchShape(data) {
        this.PitchRoadInfo[this.NowStreet].PitchShapecheckboxGroup = data
      },

      CheckPitchLoose(data) {
        this.PitchRoadInfo[this.NowStreet].PitchLoosecheckboxGroup = data
      },

      CheckPitchOther(data) {
        this.PitchRoadInfo[this.NowStreet].PitchOthercheckboxGroup = data
      },

      CheckCementCrack(data) {
        this.CementRoadInfo[this.NowStreet].CementCrackcheckboxGroup = data
      },

      CheckCementJoint(data) {
        this.CementRoadInfo[this.NowStreet].CementJointcheckboxGroup = data
      },

      CheckCementSurface(data) {
        this.CementRoadInfo[this.NowStreet].CementSurfacecheckboxGroup = data
      },

      CheckCementOther(data) {
        this.CementRoadInfo[this.NowStreet].CementOthercheckboxGroup = data
      },
    }
  };
</script>
