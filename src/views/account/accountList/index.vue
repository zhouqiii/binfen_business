<template>
  <div class="app-container">
    <!--<div class="main-header">
      <span class="supplier-name">所属部门:</span>
      <el-input v-model="listQuery.keyword" placeholder="请输入内容" size="small" @keyup.enter.native="handleSearchList()"></el-input>
      <el-button type="primary" size="small" @click="handleSearchList()">查询</el-button>
      <el-button size="small" @click="handleResetSearch()">重置</el-button>
    </div>-->
    <div class="add-btn">
      <el-button type="primary" v-show="addShow" size="small" @click="handleAdd()">+ 新增账号</el-button>
    </div>
    <div class="table-container">
      <el-table ref="adminTable" :data="list" style="width:100%;" v-loading="listLoading" border>
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">
            <span>{{(listQuery.pageNum - 1) * listQuery.pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">{{scope.row.realName}}</template>
        </el-table-column>
        <el-table-column label="登录名称" align="center">
          <template slot-scope="scope">{{scope.row.mobile}}</template>
        </el-table-column>
<!--        <el-table-column label="登录密码" align="center">-->
<!--          <template slot-scope="scope">{{scope.row.password}}</template>-->
<!--        </el-table-column>-->
        <el-table-column label="所属产品" align="center">
          <template slot-scope="scope" hidden>{{scope.row.businessId}}</template>
          <template slot-scope="scope" >{{scope.row.productName}}</template>
        </el-table-column>
        <el-table-column label="角色" align="center">
          <template slot-scope="scope"><span>{{scope.row.roleName}}</span></template>
        </el-table-column>
        <el-table-column label="是否启用" width="80" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              on-color="#00A854"
              on-text="启动"
              :active-value="1"
              off-color="#F04134"
              off-text="禁止"
              :inactive-value="0"
              v-if="scope.row.id == 4"
              disabled
              @change="disableduse(scope.row)">
            </el-switch>
            <el-switch
              v-model="scope.row.status"
              on-color="#00A854"
              on-text="启动"
              :active-value="1"
              off-color="#F04134"
              off-text="禁止"
              :inactive-value="0"
              v-else
              @change="disableduse(scope.row)">
            </el-switch>

            <!-- <span v-if="scope.row.status == 0">禁用</span>
            <span v-if="scope.row.status == 1">启用</span> -->
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160px" align="center">
          <template slot-scope="scope">
            <!-- <el-button
              size="mini"
              type="text"
              @click="handleSelectRole(scope.$index, scope.row)"
            >分配角色</el-button>
            <el-button size="mini" type="text" @click="repetPwd(scope.$index, scope.row)">重置密码</el-button> -->
            <!-- <el-button size="mini" type="text" @click="disableduse(scope.$index, scope.row)">
              <span v-if="scope.row.status == 1">禁用</span>
              <span v-if="scope.row.status == 0">启用</span>
            </el-button> -->
            <el-button size="mini"  type="text" @click="repetPwd(scope.$index, scope.row)">重置密码</el-button>
            <el-button size="mini" v-show="updateShow" type="text" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" v-show="delShow" v-if="scope.row.id == 4" disabled type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button size="mini" v-show="delShow" v-else type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        :page-sizes="[10,15,20]"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog :title="isEdit?'编辑用户':'添加用户'" :visible.sync="dialogVisible" width="40%">
      <el-form :model="admin" ref="adminForm" label-width="150px" size="small">
        <el-form-item label="帐号：">
          <el-input v-model="admin.username" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="admin.nickName" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="admin.email" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="admin.password" type="password" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="admin.note" type="textarea" :rows="5" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="admin.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="分配角色" :visible.sync="allocDialogVisible" width="30%">
      <el-select v-model="allocRoleIds" multiple placeholder="请选择" size="small" style="width: 80%">
        <el-option v-for="item in allRoleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="allocDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleAllocDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  fetchList,
  createAdmin,
  updateAdmin,
  updateStatus,
  deleteAdmin,
  getRoleByAdmin,
  allocRole
} from "@/api/login";
import { fetchAllRoleList,admin_updateStatus, resetPassword } from "@/api/role";
import { formatDate } from "@/utils/date";
import { setAdmin ,refreshPwd} from "@/api/login";
import store from '@/store';

const page = {
  pageNum: 1,
  pageSize: store.state.app.pageSize,
  keyword: null
};
const defaultAdmin = {
  id: null,
  username: null,
  password: null,
  nickName: null,
  email: null,
  note: null,
  status: 1
};
export default {
  name: "adminList",
  data() {
    return {
      addShow: false,
      updateShow: false,
      delShow: false,
      listQuery: Object.assign({}, page),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      admin: Object.assign({}, defaultAdmin),
      isEdit: false,
      allocDialogVisible: false,
      allocRoleIds: [],
      allRoleList: [],
      allocAdminId: null
    };
  },
  created() {
    this.getList();
    this.getAllRoleList();
    this.$store.getters.menusTrees.forEach(item =>{
      if(item.id==1){
        item.children.forEach(item1 =>{
          if(item1.id == 2){
            item1.children.forEach(item2 =>{
              if(item2.id == 12){
                this.addShow = true
              }else if(item2.id == 13){
                this.updateShow = true
              }else if(item2.id == 14){
                this.delShow = true
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
    // 重置密码
    repetPwd(index, row) {
      console.log("重制密码");
      this.$confirm("是否重置?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(()=>{
        resetPassword(row.id).then(res =>{
          if(res.code == 200 && res.success == true){
            this.$message({
              type: "success",
              message: "重置成功"
            });
          }
        })
      })
    },
    //禁用
    disableduse(row) {
      console.log(row.status,"状态")
      let marker = ''
      if(row.status == 0){
        marker = '禁用'
      }else{
        marker = '启用'
      }
      this.$confirm("是否要"+marker+"?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          let status = row.status;
          // if(row.status==0){
          //   status = 1;
          // }
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
      // this.dialogVisible = true;
      // this.isEdit = false;
      // this.admin = Object.assign({}, defaultAdmin);
      // console("qwe");
      this.$router.push("accountAdd");
    },
    handleStatusChange(index, row) {
      this.$confirm("是否要修改该状态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          updateStatus(row.id, { status: row.status }).then(response => {
            this.$message({
              type: "success",
              message: "修改成功!"
            });
          });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "取消修改"
          });
          this.getList();
        });
    },
    handleDelete(index, row) {
      this.$confirm("是否要删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteAdmin(row.id).then(response => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getList();
        });
      });
    },
    // handleRefresh(index, row) {
    //   console.log(index, row);
    //   let id =  row.id;
    //   RefreshPwd(id).then(res => {
    //     console.log(res,"返回数据")
    //     if (res.code == 200 && res.success == true) {
    //       this.$router.push({
    //         name: "accountSet",
    //         params: {
    //           data: res.data
    //         }
    //       })
    //     }
    //   });
    // },
    handleUpdate(index, row) {
      console.log(index, row);
      let id =  row.id;
      setAdmin(id).then(res => {
        console.log(res,"返回数据")
        if (res.code == 200 && res.success == true) {
          this.$router.push({
            name: "accountSet",
            params: {
              data: res.data
            }
          })
        }
      });
    },
    handleDialogConfirm() {
      this.$confirm("是否要确认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (this.isEdit) {
          updateAdmin(this.admin.id, this.admin).then(response => {
            this.$message({
              message: "修改成功！",
              type: "success"
            });
            this.dialogVisible = false;
            this.getList();
          });
        } else {
          createAdmin(this.admin).then(response => {
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
    handleAllocDialogConfirm() {
      this.$confirm("是否要确认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = new URLSearchParams();
        params.append("adminId", this.allocAdminId);
        params.append("roleIds", this.allocRoleIds);
        allocRole(params).then(response => {
          this.$message({
            message: "分配成功！",
            type: "success"
          });
          this.allocDialogVisible = false;
        });
      });
    },
    handleSelectRole(index, row) {
      this.allocAdminId = row.id;
      this.allocDialogVisible = true;
      this.getRoleListByAdmin(row.id);
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    getAllRoleList() {
      fetchAllRoleList().then(response => {
        this.allRoleList = response.data;
      });
    },
    getRoleListByAdmin(adminId) {
      getRoleByAdmin(adminId).then(response => {
        let allocRoleList = response.data;
        this.allocRoleIds = [];
        if (allocRoleList != null && allocRoleList.length > 0) {
          for (let i = 0; i < allocRoleList.length; i++) {
            this.allocRoleIds.push(allocRoleList[i].id);
          }
        }
      });
    }
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
</style>
