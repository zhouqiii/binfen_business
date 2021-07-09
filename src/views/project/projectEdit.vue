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
              <el-form-item label="项目名称:" prop="projectName">
                <el-input v-model="ruleForm.projectName" placeholder="请输入项目名称"></el-input>
              </el-form-item>
            </el-col>

          </el-row>

          <el-row type="flex" justify="start" align="middle">
            <el-col :span="15">
              <el-form-item label="工作量:" prop="workload">
                <el-input v-model="ruleForm.workload" disabled placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-form-item label="立项年度:" prop="approvalData">
                <el-select v-model="ruleForm.approvalData" filterable placeholder="请选择" >
                  <el-option
                    v-for="item in approvalDataList"
                    :key="item.approvalData"
                    :label="item.approvalData"
                    :value="item.approvalData">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="15">
              <el-form-item label="业务部门:" prop="businessDepartment">
                <el-input v-model="ruleForm.businessDepartment" placeholder="请输入业务部门"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-form-item label="科技部门:" prop="technologyDepartment">
                <el-input v-model="ruleForm.technologyDepartment" placeholder="请输入科技部门"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="15">
              <el-form-item label="牵头项目经理:" prop="leadManagerName" >
                <el-input v-model="ruleForm.leadManagerName" placeholder="请输入科技部门"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-form-item label="牵头项目经理电话:" prop="leadManagerTel" >
                <el-input v-model="ruleForm.leadManagerTel" placeholder="请输入科技部门"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="15">
                <el-form-item label="立项项目经理:" prop="approvalManagerName" >
                  <el-input v-model="ruleForm.approvalManagerName" placeholder="请输入科技部门"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="15">
                <el-form-item label="立项项目经理电话:" prop="approvalManagerTel" >
                  <el-input v-model="ruleForm.approvalManagerTel" placeholder="请输入科技部门"></el-input>
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
            <img class="my-img" src="@/assets/images/add.png" @click="addLine"/>
            <img class="my-img" src="@/assets/images/delete.png" @click="deleteLine"/>
            <el-table
              :data="ruleForm.refineList"
              :rules="rules"
              style="width: 100%" :header-cell-style="tableHeaderColor">
              <el-table-column type="index" width="50" label="序号">
              </el-table-column>
              <el-table-column prop="refineName" label="细化名称">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.refineName" placeholder=""></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="workload" label="细化工作量">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.workload" disabled placeholder=""></el-input>
                </template>
              </el-table-column>

              <el-table-column prop="finishProportion" label="完成比例（%）"  >
                <template slot-scope="scope">
                    <el-input v-model="scope.row.finishProportion"  placeholder="" @change="checkFinishProportion(scope.row.finishProportion)" ></el-input>
                </template>
              </el-table-column>

              <el-table-column prop="state" label="商务状态">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.state" placeholder="请选择" @change="">
                    <el-option
                      v-for="item in refineTypeList"
                      :key="item.refineType"
                      :label="item.refineTypeName"
                      :value="item.refineType">
                    </el-option>
                  </el-select>
                  </template>
              </el-table-column>
              <el-table-column prop="message" label="备注">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.message" placeholder=""></el-input>
                  </template>
              </el-table-column>

            </el-table>
          </div>

          <!--          end-->

        </el-form>
      </el-main>
      <el-footer class="el-dialog--center position: fixed;bottom" >
        <el-button @click="submitForm('ruleForm')" class="reset-btn">保存</el-button>
        <el-button @click="resetForm('ruleForm')" class="reset-btn">关闭</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import { info,editProject,getRefineTypeList} from "@/api/businessProject";

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
      const isTel = (rule, value, callback) => {
        const temp = /^1([3456789])\d{9}$/
        if (!temp.test(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      };
      return {

        radio: "1",
        approvalDataList:[],
        refineTypeList:[],
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
            id:"",
            refineId:"",
            refineName:"",
            workload:"0",
            finishProportion:"",
            state:"",
            message:"",
            editing: true
          }],
        },

        rules: {
          projectName: [
            // required: true,这个属性控制红色*，表示必输//{ required: true, message: "项目名称需要在项目管理中创建项目", trigger: "blur" }
            { required: true, message: "项目名称必输项", trigger: "blur" },
            // { pattern: /^[a-zA-Z0-9]{2,20}$/, message: "请输入格式正确的账号", trigger: "blur" }
          ],
          leadManagerTel:[
            // { required: true, message: "请输入数字", trigger: "blur" },
            // {validator:isTel,trigger: "blur"}
          ],
          approvalManagerTel:[
            // { required: true, message: "请输入数字", trigger: "blur" },
            // {validator:isTel,trigger: "blur"}
          ],
        },
        // options: []
      };
    },

    methods: {
      checkFinishProportion(data){
        const age = /^[0-9]*$/
        if (!age.test(data) || data > 100) {
          this.$message({
            type: "error",
            message: "完成比例请输入小于100的数字"
          })
        }
      },
      //start
      tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #FAFAFA;color: #000;font-weight: 500;'
        }
      },
      check(param){
        console.log("--0-0-0-->")
        const age = /^[0-9]*$/
        if (!age.test(param)) {
          callback(new Error('请输入数字'))
        } else {
          callback()
        }
      },
      addLine(){ //添加行数
        var newValue = {
          id:"",
          refineId:"",
          refineName:"",
          workload:"0",
          finishProportion:"",
          state:"",
          message:"",
          editing: true
        };
        //添加新的行数
        this.ruleForm.refineList.push(newValue);
      },
      deleteLine(){//删除一行
        var len = this.ruleForm.refineList.length;
        if(len > 0) this.ruleForm.refineList.splice(len - 1, 1);
        else this.$message.error('没有可删除行');
      },

      //end
      init(){
        var myDate = new Date;
        var year = myDate.getFullYear();//获取当前年
        this.initSelectYear(year+1)
        this.ruleForm.approvalData = year;
      },
      initSelectYear(year){
        for(let i=0;i<30;i++){
          this.approvalDataList.push({approvalData:(year - i),approvalDataName:(year - i)+ "年"});
        }
      },
      inputIsTel(value) {
        const temp = /^1([3456789])\d{9}$/
        if (!temp.test(value)) {
          this.$message({
            type: "error",
            message: "请输入正确的手机号",
          })
          return false;
        }
        return true;
      },
      submitForm(formName) {
        const leadManagerTel = this.ruleForm.leadManagerTel;
        const approvalManagerTel = this.ruleForm.approvalManagerTel;
        if (leadManagerTel) {
          if(!this.inputIsTel(leadManagerTel)) {
              return;
          };
        }
        if (approvalManagerTel) {
          if(!this.inputIsTel(approvalManagerTel)) {
              return;
          };
        }
        this.$refs[formName].validate(valid => {
          if (valid) {
            //判断细化名称是否相同
            let refineNameList = [];
            for(let i = 0;i<this.ruleForm.refineList.length;i++){
              refineNameList.push(this.ruleForm.refineList[i].refineName);
            }
            let nary = refineNameList.sort();
            for(let j = 0;j<refineNameList.length;j++){
              if(nary[j] == nary[j + 1]) {
                this.$message({
                  type: "error",
                  message: "细化名称重复"+nary[j]
                })
                return;
              }
            }

            editProject(this.ruleForm).then(res => {
              console.log("success");
              if (res.code == 200 && res.success == true) {
                this.$message({
                  type: "success",
                  message: "修改成功"
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
        this.$router.push("projectList");
      },

    },

    created() {
      this.init();
      this.ruleForm.id = this.$route.query.id;
      //获取项目详情
      info(this.ruleForm).then(res => {
        this.ruleForm = res.data;
      });
      //获取细化商务状态列表
      getRefineTypeList().then(response => {
        this.refineTypeList = response.data;
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
    margin-top: 25px;
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
  .my-img{
    float: right;
    margin-right: 10px;
  }

</style>
