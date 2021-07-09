<template>
  <div class="index">
    <el-container >
      <el-main>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="180px"
          size="mini"
          class="ruleForm"
        >
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="15">
              <div class="myBox"></div>
              <span class="text">项目信息</span>
            </el-col>
          </el-row>
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="15">
              <el-form-item label="项目名称:" prop="projectName">{{ruleForm.projectName}}
              </el-form-item>
            </el-col>

          </el-row>

          <el-row type="flex" justify="start" align="middle">
            <el-col :span="15">
              <el-form-item label="工作量:" prop="workload">{{ruleForm.workload}}
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-form-item label="立项年度:" prop="approvalData">{{ruleForm.approvalData}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="15">
              <el-form-item label="业务部门:" prop="businessDepartment">{{ruleForm.businessDepartment}}
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-form-item label="科技部门:" prop="technologyDepartment">{{ruleForm.technologyDepartment}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="15">
              <el-form-item label="牵头项目经理:" prop="leadManagerName" >{{ruleForm.leadManagerName}}
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-form-item label="牵头项目经理电话:" prop="leadManagerTel" >{{ruleForm.leadManagerTel}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="15">
              <el-form-item label="立项项目经理:" prop="approvalManagerName" >{{ruleForm.approvalManagerName}}
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-form-item label="立项项目经理电话:" prop="approvalManagerTel" >{{ruleForm.approvalManagerTel}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="15">
              <div class="myBox"></div>
              <span class="text">细化信息</span>
            </el-col>
          </el-row>
          <!--start-->
          <div >
<!--            <img class="my-img" src="@/assets/images/add.png" @click="addLine"/>-->
<!--            <img class="my-img" src="@/assets/images/delete.png" @click=""/>-->
            <el-table
              :data="ruleForm.refineList"
              :rules="rules"
              style="width: 100%" :header-cell-style="tableHeaderColor">
              <el-table-column type="index" width="50" style="background-color: #1e6abc" label="序号">
              </el-table-column>
              <el-table-column prop="refineName" label="细化名称">
                <template slot-scope="scope">
                    <span>{{ scope.row.refineName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="workload" label="细化工作量">
                <template slot-scope="scope">
                  <span>{{ scope.row.workload }}</span>
                </template>
              </el-table-column>

              <el-table-column prop="finishProportion" label="完成比例（%）"  >
                <template slot-scope="scope">
                  <span>{{ scope.row.finishProportion }}</span>
                </template>
              </el-table-column>

              <el-table-column prop="state" label="商务状态">
                <template slot-scope="scope">
<!--                  <span v-if="scope.row.state == 1">已签合同</span>-->
<!--                  <span v-if="scope.row.state == 2">已下订单</span>-->
                  <span>{{ scope.row.refineTypeName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="message" label="备注">
                <template slot-scope="scope">
                  <span >{{ scope.row.message }}</span>
                </template>
              </el-table-column>

            </el-table>
          </div>

          <!--          end-->

        </el-form>
      </el-main>
      <el-footer class="el-dialog--center position: fixed;bottom" >
        <el-button @click="editForm()" class="reset-btn">修改</el-button>
        <el-button @click="resetForm('ruleForm')" class="reset-btn">关闭</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import { info,createProject } from "@/api/businessProject";

  export default {
    name: "createProject",
    data() {

      //校验是否有汉字
      var checkData = (rule, value, callback)=> {
        if (value) {
          if (/[\u4E00-\u9FA5]/g.test(value)) {
            callback(new Error('不能输入汉字!'));
          } else {
            callback();
          }
        }
        callback();
      };
      //校验是否为数字
      const isNum = (rule, value, callback) => {
        const age = /^[0-9]*$/
        if (!age.test(value)) {
          callback(new Error('电话只能为数字'))
        } else {
          callback()
        }
      };
      return {
        // tableData: [{
        //   refineId:"",
        //   refineName:"",
        //   workload:"0",
        //   finishProportion:"",
        //   state:"",
        //   message:"",
        //   editing: true
        // } ],
        radio: "1",
        approvalDataList:[],
        ruleForm: {
          id:"",
          projectId:"",
          projectName:"",
          approvalData:"",
          state:"",
          workload:"",
          technologyDepartment:"",
          businessDepartment:"",
          leadManagerName:"",
          leadManagerTel:"",
          approvalManagerName:"",
          approvalManagerTel:"",
          refineList: [{
            refineId:"",
            refineName:"",
            workload:"0",
            finishProportion:"",
            state:"",
            message:"",
            editing: true,
            refineTypeName:""
          }],
        },

        rules: {
          projectName: [
            // required: true,这个属性控制红色*，表示必输//{ required: true, message: "项目名称需要在项目管理中创建项目", trigger: "blur" }
            { required: true, message: "项目名称必输项", trigger: "blur" },
            // { pattern: /^[a-zA-Z0-9]{2,20}$/, message: "请输入格式正确的账号", trigger: "blur" }
          ],
          leadManagerTel:[
            {  message: "请输入数字", trigger: "blur" },
            {validator:isNum,trigger: "blur"}
          ],
          approvalManagerTel:[
            {  message: "请输入数字", trigger: "blur" },
            {validator:isNum,trigger: "blur"}
          ],
        },
        // options: []
      };
    },

    methods: {
      tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #FAFAFA;color: #000;font-weight: 500;'
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            createProject(this.ruleForm).then(res => {
              console.log("success");
              if (res.code == 200 && res.success == true) {
                this.$message({
                  type: "success",
                  message: "创建成功"
                })
                this.$router.push("projectList")
              } else {
                this.$message({
                  type: "error",
                  message: res.message
                })
              }
            });

          } else {
            this.$message({
              type: "error",
              message: "请填写完整的信息"
            })
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.$router.push("ProjectList");
      },
      editForm(){
        this.$router.push({
          path:'/projectEdit',
          name:'projectEdit',
          query:{
            id : this.ruleForm.id,
          }
        })
      },
    },

    created() {
      this.ruleForm.id = this.$route.query.id;
      this.ruleForm.projectId = this.$route.query.projectId;
      //获取任务详情
      info(this.ruleForm).then(res => {
        this.ruleForm = res.data;
        // this.tableData = res.data.refineList;
      });
    }
  };
</script>

<style scoped>
  .ruleForm {
    width: 90%;
    margin-left: 40px;
  }
  /*.textarea-class{*/
  /*  width: 500px;*/
  /*  height: 100px;*/
  /*}*/
  .el-footer {
    height: 100% !important;
    display: flex;
    justify-content: center;
  }
  .reset-btn {
    margin-left: 40px;
    margin-bottom: 20px;
  }
  .el-input{
    width: 80%;
    margin-right: 10px;
    /*font-size: 25px;*/
  }

  .el-row {
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .div-class{
    border:1px solid #DCDFE6;
    width: 350px;
    height: 180px;
  }
  .text{
    font-size: 16px;
    color: rgba(0, 0, 0, 0.847058823529412);
    line-height: 24px;
    float:left;
    margin-top: 2px;
  }
  .myBox{
    border-width: 0px;
    width: 3px;
    height: 30px;
    background-color: blue;
    float:left;
    margin-right: 5px;
  }
</style>
