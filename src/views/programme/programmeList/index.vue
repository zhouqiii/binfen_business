<template>
  <div class="app-container">
    <div class="main-header">
      <span class="supplier-name">项目名称:</span>
      <el-input v-model="listQuery.projectName" placeholder="请输入" size="small"></el-input>
      <span class="supplier-name">细化名称:</span>
      <el-input v-model="listQuery.refineName" placeholder="请输入" size="small"></el-input>
      <span class="supplier-name">产品名称:</span>
      <el-select v-model="listQuery.productId" placeholder="请选择" @change="">
        <el-option
          v-for="item in productList"
          :key="item.productId"
          :label="item.productName"
          :value="item.productId">
        </el-option>
      </el-select>
    </div>
      <div class="main-header">
        <span class="supplier-name">架构师:</span>
        <el-select v-model="listQuery.user" placeholder="请选择" @change="">
          <el-option
            v-for="item in userList"
            :key="item.realName"
            :label="item.realName"
            :value="item.realName">
          </el-option>
        </el-select>
        <span class="supplier-name">上传时间:</span>
        <div class="block">
          <el-date-picker
            v-model="listQuery.dt"
            type="date"
            format="yyyy.MM.dd"
            value-format="yyyy.MM.dd"

            placeholder="选择时间">
          </el-date-picker>
        </div>

      <el-button type="primary" size="small" @click="handleSearchList()">查询</el-button>
      <el-button size="small" @click="handleResetSearch()">重置</el-button>
    </div>

    <div class="add-btn">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="handleAdd()">新增方案</el-button>
    </div>
    <div class="table-container">
      <el-table ref="adminTable" :data="list" style="width:100%;" v-loading="listLoading" border>
<!--        <el-form-item hidden="hidden" label="ID：">-->
<!--          <el-input slot-scope="scope">{{scope.row.id}}</el-input>-->
<!--        </el-form-item>-->
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">
            <span>{{(listQuery.pageNum - 1) * listQuery.pageSize + scope.$index + 1}}</span>
          </template>

        </el-table-column>
        <el-table-column label="项目名称" align="center">
          <template slot-scope="scope">{{scope.row.projectName}}</template>
        </el-table-column>
        <el-table-column label="细化名称" align="center">
          <template slot-scope="scope">{{scope.row.refineName}}</template>
<!--          <template hidden slot-scope="scope">{{scope.row.refineId}}</template>-->
        </el-table-column>
        <el-table-column label="需求编号" align="center">
          <template slot-scope="scope">{{scope.row.parentDemandName}}-{{scope.row.childDemandName}}</template>
        </el-table-column>
        <el-table-column label="工作量" align="center" width="100">
          <template slot-scope="scope">{{scope.row.workload}}</template>
        </el-table-column>
        <el-table-column label="上传方案" width="100" align="center">
          <template slot-scope="scope">
            <el-button  v-if="scope.row.fileId != 0 " size="mini" type="text" @click="fileView(scope.$index, scope.row)">查看</el-button>
            <span v-if="scope.row.fileId == 0">无</span>
          </template>
        </el-table-column>
        <el-table-column label="产品" align="center">
          <template slot-scope="scope">{{scope.row.productName}}</template>
        </el-table-column>
        <el-table-column label="架构师" align="center" width="100">
          <template slot-scope="scope">{{scope.row.user}}</template>
        </el-table-column>
        <el-table-column label="上传时间" align="center" width="120">
          <template slot-scope="scope">{{scope.row.dt}}</template>
        </el-table-column>
        <el-table-column label="操作" width="100px" align="center">
          <template slot-scope="scope">
            <el-button v-show="deleteShow" size="mini" type="text" @click="handleDelete( scope.row)">删除</el-button>
            <el-button v-show="infoShow" size="mini" type="text" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination" style="margin-right:5px">
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
    <el-dialog :title="isEdit?'':''" :visible.sync="dialogVisible" :custom-class="'radius'" width="60%" center  >
      <el-form :model="admin" ref="adminForm" class="form" label-width="150px" size="small">
          <div style="display: flex;">
            <div style="display: inline-block;padding-right:10px;" v-for="(item,index) in fileList" :key="index">
              <div class="file_class" >
                <div class="img_div_class">
                  <img style="margin-top:10px;" v-if="item.fileName.indexOf('.doc') > 0" src="@/assets/images/w.png" />
                  <img style="margin-top:10px;" v-if="item.fileName.indexOf('.xls') > 0" src="@/assets/images/x.png" />
                </div>
                <div class="img_file_class">{{item.fileName}}</div>
              </div>
            </div>
        </div>
