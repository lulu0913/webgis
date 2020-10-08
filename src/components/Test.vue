
<template>
	<div>
		<el-button style="margin-left: 10px;" type="success" @click="openCsvDialog()" icon="el-icon-plus">
    导入路段信息
    </el-button>
    <el-dialog
    :title="csvTitle"
    :visible.sync="csvVisible"
    width="50%">
    <div>
        <el-form ref="file" label-width="120px">
          <input type="file" id="fileupload" name="csvfile" ref="csvData" />
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
</template>
<script>
import csv2arr from '@/assets/csv-arr'
export default {
  data(){
    return{
      csvTitle: '导入CSV文件',
      jsonTitle: '导出CSV文件',
      csvVisible: false,
      jsonVisible: false
    }
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
  }
}
</script>
<style scoped>
	.in-file, .cont h2 {
		text-align: center;
	}
</style>