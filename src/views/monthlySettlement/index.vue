<template>
  <div class="app-container monthly-box">
    <el-form >
      <el-row>
        <el-col :span="8">
          <el-form-item label="月份:"  label-width="80px">
            <el-date-picker
              v-model="month"
              type="month"
              value-format="yyyy-MM"
              placeholder="选择月份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button type="primary" size="small" @click="handleSearchList()">查询</el-button>
            <el-button size="small" @click="handleResetSearch()">重置</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" class="confirmBtn" style="float:right;" size="small" :disabled="disabled" @click="settleConfirm()"
          >{{disabled ? '已月结' : '月结'}}</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="add-btn">
      
    </div>
    <div class="table-container">
      <el-table
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
      >
        <!-- <template v-for="item in columns">
          <el-table-column
            :label="item.label"
            :prop="item.prop"
            align="center"
            :width="item.width || 'auto'"
          >
          </el-table-column>
        </template> -->
        <el-table-column label="日期" width="120" prop="date" align="center">
        </el-table-column>
        <el-table-column label="日报异常人员" align="center">
          <template slot-scope="scope">
            <span v-for="item in scope.row.data" :key="item">{{item}}, </span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleView(scope.row)"
              >查看</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
  </div>
</template>
<script>
import { getList, settleConfirm, getStatus } from '@/api/monthlySettlement';
// import axios from 'axios';
// import { getToken } from '@/utils/auth';

export default {
  name: 'monthlySettlementList',
  data() {
    return {
      list: null,
      listLoading: false,
      month: '',
      disabled: false,
      columns: [
        {
          label: '日期',
          width: '120',
          prop: 'date'
        },
        {
          label: '日报异常人员',
          prop: 'data'
        },
        
      ]
    };
  },
  created() {
    this.$nextTick(() => {
      this.getList();
      // this.getStatus();
    });
  },
  filters: {},
  methods: {
    settleConfirm() {
      this.$confirm('', '确定要月结吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // type: "warning",
        center: true
      })
        .then(() => {
          settleConfirm({time:this.month}).then(res => {
            if(res.code == 200){
              // this.disabled = true;
              this.$message({
                type: 'success',
                message: '月结成功'
              });
              this.getList();
              // console.log('月结成功');
            }
          });
        })
        .catch(err => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消月结'
          // });
          console.log(err);
        });
      
    },
    handleResetSearch() {
      this.month = null;
      // this.getStatus();
      this.getList();
    },
    handleSearchList() {
      // this.getStatus();
      this.getList();
    },
    getStatus() {
      getStatus({time:this.month}).then(res => {
        if(res.data.status === '1'){
          this.disabled = true;
        }else{
          this.disabled = false;
        }
      }).catch(err => {
        this.disabled = true;
      })
    },
    handleView(row) {
      this.$router.push({
        path: '/monthlySettlementInfo',
        name: 'monthlySettlementInfo',
        query: {
          id: row.id
        }
      });
    },
    getList() {
      // console.log('getlist,' ,this.listQuery);
      this.listLoading = true;
      getList({time:this.month}).then(res => {
        this.listLoading = false;
        this.list = res.data.list;
      });
    },
  }
};
</script>

<style>
.monthly-box .el-table th{
  background-color: #f4f4f4 ;
}
.monthly-box .add-btn {
  padding: 20px 0;
  overflow: hidden;
}
.monthly-box .confirmBtn{
  float: right;
}
</style>
