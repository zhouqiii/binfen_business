<template>
<el-form ref="form" :model="form" label-width="80px" margin-top:30px>
  <el-form-item label="角色名称:" class="item">
    <el-input v-model="form.name" class="myClass" placeholder="请输入角色名称"></el-input>
  </el-form-item>
  <el-form-item label="团队管理:" class="group">
    <el-checkbox-group v-model="form.type">
      <el-checkbox label="全选" name="type"></el-checkbox>
      <el-checkbox label="查看菜单" name="type"></el-checkbox>
      <el-checkbox label="修改团队" name="type"></el-checkbox>
      <el-checkbox label="新建团队" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
   <el-form-item label="产品管理:" class="group">
    <el-checkbox-group v-model="form.type">
      <el-checkbox label="全选" name="type"></el-checkbox>
      <el-checkbox label="查看菜单" name="type"></el-checkbox>
      <el-checkbox label="修改产品" name="type"></el-checkbox>
      <el-checkbox label="新建产品" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="项目管理:" class="group">
    <el-checkbox-group v-model="form.type">
      <el-checkbox label="全选" name="type"></el-checkbox>
      <el-checkbox label="查看菜单" name="type"></el-checkbox>
      <el-checkbox label="修改项目" name="type"></el-checkbox>
      <el-checkbox label="删除项目" name="type"></el-checkbox>
      <el-checkbox label="新建项目" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="任务管理:" class="group">
    <el-checkbox-group v-model="form.type">
      <el-checkbox label="全选" name="type"></el-checkbox>
      <el-checkbox label="查看菜单" name="type"></el-checkbox>
      <el-checkbox label="修改任务" name="type"></el-checkbox>
      <el-checkbox label="删除任务" name="type"></el-checkbox>
      <el-checkbox label="新建任务" name="type"></el-checkbox>
      <el-checkbox label="任务完成状态查看" name="type"></el-checkbox>
      <el-checkbox label="任务完成状态编辑" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="handleDialogConfirm()" size="small">保存</el-button>
    <el-button @click="dialogVisible = false" size="small">关闭</el-button>
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
<style lang="css">
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
/* 团队管理标签 */
.group .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-left: 6px;
}
</style>
<style scope>
</style>