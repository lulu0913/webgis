<template>
  <div class="RoadForm">
    <div>

      <el-button style="margin-left: 10px;" type="success" @click="openCsvDialog()" icon="el-icon-plus">
      导入 GPS 路径信息
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
    </div>
  </div>
</template>

<script>
import {config} from '../../../config/config.js'
import csv2arr from '@/assets/csv-arr'
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
        var myDate = new Date();
        this.pushing = true
        csv2arr.csv(this.$refs.csvData.files[0]).then((res)=>{
          console.log('我的数据', res)
          var req = {}
          var gid = String(myDate.getFullYear()) + '-' + String(myDate.getMonth()+1) + '-' + String(myDate.getDate()) + '-' 
          + String(myDate.getHours()) + '-' + String(myDate.getMinutes()) + '-' + String(myDate.getSeconds())
          req["gid"] = gid
          req["points"] = []
          for(let i = 1; i < res.length; i++){
            var element = {}
            element["timestamp"] = res[i][0]; //时间戳
            element["longitude"] = res[i][1];
            element["latitude"] = res[i][2]
            if(element["rid"] != ""){
              req["points"].push(element);
            }
          }
          self.$axios.post( config.IP + '/gps/trajectoryAdd', req) //前端接口
          .then((response) => {
              if (response.data.code == 1){
                this.$alert('导入道路数据成功！', '成功✔️', {
                confirmButtonText: '确定',
                callback: action =>{
                  this.reload()
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
    }
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
