<template>
  <div class="RoadForm">
    <div>

      <el-button style="margin-left: 10px;" type="success" @click="openCsvDialog()" icon="el-icon-plus">
      导入路段信息
      </el-button>
      <el-dialog
      :title="csvTitle"
      :visible.sync="csvVisible"
      :append-to-body="true"
      width="40%">
      <div>
          <el-form ref="file" label-width="120px">
            <center><input type="file" id="fileupload" name="csvfile" ref="csvData" /></center>
          </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="csvVisible = false">取消</el-button>
      <el-button type="primary" :loading="pushing" @click="csv">导入</el-button>
      </span>
      </el-dialog>

      <el-button style="margin-left: 10px;" type="primary" @click="openJsonDialog()" icon="el-icon-tickets">
      导出路段信息
      </el-button>
      <el-dialog
      :title="jsonTitle"
      :visible.sync="jsonVisible"
      :append-to-body="true"
      width="30%">
      <div>
          确认导出当前路段信息？
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="jsonVisible = false">取消</el-button>
      <el-button type="primary" @click="json">导出</el-button>
      </span>
      </el-dialog>
    </div>
    <br>
    <el-table
      :data="tableData"
      stripe
      height="840"
      width="auto">
      <el-table-column
        prop="rid"
        label="路段编号"
        width="120">
      </el-table-column>
      <el-table-column label="路段所属区域">
        <el-table-column
          prop="part.region"
          label="路段区域"
          width="130"
          sortable>
        </el-table-column>
        <el-table-column
          prop="part.road"
          label="道路名称"
          width="120"
          sortable>
        </el-table-column>
        <el-table-column
          prop="part.roadNum"
          label="车道数量"
          width="105"
          sortable>
        </el-table-column>
      </el-table-column>
      <el-table-column label="路段属性">
        <el-table-column
          prop="attribute.length"
          label="路段长度"
          width="105"
          sortable>
        </el-table-column>
        <el-table-column
          prop="attribute.level"
          label="破损等级"
          width="105"
          sortable>
        </el-table-column>
        <el-table-column
          prop="attribute.note"
          label="备注"
          width="200">
        </el-table-column>
        <el-table-column
          prop="attribute.type"
          label="道路类型"
          width="105"
          sortable>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {config} from '../../../config/config.js'
