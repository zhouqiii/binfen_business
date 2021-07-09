<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名:" >
            <el-input
              v-model="listQuery.realName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属产品:" >
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
          <el-form-item label="休假类型:" >
            <el-select v-model="listQuery.vacationType" filterable placeholder="请选择">
              <el-option value="0" label="年假" ></el-option>
              <el-option value="1" label="事假" ></el-option>
              <el-option value="2" label="婚假" ></el-option>
              <el-option value="3" label="产假" ></el-option>
              <el-option value="4" label="陪产假" ></el-option>
              <el-option value="5" label="病假" ></el-option>
              <el-option value="6" label="丧假" ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="提交起止日期:" >
            <el-date-picker
              v-model="listQuery.workerDate"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" size="small" @click="handleSearchList()"
          >查询</el-button>
          <el-button size="small" @click="handleResetSearch()">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="add-btn">
      <el-button size="small" @click="exportToExcel" type="success"
        >导出</el-button>
    </div>
    <div class="table-container">
      <base-table
        :sourceData="list"
        :total="total"
        :listLoading="listLoading"
        :pagination="pagination"
        @selectList="selectList"
        @reloadList="reloadList"
      >
        <el-table-column label="姓名" prop="realName" width="80" align="center">
        </el-table-column>
        <el-table-column label="所属产品" prop="productName" align="center">
        </el-table-column>
        <el-table-column label="休假类型" align="center" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.vacationType == '0'">年假</span>
            <span v-if="scope.row.vacationType == '1'">事假</span>
            <span v-if="scope.row.vacationType == '2'">婚假</span>
            <span v-if="scope.row.vacationType == '3'">产假</span>
            <span v-if="scope.row.vacationType == '4'">陪产假</span>
            <span v-if="scope.row.vacationType == '5'">病假</span>
            <span v-if="scope.row.vacationType == '6'">丧假</span>
          </template>
        </el-table-column>
        <el-table-column label="休假日期" align="center">
          <template slot-scope="scope"
            >{{ scope.row.vacationStartDate }} 至 {{ scope.row.vacationEndDate }}
          </template>
        </el-table-column>
        <el-table-column label="休假时间" align="center" width="120">
          <template slot-scope="scope"
            >{{ scope.row.vacationStartTime }}-{{ scope.row.vacationEndTime }}
          </template>
        </el-table-column>
        <el-table-column label="提交日期" prop="createDate" align="center" width="120">
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
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleView(scope.row)"
              >查看</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="handleInvalid(scope.row)"
              class="must-input"
              >撤销</el-button
            >
          </template>
        </el-table-column>
      </base-table>
    </div>
  </div>
</template>
<script>
import { workLeaveList, revokeWorkLeave } from '@/api/workLeave';
import { listAll } from '@/api/businessProduct';
import axios from 'axios';
import store from '@/store'

const page = {
  realName: null,
  vacationType: null,
  productName: null,
  workerDate: null
};
const pagination = {
  pageNum: 1,
  pageSize: store.state.app.pageSize,
};
export default {
  name: 'workLeaveList',
  data() {
    return {
      listQuery: Object.assign({}, page, pagination),
      pagination:pagination,
      list: null,
      projectList: [],
      total: null,
      listLoading: false,
      idList: [],
    };
  },
  created() {
    this.$nextTick(item => {
      this.getList();
      //产品列表
      listAll().then(response => {
        this.projectList = response.data;
      });
    });
  },
  filters: {},
  methods: {
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
        path: '/workLeaveInfo',
        name: 'workLeaveInfo',
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
    //撤销
    handleInvalid(row) {
      console.log(row);
      this.$confirm('', '确定要撤销?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // type: "warning",
        center: true
      }).then(res => {
          revokeWorkLeave(row.id).then(response => {
            this.$message({
              message: '撤销成功！',
              type: 'success'
            });
            this.getList();
          });
        })
        .catch(err => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消撤销'
          // });
          console.log(err);
        });
    },
    selectList(res){
      this.idList = res;
    },
    getList() {
      // console.log('getlist,' ,this.listQuery);
      let { workerDate } = this.listQuery;
      let obj = {
        ...this.listQuery,
        startDate: workerDate && workerDate[0] || null,
        endDate: workerDate && workerDate[1] || null
      }
      delete obj.workerDate;
      this.listLoading = true;
      workLeaveList(obj).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    exportToExcel() {
      const { realName, vacationType, productName, workerDate } = this.listQuery;
      const param = {
        realName,
        vacationType,
        productName,
        startDate: workerDate && workerDate[0] || null,
        endDate: workerDate && workerDate[1] || null,

      };
      axios({
        method: 'post',
        url: 'https://alex188.cn/web/workVacation/download',
        data: param,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        responseType: 'blob'
      }).then(res => {
        const link = document.createElement('a');
        const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
        link.style.display = 'none';
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', '休假工作报表.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  }
};
</script>

<style scoped>
.el-select {
  width:100%
}
.add-btn {
  margin: 20px 0;
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