<!--          <el-upload-->
<!--            action="http://localhost:9080/web/businessZipFile/create"-->
<!--            list-type="picture-card"-->
<!--            :on-preview="handlePictureCardPreview"-->
<!--            :auto-upload="false"-->
<!--            :on-remove="handleRemove">-->
<!--            <i class="el-icon-plus"></i>-->
<!--          </el-upload>-->
<!--        <div class="box">-->
<!--          <div class="imgBox iconBox">-->
<!--            <i class="el-icon-plus"></i>-->
<!--          </div>-->
<!--          <div class="upWord">上传方案</div>-->
<!--        </div>-->
      </el-form>
      <span slot="footer">
        <el-button type="info" @click="download()" size="medium" class="save-btn">下载</el-button>
<!--        <el-button type="info" @click="handleDialogConfirm()" size="medium" class="save-btn">保存</el-button>-->
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
  import { programmeList,createProgramme,editProgramme,deleteProgramme,infoProgramme } from "@/api/businessProgramme";
  import { listAll} from "@/api/businessProduct";
  import { download } from "@/api/businessZipFile";
  import { userList } from "@/api/login";
  import store from '@/store'

  const page = {
    pageNum: 1,
    pageSize: store.state.app.pageSize,
    keyword: null,
    projectName:null,
    refineName:null,
    productName:null,
    productId:null,
    user:null,
    dt:null
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
    name: "adminList",
    data() {
      return {
        deleteShow:false,
        infoShow:false,
        listQuery: Object.assign({}, page),
        list: null,
        groupList: null,
        productList:null,
        userList:null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        fileList:[],
        admin: Object.assign({}, defaultAdmin),
        isEdit: false,
        programmeId:"",
        dialogImageUrl: '',
        dialogVisibleFile: false,
        disabled: false
      };
    },
    created() {
      // alert("1213")
      // this.getList();
      this.getList();
      //架构师用户列表
      userList().then(response => {
        this.userList = response.data;
      });
      //产品列表
      listAll().then(response => {
        this.productList = response.data;
      });
      //是否有按钮判断
      this.$store.getters.menusTrees.forEach(item =>{
        if(item.id==10){
          item.children.forEach(item1 =>{
            if(item1.id==11){
              item1.children.forEach(item2 =>{
                if(item2.title == '方案删除'){
                  this.deleteShow = true
                }
                if(item2.title == '方案详情'){
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
      fileView(index,row){
        this.fileList = [];
        this.dialogVisible = true;
        this.isEdit = false;
        this.programmeId = row.programmeId;
        console.log("======>"+this.programmeId)
        this.admin = Object.assign({}, defaultAdmin);
        //查询文件列表
        infoProgramme(row).then(res => {
          console.log(res)
          this.fileList = res.data.zipFileList;

        });

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
      //上传文件start
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        // if(file.name.indexOf('.doc')){
        //   this.dialogImageUrl = "@/assets/images/w.png";
        // }else if(file.name.indexOf('.xls')){
        //   this.dialogImageUrl = "@/assets/images/x.png";
        // }
        this.dialogVisible = true;
      },
      //上传文件end
      //下载文件
      download(){
        this.dialogVisible = false;
        this.getList();
        download(this.programmeId)/*.then(response => {
          console.log("====>>>"+response.code)
          if(response.code == "200"){
            this.$message({
              message: "下载成功！",
              type: "success"
            });
          }

        })*/;
      },
      handleAdd() {
        // this.dialogVisible = true;
        // this.isEdit = false;
        // this.admin = Object.assign({}, defaultAdmin);
        this.$router.push("programmeAdd");
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
        console.log(row)
        this.$confirm("是否要删除该方案?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          deleteProgramme(row).then(response => {
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
          path:'/programmeInfo',
          name:'programmeInfo',
          query:{
            id : row.id
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
        programmeList(this.listQuery).then(response => {
          console.log(response,"列表数据")
          this.listLoading = false;
          this.list = response.data.list;
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
    left: 0px;
    top: 0px;
    background: inherit;
    background-color: rgba(242, 242, 242, 1);
    border-radius: 4px;
    -moz-box-shadow: none;
    box-shadow: none;
    width: 130px;
    height: 120px;
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
    margin-top: 20px;
  }
  .el-upload--picture-card {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 130px;
    height: 120px;
    line-height: 146px;
    vertical-align: top;
    margin-top: 20px;
  }
  .el-upload-list--picture-card .el-upload-list__item-actions {
    margin-top: 20px;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0,0,0,.5);
    -webkit-transition: opacity .3s;
    transition: opacity .3s;
  }

  .box{
    position: relative;
    width: 120px;
    height: 120px;
    padding: 20px;
    margin: 20px 20px 0 0;
    background-color: #efefef;
    border-radius: 12px;/* 圆角 */
    font-size: 14px;
  }
  .imgBox{
    width: 50px;
    height: 50px;
    margin: 14px auto 20px;
  }
  .imgBox img{
    width: 100%;
    height: 100%;
  }
  .iconBox{
    text-align: center;
    font-size: 50px;
    color: #999;
  }
  .upWord{
    margin-top: 30px;
    text-align: center;
    font-size: 16px;
    color: #777;
  }

</style>
