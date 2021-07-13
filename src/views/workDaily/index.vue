<template>
  <div>
    <div>
      <el-tabs type="border-card" @tab-click="handleClick">
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
          ></check-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import FilterCondition from '../../components/check/FilterCondition.vue';
import {reportList,syllableList,queryList} from '@/api/check'
import CheckTable from '../../components/check/CheckTable.vue';
export default {
  components: { FilterCondition, CheckTable },
  name:'workDailyList',
  data(){
    return{
      dataData:[],//tab对应的有汉字有英文字段
      editableTabs: [{'reportId':'02c','reportName':'报表1'},{'reportId':'ads','reportName':'报表2'}],
      sourceData:[],
      listLoading:false,
      reportId:'',//用来存放当前的报表Id
    }
  },
  methods:{
    ///获取报表列表
    getReportList(){
      reportList({}).then(res => {
        this.editableTabs = res.data
      })
    },
    ////切换tab不同报表加载该报表对应的字段及更新表格
    handleClick(tab) {
      let nn;
      this.dataData=[];
      this.reportId=tab.name
      if(this.reportId==='02c'){
        nn=[ { "groupName": "部门名称" } ] 
      }else{
        nn=[ { "groupName": "部门名称" } , { "groupId": "部门编号" },{ "groupNumber": "部门人数" } ] 
      }
      nn.map(item=>{
        const obj={'syllableChi':Object.values(item).toString(),'syllableEng':Object.keys(item).toString()}
        this.dataData.push(obj)
      })
      ////
      // const reportId = { reportId:tab.name }
      // syllableList(reportId).then(res => {
      //   const list=res.data;
      //   list.map(item=>{
      //     const obj={'syllableChi':Object.values(item).toString(),'syllableEng':Object.keys(item).toString()}
      //     this.dataData.push(obj)
      //   })
      // });
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
        const getData=this.$refs.child[i+this.dataData.length]//v-for嵌套了两层，这里标识用第二个v-for
        if(getData.select==='1'){
          obj[`${this.dataData[i].syllableEng}-=`]=getData.content
        }else if(getData.select==='2'){
          obj[`${this.dataData[i].syllableEng}-like`]=getData.content
        }else if(getData.select==='3'){
          obj[`${this.dataData[i].syllableEng}-between`]=`${getData.contentStart},${getData.contentEnd}`
        }else{
          obj[`${this.dataData[i].syllableEng}-between`]=this.formatTime(getData.content)
        }
      }
      return {reportId,obj}
    },
    //重置查询字段输入内容
    resetData(){
      this.$ref.child.forEach(item => {
        item.content=''
        item.contentStart=''
        item.contentEnd=''
      })
    },
    //按查询字段输入查询
    queryData(){
      ////
      const reportId=this.assignCondition().reportId
      let list=[]
      let testObj={}
      if(reportId==='ads'){
        for(let i=0;i<22;i++){
          testObj={'groupName':`${i}组数据`,'groupId':`A${i}C${i}D`,'groupNumber':`2${i}`}
          list.push(testObj)
        }
      }else{
        for(let j=0;j<9;j++){
          testObj={'groupName':`第${j}组`}
          list.push(testObj)
        }
      }
      this.sourceData=list
      /////
      // const reportId=this.assignCondition().reportId
      // const obj=this.assignCondition().obj
      // console.log(reportId,obj)
      // const data={'reportId':reportId,'where':obj}
      // queryList(data).then(res=>{
      //   this.sourceData=res.data
      // })
    },
    //导出当前页数据
    exportData(){
      const reportId=this.assignCondition().reportId
      const obj=this.assignCondition().obj
    },
  },
  created(){
    this.$nextTick(()=>{
      //this.getReportList()
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