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
      width="50%">
      <div>
          <el-form ref="file" label-width="120px">
            <center><input type="file" id="fileupload" name="csvfile" ref="csvData" /></center>
          </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="csvVisible = false">取消</el-button>
      <el-button type="primary" @click="csv">导入</el-button>
      </span>
      </el-dialog>

      <el-button style="margin-left: 10px;" type="primary" @click="openJsonDialog()" icon="el-icon-tickets">
      导出路段信息
      </el-button>
      <el-dialog
      :title="jsonTitle"
      :visible.sync="jsonVisible"
      :append-to-body="true"
      width="50%">
      <div>
          确认导出当前路段信息？
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="jsonVisible = false">取消</el-button>
      <el-button type="primary" @click="json">导出</el-button>
      </span>
      </el-dialog>
    </div>
    <el-table
      :data="tableData"
      stripe
      height="850"
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
        jsonVisible: false
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
      if(this.$refs.csvData.files.length!=1){
        this.$alert("一次只能导入一个csv文件，您当前已导入" + this.$refs.csvData.files.length + "个文件", '注意⚠️', {
          confirmButtonText: '确定',})
      }
      else if(this.$refs.csvData.files[0].name.split('.').pop()!="csv"){
        this.$alert("您选择的不是csv文件，请重新选择！", '注意⚠️', {
          confirmButtonText: '确定',})
      }
      else{
        csv2arr.csv(this.$refs.csvData.files[0]).then((res)=>{
          console.log('我的数据', res)
        })
        var test = document.getElementById('fileupload');
        test.value = ''
        this.csvVisible = false;
      }
    },
    json() {

    }
  },
  mounted(){
    var self = this
    self.$axios.post( config.IP + '/road/roads','{}')
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
