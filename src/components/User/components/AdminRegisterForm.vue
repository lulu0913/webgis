<template>
  <div class="my-allproblem">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="account"
        label="账号"
        width="200">
      </el-table-column>
      <el-table-column
        prop="status"
        label="审核状态"
        sortable
        width="200">
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="300">
        <template slot-scope="scope">
          <el-button @click="CheckClick(scope.row,1)" type="primary" size="small">审核通过</el-button>
          <el-button type="danger" size="small">审核拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {IP} from '../../../config/config.js'
export default {
  name: 'MyRights',
  data() {
      return {
        tableData: [{
          "account": "zhangsan",
          "password": "xxxxx",  //password为hash值
          "level": 1, //等级越高权利越大
          "status": 1 //1代表已经审核，0代表未审核
          },
        ]
      };
    },
  methods: {
    CheckClick(row,status){
      console.log(row)
    },
    EditInfo(){
      this.$router.push('/account/Edit');
    }
  },
  mounted(){
    var that = this
    var data = {
      uid: that.$cookies.get('adminAccount'),
      password: that.$cookies.get('adminPassword')
    }
    jQuery.get(
      IP + '/getAllData',
      data,
      function (res) {
        console.log(res.data)
        that.tableData = res.data
      }
    )
  }
}
</script>

<style>
.my-allproblem{
  width: 50rem;
  padding-top: 2rem;
  padding-left: 2rem;
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
