<template>
  <div class="app-container">
    <el-form label-width="120px" >
      <el-row>
        <el-col :span="8">
          <el-form-item label="年份:">
            <el-select v-model="listQuery.projectId" filterable placeholder="请选择">
              <el-option
                v-for="item in projectList"
                :key="item.id"
                :label="item.productName"
                :value="item.productId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称:">
            <el-input
              v-model="listQuery.realName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="细化名称:">
            <el-input
              v-model="listQuery.realName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="search-btn">
      <el-button type="primary" size="small" @click="handleSearchList()" >查询</el-button>
      <el-button size="small" @click="handleResetSearch()">重置</el-button>
    </div>
    <div class="add-btn">
      <el-button size="small" @click="exportToExcel" type="success">导出</el-button>
    </div>
    <div class="table-container">
      <base-table
        :sourceData="list"
        :total="total"
        :listLoading="listLoading"
        :columns="columns"
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
            align="center"
            :total="total"
            :width="item.width || 'auto'"
          >
          </el-table-column>
        </template>

      </base-table>
    </div>
  </div>
</template>
<script>
import { workLateList, exportToExcel, deleteWorkLate } from '@/api/workLate';
import { listAll } from '@/api/businessProduct';
import axios from 'axios';
import { getToken } from '@/utils/auth';
import store from '@/store'

const page = {
  applicantName: null,
  flag: null,
  projectId: null,
  workerDate: null
};
const pagination = {
        pageNum: 1,
        pageSize: store.state.app.pageSize
      };
export default {
  name: 'reportList',
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
          label: '年份',
          prop: 'applicantName'
        },
        {
          label: '项目名称',
          prop: 'workerPlace'
        },
        {
          label: '细化名称',
          prop: 'projectName'
        },
        {
          label: '总工作量',
          width: '280',
          prop: 'taskName'
        },
        {
          label: '总投入工作量',
          prop: 'createDate'
        },
        {
          label: '缤纷生活工作量',
          prop: 'workerDate'
        },
        {
          label: '缤纷生活投入工作量',
          prop: 'workerDate'
        },
        {
          label: 'BCSP工作量',
          prop: 'workerDate'
        },
        {
          label: 'BCSP投入工作量',
          prop: 'workerDate'
        },
        {
          label: '运动专区工作量',
          prop: 'workerDate'
        },
        {
          label: '运动专区投入工作量',
          prop: 'workerDate'
        },
        {
          label: 'DCDS工作量',
          prop: 'workerDate'
        },
        {
          label: 'DCDS投入工作量',
          prop: 'workerDate'
        }
      ]
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
      this.listLoading = true;
      workLateList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    exportToExcel() {
      const { applicantName, flag, projectId, workerDate } = this.listQuery;
      const param = {
        applicantName,
        flag,
        projectId,
        workerDate
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
        link.setAttribute('download', '项目报表.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  }
};
</script>

<style scoped>
.search-btn{
  text-align: center;
}
.el-select {
  width:100%
}
.add-btn {
  margin: 20px 0;
}

.must-input {
  color: red;
}
</style>
