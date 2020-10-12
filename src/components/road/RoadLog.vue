<template>
  <div class="RoadLog">
    <el-table
      :data="tableData"
      stripe
      height="850"
      width="auto">
      <el-table-column
        prop="time"
        label="修改时间"
        width="250"
        sortable>
      </el-table-column>
      <el-table-column label="路段信息">
        <el-table-column
          prop="road.rid"
          label="路段编号"
          width="130"
          sortable>
        </el-table-column>
        <el-table-column
          prop="road.part.region"
          label="路段区域"
          width="130"
          sortable>
        </el-table-column>
        <el-table-column
          prop="road.part.road"
          label="道路名称"
          width="120"
          sortable>
        </el-table-column>
        <el-table-column
          prop="road.part.roadNum"
          label="车道数量"
          width="105"
          sortable>
        </el-table-column>
        <el-table-column
          prop="road.attribute.type"
          label="路面类型"
          width="105"
          sortable>
        </el-table-column>
      </el-table-column>
      <el-table-column label="修改人信息">
        <el-table-column
          prop="account.account"
          label="修改人账号"
          width="130"
          sortable>
        </el-table-column>
        <el-table-column
          prop="account.level"
          label="修改人等级"
          width="120"
          sortable>
        </el-table-column>
        <el-table-column
          prop="account.info.name"
          label="修改人姓名"
          width="130">
        </el-table-column>
        <el-table-column
          prop="account.info.occupation"
          label="修改人职位"
          width="130"
          sortable>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {config} from '../../config/config.js'
export default {
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
    self.$axios.post( config.IP + '/road/logs','{}')
    .then((response) => {
      for(var i = 0; i < response.data.data.length; i++){
      if(response.data.data[i].road.attribute.type == 1){
        response.data.data[i].road.attribute.type = '沥青路面'
      }
      else if(response.data.data[i].road.attribute.type == 0){
        response.data.data[i].road.attribute.type = '水泥路面'
      }
    }
      this.tableData = response.data.data
      console.log(JSON.stringify(this.tableData));
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
