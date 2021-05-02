<template>
  <div class="RoadLog">
    <div v-if="GPSSingleVisible">
      <el-button icon="el-icon-back" style="float:left" @click="handleBack">返回 GPS 路径列表</el-button>
    </div>
    <div v-if="GPSSingleVisible">
        {{this.GPSSingleId}} 的所有路径点信息
    </div>
  <div v-if="GPSListVisible">
    <center>
      已导入的 GPS 路径信息
    </center>
  </div>
    <el-table
      :data="GPSList"
      stripe
      height="850"
      :header-cell-style="{'text-align':'center'}"
      width="auto"
      v-if="GPSListVisible"
      @row-dblclick="handleClick">
      <el-table-column
        prop="gid"
        label="导入时间"
        align="center"
        sortable>
      </el-table-column>
    </el-table>
    
    <el-table
      :data="GPSSingle"
      stripe
      height="850"
      :header-cell-style="{'text-align':'center'}"
      width="auto"
      v-if="GPSSingleVisible">
      <el-table-column
        prop="timestamp"
        label="记录时间戳"
        align="center"
        sortable>
      </el-table-column>
      <el-table-column
        prop="longitude"
        label="记录经度"
        align="center"
        sortable>
      </el-table-column>
      <el-table-column
        prop="latitude"
        label="记录纬度"
        align="center"
        sortable>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {config} from '../../../config/config.js'
export default {
  data() {
      return {
        tableData: [],
        GPSList: [],
        GPSSingle: [],
        GPSListVisible: true,
        GPSSingleVisible: false,
        GPSSingleId: ''
      };
    },
  methods: {
    handleBack() {
      var self = this
      self.GPSListVisible= true
      self.GPSSingleVisible= false;
    },
    handleClick(row) {
      var self = this
      self.GPSSingleId = row.gid
      self.GPSListVisible = false
      self.GPSSingleVisible = true
      self.$axios.post( config.IP + '/gps/trajectory',{gid: row.gid})
    .then((response) => {
      self.GPSSingle=response.data.points
    }).then((error) => {
      console.log(error);
    })
    }
  },
  mounted(){
    var self = this
    self.GPSList = []
    self.$axios.post( config.IP + '/gps/gids','{}')
    .then((response) => {
      for(var i = 0; i < response.data.gids.length; i++){
      var element = {}
      element["gid"] = response.data.gids[i]
      self.GPSList.push(element)
    }
      console.log(JSON.stringify(this.GPSList));
    }).then((error) => {
      console.log(error);
    })

  }
}
</script>

<style>
.RoadLog{
  z-index: 0;
  width: 70.375%;
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