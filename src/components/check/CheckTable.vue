<template>
  <div>
    <div class="table-container">
      <el-table
        ref="Table"
        :data="sourceData"
        style="width:100%;"
        v-loading="listLoading"
        border
      > 
        <!-- <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope" style="width:100%">
            <div>{{scope.$index + 1}}</div>
          </template>
        </el-table-column> -->
        <el-table-column
          v-for="(item,index) in dataData"
          :key="index"
          align="center"
          :prop="item.syllableEng"
        >  
          <template slot-scope="scope">
            <span v-if="scope.row.index<count">
              <el-input v-model="scope.row.dict" maxlength="300" placeholder="请输入原因" size="large"/>
            </span>
          </template>
          <template slot="header" slot-scope="scope">
            <div @click="getCell(scope)">{{item.syllableChi}}</div>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot="header">
            <div class="dict_title">表头操作:</div>
            <div class="style_display">
              <el-dropdown @command="handleBgColor" trigger="click">
                <div :style="{background:activeBgColor}">
                背景颜色<i class="el-icon-arrow-down el-icon--right"></i>
                </div>
                <el-dropdown-menu slot="dropdown" class="color_display">
                  <el-dropdown-item v-for="(item,index) in colorList" 
                    :key="index"
                    :command="item.id"
                  >
                    <div class="colorBox red" v-if="item.id==='red'"></div>
                    <div class="colorBox blue" v-if="item.id==='blue'"></div>
                    <div class="colorBox black" v-if="item.id==='black'"></div>
                    <div class="colorBox yellow" v-if="item.id==='yellow'"></div>
                    <div class="colorBox grey" v-if="item.id==='grey'"></div>
                    <div class="colorBox orange" v-if="item.id==='orange'"></div>
                    <div class="colorBox green" v-if="item.id==='green'"></div>
                    <div class="colorBox inherit" v-if="item.id==='inherit'"></div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown @command="handleColor" trigger="click">
                <div :style="{color:activeColor}">
                字体颜色<i class="el-icon-arrow-down el-icon--right"></i>
                </div>
                <el-dropdown-menu slot="dropdown" class="color_display">
                  <el-dropdown-item v-for="(item,index) in colorList" 
                    :key="index"
                    :command="item.id"
                  >
                    <div class="colorBox red" v-if="item.id==='red'"></div>
                    <div class="colorBox blue" v-if="item.id==='blue'"></div>
                    <div class="colorBox black" v-if="item.id==='black'"></div>
                    <div class="colorBox yellow" v-if="item.id==='yellow'"></div>
                    <div class="colorBox grey" v-if="item.id==='grey'"></div>
                    <div class="colorBox orange" v-if="item.id==='orange'"></div>
                    <div class="colorBox green" v-if="item.id==='green'"></div>
                    <div class="colorBox inherit" v-if="item.id==='inherit'"></div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown @command="handleFont" trigger="click">
                <div :style="{fontSize:activeFont}">
                字体大小<i class="el-icon-arrow-down el-icon--right"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(item,index) in fontList" 
                    :key="index"
                    :command="item.id"
                  >
                    <div class="fontBox" :style="{fontSize:item.id}">{{item.id}}</div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <div>
                <el-button type="primary" size="small" @click="handleAddDict">
                  <i class="el-icon-circle-plus-outline"></i>
                </el-button>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="pagination.pageNum"
        :page-size="pagination.pageSize"
        :page-sizes="pages"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'baseTable',
  props: {
    dataData: {
      type: Array,
       default() {
        return [];
      }
    },
    listLoading: {
      type: Boolean,
      default: false
    },
    sourceData: {
      type: Array,
      default() {
        return [];
      }
    },
    total: {
      type: Number,
      default: null
    },
    pagination: {
      type: Object,
      default() {
        return {
          pageNum: 1,
          pageSize: 10
        };
      }
    }
  },
  data() {
    return {
      count:0,//用来标记前几行是加的表头
      pages: [10, 15, 20, 30, 50, 100],
      activeBgColor:'inherit',//背景颜色
      activeColor:'inherit',//字体颜色
      activeFont:'inherit',//字体大小
      dictList:[],//用来存放表头选中的dom，以遍历修改样式
      colorList:[{id:'red',title:'红色'},{id:'blue',title:'蓝色'},
        {id:'green',title:'绿色'},{id:'grey',title:'灰色'}
        ,{id:'black',title:'黑色'},{id:'orange',title:'橙色'}
        ,{id:'yellow',title:'黄色'},{id:'inherit',title:'原始色'}],
      fontList:[{id:'14',title:'红色'},{id:'15',title:'蓝色'},
        {id:'16',title:'绿色'},{id:'17',title:'灰色'}
        ,{id:'18',title:'黑色'},{id:'19',title:'橙色'}
        ,{id:'20',title:'黄色'},{id:'inherit',title:'原始大小'},]
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pagination.pageNum = 1;
      this.pagination.pageSize = val;
      // 更新数据
    //   this.$emit('reloadList', { pageSize: val });
    },
    handleCurrentChange(val) {
      this.pagination.pageNum = val;
    //   // 更新数据
    //   this.$emit('reloadList', { pageNum: val });
    },
    //修改背景颜色
    handleBgColor(command) {
      console.log(command)
      this.activeBgColor=`${command}`
      this.dictList.forEach(item=>{
        const dom=document.getElementsByClassName(item)
        dom[0].style.background=command
      })
    },
    //修改字体颜色
    handleColor(command) {
      console.log(command)
      this.activeColor=`${command}`
      this.dictList.forEach(item=>{
        const dom=document.getElementsByClassName(item)
        dom[0].style.color=command
      })
    },
    //修改字体大小
    handleFont(command){
      console.log(command)
      this.activeFont=`${command}`
      this.dictList.forEach(item=>{
        const dom=document.getElementsByClassName(item)
        dom[0].style.fontSize=command+'px'
      })
    },
    //选中表头以修改样式
    getCell(scope){
      const dom=document.getElementsByClassName(scope.column.id)
      if(dom[0].style.border){
        if(dom[0].style.border===''){
          dom[0].style.border='1px solid black'
          this.dictList.push(scope.column.id)
        }else{
          dom[0].style.border=''
          this.dictList.splice(this.dictList.findIndex(item => item === scope.column.id), 1)
        }
      }else{
        dom[0].style.border="1px solid black"
        this.dictList.push(scope.column.id)
      }
      console.log(this.dictList)
    },
    //动态添加表头-我使用的方法使在表格数据里加一行自定义操作的空数据
    //然后标记加了几行，上送的时候取出这几行编辑的数据作为表头上送
    handleAddDict(){
      this.count+=1
      let obj={}
      this.dataData.map(item=>{
        obj[item.syllableEng]=''
        })
      obj.dict=''
      this.sourceData.unshift(obj)
    },

  },
  watch:{
      sourceData(){
        console.log(this.sourceData)
      }
  }
};
</script>

<style lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  padding: 40px 0;
}
.color_display{
  display: flex;
  width: 60px;
  flex-direction: row;
  padding:5px;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  .el-dropdown-menu__item{
    padding: 0;
  }
}
.dict_title{
  text-align: left;
  margin-bottom: 10px;
}
.style_display{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
//三个样式选择的box
.el-dropdown{
  color: inherit;
  font-size: 12px;
  border: 1px solid #EBEEF5;
  padding: 0 5px;
}
.colorBox{
  width: 15px;
  height: 15px;
  margin-bottom: 2px;
  border: 1px solid black;
}
.red{
  background: red;
}
.blue{
  background: blue;
}
.orange{
   background: orange;
}
.black{
  background: black;
}
.yellow{
  background: yellow;
}
.grey{
  background: gray;
}
.green{
  background: green;
}
.inherit{
  background: inherit;
}
</style>
