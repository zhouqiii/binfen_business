<template>
  <div class="app-container">
    <el-form label-width="120px" >
      <el-row>
        <el-col :span="8">
          <el-form-item label="任务名称:">
            <el-select v-model="listQuery.taskName" filterable placeholder="请选择">
              <el-option
                v-for="item in TaskAllFullList"
                :key="item.taskId"
                :label="item.taskName"
                :value="item.taskName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年份:">
            <el-select v-model="listQuery.time" filterable placeholder="请选择" @change="timeChange">
              <el-option
                v-for="item in timeList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="批次:">
            <el-select v-model="listQuery.batchNo" filterable placeholder="请选择">
              <el-option
                v-for="item in batchList"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="风险等级:">
            <el-select v-model="listQuery.dangerType" filterable placeholder="请选择">
              <el-option
                v-for="item in dangerTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属产品:">
            <el-select v-model="listQuery.productName" filterable placeholder="请选择">
              <el-option
                v-for="item in projectList"
                :key="item.id"
                :label="item.productName"
                :value="item.productName"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button type="primary" size="small" @click="handleSearchList()">查询</el-button>
            <el-button size="small" @click="handleResetSearch()">重置</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" icon="el-icon-plus" style="float: right;" size="small" @click="handleAdd()">新增任务</el-button>
        </el-col>
      </el-row>
    </el-form>

    <div class="table-container">
      <el-table ref="adminTable" :data="list" style="width:100%;" v-loading="listLoading" border>
<!--        <el-form-item hidden="hidden" label="ID：">-->
<!--          <el-input slot-scope="scope">{{scope.row.id}}</el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item  label="projectId">-->
<!--          <el-input slot-scope="scope">{{scope.row.projectId}}</el-input>-->
<!--        </el-form-item>-->
        <el-table-column label="任务名称">
            <template slot-scope="scope">{{scope.row.taskName}}</template>
        </el-table-column>
        <el-table-column label="产品名称" align="center" width="100">
            <template slot-scope="scope">{{scope.row.productName}}</template>
        </el-table-column>
        <el-table-column label="批次" align="center" width="80">
          <template slot-scope="scope">{{scope.row.batchNo}}</template>
        </el-table-column>
        <el-table-column label="任务下达时间" align="center" width="120">
          <template slot-scope="scope">{{scope.row.taskStartDate}}</template>
        </el-table-column>
        <el-table-column label="总体设计评审时间" align="center" width="140">
          <template slot-scope="scope">{{scope.row.totalDesignDate}}</template>
        </el-table-column>
        <el-table-column label="内部复测时间" align="center" width="120">
          <template slot-scope="scope">{{scope.row.innerTestDate}}</template>
        </el-table-column>
        <el-table-column label="正式版本提交时间" align="center" width="140">
          <template slot-scope="scope">{{scope.row.productionUpDate}}</template>
        </el-table-column>
        <el-table-column label="风险等级" align="center" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.dangerType == '0'">无风险</span>
            <span v-if="scope.row.dangerType == '1'">低风险</span>
            <span v-if="scope.row.dangerType == '2'">中风险</span>
            <span v-if="scope.row.dangerType == '3'">高风险</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="100px" align="center">
          <template slot-scope="scope">
            <el-button v-show="deleteShow"
              :disabled="scope.row.taskState != '0'"
              size="mini" type="text" @click="handleDelete( scope.row)">删除</el-button>
            <el-button v-show="infoShow" size="mini" type="text" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
            <el-button size="mini" type="text" @click="handleSetMember(scope.$index, scope.row)">设置参与人员</el-button>
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
<!--查看压缩包start-->
    <el-dialog :title="isEdit?'':''" :visible.sync="dialogVisible" class="el-dialog--center" :custom-class="'group-radius'" width="35%">
      <el-form :model="admin" ref="adminForm" class="form" label-width="150px" size="small">
        <div >
          <div v-for="(item,index) in fileList" :key="index">
            <div class="file_class" >
              <div class="img_div_class">
                <!--                        <img src="../../icons/file/" />-->
              </div>
              <div class="img_file_class">{{item.name}}</div>
            </div>
          </div>
        </div>
      </el-form>
      <span slot="footer">
        <el-button type="info" @click="handleDialogConfirm()" size="medium" class="save-btn">保存</el-button>
        <el-button @click="dialogVisible = false" size="medium">关闭</el-button>
      </span>
    </el-dialog>
<!--查看压缩包end-->
  </div>
