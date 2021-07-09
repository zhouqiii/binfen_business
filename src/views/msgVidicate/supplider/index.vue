<template>
  <div class="supplier" v-loading="loading">
    <el-container>
      <el-main>
        <div class="main-header">
          <span class="supplier-name">部门名称:</span>
          <el-input v-model="page.name" placeholder="请输入内容" size="small" @keyup.enter.native="inquire"></el-input>
          <el-button type="primary" size="small" @click="inquire">查询</el-button>
          <el-button size="small" @click="reset">重置</el-button>
        </div>
        <div class="main-content">
          <div class="add-btn">
            <el-button type="primary" size="small" @click="supplierAdd">+ 新增部门</el-button>
          </div>
          <div class="table-data">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column label="序号" width="50" align="center">
                <template slot-scope="scope">
                  <span>{{(page.pageNum - 1) * page.pageSize + scope.$index + 1}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="businessCode" label="部门ID" align="center"></el-table-column>
              <el-table-column prop="businessName" label="部门名称" align="center"></el-table-column>
              <el-table-column align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="setBtnClick(scope.row)">编辑</el-button>
                  <el-button type="text" size="small" @click="deleteBtnClick(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="pageination">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="page.pageNum"
            :page-sizes="[10, 15, 20]"
            :page-size="page.size"
            layout="total, prev, pager, next, sizes, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getList, getBmsBusiness, delBmsBusiness } from "@/api/msgVdcApi";

export default {
  name: "supplier",
  data() {
    return {
      // 顶部搜索框
      input: "",
      // 回显数据
      tableData: [],
      // 当前页
      total: 0,
      currentPage: 1,
      nowPrdtNum: -1,
      
      page: {
        name:"",
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      loading: true
    };
  },
  methods: {
    getbmsBusinessList() {
      
      getList(this.page,this.name).then(res => {
        if (res.code == 200 && res.success == true) {
           this.loading = false;
           this.total = res.data.total;
           this.tableData = res.data.list;
        } else {
          this.$message({
            type: "error",
            message: res.message + ", 请刷新后重试"
          });
        }
      });
      
    },
    // 查询，重置
    inquire() {
      this.currentPage=1;
      this.page.pageNum=1;
      this.getbmsBusinessList();
      this.loading = true;
    },
    reset() {
      this.page.name = "";
      this.page.pageNum=1;
      this.currentPage=1;
      this.getbmsBusinessList();
    },
    // 新增部门
    supplierAdd() {
      console.log("新增部门");
      this.$router.push("supplierAdd");
    },
    // 编辑
    setBtnClick(row) {
      this.$router.push({
        name: "supplierSet",
        query: {id: row.id}
      })
    },
    deleteBtnClick(row) {
      console.log(row, "删除");
      this.$confirm("确认删除？")
        .then(() => {
          delBmsBusiness(row.id).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.getbmsBusinessList();
            } else if (res.code == 500) {
              this.$message({
                type: "error",
                message: res.message
              });
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 分页每页条数
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getbmsBusinessList();
    },
    // 翻页
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getbmsBusinessList();
    }
  },
  created() {
    this.getbmsBusinessList();
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
.main-header >>> .el-input {
  width: 200px;
  margin-right: 20px;
}
.main-content {
  margin: 20px;
}
.add-btn {
  margin-bottom: 20px;
}
.pageination {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>