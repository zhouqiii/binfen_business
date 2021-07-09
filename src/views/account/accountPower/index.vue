<template>
  <div class="app-container">
    <div class="main-header">
      <span class="supplier-name">角色名称:</span>
      <el-input v-model="listQuery.keyword" placeholder="请输入内容" size="small"></el-input>
      <el-button type="primary" size="small" @click="handleSearchList()">查询</el-button>
      <el-button size="small" @click="handleResetSearch()">重置</el-button>
    </div>
    <div class="add-btn">
      <el-button type="primary" v-show="addShow" size="small" @click="handleAdd()">+ 新增角色</el-button>
    </div>
    <div class="table-container">
      <el-table ref="roleTable" :data="list" style="width: 100%;" v-loading="listLoading" border>
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">
            <span>{{(listQuery.pageNum - 1) * listQuery.pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="描述" align="center">
          <template slot-scope="scope">{{scope.row.description}}</template>
        </el-table-column>
        <el-table-column label="用户数" align="center" v-if="false">
          <template slot-scope="scope">{{scope.row.adminCount}}</template>
        </el-table-column>
        <el-table-column label="添加时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="是否启用" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status"
              v-if="scope.row.id == 1"
              disabled
            ></el-switch>
            <el-switch
              @change="handleStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status"
              v-else
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px" align="center">
          <template slot-scope="scope">
              <el-button
                v-show="peiShow"
                size="mini"
                type="text"
                @click="handleSelectMenu(scope.$index, scope.row)"
              >分配菜单</el-button>

              <el-button size="mini" v-show="updateShow" type="text" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" v-show="delShow" v-if="scope.row.id == 1" disabled type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    <el-dialog :title="isEdit?'编辑角色':'添加角色'" :visible.sync="dialogVisible" width="40%">
      <el-form :model="role" ref="roleForm" label-width="150px" size="small">
        <el-form-item label="角色名称：">
          <el-input v-model="role.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input v-model="role.description" type="textarea" :rows="5" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="role.status">
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
  </div>
</template>
<script>
import {
  fetchList,
  createRole,
  updateRole,
  updateStatus,
  deleteRole
} from "@/api/role";
import { formatDate } from "@/utils/date";
import { getters } from "vuex";
import store from '@/store';

const page = {
  pageNum: 1,
  pageSize: store.state.app.pageSize,
  keyword: null
};
const defaultRole = {
  id: null,
  name: null,
  description: null,
  adminCount: 0,
  status: 1
};
export default {
  name: "roleList",
  data() {
    return {
      delShow: false,
      updateShow: false,
      addShow: false,
      peiShow: false,
      listQuery: Object.assign({}, page),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      role: Object.assign({}, defaultRole),
      isEdit: false
    };
  },
  created() {
    this.getList();
    //是否有按钮判断
    this.$store.getters.menusTrees.forEach(item =>{
      if(item.id==1){
        item.children.forEach(item1 =>{
          if(item1.id==3){
            item1.children.forEach(item2 =>{
              if(item2.id == 15){
                this.addShow = true
              }else if(item2.id == 16){
                this.updateShow = true
              }else if(item2.id == 17){
                this.delShow = true
              }else if(item2.id == 18){
                this.peiShow = true
              }
            })
          }
        })
      }
    })
  },
  // computed: mapState({
  // count: state => state.count  //传入state,返回state.count
  // // 大概就是 count = state.count
  // }),
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
      this.role = Object.assign({}, defaultRole);
    },
    handleStatusChange(index, row) {
      this.$confirm("是否要修改该状态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = new URLSearchParams();
          data.append("status", row.status);
          updateStatus(row.id, data).then(response => {
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
    handleDelete(index, row) {
      this.$confirm("是否要删除该角色?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = {
          roleId: row.id
        }
        // params.append("id", row.id);
        deleteRole(params).then(res => {
          if(res.code == 200 && res.success == true){
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getList();
          }else{
            this.$message({
              type: "error",
              message: res.message
            });
          }
        });
      });
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.role = Object.assign({}, row);
    },
    handleDialogConfirm() {
      this.$confirm("是否要确认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (this.isEdit) {

          updateRole(this.role.id, this.role).then(response => {
            this.$message({
              message: "修改成功！",
              type: "success"
            });
            this.dialogVisible = false;
            this.getList();
          });
        } else {
          createRole(this.role).then(response => {
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
    handleSelectMenu(index, row) {
      this.$router.push({
        name: "allocMenu",
        params: {
          roleId: row.id
        }
      });
    },
    handleSelectResource(index, row) {
      this.$router.push({
        name: "allocResource",
        params: {
          roleId: row.id
        }
      });
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
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
