<template>
  <div class="app-container">
    <el-form label-width="120px" >
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名:">
            <el-input
              v-model="listQuery.applicantName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属产品:">
            <el-select v-model="listQuery.productId" filterable placeholder="请选择">
              <el-option
                v-for="item in productList"
                :key="item.id"
                :label="item.productName"
                :value="item.productId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请情况:">
            <el-select v-model="listQuery.flag" placeholder="请选择">
              <el-option value="0" label="正常申报"> </el-option>
              <el-option value="1" label="补报"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请起止日期:">
            <el-date-picker
              v-model="listQuery.workerDate"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label-width="0">
            <el-button type="primary" size="small" @click="handleSearchList()" >查询</el-button>
            <el-button size="small" @click="handleResetSearch()">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="add-btn">
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="small"
        style="float:right;"
        @click="handleAdd()"
        >新建</el-button
      >
      <el-button size="small" @click="exportToExcel" type="success"
        >导出</el-button
      >
      <el-button size="small" @click="batchDelete" type="danger"
        >批量删除</el-button
      >
    </div>
    <div class="table-container">
      <base-table
        :sourceData="list"
        :total="total"
        :listLoading="listLoading"
        :pagination="pagination"
        :selection="true"
        @selectList="selectList"
        @reloadList="reloadList"
      >
        <template v-for="item in columns">
          <el-table-column
            :label="item.label"
            :key="item.prop"
            :prop="item.prop"
            :align="item.align || 'center'"
            :total="total"
            :width="item.width || 'auto'"
          >
          </el-table-column>
        </template>
        <el-table-column label="加班时间段" align="center" width="100">
          <template slot-scope="scope"
            >{{ scope.row.workerStartTime }}-{{ scope.row.workerEndTime }}
          </template>
        </el-table-column>
        <el-table-column label="申请情况" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.flag == '0'">正常申报</span>
            <span v-else>补报</span>
          </template>
        </el-table-column>
        <el-table-column label="审批状态" align="center">
          <template slot-scope="scope" >
            <span v-if="scope.row.status == '0'">申请人申请</span>
            <span v-if="scope.row.status == '1'">项目经理审批通过</span>
            <span v-if="scope.row.status == '-1'" class="must-input">项目经理驳回</span>
            <span v-if="scope.row.status == '2'">项目总监审批通过</span>
            <span v-if="scope.row.status == '-2'" class="must-input">项目总监驳回</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="90" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleView(scope.row)"
              >查看</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="handleInvalid(scope.row)"
              class="must-input"
              >取消</el-button
            >
          </template>
        </el-table-column>
      </base-table>
    </div>
  </div>
</template>
<script>
import { workLateList, deleteWorkLate } from '@/api/workLate';
import { listAll } from '@/api/businessProduct';
import axios from 'axios';
import { getToken } from '@/utils/auth';
import store from '@/store'

const page = {
  applicantName: null,
  flag: null,
  productId: null,
  workerDate: null,
};
const pagination = {
        pageNum: 1,
        pageSize: store.state.app.pageSize
      };
export default {
  name: 'workLateList',
  data() {
    return {
      listQuery: Object.assign({}, page, pagination),
      pagination:pagination,
      list: null,
      currentDate: '',
      productList: [],
      total: null,
      listLoading: false,
      idList: [],
      columns: [
        {
          label: '姓名',
          prop: 'applicantName'
        },
        {
          label: '所属产品',
          prop: 'productName'
        },
        {
          label: '任务',
          width: '280',
          align: 'left',
          prop: 'taskName'
        },
        {
          label: '提交日期',
          width: '100',
          prop: 'createDate'
        },
        {
          label: '申请日期',
          width: '100',
          prop: 'workerDate'
        }
      ]
    };
  },
  created() {
    this.$nextTick(item => {
      this.currentDate = this.formatDate(new Date());
      this.listQuery.workerDate = [this.currentDate, this.currentDate];
      this.getList();
      //产品列表
      listAll().then(response => {
        this.productList = response.data;
      });
    });
  },
  filters: {},
  methods: {
    formatDate(val) {
      // 格式化身份张有效期时间为2019-05-04的格式
      const month = parseInt(val.getMonth() + 1, 10) < 10 ? `0${val.getMonth() + 1}` : val.getMonth() + 1;
      const day = parseInt(val.getDate(), 10) < 10 ? `0${val.getDate()}` : val.getDate();
      const year = new Date().getFullYear();
      return `${year}-${month}-${day}`;
    },
    reloadList(res) {
      if (res.pageNum) {
        this.listQuery.pageNum = res.pageNum;
      }
      if (res.pageSize) {
        this.listQuery.pageSize = res.pageSize;
      }
      this.getList();
      console.log(res);
    },
    handleView(row) {
      this.$router.push({
        path: '/workLateInfo',
        name: 'workLateInfo',
        query: {
          id: row.id
        }
      });
    },
    handleResetSearch() {
      this.listQuery = Object.assign(this.listQuery, page, pagination)
      // console.log('this.listQuery', this.listQuery);
      this.getList();
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },

    handleAdd() {
      this.$router.push('workLateAdd');
    },
    //取消
    handleInvalid(row) {
      console.log(row);
      this.$confirm('', '确定要取消?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // type: "warning",
        center: true
      })
        .then(() => {
          deleteWorkLate({ ids: [row.id] }).then(response => {
            this.$message({
              message: '取消成功！',
              type: 'success'
            });
            this.getList();
          });
        })
        .catch(err => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
          console.log(err);
        });
    },
    selectList(res){
      this.idList = res;
    },
    //批量删除
    batchDelete() {
      this.$confirm('', '确定要取消?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // type: "warning",
        center: true
      })
        .then(() => {
          deleteWorkLate({ ids: this.idList }).then(response => {
            this.$message({
              message: '取消成功！',
              type: 'success'
            });
            this.getList();
          });
        })
        .catch(err => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
          console.log(err);
        });
    },
    getList() {
      // console.log('getlist,' ,this.listQuery);
      const { workerDate } = this.listQuery;
      let obj = {
        ...this.listQuery,
        startDate: workerDate && workerDate[0] || null,
        endDate: workerDate && workerDate[1] || null
      }
      delete obj.workerDate;
      console.log('obj ' ,obj);
      this.listLoading = true;
      workLateList(obj).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.list.forEach((item) => {
            console.log('item taskName', item.taskName);
            if (item.taskName.length > 20) {
              item.taskName = item.taskName.substring(0,20) + '...';
            }
          });
        this.total = response.data.total;
      });
    },
    exportToExcel() {
      const { applicantName, flag, productId, workerDate } = this.listQuery;
      const param = {
        applicantName,
        flag,
        productId,
        startDate: workerDate && workerDate[0] || null,
        endDate: workerDate && workerDate[1] || null
      };
      axios({
        method: 'post',
        url: 'https://alex188.cn/web/workLate/download',
        data: param,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: getToken()
        },
        responseType: 'blob'
      }).then(res => {
        const link = document.createElement('a');
        const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
        link.style.display = 'none';
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', '延迟工作报表.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  }
};
</script>

<style scoped>

.supplier-name {
  display: inline-block;
  width: 100px;
}
.add-btn {
  margin: 20px 0;
}
.el-select {
  width: 100%;
}

.pagination {
  display: flex !important;
  justify-content: center !important;
  margin-top: 40px;
}
.must-input {
  color: red;
}
</style>
