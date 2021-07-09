<template>
  <div class="app-container">
    <div class="add-btn">
      <el-button type="info" size="medium" @click="handleAdd()">新增产品</el-button>
    </div>
    <div class="table-container">
      <el-table ref="adminTable" :data="list" style="width:100%;"  v-loading="listLoading" :header-cell-style="{background:'#cccccc',color:'#333333'}">
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">
            <span>{{(listQuery.pageNum - 1) * listQuery.pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品名称" align="center" >
          <template slot-scope="scope">{{scope.row.productName}}</template>
        </el-table-column>
        <el-table-column label="产品代码" align="center">
          <template slot-scope="scope">{{scope.row.productId}}</template>
        </el-table-column>
        <el-table-column label="所属团队" align="center">
          <template slot-scope="scope">{{scope.row.belongToGroup}}</template>
        </el-table-column>
        <el-table-column label="产品状态" width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.state == 1">有效</span>
            <span v-if="scope.row.state == 0">失效</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100px" align="center">
          <template slot-scope="scope">
            <el-button v-show="editShow" size="medium" type="text" @click="handleUpdate(scope.$index, scope.row)">修改</el-button>
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

    <el-dialog  :title="isEdit?'':''" :visible.sync="dialogVisible" :custom-class="'radius'" width="40%" center>
      <el-form :model="admin" :rules="rules" ref="adminForm" label-width="150px" size="small">
        <el-form-item hidden="hidden" label="产品ID：">
          <el-input v-model="admin.id" style="width: 198px"></el-input>
        </el-form-item>
        <el-form-item label="产品名称：" prop="productName">
          <el-input v-model="admin.productName" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="产品代码：" prop="productId">
          <el-input v-model="admin.productId" v-if="disProductId1" style="width: 250px"></el-input>
          <el-input v-model="admin.productId" v-if="disProductId2" disabled style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="所属团队：" prop="groupArray">
          <el-checkbox-group v-model="admin.groupArray" @change="getBelongToGroup(admin)">
            <el-checkbox v-for="group in groupList" :label="group.groupId" :key="group.groupId">{{group.groupName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="产品状态：" prop="state">
          <el-radio-group v-model="admin.state">
            <el-radio :label="1">有效</el-radio>
            <el-radio :label="0">失效</el-radio>
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
  import { productList,createProduct,editProduct,infoByProductId } from "@/api/businessProduct";
  import { formatDate } from "@/utils/date";
  import store from '@/store';

  const page = {
    pageNum: 1,
    pageSize: store.state.app.pageSize,
    keyword: null,
  };
  const defaultAdmin = {
    id: null,
    productId: "",
    productName: "",
    belongToGroup: "",
    state: 1,
    groupArray:[]
  };
  export default {

    data () {
      var checkIsSame = (rule, value, callback) => {
          infoByProductId(this.admin).then(res => {
            if (res.data != null && value == res.data.productId) {
              callback(new Error("产品代码已存在"));
            } else {
              callback();
            }
        });
      };
      //校验是否为数字
      const checkDate = (rule, value, callback) => {
        const age = /^[A-Za-z0-9]{1,30}$/
        if (!age.test(value)) {
          callback(new Error('目前仅支持字符和数字的组合'))
        } else {
          callback()
        }
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
        cities: [],
        listQuery: Object.assign({}, page),
        list: null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        admin: Object.assign({}, defaultAdmin),
        groupList:null,
        isEdit: false,
        disProductId1:true,
        disProductId2:false,
        rules:{
          productName:[{ required: true, message: "必输项", trigger: "blur" }],
          productId: [
            { required: true, message: "必输项", trigger: "blur" },
            // {pattern:/^[A-Za-z0-9]{1,30}$/,message:'目前仅支持字符和数字的组合'},
            {validator:checkDate,trigger: "blur"},
            // {validator:checkIsSame,trigger: "blur"},
            {validator:checkLen,trigger: "blur"},
          ],
          groupArray:[{ required: true, message: " ", trigger: "blur" }],
          state:[{ required: true, message: " ", trigger: "blur" }],

        }
      };

    },
    created() {
      this.getList();
      //是否有按钮判断
      this.$store.getters.menusTrees.forEach(item =>{
        if(item.id==8){
          item.children.forEach(item1 =>{
            console.log("===="+item1.id)
            if(item1.id==9){
              item1.children.forEach(item2 =>{
                if(item2.title == '产品修改'){
                  this.editShow = true
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
      getBelongToGroup(admin){
        let temp = "";
        for(let item of admin.groupArray){
          temp = temp + item + ",";
        }
        //如果temp长度超过1，去掉最后一个","   2222,aaa,bbb,
        if(temp.length > 1){
          temp = temp.substring(0,temp.length-1);
        }
        admin.belongToGroup = temp;
      },

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
        this.disProductId1 = true;
        this.disProductId2 = false;
        this.admin = Object.assign({}, defaultAdmin);
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
        this.dialogVisible = true;
        this.isEdit = true;
        this.disProductId1 = false;
        this.disProductId2 = true;
        //把state变成整数形式
        let sta = parseInt(row.state);
        row.state = sta;
        //把groupArray变成字符串形式
        var str = row.belongToGroup.split(",");
        row.groupArray = str;
        console.log("----str-->"+str);
        this.admin = Object.assign({}, row);
      },
      handleDialogConfirm(adminForm) {
        if(this.isEdit == false){
          infoByProductId(this.admin).then(res => {
            if (res.data != null && this.admin.productId == res.data.productId) {
              this.$message({
                message: "产品代码已存在！",
                type: "error"
              });
            } else {
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
              editProduct(this.admin).then(response => {
                this.$message({
                  message: "修改成功！",
                  type: "success"
                });
                this.dialogVisible = false;
                this.getList();
              });
            } else {
              createProduct(this.admin).then(response => {
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
        // let _this = this
        // this.listLoading = true;
        productList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.productList.list;
          this.total = response.data.productList.total;
          this.groupList = response.data.groupList;

        });
        //console.log(this.groupList+"----->"+this.total)
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
  /* 页码 */
  .pagination {
    display: flex !important;
    justify-content: center !important;
    margin-top: 40px;
  }

</style>
<style>
/* 圆角边框 */
.radius{
  border-radius: 13px;
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
    /*background-color:#DEF3F6!important;*/
}
/* radio样式修改,文字为黑色 */
.el-radio__input.is-checked + .el-radio__label {
  color: #333333 !important;
}
</style>