import csv2arr from '@/assets/csv-arr'
import FileSaver from 'file-saver'
const Json2csvParser = require('json2csv').Parser
const datetime = Date.now()
export default {
  inject: ['reload'],
  data() {
      return {
        tableData: [],
        reigonFilter: [],
        roadFilter: [],
        roadNumFilter: [],
        lengthFilter: [],
        levelFilter: [],
        typeFilter: [],
        csvTitle: '导入CSV文件',
        jsonTitle: '导出CSV文件',
        csvVisible: false,
        jsonVisible: false,
        pushing: false
      };
    },
  methods: {
    openCsvDialog() {
      this.csvVisible = true;
      this.csvTitle = '导入CSV文件';
    },
    openJsonDialog() {
      this.jsonVisible = true;
      this.jsonTitle = '导出CSV文件';
    },
    csv() {
      const self = this;
      if(this.$refs.csvData.files.length!=1){
        this.$alert("一次只能导入一个csv文件，您当前已导入" + this.$refs.csvData.files.length + "个文件", '注意⚠️', {
          confirmButtonText: '确定',})
      }
      else if(this.$refs.csvData.files[0].name.split('.').pop()!="csv"){
        this.$alert("您选择的不是csv文件，请重新选择！", '注意⚠️', {
          confirmButtonText: '确定',})
      }
      else{
        this.pushing = true
        csv2arr.csv(this.$refs.csvData.files[0]).then((res)=>{
          console.log('我的数据', res)
          var road = [];
          var element = {};
          var points = [];
          var points_raw = [];
          var point = {};
          for(let i = 1; i < res.length; i++){
            element = {}
            element["rid"] = res[i][0]; //道路编号
            element["part"] = {};
            element["part"]["region"] = res[i][1]; //路段所属区域
            element["part"]["road"] = res[i][2]; //道路名称
            element["part"]["roadNum"] = Number(res[i][3]); //车道数量
            element["attribute"] = {};
            element["attribute"]["length"] = Number(res[i][4]); //路段长度
            element["attribute"]["level"] = Number(res[i][5]); //破损等级
            element["attribute"]["note"] = res[i][6];
            if(res[i][7] == "沥青路面"){
              element["attribute"]["type"] = 1;
            }
            else if(res[i][7] == "水泥路面"){
              element["attribute"]["type"] = 0;
            }
            else {
              element["attribute"]["type"] = Number(res[i][7]); //道路类型，1为沥青路面，0为水泥路面
            }
            points = [];
            points_raw = String(res[i][8]).split("|");
            for(let j = 0; j < points_raw.length; j++){
              point = {}
              point["longitude"] = points_raw[j].split(";")[0]; //经度
              point["latitude"] = points_raw[j].split(";")[1]; //纬度
              points.push(point);
            }
            element["points"] = points;
            if(element["rid"] != ""){
              road.push(element);
            }
          }
          console.log(road)
          self.$axios.post( config.IP + '/road/addRoads',{"roads": road}) //前端接口
          .then((response) => {
              if (response.data.code == 1){
                self.$alert('导入道路数据成功！', '成功✔️', {
                confirmButtonText: '确定',
                callback: action =>{
                  self.reload()
                }})
              }
          }).then((error) => {
              console.log(error);
          })
          this.pushing = false
        })
        var test = document.getElementById('fileupload');
        test.value = ''
        this.csvVisible = false;
      }
    },
    // 临时轮子，导入json数据到后端
    tempjson() {
      const self = this;
      var url = "../../../../static/sjg-coords.json"
      var request = new XMLHttpRequest()
      request.open("get",url)
      request.send(null);
      request.onload= function(){
        if(request.status == 200){
          var json = JSON.parse(request.responseText);
          var road = [];
          var element = {};
          var points = [];
          var points_raw = [];
          var point = {};
          var Objectlength = Object.getOwnPropertyNames(json).length;
          for(let i = 0; i < Objectlength; i++){
            element = {}
            element["rid"] = "sjg-test-" + String(i); //道路编号
            element["part"] = {};
            element["part"]["region"] = "临空新城路段"; //路段所属区域
            element["part"]["road"] = "宋家岗东路"; //道路名称
            element["part"]["roadNum"] = 4; //车道数量
            element["attribute"] = {};
            element["attribute"]["length"] = 10; //路段长度
            element["attribute"]["level"] = 0; //破损等级
            element["attribute"]["note"] = "无";
            element["attribute"]["type"] = 1; //道路类型，1为沥青路面，0为水泥路面
            points = [];
            points_raw = json[element["rid"]];
            for(let j = 0; j < points_raw.length; j++){
              point = {}
              point["longitude"] = Number(points_raw[j][0]); //经度
              point["latitude"] = Number(points_raw[j][1]); //纬度
              points.push(point);
            }
            element["points"] = points;
            if(element["rid"] != ""){
              road.push(element);
            }
          }
          console.log(road)
          self.$axios.post( config.IP + '/road/addRoads',{"roads": road}) //前端接口
          .then((response) => {
              console.log(response.data)
              if (response.data.code == 1){
                self.$alert('导入道路数据成功！', '成功✔️', {
                confirmButtonText: '确定',
                callback: action =>{
                  self.reload()
                }})
              }
          }).then((error) => {
              console.log(error);
          })
        }
      }
    },
    json(){
      const Json2csvParser = require('json2csv').Parser
      //获取格式化时间字符串函数
      function getNowTime(){      
          var now= new Date();
          var year=now.getFullYear();
          var month=now.getMonth()+1;
          var day=now.getDate();
          var hour=now.getHours();
          var minute=now.getMinutes();
          var second=now.getSeconds();
          return "路段信息导出 " + year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
      };
      //导出CSV函数
      const exportCSV = (data, filename=`${datetime}.csv`) => {
        const parser = new Json2csvParser();
        const csvData = parser.parse(data);
        const blob = new Blob(['\uFEFF' + csvData], {type: 'text/plain;charset=utf-8;'});
        FileSaver.saveAs(blob, filename);
        this.$alert('导出道路数据成功！', '成功✔️', {
                confirmButtonText: '确定',
                callback: action =>{
                  this.jsonVisible = false;
                }})
      }
      var datetime = getNowTime();
      var road = [];
      var element = {};
      var pointstring = "";
      for(let i = 0; i < this.tableData.length; i++){
        element = {}
        element["道路编号"] = this.tableData[i].rid; //道路编号
        element["路段所属区域"] = this.tableData[i].part.region; //路段所属区域
        element["道路名称"] = this.tableData[i].part.road; //道路名称
        element["车道数量"] = this.tableData[i].part.roadNum; //车道数量
        element["路段长度"] = this.tableData[i].attribute.length; //路段长度
        element["破损等级"] = this.tableData[i].attribute.level; //破损等级
        element["备注"] = this.tableData[i].attribute.note;
        element["道路类型(1为沥青路面，0为水泥路面)"] = this.tableData[i].attribute.type; //道路类型，1为沥青路面，0为水泥路面
        pointstring = "";
        for(let j = 0; j < this.tableData[i].points.length; j++){
          pointstring = pointstring + this.tableData[i].points[j].longitude + ';';
          pointstring = pointstring + this.tableData[i].points[j].latitude + '|';
        }
        element["道路坐标"] = pointstring.substring(0, pointstring.length - 1);
        road.push(element);
      }
      exportCSV(road)
    }
  },
  mounted(){
    var self = this
    self.$axios.post( config.IP + '/road/roads',{"condition":0})
    .then((response) => {
      for(var i = 0; i < response.data.data.length; i++){
      if(response.data.data[i].attribute.type == 1){
        response.data.data[i].attribute.type = '沥青路面'
      }
      else if(response.data.data[i].attribute.type == 0){
        response.data.data[i].attribute.type = '水泥路面'
      }
    }
      this.tableData = response.data.data
    }).then((error) => {
      console.log(error);
    })

  }
}
</script>

<style>
.RoadForm{
  z-index: 0;
  width: 62rem;
  padding-top: 2rem;
  padding-left: 2rem;
  position: absolute;
  top: 5%;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.my-desc-text-container{
  padding-left:1rem;
  padding-right:1rem;
  border:0;
  margin:0;
  font-size:0.9rem;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.my-headimg-row{
  height: 10rem;
  width: 10rem;
}
</style>
