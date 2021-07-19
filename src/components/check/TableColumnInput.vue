<template>
    <el-table-column align="center" :prop="data">
      <template slot="header">
        <div>
          <input type="text"
            :value="title"
            placeholder="请输入"
            class="inputValue"
            @input="submitValue"
            @click.stop="submitValue"
          />
        </div>
      </template>
      <template v-if="col.children">
        <table-column-input v-for="(item,index) in col.children"
          :key="index" 
          :col='col.children'
          :data="data"
          @getEditDick='submitValue'
        >
        </table-column-input>
      </template>
  </el-table-column>
</template>
<script>
export default {
  name: 'TableColumnInput',
  props: {
    col: {
      type: Object
    },
    data: {
      type: String
    },
    // title: {
    //   type:String
    // }
  },
  data(){
    return{
      editDickList:[],
      title:''
    }
  },
  methods:{
    //选中表头以修改样式
    submitValue(){
      this.editDickList=[]
      const dom=document.getElementsByClassName('inputValue')
      for(let i=0;i<dom.length;i++){
        this.editDickList.push(dom[i].value)
      }
      this.$emit('getEditDick',this.editDickList)
    },
  },
  created(){
    this.$nextTick(()=>{
       
    })
  }
}
</script>
<style lang="scss">
.inputValue{
  -webkit-appearance: none;
  background-color:inherit;
  background-image: none;
  text-align: center;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #909399;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  font-size: 14px;
  font-weight: bold;
  -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  width: 100%;
}
</style>