</template>
<script>
import {
  updateStatus
} from "@/api/login";
import { createProgramme,editProgramme} from "@/api/businessProgramme";
import { taskList, taskFullList, deleteTask, batchList } from "@/api/businessTask";
import { listAll } from '@/api/businessProduct';
import store from '@/store'
  // import { formatDate } from "@/utils/date";


  const page = {
    pageNum: 1,
    pageSize: store.state.app.pageSize,
    batchNo:null,
    taskName:null,
    dangerType:null,
    productName: null,
    time: null,
  };
  const defaultAdmin = {
    id: null,
    productId: null,
    productName: null,
    belongToGroup: '',
    groupList: null,
    state: 1,
    groupArray: [],
    uuid: ''
  };
  export default {
    name: "taskList",
    data() {
      return {
        deleteShow:false,
        infoShow:false,
        listQuery: Object.assign({}, page),
        list: null,
        groupList: null,
        TaskAllFullList: [],
        timeList: [],
        projectList: [],
        dangerTypeList:[
          {
            value: '0',
            label: '无风险'
          },
          {
            value: '1',
            label: '低风险'
          },
          {
            value: '2',
            label: '中风险'
          },
          {
            value: '3',
            label: '高风险'
          }
        ],
        productList:null,
        batchList:null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        fileList:null,
        admin: Object.assign({}, defaultAdmin),
        isEdit: false,
      };
    },
    created() {
      this.$nextTick(() => {
        // 获取年份
        this.getTimeList();
        //产品列表
        listAll().then(response => {
          this.projectList = response.data;
        });

        this.getList();
        // Full(this.listQuery).then(response => {
        //   this.listLoading = false;
        //   this.list = response.data.list;
        // });
        //任务列表
        taskFullList().then(response => {
          this.TaskAllFullList = response.data.list;
          console.log('this.TaskAllFullList', this.TaskAllFullList);
        });

        //是否有按钮判断
        // console.log('this.$store.getters.menusTrees', this.$store.getters.menusTrees);
        this.$store.getters.menusTrees.forEach(item =>{
          if(item.id==34){
            item.children.forEach(item1 =>{
              console.log("===="+item1.id)
              if(item1.id==35){
                item1.children.forEach(item2 =>{
                  if(item2.title == '任务删除'){
                    this.deleteShow = true
                  }
                  if(item2.title == '任务详情'){
                    this.infoShow = true
                  }
                })
              }
            })
          }
        })
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
      timeChange(val) {
        this.listQuery.batchNo = null;
        this.getBatchList(val)
      },
      //批次列表
      getBatchList(year) {
        batchList({time: year}).then(response => {
          this.batchList = response.data;
        });
      },
      getTimeList() {
        const date = new Date();
        let year = date.getFullYear();
        this.listQuery.time = year.toString();
        this.getBatchList(this.listQuery.time);
        for(let i = year+1; i >= 2017; i--) {
          this.timeList.push(i.toString());
        }
      },
      fileView(){
        this.dialogVisible = true;
        this.isEdit = false;
        this.admin = Object.assign({}, defaultAdmin);
        //查询文件列表
      },
      handleCheckedCitiesChange(admin) {
        let temp = "";
        for (let item of admin.groupArray){
          temp = temp+value+",";
          console.log(temp);
        }
        temp = temp.substring(0,temp.length-1);
        admin.belongToGroup = temp;
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
      handleAdd() {
        this.$router.push("taskAdd");
      },
      handleStatusChange(index, row) {
        this.$confirm("是否要修改该状态?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            updateStatus(row.id, { status: row.status }).then(response => {
              this.$message({
                type: "success",
                message: "修改成功!"
              });
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消修改"
            });
            this.getList();
          });
      },
      //修改
      handleDelete(row) {
        this.$confirm("是否要删除该任务?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          deleteTask(row).then(response => {
            this.$message({
              message: "删除成功！",
              type: "success"
            });
            this.dialogVisible = false;
            this.getList();
          });
        });
      },
      //详情
      handleInfo(index, row) {
        this.$router.push({
          path:'/taskInfo',
          name:'taskInfo',
          query:{
            id : row.id,
            projectId:row.projectId
          }
        })
      },
      // 设置参与人员
      handleSetMember(index, row) {
        this.$router.push({
          path:'/taskMember',
          name:'taskMember',
          query:{
            taskId:row.taskId,
            taskName:row.taskName,
          }
        })
      },
      handleDialogConfirm() {
        this.$confirm("是否要确认?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          if (this.isEdit) {
            editProgramme(this.admin).then(response => {
              this.$message({
                message: "修改成功！",
                type: "success"
              });
              this.dialogVisible = false;
              this.getList();
            });
          } else {
            createProgramme(this.admin).then(response => {
              this.$message({
                message: "添加成功！",
                type: "success"
              });
              this.dialogVisible = false;
              this.getList();
            });
          }
        });
      },

      getList() {
        this.listLoading = true;
        taskList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.list.forEach((item) => {
            if (item.taskName.length > 20) {
              item.taskName = item.taskName.substring(0,20) + '...';
            }
          });
          this.total = response.data.total;
        });
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
    width: 120px;
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
