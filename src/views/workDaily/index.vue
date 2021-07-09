<template>
  <div>
    <div>
      <el-tabs type="border-card" @tab-click="handleClick">
        <el-tab-pane 
          :key="item.reportId"
          v-for="item in editableTabs"
          :name="item.reportId"
        >
          <span slot="label">{{item.title}}</span>
          <filter-condition v-for="(item,index) in conditions" :key="index" :title='item'>
          </filter-condition>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import FilterCondition from '../../components/check/FilterCondition.vue';
import {syllableList} from '@/api/check'
export default {
  components: { FilterCondition },
  name:'workDailyList',
  data(){
    return{
      conditions:[],
      editableTabs: [{//报表类型
        title: 'Tab 1',
        reportId: '02c',
      }, {
        title: 'Tab 2',
        reportId: '52a',
      }],
      listItem:[{'contentType':'1'},{'contentName':'2'}],
    }
  },
  methods:{
    handleClick(tab) {//切换tab加载筛选条件list
      const reportId = { reportId:tab.name }
      this.conditions=[]
      const nn=[ { "groupId": "部门编号" }, { "groupName": "部门名称" } ] 
       nn.map(item=>{
          this.conditions.push(Object.values(item).toString())
        })
      // syllableList(reportId).then(res => {
      //   const filList=res.data;
      //   filList.map(item=>{
      //     this.conditions.push(Object.values(item).toString())
      //   })
      // });
    }
  }
}
</script>
<style scoped>

</style>