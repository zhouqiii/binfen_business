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
              <el-form-item label="项目名称:" prop="projectId">
                <el-select v-model="ruleForm.projectId" filterable placeholder="请选择或直接输入项目名称" @change="getRefineList()">
                  <el-option
                    v-for="item in projectList"
                    :key="item.projectId"
                    :label="item.projectName"
                    :value="item.projectId">
                  </el-option>
                </el-select>

              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="细化名称:" prop="refineId">
                <el-select v-model="ruleForm.refineId" filterable placeholder="请选择或直接输入细化名称" @change="getProgrammeList()">
                  <el-option
                    v-for="item in refineList"
                    :key="item.refineId"
                    :label="item.refineName"
                    :value="item.refineId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="方案名称:" prop="programmeId">
                <el-select v-model="ruleForm.programmeId" filterable placeholder="请选择或直接输入方案名称" >
                  <el-option
                    v-for="item in programmeList"
                    :key="item.programmeId"
                    :label="item.programmeName"
                    :value="item.programmeId">
                  </el-option>
                </el-select>
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
                <el-form-item label="年份:" prop="time">
                  <el-select v-model="ruleForm.time" filterable placeholder="请选择" @change="timeChange">
                    <el-option
                      v-for="item in timeList"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="批次:" prop="batchNo">
                  <el-select v-model="ruleForm.batchNo" filterable placeholder="请选择">
                    <el-option
                      v-for="item in batchList"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="生产任务编号:" prop="productionTaskNo">
                  <el-input v-model="ruleForm.productionTaskNo" placeholder="请输入生产任务编号">{{ruleForm.productionTaskNo}}</el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="任务下达时间:" prop="taskStartDate">
                  <el-date-picker
                    v-model="ruleForm.taskStartDate"
                    align="right"
                    type="date"
                    placeholder=""
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="功能测试版本提交时间:" prop="uatUpDate" >
                  <el-date-picker
                    v-model="ruleForm.uatUpDate"
                    align="right"
                    type="date"
                    placeholder=""
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="正式版本提交时间:" prop="productionUpDate">
                  <el-date-picker
                    v-model="ruleForm.productionUpDate"
                    align="right"
                    type="date"
                    placeholder=""
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="投产时间:" prop="productionOnlineDate">
                  <el-date-picker
                    v-model="ruleForm.productionOnlineDate"
                    align="right"
                    type="date"
                    placeholder=""
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="排期内容:" prop="message" >
                  <el-input :rows="5" type="textarea" v-model="ruleForm.scheduleMsg" placeholder="请输入排期内容" ></el-input>

                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="改造点状态:" prop="state">
                  <el-radio  v-model="ruleForm.state" label="1" >已完成</el-radio>
                  <el-radio  v-model="ruleForm.state" label="2" >部分完成</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="改造点:" prop="remarks">
                  <el-input :rows="5" type="textarea" v-model="ruleForm.transformationPoint" placeholder="请输入改造点"></el-input>
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
              <el-form-item label="任务类型:" prop="taskType">
                <el-select v-model="ruleForm.taskType" placeholder="请选择任务类型">
                  <el-option
                    v-for="item in taskTypeList"
                    :key="item.taskType"
                    :label="item.taskTypeName"
                    :value="item.taskType">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="软件中心排期工作量:" prop="scheduleWorkload">
                <el-input v-model="ruleForm.scheduleWorkload" >{{ruleForm.scheduleWorkload}}</el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="产品名称:" prop="productId">
                <el-select v-model="ruleForm.productId" placeholder="请选择产品名称">
                  <el-option
                    v-for="item in parentProductList"
                    :key="item.productId"
                    :label="item.productName"
                    :value="item.productId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="分析/开发人员:" prop="developName">
                <el-input v-model="ruleForm.developName" >{{ruleForm.developName}}</el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="原型设计定版时间:"
                prop="prototypeDesignFinishedDate">
                <el-date-picker
                  v-model="ruleForm.prototypeDesignFinishedDate"
                  align="right"
                  type="date"
                  placeholder=""
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="总体设计评审时间:" prop="totalDesignDate">
                <el-date-picker
                  v-model="ruleForm.totalDesignDate"
                  align="right"
                  type="date"
                  placeholder=""
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="详细设计评审时间:" prop="detailDesignDate">
                <el-date-picker
                  v-model="ruleForm.detailDesignDate"
                  align="right"
                  type="date"
                  placeholder=""
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="测试案例评审时间:" prop="TestCaseReviewDate">
                <el-date-picker
                  v-model="ruleForm.TestCaseReviewDate"
                  align="right"
                  type="date"
                  placeholder=""
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="准入测试时间:" prop="AdmissionTestDate">
                <el-date-picker
                  v-model="ruleForm.AdmissionTestDate"
                  align="right"
                  type="date"
                  placeholder=""
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="代码复查时间:" prop="codeTestDate">
                <el-date-picker
                  v-model="ruleForm.codeTestDate"
                  align="right"
                  type="date"
                  placeholder=""
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="内部复测时间:" prop="innerTestDate">
                <el-date-picker
                  v-model="ruleForm.innerTestDate"
                  align="right"
                  type="date"
                  placeholder=""
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="风险点(选填):" prop="dangerPoint" >
                <el-input :rows="5" type="textarea" v-model="ruleForm.dangerPoint" placeholder="请输入风险点" ></el-input>

              </el-form-item>
            </el-col>
          </el-row>

          </div>
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
  import { listChild,listAll } from "@/api/businessProduct";
  import { listByRefineId,getProgrammeList,listByRefineIdObj } from "@/api/businessProgramme";
  import { projectList,refineListById,refineInfoById } from "@/api/businessProject";
  import { createTask,getTaskTypeList,infoByProgrammeId, batchList } from "@/api/businessTask";

  export default {
    name: "createProgramme",
    data() {

      //校验是否有汉字
      var checkData = (rule, value, callback)=> {
        console.log("hanzi")
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

      //校验方案名称是否重复
      const checkProgrammeId = (rule, value, callback) => {
        console.log("校验任务中是否已经创建此方案名称")
        infoByProgrammeId(this.ruleForm).then(res => {
          console.log("---------"+res.data )
          if (res.data != null && value == res.data.programmeId) {
            callback(new Error("此方案名称已创建任务"));
          } else {
            callback();
          }
        });
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
        timeList: [], // 年份列表
        batchList: [], // 批次列表
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
          dangerType:"",
          prototypeDesignFinishedDate: "",
          TestCaseReviewDate: "",
          AdmissionTestDate: "",
          projectName: "",
          projectId: "",
          refineName: "",
          refineId: "",
          programmeName:"",
          taskTypeName:"",
          time:"",
        },

        rules: {
          projectName: [
            // required: true,这个属性控制红色*，表示必输//{ required: true, message: "项目名称需要在项目管理中创建项目", trigger: "blur" }
            {required: true,  message: "项目名称需要在项目管理中创建项目", trigger: "blur" },
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
          productionTaskNo:[{ message: "生产任务编号为必输项", trigger: "blur" },
            {validator:checkData,trigger: "blur"},],
          taskType:[
            { required: true, message: "任务类型为必输项", trigger: "blur" }
          ],
          productId:[
            { required: true, message: "产品名称为必输项", trigger: "blur" }
          ],
          // programmeId:[
          //   { required: true, message: "方案名称为必输项", trigger: "blur" },
          //   {validator:checkProgrammeId,trigger: "blur"},
          // ]
        },
        // options: []
      };
    },

    methods: {
      // 年份切换
      timeChange(val) {
        this.ruleForm.batchNo = null;
        this.getBatchList(val)
      },
      //批次列表
      getBatchList(year) {
        batchList({time: year}).then(response => {
          this.batchList = response.data;
        });
      },
      // 获取年份列表
      getTimeList() {
        const date = new Date();
        let year = date.getFullYear();
        this.ruleForm.time = year.toString();
        this.getBatchList(this.ruleForm.time);
        for(let i = year+1; i >= 2017; i--) {
          this.timeList.push(i.toString());
        }
      },
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
        this.$set(this.ruleForm, 'programmeId', '');
        refineListById(this.ruleForm.projectId).then(res => {
          this.refineList = res.data;
        });
      },
      getProgrammeList(){
        this.$set(this.ruleForm, 'programmeId', '');
        //获取方案列表
        listByRefineIdObj(this.ruleForm).then(res => {
          this.programmeList = res.data;
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
        this.$router.push("programmeList");
      },

      //----上产文件方法start-
      submitUpload(event) {
        event.preventDefault();
        this.$refs.upload.submit();
      },
      changeMe(file,fileList){
        console.log(file, fileList);
        this.fileList=fileList;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },

      //----上传文件方法end

      //----菜单联动start
      //改变value值，实现 联动， 给下拉框绑定change事件
      selectExitSelectConfig(val) {
        // this.localFavorites = [];
        // this.goodsCircle.numIids = null,
          this.getLocalSelectConfig();
      },
      selectLocalSelectConfig(val) {
        console.log(val);
      },
      getExitSelectConfig() {
        this.$api.operation
          .getExitSelectConfig({
            liilType: 2,
            status: this.listQuery.enableStatus
          })
          .then(res => {
            if (res.data.code == 200) {
              let arr = [];
              res.data.result.forEach((res, index) => {
                arr[index] = {
                  key: res.favoritesId,
                  label: res.favoritesTitle
                };
              });
              this.favorites = arr;
              this.getLocalSelectConfig();
            }
          });
      },

      getLocalSelectConfig() {
        refineListById(this.ruleForm).then(res => {
          this.refineList = res.data;
        });
      },
      //----菜单联动end

    },

    created() {
      this.$nextTick(() => {
        // 获取年份
        this.getTimeList();
        //获取产品
        listAll().then(res => {
          this.parentProductList = res.data;
        });
        //获取项目
        projectList().then(res => {
          this.projectList = res.data;
        });
        //获取任务类型
        getTaskTypeList().then(res => {
          this.taskTypeList = res.data;
        });
  //获取方案名称
  //       getProgrammeList().then(res=>{
  //         this.programmeList = res.data;
  //       });
      })
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
  .el-select{
    width: 100%;
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
