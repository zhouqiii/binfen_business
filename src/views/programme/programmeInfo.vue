<template>
  <div class="index">
    <el-container >
      <el-main>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          size="mini"
          class="ruleForm"
        >
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="10">
              <el-form-item hidden label="方案ID:" prop="programmeId">
                <!--                {{ruleForm.programmeId}}-->
              </el-form-item>
              <el-form-item label="项目名称:" prop="projectName">
                {{ruleForm.projectName}}
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item hidden label="细化ID:" prop="refineId">
                {{ ruleForm.refineId}}
              </el-form-item>
              <el-form-item label="细化名称:" prop="refineName">
                {{ruleForm.refineName}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="start" align="middle">
            <el-col :span="10">
              <el-form-item label="母需求编号:" prop="parentDemandName">
                {{ruleForm.parentDemandName}}
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="子需求编号:" prop="childDemandName">
                {{ruleForm.childDemandName}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="start" align="middle">
            <el-col :span="10">
              <el-form-item label="工作量:" prop="workload">
                {{ruleForm.workload}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="start" align="middle">
            <el-col :span="10">
              <el-form-item hidden label="产品ID:" prop="productId">
                <!--                {{ruleForm.productId}}-->
              </el-form-item>
              <el-form-item label="产品名称:" prop="productName">
                {{ruleForm.productName}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="10">
              <el-form-item hidden label="子产品ID:" prop="childProductId">
                <!--                {{ruleForm.childProductId}}-->
              </el-form-item>
              <el-form-item label="子产品名称:" prop="childProductId">
                {{ruleForm.childProductName}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="10">
              <el-form-item label="业务信息:" prop="message" >
                {{ruleForm.message}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="start" align="middle">
            <el-col :span="10">
              <el-form-item label="备注:" prop="remarks">
                {{ruleForm.remarks}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="2">
              <el-form-item label="上传压缩包:" prop="fileId" >
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="start" style="height: 150px">
            <el-col :span="10">

              <!--          <el-row type="flex" justify="start" align="middle">-->
              <el-form-item label="" prop="" >
                <div style="display: flex;">
                  <div style="display: inline-block;padding-right:10px;" v-for="(item,index) in fileList" :key="index">
                    <div class="file_class" >
                      <div class="img_div_class">
                        <img style="margin-top:10px;" v-if="item.fileName.indexOf('.doc') > 0" src="@/assets/images/w.png" />
                        <img style="margin-top:10px;" v-if="item.fileName.indexOf('.xls') > 0" src="@/assets/images/x.png" />
                      </div>
                      <div class="img_file_class">{{item.fileName}}</div>
                    </div>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <!--          </el-row>-->
        </el-form>
      </el-main>
      <el-footer class="el-dialog--center position: fixed;bottom" >
        <el-button @click="editForm(ruleForm)" class="reset-btn">修改</el-button>
        <el-button @click="resetForm('ruleForm')" class="reset-btn">关闭</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import { listChild,listAll } from "@/api/businessProduct";
  import { infoProgramme } from "@/api/businessProgramme";

  export default {
    name: "createProgramme",
    data() {
      return {
        radio: "1",
        parentProductList: null,
        childProductList: null,
        projectList: null,
        projectId: "",
        fileList: [],

        ruleForm: {
          projectName: "",
          refineName: "",
          refineId: "",
          parentDemandName: "",
          childDemandName: "",
          workload: "",
          remarks: "",
          fileId: "",
          childProductId: "",
          childProductIdArray: [],
          childProductName: "",
          productId: "",
          fileList: [],
          id:"",
          projectId:"",
          programmeId:"",

        },
        rules: {
          projectName: [
            // required: true,这个属性控制红色*，表示必输//{ required: true, message: "项目名称需要在项目管理中创建项目", trigger: "blur" }
            {  message: "项目名称需要在项目管理中创建项目", trigger: "blur" },
            // { pattern: /^[a-zA-Z0-9]{2,20}$/, message: "请输入格式正确的账号", trigger: "blur" }
          ],

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
        console.log("ruleForm.childProductId---"+ruleForm.childProductId);
      },


      getChildProductList(){
        console.log(this.ruleForm);
        listChild(this.ruleForm).then(res => {
          this.childProductList = res.data;
        });
      },

      editForm(ruleForm){
        this.$router.push({
          path:'/programmeEdit',
          name:'programmeEdit',
          query:this.ruleForm,

        })
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
        this.fileList=fileList;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }

      //----上传文件方法end

    },
    created() {
      this.ruleForm.id = this.$route.query.id;
      infoProgramme(this.ruleForm).then(res => {
        this.ruleForm = res.data;
        this.fileList = res.data.zipFileList;

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
  .file_class{
    left: 0px;
    top: 0px;
    background: inherit;
    background-color: rgba(242, 242, 242, 1);
    border-radius: 4px;
    -moz-box-shadow: none;
    box-shadow: none;
    width: 130px;
    height: 119px;
    font-family: 'Arial Normal', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    color: #333333;
    text-align: center;
    line-height: normal;
  }
  .img_div_class{
    border-width: 0px;
    width: 130px;
    height: 40px;
  }
  .img_class{
    border-width: 0px;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 36px;
    height: 42px;
  }
  .img_file_class{
    margin-top: 20px;
  }
</style>
