<template>
  <div class="RoadForm">
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
        typeFilter: []
      };
    },
  methods: {
    
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
