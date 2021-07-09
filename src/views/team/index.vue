<template>
  <div class="app-container">
    <!-- <el-row :gutter="10">
      <el-col class="card" :span="4"  v-for="item in 6" :key="item">
        <el-card shadow="hover">
          鼠标悬浮时显示: {{item}}
        </el-card>
      </el-col>
    </el-row> -->
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
        <el-col :span="8">
          <el-form-item label="现任岗位:">
            <el-select v-model="listQuery.incumbentPost" filterable placeholder="请选择">
              <el-option
                v-for="item in incumbentPostList"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主管:">
            <el-input
              v-model="listQuery.executiveDirector"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="所属产品:">
            <el-select v-model="listQuery.product" filterable placeholder="请选择">
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
          <el-form-item>
            <el-button type="primary" size="small" @click="handleSearchList()">查询</el-button>
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
      <el-button size="small" @click="importDialog = true">批量导入</el-button>
      <el-button size="small" @click="exportToExcel">导出</el-button>
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
        v-loading.fullscreen.lock="fullscreenLoading"
        element-loading-text="拼命加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <template v-for="item in columns_1">
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
        <el-table-column label="性别" width="100" align="center">
          <template slot-scope="scope">
            {{scope.row.sex == '0' ? '男' : '女'}}
          </template>
        </el-table-column>
        <template v-for="item in columns_2">
          <el-table-column
            :label="item.label"
            :key="item.prop"
            :prop="item.prop"
            align="center"
            :width="item.width || 'auto'"
          >
          </el-table-column>
        </template>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="handleInvalid(scope.row)"
              class="must-input"
              >删除</el-button
            >
            <div>
              <el-button
                size="mini"
                type="text"
                @click="handleResetPwd(scope.row)"
                class=""
                >重置登录密码</el-button
              >
          </div>
          </template>
        </el-table-column>
      </base-table>
    </div>
    <!-- 批量导入 -->
    <el-dialog title="批量导入" :visible.sync="importDialog">
      <div class="importDialog-content">
        <el-upload ref="upload"
            class="upload-box"
            :limit="1"
            :auto-upload="false"
            drag
            :http-request="uploadFile"
            accept='.xls,.xlsx'
            action="customize">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或<em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">上传文件只能为excel文件，且为xlsx,xls格式</div>
        </el-upload>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="importDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitUpload">确定上传</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { RequestUploads, getTeamList, delTeamMember, resetPwd } from '@/api/team';
import { listAll } from '@/api/businessProduct';
import axios from 'axios';
import { getToken } from '@/utils/auth';
import store from '@/store'

const page = {
  realName: null,
  incumbentPost: null,
  executiveDirector: null,
  product: null
};
const pagination = {
  pageNum: 1,
  pageSize: store.state.app.pageSize
};
export default {
  name: 'teamList',
  data() {
    return {
      listQuery: Object.assign({}, page, pagination),
      pagination: pagination,
      list: null,
      projectList: [],
      total: null,
      listLoading: false,
      idList: [],
      columns_1: [
        {
          label: '姓名',
          prop: 'realName',
          width: '100',
        },
        {
          label: 'ID',
          prop: 'id',
          width: '100',
        },
      ],
      columns_2: [
        {
          label: '现任岗位',
          width: '100',
          prop: 'incumbentPost'
        },
        {
          label: '直属上司',
          width: '100',
          prop: 'manager'
        },
        {
          label: '主管',
          width: '100',
          prop: 'executiveDirector'
        },
        {
          label: '现技术方向',
          prop: 'technicalDirection'
        },
        {
          label: '技术评定',
          width: '100',
          prop: 'technicalLevel'
        },
        {
          label: '所属产品',
          prop: 'productName'
        }
      ],
      fullscreenLoading: false,
      importDialog: false,
      incumbentPostList: ['员工', '项目经理', '主管', '总监'],
    };
  },
  created() {
    this.$nextTick(() => {
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

    handleEdit(row) {
      this.$router.push({
        path: '/teamAdd',
        name: 'teamAdd',
        query: {
          id: row.id
        }
      });
    },
    handleResetSearch() {
      this.listQuery = Object.assign(this.listQuery, page, pagination);
      // console.log('this.listQuery', this.listQuery);
      this.getList();
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },

    handleAdd() {
      this.$router.push('teamAdd');
    },
    // 重置登录密码
    handleResetPwd(row) {
      this.$confirm('', '确定要重置登录密码?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // type: "warning",
        center: true
      })
        .then(() => {
          resetPwd(row.id).then(response => {
            this.$message({
              message: '重置成功！',
              type: 'success'
            });
            this.getList();
          });
        })
        .catch(err => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消重置'
          // });
          console.log(err);
        });
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
          delTeamMember({ids: [row.id]}).then(response => {
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
    selectList(res) {
      this.idList = res;
    },
    //批量删除
    batchDelete() {
      this.$confirm('', '确定要删除?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // type: "warning",
        center: true
      })
        .then(() => {
          delTeamMember({ ids: this.idList }).then(response => {
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
    getList() {
      console.log('getlist,' ,this.listQuery);
      this.listLoading = true;
      getTeamList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
     // 确认上传
     submitUpload() {
      this.$refs.upload.submit();
    },
    // 文件上传
    uploadFile(params) {
      console.log("uploadFile", params);

      const _file = params.file;
      const isLt2M = _file.size / 1024 / 1024 < 2;

      // 通过 FormData 对象上传文件
      var formData = new FormData();
      formData.append("file", _file);

      if (!isLt2M) {
        this.$message.error("请上传2M以下的.xlsx文件");
        return false;
      }

      // 批量弹层发起请求
      RequestUploads(formData).then(res => {
        console.log("_RequestUploads_", res);
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: '批量导入成功'
          });
          // 重新加载数据
          this.getList();
          // 隐藏弹出框
          this.importDialog = false;
        } else {
          this.$message({
            type: "warning",
            message: res.msg
          });
        }
      })
    },
    // 导出团队人员 excel
    exportToExcel() {
      const { realName, incumbentPost, executiveDirector, product } = this.listQuery;
      const param = {
        realName,
        incumbentPost,
        executiveDirector,
        product
      };
      axios({
        method: 'post',
        url: 'https://alex188.cn/web/personnelInfo/exportExcel',
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
        link.setAttribute('download', '团队人员管理.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  }
};
</script>

<style scoped>
.template-upload{
  padding: 0 0 20px 0;
  font-size: 14px;
  text-align: left;
  color: #666;
}

.upload-box{
  width:100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
/* .el-upload-dragger{
  width: 100% !important;
} */

.card{margin-bottom: 10px;}
.upload-btn{
  display: inline-block;
  margin-right: 10px;
}
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
