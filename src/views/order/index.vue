<template>
  <div class="app-container">
    <div class="main-header">
      <span class="supplier-name" >订单名称:</span>
      <el-select v-model="listQuery.orderName"  filterable placeholder="请选择或直接输入名称" >
        <el-option
          v-for="item in orderNames"
          :key="item.id"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
      <span class="supplier-name">预估订单落地月份:</span>
      <div class="block">
        <el-date-picker
          v-model="listQuery.orderDownDate"
          type="month"
          format="yyyy-MM"
          value-format="yyyy-MM"

          placeholder="选择月">
        </el-date-picker>
      </div>
      <span class="supplier-name">预估订单收入月份:</span>
      <div class="block">
        <el-date-picker
          v-model="listQuery.orderFinishDate"
          type="month"
          format="yyyy-MM"
          value-format="yyyy-MM"
          placeholder="选择月">
        </el-date-picker>
      </div>
    </div>

    <div style="text-align:center;padding-top: 15px">
      <el-button type="primary" icon="el-icon-search" size="small" @click="handleSearchList()">查询</el-button>
      <el-button size="small" icon="el-icon-refresh-left" @click="handleResetSearch()">重置</el-button>
    </div>

    <div class="add-btn" >
      <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd()">新建订单</el-button>
      <el-button type="primary" size="small" icon="el-icon-folder-opened" @click="exportByIds()">导出</el-button>
    </div>
    <div class="table-container">

      <el-table
        ref="adminTable"
        :data="list"
        style="width:100%;"
        v-loading="listLoading"
        @selection-change="handleSelectionChange"
        border>
        <el-table-column
          type="selection"
          width="40">
        </el-table-column>
        <el-table-column label="订单名称" align="center" width="250">
          <template slot-scope="scope">{{scope.row.orderName}}</template>
        </el-table-column>
        <el-table-column label="预估订单落地月份" width="160" align="center">
          <template slot-scope="scope"   >
            <div  v-if="scope.row.orderDownDate.status==0" style="">{{scope.row.orderDownDate.date}}</div>
            <div  v-else-if="scope.row.orderDownDate.status==1" style="color: #f1a908">{{scope.row.orderDownDate.date}}</div>
            <div  v-else-if="scope.row.orderDownDate.status==2" style="color: red">{{scope.row.orderDownDate.date}}</div>
            <div  v-else="scope.row.orderDownDate.status==3" style="color: #999797">{{scope.row.orderDownDate.date}}</div>
          </template>
        </el-table-column>

        <el-table-column label="预估订单收入月份" width="160" align="center">
          <template slot-scope="scope"   >
            <div  v-if="scope.row.orderFinishDate.status==0" style="">{{scope.row.orderFinishDate.date}}</div>
            <div  v-else-if="scope.row.orderFinishDate.status==1" style="color: #f1a908">{{scope.row.orderFinishDate.date}}</div>
            <div  v-else-if="scope.row.orderFinishDate.status==2" style="color: red">{{scope.row.orderFinishDate.date}}</div>
            <div  v-else="scope.row.orderFinishDate.status==3" style="color: #999797">{{scope.row.orderFinishDate.date}}</div>
          </template>
        </el-table-column>
        <!--        项目状态1：已完成，2：未完成，0：删除-->
        <el-table-column label="订单状态" align="center">
          <template slot-scope="scope">
            {{scope.row.orderState}}
          </template>
        </el-table-column>
        <el-table-column label="提交工作量" align="center">
          <template slot-scope="scope">{{scope.row.orderWorkload}}</template>
        </el-table-column>
        <el-table-column label="合计金额" align="center" width="150">
          <template slot-scope="scope">{{scope.row.totalAmount}}</template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button v-show="deleteShow" size="mini" type="text"  @click="handleDelete(scope.row)">删除</el-button>
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
        :page-sizes="[10,15,20]"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import {getOrderNames,fetchListByCondition,deleteOrder,exportByIds} from "@/api/businessOrder";
import store from '@/store';

