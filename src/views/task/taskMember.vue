<template>
  <div class="index">
    <div class="task-name" v-show="taskName">
      <span>{{taskName}}</span>
      <el-button @click="submitForm" type="primary" class="reset-btn">提交</el-button>
    </div>
    <el-container class="pt20">
      <!-- <div class="tab-wrapper">
        <div class="tab-item" :class="{ active : tabIndex == index }" v-for="(item, index) in tabList" :key="item.name" @click="switchList(item,index)">
          {{item.name}}({{item.num}})
        </div>
      </div> -->
      <el-form label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="已选中人员:" >
              <template v-if="tags.length > 0">
                <el-tag
                  v-for="tag in tags"
                  :key="tag.id"
                  closable
                  @close="delTag(tag.id)"
                  >
                  {{tag.name}}
                </el-tag>
              </template>
              <span v-else>暂未分配人员</span>
            </el-form-item>
          </el-col>
        </el-row>
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
            <el-form-item label="现任岗位:" >
              <el-input
                v-model="listQuery.incumbentPost"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="现技术方向:" >
              <el-input
                v-model="listQuery.technicalDirection"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="技术评定:" >
              <el-input
                v-model="listQuery.technicalLevel"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属产品:" >
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
      <div class="table-container">
        <el-table
          ref="Table"
          :data="list"
          style="width:100%;"
          v-loading.fullscreen.lock="fullscreenLoading"
          element-loading-text="拼命加载中..."
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          @select = "onTableSelect"
          border
        >
          <el-table-column
            type="selection"
            width="55"
            fixed
          ></el-table-column>
          <template v-for="item in columns" >
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
          <el-table-column label="任务分配" width="100" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="handleView(scope.row)"
                >查看</el-button
              >
              <div>

            </div>
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
          :current-page.sync="pagination.pageNum"
          :page-size="pagination.pageSize"
          :page-sizes="pagination.pages"
          :total="total"
        ></el-pagination>
      </div>

      <el-footer class="el-dialog--center" >

      </el-footer>
      <el-dialog :visible.sync="dialogVisible">
        <el-form label-width="100px">
          <template v-if="taskList && taskList.length > 0">
            <el-form-item :label="'任务'+(index+1)+':'" v-for="(item, index) in taskList" :key="item">
              <span>{{item.taskName}}</span>
            </el-form-item>
          </template>
          <el-row v-else class="dialog-none"><span>暂无任务分配</span></el-row>
          <el-row class="el-dialog--center" >
            <el-button @click="dialogClose" size="mini">关闭</el-button>
          </el-row>
        </el-form>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
import { listAll } from "@/api/businessProduct";
import { setTaskMember, getTeamList, getMemberTask } from '@/api/team';

