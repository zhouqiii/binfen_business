<template>
    <div class="condition_item">
      <div class="condition_title">{{title}}</div>
      <div class="condition_operate">
        <div class="condition_operate_select">
          <el-select v-model="select" placeholder="请选择" @change="changeCondition">
            <el-option label="精确查找" value="1"></el-option>
            <el-option label="模糊查找" value="2"></el-option>
            <el-option label="输入区间查找" value="3"></el-option>
            <el-option label="时间区间查找" value="4"></el-option>
          </el-select>
        </div>
        <div class="condition_operate_input" :class="{addBorder:select==='3'}">
          <el-input 
            v-show="select==='1' || select==='2'"
            class="input-with-select"
            v-model="content" 
            placeholder="请输入内容" 
            clearable
          ></el-input>
          <el-input 
            v-show="select==='3'"
            class="input-with-select myClass"
            v-model="contentStart" 
            placeholder="请输入内容" 
            clearable
          ></el-input>
          <span v-show="select==='3'" class="condition_operate_line">—</span>
          <el-input 
            v-show="select==='3'"
            v-model="contentEnd" 
            placeholder="请输入内容" 
            clearable
            class="input-with-select myClass"
          ></el-input>
          <el-date-picker
            v-show="select==='4'"
            v-model="content"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="—"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
      </div>
    </div>
</template>
<script>
export default {
    name:'FilterCondition',
    props:{
      title:{
        type:String,
        default:'',
      }
    },
    data(){
      return{
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', `${start}, ${end}`);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', `${start}, ${end}`);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', `${start}, ${end}`);
            }
          }]
        },
        select:'1',//select默认展示精确查找
        content:'',//select=1||2||4输入框的值
        contentStart:'',//选择输入区间的第一个输入框
        contentEnd:'',//选择输入区间的第二个输入框
      }
    },
    methods:{
      changeCondition(val){
        this.select=val
      }
    }
}
</script>
<style lang="scss">
.condition_item{
  margin-top: 12px;
}
.condition_item,.condition_operate,.condition_operate_input{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.condition_operate_select{
  margin-right: 12px;
}
.condition_operate_line{
  margin: auto 12px;
}
.condition_operate_input{
  width: 350px;
}
.addBorder{
  border-radius: 4px;
  border: 1px solid #DCDFE6;
}
.condition_title{
  width: 100px;
  text-align: right;
  padding: 0 12px 0 0;
  font-size: 14px;
  line-height: 40px;
  color: #606266;
}
.myClass{
  .el-input__inner{
    border: 0 !important;
    text-align: center;
  }
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>