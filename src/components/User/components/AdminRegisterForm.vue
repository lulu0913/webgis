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
          <el-button @click="CallDialog(scope.row)" type="info" size="small">修改信息</el-button>
          <el-button v-if="scope.row.status == '未审核'" @click="CheckPass(scope.row)" type="primary" size="small">审核通过</el-button>
          <el-button v-if="scope.row.status == '未审核'" @click="CheckFail(scope.row)" type="danger" size="small">审核拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-dialog
      class="info"
      title="修改用户信息"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <div style="text-align:center">
        <div>账号： <el-input style="width: 50%" v-model="DialogInfo.account" disabled></el-input></div>
        <br>
        <!-- 之后等具体人员角色明确后再改为 el-option 选择器 -->
        <div>用户等级： <el-input style="width: 50%" v-model="DialogInfo.level"></el-input></div>
        <br>
        <div>用户姓名： <el-input style="width: 50%" v-model="DialogInfo.info.name"></el-input></div>
        <br>
        <div>用户uid： <el-input style="width: 50%" v-model="DialogInfo.info.uid"></el-input></div>
        <br>
        <div>用户职位： <el-input style="width: 50%" v-model="DialogInfo.info.occupation"></el-input></div>
        <br>
        <div>审核状态： <p>{{DialogInfo.status}}</p> </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitEdit()">确 定</el-button>
        </span>
      </div>
    </el-dialog>
    </div>
  </div>
</template>
<script>
import {config} from '../../../config/config.js'
export default {
  inject: ['reload'],
  data() {
      return {
        tableData: [],
        centerDialogVisible: false,
        DialogInfo: {
          account: '111',
          level: '',
          password: '',
          status: '',
          info:{
            name: '',
            occupation: '',
            uid: '',
          }
        }
      };
    },
  methods: {
    CheckPass(row){
      console.log(row)
      this.$axios.post(config.IP + '/account/check', { //后端接口路由
        "account": row.account,
        "checkRes": 1
      },{}).then((response) => {
        if(response.data.code == 1){
          this.$alert('已审核通过！', '成功✔️', {
          confirmButtonText: '确定',})
          this.reload()
        }
        else{
          this.$alert('审核用户不存在', '错误❌', {
          confirmButtonText: '确定',})
        }
      })
    },
    CheckFail(row){
      console.log(row)
      this.$axios.post(config.IP + '/account/check', { //后端接口路由
        "account": row.account,
        "checkRes": -1
      },{}).then((response) => {
        if(response.data.code == 1){
          this.$alert('已审核拒绝！', '成功✔️', {
          confirmButtonText: '确定',})
          this.reload()
        }
        else{
          this.$alert('审核用户不存在', '错误❌', {
          confirmButtonText: '确定',})
        }
      })
    },
    CallDialog(row){
      this.centerDialogVisible = true
      this.DialogInfo = row
    },
    submitEdit(){
      this.$axios.post(config.IP + '/account/infoChange', { //后端接口路由
        "account": this.DialogInfo.account,
        "level": this.DialogInfo.level,
        "status": this.DialogInfo.status,
        "info": this.DialogInfo.info
      },{}).then((response) => {
        if(response.data.code == 1){
          this.$alert('已修改用户信息！', '成功✔️', {
          confirmButtonText: '确定',})
          this.reload()
        }
        else{
          this.$alert('用户信息不存在', '错误❌', {
          confirmButtonText: '确定',})
        }
        centerDialogVisible = false
      })
    }
  },
  mounted(){
    var self = this
    self.$axios.post( config.IP + '/account/accounts','{}')
    .then((response) => {
      for(var i = 0; i < response.data.accounts.length; i++){
      if(response.data.accounts[i].status == 1){
        response.data.accounts[i].status = '已审核'
      }
      else if(response.data.accounts[i].status == 0){
        response.data.accounts[i].status = '未审核'
      }
      else if(response.data.accounts[i].status == -1){
        response.data.accounts[i].status = '已拒绝'
      }
      response.data.accounts[i].password = ''
    }
      this.tableData = response.data.accounts
    }).then((error) => {
      console.log(error);
    })
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
