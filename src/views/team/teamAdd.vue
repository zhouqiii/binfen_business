<template>
  <div class="index">
    <el-container >
      <el-main>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="180px"
          class="ruleForm"
        >

          <el-row>
            <el-col :span="22">
              <div class="myBox"></div>
              <div><span class="text">工作信息</span></div>
              <div class="border-line">
                <img class="my-img" src="@/assets/images/show.png" @click="changeShow(1)"/>
              </div>
            </el-col>
          </el-row>
          <div v-show="infoVisible[1]" >
            <el-row>
              <el-col :span="12">
                <el-form-item label="员工姓名:" prop="realName">
                  <el-input v-model="ruleForm.realName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="姓名拼音:" prop="username">
                  <el-input v-model="ruleForm.username" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="联系电话:" prop="mobile">
                  <el-input v-model="ruleForm.mobile" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="员工邮箱:" prop="email">
                  <el-input v-model="ruleForm.email" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="入职日期:" prop="entryDate">
                  <el-date-picker
                    v-model="ruleForm.entryDate"
                    align="right"
                    type="date"
                    placeholder=""
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="员工角色:" prop="roleId">
                  <el-select v-model="ruleForm.roleId" placeholder="请选择">
                    <el-option
                    :label="item.name"
                    :value="item.id"
                    :key="item.id"
                    v-for="item in roleList"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="现任岗位:" prop="incumbentPost">
                  <el-input v-model="ruleForm.incumbentPost" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

          </div>

          <!-- 隶属关系 begin -->
          <el-row>
            <el-col :span="22">
              <div class="myBox"></div>
              <span class="text">隶属关系</span>
              <div class="border-line">
                <img class="my-img" src="@/assets/images/show.png" @click="changeShow(2)"/>
              </div>
            </el-col>
          </el-row>
          <div v-show="infoVisible[2]" >
            <el-row>
              <el-col :span="12">
                <el-form-item label="总监:" prop="chiefInspector">
                  <el-input disabled v-model="ruleForm.chiefInspector" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="主管:" prop="executiveDirector">
                  <el-select v-model="ruleForm.executiveDirector" placeholder="请选择">
                    <el-option
                    :label="item.name"
                    :value="item.name"
                    :key="item.name"
                    v-for="item in directorList"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="直属上司:" prop="manager">
                  <el-select v-model="ruleForm.manager" placeholder="请选择">
                    <el-option
                    :label="item.name"
                    :value="item.name"
                    :key="item.name"
                    v-for="item in managerList"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="项目助理:" prop="assistant">
                  <el-input v-model="ruleForm.assistant" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!-- 隶属关系 End -->

          <!-- 项目关系 begin -->
          <el-row>
            <el-col :span="22">
              <div class="myBox"></div>
              <span class="text">项目关系</span>
              <div class="border-line">
                <img class="my-img" src="@/assets/images/show.png" @click="changeShow(3)"/>
              </div>
            </el-col>
          </el-row>
          <div v-show="infoVisible[3]" >
            <el-row>
              <el-col :span="12">
                <el-form-item label="所在项目:" prop="product">
                  <el-input v-model="ruleForm.product" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="项目细分:" prop="productDetail">
                  <el-input v-model="ruleForm.productDetail" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="技术评定:" prop="technicalLevel">
                  <el-input v-model="ruleForm.technicalLevel" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="现技术方向:" prop="technicalDirection">
                  <el-input v-model="ruleForm.technicalDirection" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!-- 项目关系 End -->

          <!-- 基本关系 begin -->
          <el-row>
            <el-col :span="22">
              <div class="myBox"></div>
              <span class="text">基本关系</span>
              <div class="border-line">
                <img class="my-img" src="@/assets/images/show.png" @click="changeShow(4)"/>
              </div>
            </el-col>
          </el-row>
          <div v-show="infoVisible[4]" >
            <el-row>
              <el-col :span="12">
                <el-form-item label="性别:" prop="sex">
                  <el-select v-model="ruleForm.sex" placeholder="请选择">
                    <el-option label="男" value="0"></el-option>
                    <el-option label="女" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="籍贯:" prop="nativePlace">
                  <el-input v-model="ruleForm.nativePlace" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="户口所在地:" prop="hukou">
                  <el-input v-model="ruleForm.hukou" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最高学历:" prop="education">
                  <el-select v-model="ruleForm.education" placeholder="请选择">
                    <el-option label="中专" value="中专"></el-option>
                    <el-option label="大专" value="大专"></el-option>
                    <el-option label="本科" value="本科"></el-option>
                    <el-option label="硕士" value="硕士"></el-option>
                    <el-option label="博士" value="博士"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="最高学历毕业院校:" prop="graduationSchool">
                  <el-input v-model="ruleForm.graduationSchool" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最高学历专业:" prop="major" >
                  <el-input v-model="ruleForm.major" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="最高学历毕业日期:" prop="graduationDate">
                  <el-date-picker
                    v-model="ruleForm.graduationDate"
                    align="right"
                    type="year"
                    value-format="yyyy"
                    placeholder="">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!-- 基本关系 End -->
        </el-form>
      </el-main>
      <el-footer class="el-dialog--center" >
        <el-button @click="submitForm('ruleForm')" class="reset-btn">保存</el-button>
        <el-button @click="resetForm('ruleForm')" class="reset-btn">返回</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import { addTeamMember, getTeamInfo, updateTeamMember, getLeaderList } from '@/api/team';

  export default {
    name: "teamAdd",
    data() {
      return {
        id: '',
        fileList: [],
        infoVisible:[true, true, true, true, true],
        managerList: [], // 直属上司
        directorList: [], // 主管
        roleList:[ // 员工角色
          {
            name: '项目助理',
            id: '0',
          },
          {
            name: '组员',
            id: '1',
          },
          {
            name: '项目经理',
            id: '2',
          },
          {
            name: '主管',
            id: '3',
          },
          {
            name: '总监',
            id: '4',
          }
        ],
        ruleForm: {
          realName: '', // 员工姓名
          sex: '', // 性别
          mobile: '', // 联系电话
          email: '', // 员工邮箱
          nativePlace: '', // 籍贯
          hukou: '', // 户口所在地
          education: '', // 最高学历
          graduationSchool: '', // 最高学历毕业院校
          major: '', // 最高学历专业
          graduationDate: '', // 最高学历毕业日期
          entryDate: '', // 入职日期
          incumbentPost: '', // 现任岗位
          chiefInspector: '黄俊峰', // 总监
          executiveDirector: '', // 主管
          manager: '', // 直属上司
          assistant: '', // 项目助理
          product: '', // 所在项目
          productDetail: '', // 项目细分
          technicalLevel: '', // 技术评定
          technicalDirection: '', // 现技术方向
          username: '', // 姓名拼音,
          roleId: '', // 员工角色
        },
        // 表单校验规则
        rules: {
          realName: [
            { required: true, message: "员工姓名为必输项", trigger: "blur" },
          ],
          sex: [
            { required: true, message: "性别为必选项", trigger: "blur" },
          ],
          mobile: [
            { required: true, message: "联系电话为必输项", trigger: "blur" },
          ],
          email: [
            { required: true, message: "员工邮箱为必输项", trigger: "blur" },
          ],
          nativePlace: [
            { required: true, message: "籍贯为必输项", trigger: "blur" },
          ],
          hukou: [
            { required: true, message: "户口所在地为必输项", trigger: "blur" },
          ],
          education: [
            { required: true, message: "最高学历为必选项", trigger: "blur" },
          ],
          graduationSchool: [
            { required: true, message: "最高学历毕业院校为必输项", trigger: "blur" },
          ],
          major: [
            { required: true, message: "最高学历专业为必输项", trigger: "blur" },
          ],
          graduationDate: [
            { required: true, message: "最高学历毕业日期为必输项", trigger: "blur" },
          ],
          entryDate: [
            { required: true, message: "入职日期为必输项", trigger: "blur" },
          ],
          roleId: [
            { required: true, message: "员工角色为必选项", trigger: "blur" },
          ],
          // 总监
          chiefInspector: [{required: true,}],
          executiveDirector: [
            { required: true, message: "主管为必输项", trigger: "blur" },
          ],
          manager: [
            { required: true, message: "直属上司为必输项", trigger: "blur" },
          ],
          assistant: [
            { required: true, message: "项目助理为必输项", trigger: "blur" },
          ],

          product: [
            { required: true, message: "所在项目为必输项", trigger: "blur" },
          ],
          productDetail: [
            // { required: true, message: "项目细分为必输项", trigger: "blur" },
          ],
          technicalLevel: [
            { required: true, message: "技术评定为必输项", trigger: "blur" },
          ],
          technicalDirection: [
            { required: true, message: "现技术方向为必输项", trigger: "blur" },
          ],
          username: [
            { required: true, message: "姓名拼音为必输项", trigger: "blur" },
          ],

          // projectName: [
          //   {required: true,  message: "项目名称需要在项目管理中创建项目", trigger: "blur" },
          //   { pattern: /^[a-zA-Z0-9]{2,20}$/, message: "请输入格式正确的账号", trigger: "blur" }
          // ],
          // programmeId:[
          //   { required: true, message: "方案名称为必输项", trigger: "blur" },
          //   {validator:checkProgrammeId,trigger: "blur"},
          // ]
        },
      };
    },

    methods: {
      changeShow(index) {
        // 内容显示隐藏切换
        this.$set(this.infoVisible, index , !this.infoVisible[index])
      },
      getLeaderList() {
        // 直属上司
        getLeaderList({roleId: '2'}).then((res) => {
          this.managerList = res.data;
        }).catch((err) => {
          console.log('getLeaderList err', err);
        });
        // 主管
        getLeaderList({roleId: '3'}).then((res) => {
          this.directorList = res.data;
          console.log('getLeaderList res 3', res);
        }).catch((err) => {
          console.log('getLeaderList err', err);
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if(this.id){
              let obj = {
                ...this.ruleForm,
                id: this.id
              }
              updateTeamMember(obj).then(res => {
                console.log("success");
                if (res.code == 200 && res.success == true) {
                  this.$message({
                    type: "success",
                    message: "编辑成功"
                  })
                  this.$router.push("teamList")
                } else {
                  this.$message({
                    type: "error",
                    message: res.message
                  })
                }
              });
            }else{
              addTeamMember(this.ruleForm).then(res => {
                console.log("success");
                if (res.code == 200 && res.success == true) {
                  this.$message({
                    type: "success",
                    message: "创建成功"
                  })
                  this.$router.push("teamList")
                } else {
                  this.$message({
                    type: "error",
                    message: res.message
                  })
                }
              });
            }

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
        this.$router.push("teamList");
      },
      getTeamInfo(id) {
        getTeamInfo(id).then(res => {
          let {
            realName,
            sex,
            mobile,
            email,
            nativePlace,
            hukou,
            education,
            graduationSchool,
            major,
            graduationDate,
            entryDate,
            incumbentPost,
            executiveDirector,
            manager,
            assistant,
            product,
            productDetail,
            technicalLevel,
            technicalDirection,
            username
          } = res.data;
          this.ruleForm = {
            realName,
            sex,
            mobile,
            email,
            nativePlace,
            hukou,
            education,
            graduationSchool,
            major,
            graduationDate,
            entryDate,
            incumbentPost,
            chiefInspector: '黄俊峰',
            executiveDirector,
            manager,
            assistant,
            product,
            productDetail,
            technicalLevel,
            technicalDirection,
            username
          };
          console.log('getTeamInfo,,', res);
        })
      },
    },

    created() {
      this.$nextTick(() => {
        this.getLeaderList();
        let id = this.$route.query.id || null;
        if(id){
          this.id = id;
          this.getTeamInfo(id);
        }
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
    line-height: 30px;
    float:left;
    /* margin-top: 2px; */
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
  width: calc(40px + 90%);
  height: 1px;
  background-color: #bebec3;
  float:left;
  margin-left: 80px;
  bottom: 15px;
  position: relative;
}
.border-line.long{
  margin-left: 120px;
  width: 90%;
}
.my-img{
  float:right;
  position: relative;
  margin-left: 30px;
  padding-left: 30px;
  left: 15px;
}
</style>
