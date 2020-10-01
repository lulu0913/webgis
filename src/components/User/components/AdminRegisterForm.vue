<template>
  <div class="RegisterForm">
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
        width="200"
        column-key="date"
        :filters="[{text: '未审核', value: '未审核'},{text: '已审核', value: '已审核'},{text: '已拒绝', value: '已拒绝'}]"
        :filter-method="filterHandler">
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="350">
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
        <el-form style="margin-left: 30px" label-width="30%">
          <el-form-item label="账号：">
            <el-input style="width: 70%" v-model="DialogInfo.account" disabled></el-input>
          </el-form-item>
          <br>
          <!-- 之后等具体人员角色明确后再改为 el-option 选择器 -->
          <el-form-item label="用户等级：">
            <el-input style="width: 70%" v-model="DialogInfo.level" placeholder="请指定用户权限等级"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="用户姓名：">
            <el-input style="width: 70%" v-model="DialogInfo.info.name" placeholder="请输入用户姓名"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="用户UID：">
            <el-input style="width: 70%" v-model="DialogInfo.info.uid" placeholder="请输入用户UID"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="用户职位：">
            <el-input style="width: 70%" v-model="DialogInfo.info.occupation" placeholder="请输入用户职位"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="审核状态：">
            {{DialogInfo.status}}
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitEdit()">确 定</el-button>
        </span>
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
          account: '',
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
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
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
.RegisterForm{
  width: 80rem;
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
