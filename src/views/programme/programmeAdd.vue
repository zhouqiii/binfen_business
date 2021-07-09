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
              <el-form-item label="项目名称:" prop="projectId">
                <el-select v-model="ruleForm.projectId" placeholder="请选择" @change="getRefineList()">
                  <el-option
                    v-for="item in projectList"
                    :key="item.projectId"
                    :label="item.projectName"
                    :value="item.projectId">
                  </el-option>
                </el-select>

              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item label="细化名称:" prop="refineId">
<!--                <el-input v-model="ruleForm.refineName" placeholder="请输入细化名称" ></el-input>-->
                <el-select v-model="ruleForm.refineId" placeholder="请选择" @change="">
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

          <el-row type="flex" justify="start" align="middle">
            <el-col :span="10">
              <el-form-item label="母需求编号:" prop="parentDemandName">
                <el-input v-model="ruleForm.parentDemandName" placeholder="请输入母需求编号,例:ZD-202004-1065-039" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="子需求编号:" prop="childDemandName">
                <el-input v-model="ruleForm.childDemandName" placeholder="请输入子需求编号" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="start" align="middle">
            <el-col :span="10">
              <el-form-item label="工作量:" prop="workload">
                <el-input v-model="ruleForm.workload" >{{ruleForm.workload}}</el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <div class="el-table--border"></div>
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="20">
          <el-form-item label="产品名称:" prop="productId">
            <el-radio-group  v-model="ruleForm.productId" @change="getChildProductList()">
              <el-radio v-for="product in parentProductList" :label="product.productId" :key="index">{{product.productName}}</el-radio>

            </el-radio-group>
          </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="20">
          <el-form-item label="子产品名称:" prop="childProductId">
            <el-checkbox-group v-model="ruleForm.childProductIdArray" @change="handleCheckedCitiesChange(ruleForm)" >

              <el-checkbox v-for="childProduct in childProductList" :label="childProduct.childProductId" :key="index">{{childProduct.childProductName}}</el-checkbox>

            </el-checkbox-group>
          </el-form-item>
            </el-col>
          </el-row>
          <div class="el-table--border"></div>
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="10">
              <el-form-item label="业务信息:" prop="message" >
                <el-input :rows="5" type="textarea" v-model="ruleForm.message" placeholder="请输入业务信息" ></el-input>

              </el-form-item>
            </el-col>
          </el-row>

            <el-row type="flex" justify="start" align="middle">
              <el-col :span="10">
                <el-form-item label="备注:" prop="remarks">
                  <el-input :rows="5" type="textarea" v-model="ruleForm.remarks" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

          <el-row >
            <el-col :span="2">
              <el-form-item label="上传压缩包:" prop="fileId" >
              </el-form-item>
            </el-col>
<!--            action="http://localhost:9080/web/businessZipFile/create"-->
<!--            action="https://alex188.cn/web/businessZipFile/create"-->
             <el-col :span="10">
               <div class = 'box'>
               <el-upload
                 class="upload-demo"
                 ref="upload"
                 :action=uploadPath
                 :data="ruleForm"
                 :on-change="changeMe"
                 accept=".xls,.doc,.xlsx,.docx"
                 name="file"
                 :limit="1"
                 :on-preview="handlePreview"
                 :on-remove="handleRemove"
                 :file-list="fileList"
                 :auto-upload="false"
                 >
                 <div class="btn" >
                  <el-button slot="trigger" size="small" type="primary">上传附件</el-button>
                   <div slot="trigger" size="small" type="primary"  class="el-upload__tip">请选择一个xls/doc文件</div>
                 </div>
               </el-upload>

               </div>
             </el-col>

          </el-row>

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
  import { programmeList,createProgramme,editProgramme,deleteProgramme,infoByProgrammeId } from "@/api/businessProgramme";
  import { projectList,refineListById,refineInfoById } from "@/api/businessProject";
  import { upload } from "@/api/businessZipFile";

  export default {
    name: "createProgramme",
    data() {
      var checkChildDemandName = (rule, value, callback) => {
        infoByProgrammeId(this.ruleForm).then(res => {
          if (res.data != null && value == res.data.childDemandName) {
            callback(new Error("子需求编号已存在"));
          } else {
            callback();
          }
        });
      };
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
            projectId: "",
            fileList: [],
            uploadPath:"",
        ruleForm: {
          projectName: "",
          projectId: "",
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
          childDemandNameCheck:"",

        },
        rules: {
          projectId: [
            // required: true,这个属性控制红色*，表示必输//{ required: true, message: "项目名称需要在项目管理中创建项目", trigger: "blur" }
            { required: true, message: "项目名称需要在项目管理中创建项目", trigger: "blur" },
            // { pattern: /^[a-zA-Z0-9]{2,20}$/, message: "请输入格式正确的账号", trigger: "blur" }
          ],
          refineId: [
            { required: true, message: "细化名称为必输项", trigger: "blur" },
          ],
          childDemandName:[
            { required: true, message: "子需求编号为必输项", trigger: "blur" },
            {validator:checkChildDemandName,trigger: "blur"},
            {validator:checkData,trigger: "blur"}
          ],
          parentDemandName:[
            // { required: true, message: "母需求编号为必输项", trigger: "blur" },
            // {validator:checkData,trigger: "blur"},

          ],
          workload:[
            {  message: "工作量请输入数字", trigger: "blur" },
            {validator:isNum,trigger: "blur"}
          ],

        },
        // options: []
      };
    },

    methods: {
      //http://localhost:9080/web/businessZipFile/create
      getUploadPath(){
        this.uploadPath = process.env.BASE_API + "businessZipFile/create";
        console.log("----this.uploadPath---"+this.uploadPath)
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
      getChildProductList(){
        this.$set(this.ruleForm, 'childProductIdArray', []);
        listChild(this.ruleForm).then(res => {
          this.childProductList = res.data;
        });
      },

      getRefineList(){
        this.$set(this.ruleForm, 'refineId', '');
        this.$set(this.ruleForm, 'workload', '');
        refineListById(this.ruleForm.projectId).then(res => {
          this.refineList = res.data;
        });
      },
      getRefineInfo(){
        refineInfoById(this.ruleForm.refineId).then(res => {
          this.ruleForm.workload = res.data.workload;
        });
      },
      submitForm(formName) {
        const parentDemandName = this.ruleForm.parentDemandName;
        if(parentDemandName) {
          if (/[\u4E00-\u9FA5]/g.test(parentDemandName)) {
            this.$message({
              type: "error",
              message: "母需求编号不能输入汉字!"
            })
            return;
          }
        }
        this.$refs[formName].validate(valid => {
          if (valid) {
            createProgramme(this.ruleForm).then(res => {
              console.log("success");
              if (res.code == 200 && res.success == true) {
                this.$message({
                  type: "success",
                  message: "创建成功"
                })
                //上传文件
                this.$refs.upload.submit();
                this.$refs.upload.clearFiles();
                this.$router.push("programmeList")
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
        this.fileList=fileList;
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
      this.getUploadPath();
      listAll().then(res => {
        this.parentProductList = res.data;
      });
      projectList().then(res => {
        this.projectList = res.data;
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
  .upload-demo{
    position: relative;
    height: 200px;
    width: 420px;
    border:1px solid #DCDFE6;
    padding: 20px;
    margin-left: 25px;
    border-radius: 4px;
  }
  .upload-demo /deep/ .el-upload{
    position: absolute;
    bottom: 0;
  }
  .upload-demo /deep/ .el-upload-list{
    position: absolute;
    top: 0;
    height: 140px;
    width: 400px;
    overflow: auto;

  }


</style>
