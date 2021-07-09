<template>
  <div class="app-container">
    <div class="main-header">
      <span class="supplier-name">项目名称:</span>
      <el-input v-model="listQuery.projectName" placeholder="请输入" size="small"></el-input>
<!--      <el-select v-model="listQuery.projectName" placeholder="请选择" @change="">-->
<!--        <el-option-->
<!--          v-for="item in projectList"-->
<!--          :key="item.projectName"-->
<!--          :label="item.projectName"-->
<!--          :value="item.projectName">-->
<!--        </el-option>-->
<!--      </el-select>-->
      <span class="supplier-name">立项年度:</span>
      <el-select v-model="listQuery.approvalData" filterable placeholder="请选择" >
        <el-option
          v-for="item in approvalDataList"
          :key="item.approvalData"
          :label="item.approvalData"
          :value="item.approvalData">
        </el-option>
      </el-select>
    </div>
    <div class="main-header">
      <span class="supplier-name">项目状态:</span>
      <el-select v-model="listQuery.state" placeholder="请选择" @change="">
        <el-option label="已完成" value="1"></el-option>
        <el-option label="未完成" value="2"></el-option>
        <el-option label="无" value="0"></el-option>
      </el-select>
      <div style="margin-left: 80px">
        <el-button type="primary" size="small" @click="handleSearchList()">查询</el-button>
        <el-button size="small" @click="handleResetSearch()">重置</el-button>
      </div>

    </div>

    <div class="add-btn">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="handleAdd()">新增项目</el-button>
    </div>
    <div class="table-container">
      <el-table ref="adminTable" :data="list" style="width:100%;" v-loading="listLoading" border>

<!--        <el-form-item hidden="hidden" label="ID：">-->
<!--          <el-input slot-scope="scope">{{scope.row.id}}</el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item hidden="hidden" label="projectId">-->
<!--          <el-input slot-scope="scope">{{scope.row.projectId}}</el-input>-->
<!--        </el-form-item>-->

        <el-table-column label="项目名称" align="center">
            <template slot-scope="scope">{{scope.row.projectName}}</template>
        </el-table-column>
        <el-table-column label="工作量" align="center" width="140">
          <template slot-scope="scope">{{scope.row.workload}}</template>
        </el-table-column>
        <el-table-column label="立项年度" align="center" width="140">
          <template slot-scope="scope">{{scope.row.approvalData}}</template>
        </el-table-column>
<!--        项目状态1：已完成，2：未完成，0：删除-->
        <el-table-column label="项目状态" align="center" width="250">
          <template slot-scope="scope">
            <el-progress :percentage="parseInt(scope.row.percentageState) " v-if="parseInt(scope.row.percentageState) == 100" status="success"></el-progress>
            <el-progress :percentage="parseInt(scope.row.percentageState)" v-else ></el-progress>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button v-show="deleteShow" size="mini" type="text" @click="handleDelete( scope.row)">删除</el-button>
            <el-button v-show="infoShow" size="mini" type="text" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
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
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,20,30,50]"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
  import {
    updateStatus
  } from "@/api/login";
  import { listPage,deleteProject,projectList} from "@/api/businessProject";
  import store from '@/store';

  const page = {
    pageNum: 1,
    pageSize: store.state.app.pageSize,
    keyword: null,
    projectName: "",
    projectId: "",
    approvalData:null,
    state:null,
  };
  const defaultAdmin = {
    id: null,
    productId: null,
    productName: null,
    state: 1,
    percentageState: '',
  };
  export default {
    name: "adminList",
    data() {
      return {
        deleteShow:false,
        infoShow:false,
        listQuery: Object.assign({}, page),
        list: null,
        approvalDataList:[],
        projectList:null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        admin: Object.assign({}, defaultAdmin),
      };
    },


    created() {
      this.init();
      this.getList();
      projectList().then(response => {
        this.projectList = response.data;
      });
      this.listQuery.projectName = "";
      //是否有按钮判断
      this.$store.getters.menusTrees.forEach(item =>{
        if(item.id==36){
          item.children.forEach(item1 =>{
            console.log("===="+item1.id)
            if(item1.id==37){
              item1.children.forEach(item2 =>{
                if(item2.title == '项目删除'){
                  this.deleteShow = true
                }
                if(item2.title == '项目详情'){
                  this.infoShow = true
                }
              })
            }
          })
        }
      })
    },
    filters: {
      // formatDateTime(time) {
      //   if (time == null || time === "") {
      //     return "N/A";
      //   }
      //   let date = new Date(time);
      //   return formatDate(date, "yyyy-MM-dd hh:mm:ss");
      // }
    },
    methods: {
      init(){
        var myDate = new Date;
        var year = myDate.getFullYear();//获取当前年
        this.initSelectYear(year+1)
        // this.listQuery.approvalData = year;
      },
      initSelectYear(year){
        for(let i=0;i<30;i++){
          this.approvalDataList.push({approvalData:(year - i),approvalDataName:(year - i)+ "年"});
        }
      },
      handleResetSearch() {
        this.listQuery = Object.assign({}, page);
        this.getList();
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;

        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      getList() {
        this.listLoading = true;
        listPage(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      },
      //修改
      handleDelete(row) {
        this.$confirm("是否要删除该项目?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          deleteProject(row).then(response => {
            this.$message({
              message: "删除成功！",
              type: "success"
            });
            this.dialogVisible = false;
            this.getList();
          });
        });
      },
      handleAdd() {
        this.$router.push("projectAdd");
      },
      //详情
      handleInfo(index, row) {
        console.log("----->"+row.id+"------>"+row.projectId)
        this.$router.push({
          path:'/projectInfo',
          name:'projectInfo',
          query:{
            id : row.id,
            projectId:row.projectId
          }
        })
      },

    }
  };
</script>

<style scoped>
  .main-header {
    text-align: center;
    align-items: center;
    display: flex;
    margin: 15px;
  }
  .supplier-name {
    display: inline-block;
    width: 100px;
  }
  .add-btn {
    margin: 20px 0;
  }
  .main-header >>> .el-input {
    width: 200px;
    margin-right: 20px;
  }
  .pagination {
    display: flex !important;
    justify-content: center !important;
    margin-top: 40px;
  }
  .must-input{
    color: red;
  }
  .file_class{
    border-width: 0px;
    position: absolute;
    left: 0px;
    top: 0px;
    background: inherit;
    background-color: rgba(242, 242, 242, 1);
    border-radius: 4px;
    -moz-box-shadow: none;
    box-shadow: none;

    width: 130px;
    height: 119px;
    font-family: 'Arial Normal', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    color: #333333;
    text-align: center;
    line-height: normal;
  }
  .img_div_class{
    border-width: 0px;
    width: 130px;
    height: 40px;
    margin-top: 20px;
  }
  .img_class{
    border-width: 0px;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 36px;
    height: 42px;
  }
  .img_file_class{
    top: 30px;
  }
</style>