const page = {
  pageNum: 1,
  pageSize: store.state.app.pageSize,
  orderName: "",
  orderId: null,
  orderDownDate: null,
  orderFinishDate: null,
};
const defaultAdmin = {
  id: null,
  productId: null,
  productName: null,
  state: 1,
  uuid: ''
};
export default {
  // name: "adminList",
  data() {
    return {
      deleteShow:false,
      infoShow:false,
      orderIds:"",
      orderNames:[],
      listQuery: Object.assign({}, page),
      list: null,
      approvalDataList:[],
      projectList:null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      admin: Object.assign({}, defaultAdmin),
      isEdit: false,

    };
  },
  created() {
    //进入页面加载数据
    this.getList();
    //初始化订单选择列表
    this.getOrderNames();
    let a = this.dealMoney(2000.545);
//是否有按钮判断
    this.$store.getters.menusTrees.forEach(item =>{
      if(item.id==38){
        item.children.forEach(item1 =>{
          if(item1.id==39){
            item1.children.forEach(item2 =>{
              if(item2.title == '订单删除'){
                this.deleteShow = true
              }
              if(item2.title == '订单详情'){
                this.infoShow = true
              }
            })
          }
        })
      }
    })
  },
  filters: {

  },
  methods: {
   //获取订单名称列表
    getOrderNames(){
      getOrderNames(this.orderNames).then(response => {
        this.orderNames = response.data;
      });
    },

    //重置查询条件
    handleResetSearch() {
      this.listQuery = Object.assign({}, page);
      this.getList();
    },
    //条件查询
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleSelectionChange(val) {
      this.orderIds = [];
      for (let i = 0; i < val.length; i++) {
        if(i == val.length - 1){
          this.orderIds += val[i].orderId;
        }else {
          this.orderIds += val[i].orderId +",";
        }
      }
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },

    //根据orderId导出orderInfo为excel
    exportByIds(){
      exportByIds(this.orderIds);
    },
    getList() {
      this.listLoading = true;
      fetchListByCondition(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.data;
        this.total = response.data.total;
        //金额转化为千分位
        for (let i = 0; i < this.list.length; i++) {
          this.list[i].totalAmount = this.dealMoney(this.list[i].totalAmount);
        }
      });
    },
    //删除订单-根据id
    handleDelete(row) {
      this.$confirm("是否要删除该订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const params = {
          orderId: row.orderId
        }
        deleteOrder(params).then(response => {

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
      this.$router.push("orderAdd");
    },
    //详情
    handleInfo(index, row) {
      console.log("----->"+row.id+"------>"+row.projectId)
      this.$router.push({
        // path:'/orderInfo',
        name:'orderInfo',
        query:{
          id : row.id,
          orderId: row.orderId
        }
      })
    },


    /**
     * @param {*} money[输入的money]
     * @param {string} [货币符号，sysmbol='¥']
     * @param {number} [小数点位数，places=2]
     * @returns undefined
     */
    dealMoney(money, sysmbol = '¥', places = 2) {
       const zero = `${sysmbol}0.00`;
       if (isNaN(money) || money === '') return zero;

       if(money && money != null){
         money = `${money}`;
         let left=money.split('.')[0]; // 小数点左边部分
         let right=money.split('.')[1]; // 小数点右边
         // 保留places位小数点，当长度没有到places时，用0补足。
         right = right ? (right.length >= places ? '.' + right.substr(0, places) : '.' + right + '0'.repeat(places - right.length)) : ('.' + '0'.repeat(places));
         var temp = left.split('').reverse().join('').match(/(\d{1,3})/g); // 分割反向转为字符串然后最多3个，最少1个，将匹配的值放进数组返回
         return (Number(money) < 0 ? '-' : '') + sysmbol + temp.join(',').split('').reverse().join('') + right; // 补齐正负号和货币符号，数组转为字符串，通过逗号分隔，再分割（包含逗号也分割）反向转为字符串变回原来的顺序
       } else if (money === 0) {
         return zero;
       } else {
         return zero;
       }
    }
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
  width: 150px;
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
