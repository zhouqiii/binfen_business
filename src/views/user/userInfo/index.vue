<template>
   <el-form ref="form" :model="form" label-width="80px" margin-top:30px>
        <el-form-item label="用户姓名:" class="item">
    <el-input v-model="form.name" class="myClass" placeholder="请输入您的姓名"></el-input>
  </el-form-item>
  <el-form-item label="所属产品">
    <el-select v-model="form.region">
      <el-option label="产品一" value="binfen"></el-option>
      <el-option label="产品二" value="yundong"></el-option>
    </el-select>
  </el-form-item>
   </el-form>
</template>
<script>
export default {
     data() {
      return {
        form: {
          name: '',
          type: [],
          region: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
}
</script>
<style>
/* 角色输入框 */
.myClass input.el-input__inner {
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 30px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 250px;
    margin-top: 33px;
    /* margin-left: 10px; */
}
/* 角色输入框的标签 */
.item .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 5px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-top: 30px;
    /* margin-left: 10px; */
}
</style>