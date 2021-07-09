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
          <el-row>
            <el-col :span="12">
              <el-form-item hidden label="ID:" prop="id"> {{ruleForm.id}} </el-form-item>
              <el-form-item label="项目名称:" prop="projectId">{{ruleForm.projectName}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="细化名称:" prop="refineName">{{ruleForm.refineName}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="方案名称:" prop="programmeId">{{ruleForm.programmeName}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="任务完成状态:" prop="taskState">
                <span v-if="ruleForm.taskState == '0'">进行中</span>
                <span v-if="ruleForm.taskState == '1'">已投产</span>
                <span v-if="ruleForm.taskState == '2'">已剥离</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="原因:" prop="detail">{{ruleForm.detail}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="myBox"></div>
              <span class="text">基本信息</span>
              <div class="border-line">
                <img class="my-img" src="@/assets/images/show.png" @click="changeShow1()"/>
              </div>
            </el-col>
          </el-row>
          <div v-show="this.dialogVisible1" >
          <el-row>
            <el-col :span="12">
              <el-form-item label="批次:" prop="batchNo">{{ruleForm.batchNo}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="生产任务编号:" prop="productionTaskNo">{{ruleForm.productionTaskNo}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="任务下达时间:" prop="taskStartDate">{{ruleForm.taskStartDate}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="功能测试版本提交时间:" prop="uatUpDate" >{{ruleForm.uatUpDate}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="正式版本提交时间:" prop="productionUpDate">{{ruleForm.productionUpDate}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="投产时间:" prop="productionOnlineDate">{{ruleForm.productionOnlineDate}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="改造点状态:" prop="state">
                <span v-if="ruleForm.state == 1">已完成</span>
                <span v-if="ruleForm.state == 2">部分完成</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="排期内容:" prop="scheduleMsg" >{{ruleForm.scheduleMsg}}
              </el-form-item>
            </el-col>
          </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="改造点:" prop="transformationPoint">{{ruleForm.transformationPoint}}
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="24">
              <div class="myBox"></div>
              <div><span class="text">实施信息</span></div>
              <div class="border-line">
                <img class="my-img" src="@/assets/images/show.png" @click="changeShow2()"/>
              </div>
            </el-col>
          </el-row>
          <div v-show="this.dialogVisible2" >
          <el-row>
            <el-col :span="12">
              <el-form-item label="任务类型:" prop="taskType">{{ruleForm.taskTypeName}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="软件中心排期工作量:" prop="scheduleWorkload">{{ruleForm.scheduleWorkload}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="产品名称:" prop="productId">{{ruleForm.productName}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="分析/开发人员:" prop="developName">{{ruleForm.developName}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="总体设计评审时间:" prop="totalDesignDate">{{ruleForm.totalDesignDate}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="详细设计评审时间:" prop="detailDesignDate">{{ruleForm.detailDesignDate}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="内部复测时间:" prop="innerTestDate">{{ruleForm.innerTestDate}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="代码复查时间:" prop="codeTestDate">{{ruleForm.codeTestDate}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="风险点:" prop="dangerPoint" >{{ruleForm.dangerPoint == "" ? "无" : ruleForm.dangerPoint}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="风险级别:" prop="dangerType">
                  <span v-if="ruleForm.dangerType === '0'">无风险</span>
                  <span v-if="ruleForm.dangerType === '1'">低风险</span>
                  <span v-if="ruleForm.dangerType === '2'">中风险</span>
                  <span v-if="ruleForm.dangerType === '3'">高风险</span>
              </el-form-item>
            </el-col>
          </el-row>
          </div>
        </el-form>
      </el-main>
      <el-footer class="el-dialog--center" >
        <el-button @click="editForm()" class="reset-btn">修改</el-button>
        <el-button @click="resetForm('ruleForm')" class="reset-btn">关闭</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import { listChild,listAll } from "@/api/businessProduct";
  import { projectList,refineListById,refineInfoById } from "@/api/businessProject";
  import { listByRefineId } from "@/api/businessProgramme";
  import { createTask,getTaskTypeList,infoTask } from "@/api/businessTask";

  export default {
    name: "createProgramme",
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
          callback(new Error('工作量只能为数字'))
        } else {
          callback()
        }
      };
      return {
        radio: "1",
        parentProductList: null,
        childProductList: null,
        projectList: null,
        refineList: null,
        programmeList:null,
        taskTypeList:null,
        productList:null,
        projectId: "",
        fileList: [],
        dialogVisible1: true,
        dialogVisible2: true,
        ruleForm: {
          taskId:"",batchNo:"",productionTaskNo:"",
          programmeId:"",taskName:"",scheduleMsg:"",
          transformationPoint:"",state:"",taskStartDate:"",
          productionUpDate:"",uatUpDate:"",productionOnlineDate:"",
          taskType:"",scheduleWorkload:"",productId:"",
          developName:"",totalDesignDate:"",detailDesignDate:"",
          innerTestDate:"",codeTestDate:"",dangerPoint:"",
          dangerType:"",detail:"",
          projectName: "",
          projectId: "",
          refineName: "",
          refineId: "",
          programmeName:"",
          taskTypeName:"",
          id:"",
        },

        rules: {
          projectName: [
            // required: true,这个属性控制红色*，表示必输//{ required: true, message: "项目名称需要在项目管理中创建项目", trigger: "blur" }
            {  message: "项目名称需要在项目管理中创建项目", trigger: "blur" },
            // { pattern: /^[a-zA-Z0-9]{2,20}$/, message: "请输入格式正确的账号", trigger: "blur" }
          ],
          childDemandName:[
            {  message: "子需求编号为必输项", trigger: "blur" },
            {validator:checkData,trigger: "blur"}
          ],
          parentDemandName:[
            {  message: "目需求编号为必输项", trigger: "blur" },
            {validator:checkData,trigger: "blur"},

          ],
          scheduleWorkload:[
            {  message: "工作量请输入数字", trigger: "blur" },
            {validator:isNum,trigger: "blur"}
          ],
          batchNo:[{  message: "批次为必输项", trigger: "blur" },
            {validator:checkData,trigger: "blur"},],
          productionTaskNo:[{  message: "生产任务编号为必输项", trigger: "blur" },
            {validator:checkData,trigger: "blur"},],
        },
        // options: []
      };
    },

    methods: {
      handleCheckedCitiesChange(ruleForm) {
        let temp = "";
        for (let item of ruleForm.childProductIdArray){
          temp = temp + item+","
        }
        //如果temp长度超过1，去掉最后一个","   2222,aaa,bbb,
        if(temp.length > 1){
          temp = temp.substring(0,temp.length-1);
        }
        ruleForm.childProductId = temp;
      },
      changeShow1(){
        this.dialogVisible1 = !this.dialogVisible1;
      },
      changeShow2(){
        this.dialogVisible2 = !this.dialogVisible2;
      },

      getChildProductList(){
        this.$set(this.ruleForm, 'childProductIdArray', []);
        listChild(this.ruleForm).then(res => {
          this.childProductList = res.data;
        });
      },

      getRefineList(){
        this.$set(this.ruleForm, 'refineId', '');
        refineListById(this.ruleForm.projectId).then(res => {
          this.refineList = res.data;
        });
      },

      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            createTask(this.ruleForm).then(res => {
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
        this.$router.push("taskList");
      },
      editForm(){
        this.$router.push({
          path:'/taskEdit',
          name:'taskEdit',
          query: this.ruleForm

        })
      }
    },

    created() {
      this.ruleForm.id = this.$route.query.id;
      this.ruleForm.projectId = this.$route.query.projectId;
      console.log("--->"+ this.ruleForm.id)
      //获取任务详情
      infoTask(this.ruleForm).then(res => {
        this.ruleForm = res.data;
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
  .border-line{
    border-width: 0px;
    width: 90%;
    height: 1px;
    background-color: #bebec3;
    float:left;
    margin-left: 90px;
    bottom: 18px;
    position: relative;
  }
  .my-img{
    float:right;
    position: relative;
    margin-left: 30px;
    padding-left: 30px;
    left: 15px;
  }


</style>
