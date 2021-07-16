<template>
    <el-table-column 
      :prop="col.syllableEng"
      align="center"
    >
      <!-- <template v-if="col.children">
        <table-column-input v-for="(item, index) in col.children"
          :key="index"
          :col="col.children"></table-column-input>
      </template> -->
      <template slot="header" slot-scope="scope">
        <div @click="getCell(scope)">{{col.syllableChi}}</div>
      </template>
  </el-table-column>
</template>
<script>
import TableColumnInput from './TableColumnInput.vue'
export default {
  name: 'TableColumn',
  components:{TableColumnInput},
  props: {
    col: {
      type: Object
    }
  },
  data(){
    return{
    }
  },
  methods:{
    //选中表头以修改样式
    getCell(scope){
      this.$emit('getCell',scope)
    },
    inputVal(){

    }
  }
}
</script>
<style scoped>

</style>