<template>
  <div class="app-container">
    <div class="add-btn">
      <el-button type="info" size="medium" @click="handleAdd()">新增团队</el-button>
    </div>
    <div class="table-container">
      <el-table ref="adminTable" :data="list" style="width:100%,height:52px" v-loading="listLoading" class="table" :header-cell-style="{background:'#cccccc',color:'#333333'}">
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">
            <span>{{(listQuery.pageNum - 1) * listQuery.pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="团队名称" align="center">
          <template slot-scope="scope">{{scope.row.groupName}}</template>
        </el-table-column>
        <el-table-column label="团队代码" align="center">
          <template slot-scope="scope">{{scope.row.groupId}}</template>
        </el-table-column>
<!--        <el-table-column label="团队状态" hidden width="80" align="center">-->
<!--          <template hidden slot-scope="scope">-->
<!--            <span v-if="scope.row.state == 1">有效</span>-->
<!--            <span v-if="scope.row.state == 0">删除</span>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column label="操作" width="260px" align="center">
          <template slot-scope="scope">
            <el-button v-show="editShow" size="medium" type="text"  @click="handleUpdate(scope.$index, scope.row)">修改</el-button>
            <el-button v-show="deleteShow" size="medium" type="text"  @click="handleDelete( scope.row)">删除</el-button>
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
        :page-sizes="[10,15,20]"
        :total="total"
      ></el-pagination>
    </div>

    <el-dialog :title="isEdit?'':''" :visible.sync="dialogVisible" class="el-dialog--center" :custom-class="'group-radius'" width="35%">
      <el-form :model="admin" :rules="rules" ref="adminForm" class="form" label-width="150px" size="small">
        <el-form-item hidden="hidden" label="团队ID：">
          <el-input v-model="admin.id" style="width: 198px"></el-input>
        </el-form-item>
        <el-form-item label="团队名称：" prop="groupName">
          <el-input v-model="admin.groupName" style="width: 198px"></el-input>
        </el-form-item>
        <el-form-item label="团队代码：" prop="groupId">
          <el-input v-model="admin.groupId" v-if="disGroupId1" style="width: 198px" ></el-input>
          <el-input v-model="admin.groupId" v-if="disGroupId2" disabled style="width: 198px" ></el-input>
        </el-form-item>
        <el-form-item label="团队状态：" hidden prop="state">
          <el-radio-group v-model="admin.state">
            <el-radio :label="1">有效</el-radio>
            <el-radio :label="0">删除</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="info" @click="handleDialogConfirm()" size="medium" class="save-btn">保存</el-button>
        <el-button @click="dialogVisible = false" size="medium">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {
    updateStatus
  } from "@/api/login";
  import { groupList,createGroup,editGroup,infoByGroupId,deleteById } from "@/api/businessGroup";
  import { formatDate } from "@/utils/date";
  import store from '@/store';

  const page = {
    pageNum: 1,
    pageSize: store.state.app.pageSize,
    keyword: null
  };
  const defaultAdmin = {
    id: null,
    groupId: "",
    groupName: "",
    state: 1
  };
  export default {
    name: "adminList",
    data() {
      var checkIsSame = (rule, value, callback) => {
        infoByGroupId(this.admin).then(res => {
          if (res.data != null && value == res.data.groupId) {
            callback(new Error("团队代码已存在"));
          } else {
            callback();
          }
        });
      };
      var checkLen = (rule, value, callback) => {
          if (value.length >= 10) {
            callback(new Error("字符长度不超过10"));
          } else {
            callback();
          }
      };
      return {
        editShow:false,
        deleteShow:false,
        disGroupId1:true,
        disGroupId2:false,
        listQuery: Object.assign({}, page),
        list: null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        admin: Object.assign({}, defaultAdmin),
        isEdit: false,
        rules: {
          groupName: [{ required: true, message: " ", trigger: "blur" }],
          groupId: [
                  { required: true, message: " ", trigger: "blur" },
                  {pattern:/^[A-Za-z0-9]{1,30}$/,message:'目前仅支持字符和数字的组合'},
                  // {validator:checkIsSame,trigger: "blur"},
            {validator:checkLen,trigger: "blur"},

                  ],
          state:[{ required: true, message: " ", trigger: "blur" }],
        }
      };
    },
    created() {
      this.getList();
      //是否有按钮判断
      this.$store.getters.menusTrees.forEach(item =>{
        if(item.id==4){
          item.children.forEach(item1 =>{
            console.log("===="+item1.id)
            if(item1.id==5){
              item1.children.forEach(item2 =>{
                if(item2.title == '团队修改'){
                  this.editShow = true
                }
                if(item2.title == '团队删除'){
                  this.deleteShow = true
                }
              })
            }
          })
        }
      })
    },
    filters: {
      formatDateTime(time) {
        if (time == null || time === "") {
          return "N/A";
        }
        let date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm:ss");
      }
    },
    methods: {
      //禁用
      disableduse(index, row) {

        this.$confirm("是否要禁用?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {

            let status = 0;
            if(row.status==0){
              status = 1;
            }
            admin_updateStatus(row.id, status ).then(response => {
              this.$message({
                type: "success",
                message: status== 0? "已禁用!" :"已启用"
              });
              this.getList();

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
        this.dialogVisible = true;
        this.isEdit = false;
        this.disGroupId1 = true;
        this.disGroupId2 = false;
        this.admin = Object.assign({}, defaultAdmin);
        console.log(this.admin);
        // console("qwe");
        // this.$router.push("accountAdd");
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

      handleUpdate(index, row) {
       // console.log(row)
        let sta = parseInt(row.state);
        row.state = sta;
        this.dialogVisible = true;
        this.isEdit = true;
        this.disGroupId1 = false;
        this.disGroupId2 = true;
        this.admin = Object.assign({}, row);

       // console.log(this.admin.state=="0")
      },
      handleDelete(row) {
        this.$confirm("是否要删除该团队?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          deleteById(row).then(response => {
            this.$message({
              message: "删除成功！",
              type: "success"
            });
            this.getList();
          });
        });
      },
      handleDialogConfirm() {

        if(this.isEdit == false){
          infoByGroupId(this.admin).then(res => {
            if (res.data != null && this.admin.groupId == res.data.groupId) {
              this.$message({
                message: "团队代码已存在！",
                type: "error"
              });
            }else{
              this.submitMethod();
            }
          });
        }else{
          this.submitMethod();
        }
      },
      submitMethod(){
        this.$refs.adminForm.validate() //判断表单验证是否通过，验证通过执行.then()，否则执行.catch()
          .then(res => {
            this.$confirm("是否要确认?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              if (this.isEdit) {
                editGroup(this.admin).then(response => {
                  this.$message({
                    message: "修改成功！",
                    type: "success"
                  });
                  this.dialogVisible = false;
                  this.getList();
                });
              } else {
                createGroup(this.admin).then(response => {
                  this.$message({
                    message: "添加成功！",
                    type: "success"
                  });
                  this.dialogVisible = false;
                  this.getList();
                });
              }
            });
          }).catch(error => {
          setTimeout(() => {
            this.$message({
              type: 'error',
              message: '请填写完整的信息'
            });
            this.loadingBtn = false;
          }, 500);
        })
      },
      getList() {
        // this.listLoading = true;
        groupList(this.listQuery).then(response => {
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
    margin: 4px 0;
  }
  .main-header >>> .el-input {
    width: 200px;
    margin-right: 20px;
  }
/* 分页样式 */
.pagination {
    display: flex !important;
    justify-content: center !important;
    margin-top: 40px;
    padding: 2px 5px;
    /* width: 400px;  */
}
</style>
<style>
/* 圆角边框 */
.group-radius{
  border-radius: 13px;
  width: 342px;
  height: 300px;
}
/* 添加按钮样式 */
.add-btn .el-button--info{
  background-color: #666666;
  margin-left: 20px;
  border-radius: 8px;
  font-size: 7px;
}
/* 保存按钮样式 */
.save-btn .el-button--info{
  background-color:#02294C;
}
/* 移入时高亮，高亮的颜色 #DEF3F6 */
.el-table tbody tr:hover>td {
    background-color:#DEF3F6!important;
}
/* radio样式修改,文字为黑色 */
.el-radio__input.is-checked + .el-radio__label {
  color: #333333 !important;
}
</style>
