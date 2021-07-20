<template>
  <div>
    <div class="table-container">
      <el-table
        ref="Table"
        :data="sourceData"
        style="width:100%;"
        v-loading="listLoading"
        @header-click="getCell"
        border
      >
        <el-table-column align="right">
          <el-table-column
            v-for="(item,indexB) in dataDataGet"
            :key="indexB"
            align="center"
            :prop="item.syllableEng"
          > 
            <template v-if="item.children">
              <table-column-input  v-for="(st, index) in item.children"
                :key="index"
                :data="item.syllableEng"
                :col="item.children"
                @getEditDick='getEditDick'
              >
              </table-column-input>
            </template> 
            <template slot="header">
              <div>{{item.syllableChi}}</div>
            </template>
          </el-table-column>
          <template slot="header">
            <div class="style_display">
              <el-button
              type="primary"
                size="small" 
                class="btn_add"
                icon="el-icon-circle-plus-outline"
                @click="handleAddDict"
              >
              </el-button>
              <div>
                <el-dropdown @command="handleBgColor" trigger="click">
                  <div>
                  背景颜色<i class="el-icon-arrow-down el-icon--right"></i>
                  </div>
                  <el-dropdown-menu slot="dropdown" class="color_display">
                    <el-dropdown-item v-for="(item,index) in bgColor" 
                      :key="index"
                      :command="item.id"
                    >
                      <div class="colorBox" :style="{background:item.id}"></div>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown @command="handleColor" trigger="click">
                  <div>
                    <span>字体颜色<i class="el-icon-arrow-down el-icon--right"></i></span>
                  </div>
                  <el-dropdown-menu slot="dropdown" class="color_display">
                    <el-dropdown-item v-for="(item,index) in color" 
                      :key="index"
                      :command="item.id"
                    >
                      <div class="colorBox" :style="{background:item.id}"></div>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown @command="handleFont" trigger="click">
                  <div>
                  字体大小<i class="el-icon-arrow-down el-icon--right"></i>
                  </div>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in fontSize"
                      :key="index"
                      :command="item.id"
                    >
                      <div class="fontBox">{{item.id}}</div>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
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
import TableColumnInput from '../../components/check/TableColumnInput.vue'
export default {
  name: 'baseTable',
  components:{TableColumnInput},
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
      title:[],
      dataDataGet:[],
      count:0,//用来标记前几行是加的表头
      pages: [10, 15, 20, 30, 50, 100],
      styleList:{
        background:'#F5F7FA',//背景颜色
        color:'#909399',//字体颜色
        fontSize:'14px',//字体大小
      },
      dictList:[],//用来存放表头选中的dom，以遍历修改样式
      bgColor:[
        {id:'#F5F7FA',title:'原始色'},
        {id:'red',title:'红色'},
        {id:'orange',title:'橙色'},
        {id:'yellow',title:'黄色'},
        {id:'green',title:'绿色'},
        {id:'#5F9EA0',title:'青色'},
        {id:'blue',title:'蓝色'},
        {id:'purple',title:'紫色'},
        {id:'white',title:'白色'},
      ],
       color:[
        {id:'#909399',title:'原始色'},
        {id:'red',title:'红色'},
        {id:'orange',title:'橙色'},
        {id:'yellow',title:'黄色'},
        {id:'green',title:'绿色'},
        {id:'#5F9EA0',title:'青色'},
        {id:'blue',title:'蓝色'},
        {id:'purple',title:'紫色'},
        {id:'white',title:'白色'},
        ],
      fontSize:[
        {id:'14',title:'14'},
        {id:'15',title:'15'},
        {id:'16',title:'16'},
        {id:'17',title:'17'},
        {id:'18',title:'18'},
        {id:'19',title:'19'},
        {id:'20',title:'20'}
      ]
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pagination.pageNum = 1;
      this.pagination.pageSize = val;
      // 更新数据
      this.$emit('reloadList', { pageSize: val });
    },
    handleCurrentChange(val) {
      this.pagination.pageNum = val;
      this.$emit('reloadList', { pageNum: val });
    },
    //修改背景颜色
    handleBgColor(command) {
      this.$set(this.styleList,'background',command)
      console.log(this.styleList)
      this.dictList.forEach(item=>{
        const dom=document.getElementsByClassName(item)
        dom[0].style.background=command
      })
    },
    titleGet(index){
     if(this.title[index]){
       return this.title[index]
     }else{
       return ''
     }
    },
    //修改字体颜色
    handleColor(command) {
      this.$set(this.styleList,'color',command)
      this.dictList.forEach(item=>{
        const dom=document.getElementsByClassName(item)
        const dominput=dom[0].getElementsByClassName('inputValue')
        if(dominput[0]){
          dominput[0].style.color=command
        }
        dom[0].style.color=command
      })
    },
    //修改字体大小
    handleFont(command){
      this.$set(this.styleList,'fontSize',command)
      this.dictList.forEach(item=>{
        const dom=document.getElementsByClassName(item)
        const dominput=dom[0].getElementsByClassName('inputValue')
        if(dominput[0]){
          dominput[0].style.fontSize=command+'px'
        }
        dom[0].style.fontSize=command+'px'
      })
    },
     //选中表头以修改样式
    getCell(column,event){
      if(column.id!=='el-table_1_column_1'){
        const dom=document.getElementsByClassName(column.id)
        if(dom[0].style){
          if(dom[0].style.border==''){
            dom[0].style.border='1px solid black'
            this.dictList.push(column.id)
          }else{
            dom[0].style.border=''
            this.dictList.splice(this.dictList.findIndex(item => item === column.id), 1)
          }
        }else{
          dom[0].style.border="1px solid black"
          this.dictList.push(column.id)
        }
      }
    },
    //动态添加表头-我使用的方法使在表格数据里加一行自定义操作的空数据
    //然后标记加了几行，上送的时候取出这几行编辑的数据作为表头上送
    handleAddDict(){
      this.count+=1
      for(let i=0;i<this.dataDataGet.length;i++){
        const obj={'children':'',}
        if(this.count===1){
          this.$set(this.dataDataGet[i],'children',obj)
        }
        else if(this.count===2){
          this.$set(this.dataDataGet[i].children,'children',obj)
        }else if(this.count===3){
          this.$set(this.dataDataGet[i].children.children,'children',obj)
        }else{
          this.$message({
            message:'最多添加三级表头！',
            duration:15000
          });
          break;
        }
      }
      this.$nextTick(()=>{
        const dom=document.getElementsByClassName('inputValue')
        if(dom){
          for(let i=0;i<dom.length;i++){
            if(this.title[i]){
              dom[i].value=this.title[i]
            }else{
              dom[i].value=''
            }
          }
        }
      })
    },
    //获取增加的表头的内容
    getEditDick(val){
      this.dataDataGet.forEach(item=>{
        val.unshift(item.syllableChi)
      })
      this.title=val.slice(this.dataDataGet.length)
      const ceilContent=[]
      const col=this.dataDataGet.length//计算一共有几列
      for(let i=0;i<col;i++){
        const arr=[]
        for(let j=0;j<val.length;j++){
          if(j%col===i){
            arr.push(val[j])
          }
        }
        ceilContent.push(arr)
      }
      this.$emit('ceilContent',ceilContent)
    }
  },
  watch:{
      sourceData(){
        console.log(this.sourceData)
      },
      dataData(val){
        this.dataDataGet=val
      },
      
  },
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
.next{
  margin-top: 10px;
}
.btn_add{
  padding-top: 7px;
  padding-bottom: 7px;
  .el-icon-circle-plus-outline{
    font-size: 16px;
  }
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
  border: 1px solid #DCDFE6;
  padding: 0 5px;
  text-align: center;
  height: 32px;
  line-height: 32px;
}
.color_line{
  height: 10px;
  width: 30px;
}
.colorBox{
  width: 15px;
  height: 15px;
  margin-bottom: 2px;
  border: 1px solid black;
}
.inheritCF{
  background: #909399;
}
.inheritC{
  background: #F5F7FA;
}
.red{
  background: red;
}
.orange{
  background: orange;
}
.yellow{
  background: yellow;
}
.green{
  background: green;
}
.ching{
  background: #5F9EA0;
}
.blue{
  background: blue;
}
.purple{
  background: purple;
}
</style>
