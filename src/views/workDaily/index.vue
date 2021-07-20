<template>
  <div>
    <div>
      <el-tabs type="border-card" @tab-click="handleClick" v-model="reportId">
        <el-tab-pane 
          :key="item.reportId"
          v-for="item in editableTabs"
          :name="item.reportId"
        >
          <span slot="label">{{item.reportName}}</span>
          <filter-condition v-for="(item,index) in dataData" 
            :key="index" 
            :title='item.syllableChi'
            ref="child"
          >
          </filter-condition>
          <div class="report_btn">
            <el-button size="small" @click="exportData" type="success">导出</el-button>
            <div>
              <el-button type="primary" size="small" @click="queryData">查询</el-button>
              <el-button size="small" @click="resetData">重置</el-button>
            </div>
          </div>
          <check-table 
            :sourceData="sourceData"
            :listLoading='listLoading'
            :dataData="dataData"
            :pagination="pagination"
            :total="total"
            @reloadList="reloadList"
            @ceilContent='getCeilContent'
          ></check-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import FilterCondition from '../../components/check/FilterCondition.vue';
import {reportList,syllableList,queryList,exportList} from '@/api/check'
import CheckTable from '../../components/check/CheckTable.vue';
export default {
  components: { FilterCondition, CheckTable },
  name:'workDailyList',//checkList
  data(){
    return{
      dataData:[],//tab对应的有汉字有英文字段
      editableTabs: [],
      sourceData:[],
      listLoading:false,
      reportId:'',//用来存放当前的报表Id
      reportName:'',//用来存放当前的报表名--导出的时候可以用
      total:null,
      pagination: {
        pageNum: 1,
        pageSize: 10
      },
      ceilContent:[],//用来保存导出要上送的表头内容
    }
  },
  methods:{
    ///获取报表列表
    getReportList(){
      reportList({}).then(res => {
        this.editableTabs = res.data
        const obj={
          name:this.editableTabs[0].reportId,
          index:0
        }
        this.handleClick(obj)//初试默认打开第一个报表
      })
    },
    ////切换tab不同报表加载该报表对应的字段及更新表格
    handleClick(tab) {
      this.reportName=this.editableTabs[tab.index].reportName
      if(this.reportId!==tab.name){
        this.reportId=tab.name
        let data = { reportId:tab.name }
        syllableList(data).then(res => {
          const list=res.data;
          list.map(item=>{
            const obj={'syllableChi':Object.values(item).toString(),'syllableEng':Object.keys(item).toString()}
            this.dataData.push(obj)
          })
        }).then(()=>{
          this.listLoading=true
          this.getTableOrigin()
        });
      }
    },
    //查询表格数据
    queryList(data){
      queryList(data).then(res=>{
        this.listLoading=false
        this.sourceData=res.data.list
        this.total=res.data.total
        this.pagination.pageNum=res.data.pageNum
        this.pagination.pageSize=res.data.pageSize
        if(res.data.list.length===0){
          this.$message('暂无符合条件的数据');
        }
      })
    },
    //切换tab初始化表格
    getTableOrigin(){
      const data = {
        reportId: this.reportId,
        where: '',
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      }
      this.queryList(data)
    },
    //每页数据或者页数改变更新表格
    reloadList(res){
      if (res.pageNum) {
        this.pagination.pageNum = res.pageNum;
      }
      if (res.pageSize) {
        this.pagination.pageSize = res.pageSize;
      }
      this.queryData()
    },
    //把修改后的表头赋值给这里的ceilContent
    getCeilContent(val){
      this.ceilContent=val
    },
    //格式化时间区间
    formatTime(timeList){
      const startMonth=(timeList[0].getMonth()+1)<10?`0${timeList[0].getMonth()+1}`:timeList[0].getMonth()+1
      const endMonth=(timeList[1].getMonth()+1)<10?`0${timeList[1].getMonth()+1}`:timeList[1].getMonth()+1
      const startDay=timeList[0].getDate()<10?`0${timeList[0].getDate()}`:timeList[0].getDate()
      const endDay=timeList[1].getDate()<10?`0${timeList[1].getDate()}`:timeList[1].getDate()
      return `${timeList[0].getFullYear()}${startMonth}${startDay},${timeList[1].getFullYear()}${endMonth}${endDay}`
    },
    //格式化查询和导出上送字段格式
    assignCondition(){
      const reportId = this.reportId
      const obj={}
      for(let i=0;i<this.dataData.length;i++){
        const getData=this.$refs.child[i]//v-for嵌套了两层，这里标识用第二个v-for
        if(getData.select==='1'){
          obj[`${this.dataData[i].syllableEng}-=`]=getData.content
        }else if(getData.select==='2'){
          obj[`${this.dataData[i].syllableEng}-like`]=getData.content
        }else if(getData.select==='3'){
          obj[`${this.dataData[i].syllableEng}-between`]=`${getData.contentStart},${getData.contentEnd}`
        }else if(getData.select==='4'){
          obj[`${this.dataData[i].syllableEng}-between`]=this.formatTime(getData.content)
        }
      }
      return {reportId,obj}
    },
    //重置查询字段输入内容
    resetData(){
      this.$refs.child.forEach(item => {
        item.content=''
        item.contentStart=''
        item.contentEnd=''
      })
    },
    //按查询字段输入查询
    queryData(){
      this.listLoading=true
      const reportId=this.assignCondition().reportId
      const obj=JSON.stringify(this.assignCondition().obj)
      let data = {
        reportId: reportId,
        where: obj,
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
        }
      this.queryList(data)
    },
    //导出当前页数据
    exportData(){
      const col=this.dataData.length//计算一共有几列
      if(this.ceilContent.length===0){//说明没有增加表头
        for(let i=0;i<col;i++){
          const arr=[]
          arr.push(this.dataData[i].syllableChi)
          this.ceilContent.push(arr)
        }
      }
      const reportId=this.assignCondition().reportId
      const where=JSON.stringify(this.assignCondition().obj)
      const ceilContent=this.ceilContent
      const dickDom=document.getElementsByClassName('el-table__header')
      const dickDomTh=dickDom[0].getElementsByTagName('th')
      const styleList=[]
      for(let i=0;i<dickDomTh.length;i++){
        if(dickDomTh[i].className.split(' ')[0]!=='el-table_1_column_1' && dickDomTh[i].className.split(' ')[0]!=='gutter'){
          styleList.push(dickDomTh[i].className.split(' ')[0])
        }
      }
      const ceilStyle=[]
      for(let i=0;i<col;i++){
        const arr=[]
        for(let j=0;j<styleList.length;j++){
         const domItem=document.getElementsByClassName(styleList[j])
          if(j%col===i){
            const obj={
              'bgColor':domItem[0].style.background || '#F5F7FA',
              'fontColor':domItem[0].style.color || '#909399',
              'fontSize':domItem[0].style.fontSize.split('px')[0] || '14',
            }
            arr.push(JSON.stringify(obj))
          }
        }
        ceilStyle.push(arr)
      }
      const data={
        reportId,
        where,
        ceilContent,
        ceilStyle
      }
      exportList(data).then(res=>{
        const link = document.createElement('a');
        const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
        link.style.display = 'none';
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download',`${this.reportName}.xlsx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
    },
  },
  created(){
    this.$nextTick(()=>{
      this.getReportList()
    })
  }
}
</script>
<style lang="scss">
.el-tabs__content{
  padding-top: 0 !important;
   padding-bottom: 0 !important;
}
.search-btn{
  text-align: center;
}
.add-btn {
  margin: 20px 0;
}
.report_btn{
  margin-top: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

</style>