const page = {
  realName: null, // 姓名
  incumbentPost: null, // 现任岗位
  technicalDirection: null, // 现技术方向
  technicalLevel: null, // 技术评定
  product: null // 所属产品
};
const pagination = {
  pageNum: 1,
  pageSize: 10,
  pages: [10, 15, 20, 30, 50, 100],
};
  export default {
    name: "taskMember",
    data() {
      return {
        dialogVisible: false,
        taskList: [],
        tabList: [
          {
            name: '缤纷生活',
            num: 30
          },
          {
            name: '运动场景',
            num: 30
          },
          {
            name: 'BCSP',
            num: 20
          },
          {
            name: '中国银行北京分行',
            num: 30
          },
          {
            name: '智能柜台二团队',
            num: 10
          },
          {
            name: '数据中心',
            num: 10
          }
        ],
        tabIndex: 0,
        pagination,
        listQuery: Object.assign({}, page, pagination),
        list: null,
        total: null,
        idList: [],
        taskName: null,
        batchList: [
          '1',
          '2',
          '3',
          '4'
        ],
        columns: [
          {
            label: '姓名',
            prop: 'realName'
          },
          {
            label: '现任岗位',
            prop: 'incumbentPost'
          },
          {
            label: '现技术方向',
            prop: 'technicalDirection'
          },
          {
            label: '技术评定',
            prop: 'technicalLevel'
          },
        ],
        taskId: null,
        taskTypeList: [],
        projectList: [],
        parentProductList: [],
        listLoading: false,
        fullscreenLoading: false,
        tags: []
      };
    },
    updated() {
      // this.refreshTable();

    },
    methods: {
      refreshTable(id) {
        // console.log('this.tags', this.tags);
        this.$nextTick(() => {
          this.list && this.list.forEach(outerItem => {
            if(id) {
              if(outerItem.id === id) {
                this.$refs.Table.toggleRowSelection(outerItem,false);
              }
            }
          })
        })
      },
      onTableSelect(rows, row) {
        // 勾选框状态
          let selected = rows.length && rows.indexOf(row) !== -1;
          if(!selected){
            // 勾选取消
            this.delTag(row.id);
          }else{
            let tagList = [];
            // this.idList = res;
            rows.forEach(item => {
              if(row.id == item.id){
                tagList.push({
                  name: item.realName,
                  id: item.id,
                  username: item.username
                })
              }
            })
            this.tags = this.deRepeat(this.tags, tagList);
          }
      },
      handleSizeChange(val) {
        this.pagination.pageNum = 1;
        this.pagination.pageSize = val;
        // 更新数据
        this.getList();
      },
      handleCurrentChange(val) {
        this.pagination.pageNum = val;
        // 更新数据
        this.getList();
      },

      delTag(id) {
        this.tags = this.tags.filter(item => {
          return item.id != id;
        });
        this.idList = this.idList.filter(item => {
          return item.id != id;
        });
        this.refreshTable(id);
        console.log('delTag', id);
      },

      // 两个数组去重合并
      deRepeat(arr1,arr2){
        let json=arr1.concat(arr2);
        let newJson = [];
        for(var i=0;i<json.length;i++){
        let flag = true;
            for(var j=0;j<newJson.length;j++){
                if(newJson[j].id==json[i].id){
                    flag = false;
                }
            }
            if(flag){ // 判断是否重复
                newJson.push(json[i]);
            }
        }
        arr1=newJson;
        return arr1
      },

      switchList(item, index) {
        // console.log('tabList');
        // console.log(item, index);
        this.tabIndex = index;
      },
      handleResetSearch() {
        this.listQuery = Object.assign({}, page);
        this.pagination.pageNum = 1;
        this.getList();
      },
      handleSearchList() {
        this.pagination.pageNum = 1;
        this.getList();
      },
      submitForm(formName) {
        if(this.tags.length <= 0){
          this.$message({
              type: "error",
              message: "请选择人员"
            });
          return;
        }
        let idlist = [];
        this.tags.forEach(item => {
          idlist.push(item.username);
        })
        setTaskMember({usernameList:idlist, taskId:this.taskId}).then(res => {
          console.log("success");
          if (res.code == 200 && res.success == true) {
            this.$message({
              type: "success",
              message: "创建成功"
            })
            this.$router.push("taskList")
          } else {
            this.$message({
              type: "error",
              message: res.message
            })
          }
        });
      },
      // 判断数组中是否存在某个属性值
      findElem(arrayToSearch, attr, val) {
        for (var i = 0; i < arrayToSearch.length; i++) {
              if (arrayToSearch[i][attr] == val) {
                  return i;
              }
          }
          return -1;
      },
      getList() {
        this.listQuery = {
          ...this.listQuery,
          pageSize: this.pagination.pageSize,
          pageNum: this.pagination.pageNum,
        }
        console.log('getlist this.listQuery,' ,this.listQuery);
        console.log('page===,' ,page);
        console.log('pagination===,' ,pagination);
        this.listLoading = true;
        let data = {
          ...this.listQuery,
          taskId: this.taskId
        }
        // console.log('getList,,,,', data);
        getTeamList(data).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
          // 获取任务相关人员列表
          this.list.forEach((item, index) => {
            if(item.isOnTask == '1'){
              if(this.findElem(this.tags, 'id', item.id) == -1){
                console.log('indexof -1=====', item.realName)
                this.tags.push({
                  name: item.realName,
                  id: item.id,
                  username: item.username
                })
              }
              // table数据初始化勾选回显
              this.$nextTick(() => {
                this.$refs.Table.toggleRowSelection(item,true);
              })
            }
          })

        });
      },
      // 查看相关任务
      handleView(row) {
        getMemberTask(row.username).then(res => {
          this.taskList = res.data;
          this.dialogVisible = true;
        })
      },
      dialogClose() {
        this.dialogVisible = false;
        this.taskList = [];
      }
    },

    created() {
      this.taskId = this.$route.query.taskId;
      this.taskName = this.$route.query.taskName;
      this.$nextTick(() => {
        this.handleResetSearch();
        //获取产品
        listAll().then(res => {
          this.projectList = res.data;
        });
      })
    }
  };
</script>

<style scoped>
  .pagination {
  display: flex;
  justify-content: center;
  padding: 40px 0;
}
  .dialog-none{
    text-align: center;
    padding-bottom:20px;
  }
  .pt20{
    padding-top: 20px;
  }
  .task-name{
    background-color: #eee;
    font-size: 20px;
    line-height: 2;
    overflow: hidden;
    padding: 15px 20px;
    position: relative;
  }
  .reset-btn{
    position: absolute;
    right: 20px;
    top:50%;
    transform: translateY(-50%);
  }
  .tab-wrapper{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 25px;
    height: 54px;
    line-height: 54px;
    border-bottom: 1px solid #eee;
    cursor: pointer
  }
  .tab-item{
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
    padding: 0 20px;
    cursor: pointer;
  }
  .tab-item.active{
   color: #2593fc;
   position: relative;
  }
  .tab-item.active::after{
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background-color: #2593fc;
  }
  .el-tag{
    margin-right: 10px;
  }

</style>
