<template>
  <div class="app-container">
    <el-form label-width="120px" >
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名:">
            <el-input
              v-model="listQuery.realName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工作起止日期:">
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
        <el-col :span="4">
          <el-form-item label-width="0">
            <el-button type="primary" size="small" @click="handleSearchList()">查询</el-button>
            <el-button size="small" @click="handleResetSearch()">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="10">
          <el-form-item label="提交起止日期:">
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
          <el-form-item>
            <el-button type="primary" size="small" @click="handleSearchList()">查询</el-button>
            <el-button size="small" @click="handleResetSearch()">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row> -->
    </el-form>

    <div class="add-btn">
      <el-button size="small" @click="exportToExcel" type="success">导出</el-button>
    </div>
    <div class="table-container">
      <base-table
        :sourceData="list"
        :total="total"
        :listLoading="listLoading"
        :pagination="pagination"
        @reloadList="reloadList"
      >
        <template v-for="item in columns">
          <el-table-column
            :label="item.label"
            :prop="item.prop"
            align="center"
            :total="total"
            :key="item.prop"
            :width="item.width || 'auto'"
          >
          </el-table-column>
        </template>

        <el-table-column label="报送情况" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status == '0'">正常申报</span>
            <span v-else class="must-input">补报</span>
          </template>
        </el-table-column>
        <el-table-column label="提交日期" align="center" prop="createDate">
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
              >删除</el-button
            >
          </template>
        </el-table-column>
      </base-table>
    </div>
  </div>
</template>
<script>
import { workDailyList, deleteWorkDaily } from '@/api/workDaily';
import { listAll } from '@/api/businessProduct';
import axios from 'axios';
import { getToken } from '@/utils/auth';
import store from '@/store'

const page = {
  realName: null,
  // flag: null,
  // projectId: null,
  workerDate: null
};
const pagination = {
        pageNum: 1,
        pageSize: store.state.app.pageSize
      };
export default {
  name: 'workDailyList',
  data() {
    return {
      listQuery: Object.assign({}, page, pagination),
      pagination:pagination,
      list: null,
      projectList: [],
      total: null,
      listLoading: false,
      idList: [],
      columns: [
        {
          label: 'ID',
          width: '80',
          prop: 'id'
        },
        {
          label: '姓名',
          prop: 'realName'
        },
        {
          label: '工作日期',
          prop: 'workDate'
        },
      ]
    };
  },
  created() {
    this.$nextTick(item => {
      this.getList();
      //产品列表
      // listAll().then(response => {
      //   this.projectList = response.data;
      // });
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
        path: '/workDailyInfo',
        name: 'workDailyInfo',
        query: {
          id: row.id,
          info: JSON.stringify(row)
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
    //删除
    handleInvalid(row) {
      console.log(row);
      this.$confirm('', '确定要删除?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // type: "warning",
        center: true
      })
        .then(() => {
          deleteWorkDaily(row.id).then(response => {
            this.$message({
              message: '删除成功！',
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

    getList() {
      // console.log('getlist,' ,this.listQuery);
      this.listLoading = true;
      let {realName, pageNum, pageSize, workerDate} = this.listQuery;
      let param = {
        realName,
        pageNum,
        pageSize,
        startDate: (workerDate && workerDate[0]) || null,
        endDate: (workerDate && workerDate[1]) || null,
      }
      workDailyList(param).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    exportToExcel() {
      const { realName, workerDate } = this.listQuery;
      const param = {
        realName,
        startDate: (workerDate && workerDate[0]) || null,
        endDate: (workerDate && workerDate[1]) || null,
      };
      axios({
        method: 'post',
        url: 'https://alex188.cn/web/workDaily/download',
        data: param,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: getToken()
        },
        responseType: 'blob'
      }).then(res => {
        console.log('blob,,,', res)
        const link = document.createElement('a');
        const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
        link.style.display = 'none';
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', '日报管理报表.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
  margin-bottom: 15px;
}
.supplier-name {
  display: inline-block;
  width: 100px;
  font-size: 14px;
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
.must-input {
  color: red;
}
</style>
