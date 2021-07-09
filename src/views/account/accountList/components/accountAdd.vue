<template>
  <div class="index">
    <el-container>
      <el-main>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          size="mini"
          class="ruleForm"
        >
          <!-- <el-form-item label="用户姓名" prop="username">
            <el-input v-model="ruleForm.username" placeholder="请输入账号" maxlength="20" minlength="2"></el-input>
          </el-form-item> -->
          <el-form-item label="用户姓名" prop="realName">
            <el-input v-model="ruleForm.realName" placeholder="请输入您的姓名" maxlength="8"></el-input>
          </el-form-item>
          <el-form-item label="所属产品" prop="businessId">
            <el-select v-model="ruleForm.businessId" placeholder="请选择" @change="accTypeChange" style="width: 100%">
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item.productName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="登录名称" prop="mobile">
            <el-input v-model="ruleForm.mobile" placeholder="请输入字母或数字,长度4-15"></el-input>
          </el-form-item>
<!--          <el-form-item label="登录密码" prop="password">-->
<!--            <el-input v-model="ruleForm.password" show-password placeholder="请输入"></el-input>-->
<!--          </el-form-item>-->
          <!-- <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" placeholder="请输入"></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="备注" prop="note">
            <el-input type="textarea" v-model="ruleForm.note" placeholder="请输入备注"></el-input>
          </el-form-item> -->
          <el-form-item label="关联角色" prop="roleId">
            <!-- multiple 多选 -->
            <el-select v-model="ruleForm.roleId" placeholder="请选择" @change="roleIdChange" style="width: 100%">
              <el-option v-for="item in allRoleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账号状态" prop="status">
            <el-radio-group v-model="ruleForm.status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-main>
      <el-footer>
        <el-button @click="resetForm('ruleForm')" class="reset-btn">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { createAdmin,infoByMobile } from "@/api/login";
import { fetchAllRoleList,admin_updateStatus, resetPassword } from "@/api/role";
import { listAll } from "@/api/businessProduct";

export default {
  name: "accountAdd",
  data() {
    var checkMobile = (rule, value, callback) => {
      infoByMobile(this.ruleForm.mobile).then(res => {
        if (res.data != null && value == res.data.mobile) {
          callback(new Error("登录名称已存在"));
        } else {
          callback();
        }
      });
    };
    // var checkPassword = (rule, value, callback) => {
    //   if(value.length > 12 || value.length < 6){
    //     callback(new Error("请输入6-12位密码"));
    //   }else{
    //     callback();
    //   }
    // };
    return {
      radio: "1",
      ruleForm: {
        roleId:'',
        accountType: 1,
        businessId: "",
        email: "",
        icon: "",
        mobile: "",
        note: "",
        // password: "",
        realName: "",
        status: 1,
        username: "",
        businessDescription: ""
      },
      rules: {
        // username: [
        //   { required: true, message: "账号为纯英文或纯数字或两者结合，长度在2-20位字符之间", trigger: "blur" },
        //   { pattern: /^[a-zA-Z0-9]{2,20}$/, message: "请输入格式正确的账号", trigger: "blur" }
        // ],
        realName: [{ required: true, message: "姓名最长8位字符", trigger: "blur" }],
        mobile: [
          {
            required: true,
            message: "请输入字母或数字,长度4-15",
            trigger: "blur"
          },
          {
            // pattern: /^1\d{10}$/,
            // pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,
            pattern: /^[A-Za-z0-9]{4,15}$/,
            message: "请输入字母或数字,长度4-15",
            trigger: "blur"
          },
          {validator:checkMobile,trigger: "blur"},
        ],
        // password: [
        //   {
        //     required: true,
        //     message: "请输密码",
        //     trigger: "blur"
        //   },
        //   {validator:checkPassword,trigger: "blur"},
        // ],
        roleId: [
          { required: true, message: "请选择角色", trigger: "change" }
        ],
        // accountType: [
        //   { required: true, message: "请选择账号所属", trigger: "change" }
        // ],
        businessId: [
          { required: true, message: "请选所属产品", trigger: "change" }
        ],
        // email: [
        //   {
        //     required: true,
        //     message: "请输入邮箱",
        //     trigger: "blur"
        //   },
        //   {
        //     pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        //     message: "请输入正确的邮箱地址",
        //     trigger: "blur"
        //   }
        // ],
        status: [
          { required: true, message: "请选择账号状态", trigger: "change" }
        ]
      },
      options: [],
      allRoleList: [],
    };
  },
  methods: {
    changeAcnt(val) {
      let formName = "ruleForm";
      this.$refs[formName].resetFields();
      this.ruleForm.accountType = val;
    },
    accTypeChange(val) {
      this.ruleForm.businessDescription = val
      // getBmsBusiness(val).then(res => {
      //   this.ruleForm.businessDescription = res.data.description;
      // });
    },
    roleIdChange(val) {
      this.ruleForm.roleId = val
      // getBmsBusiness(val).then(res => {
      //   this.ruleForm.businessDescription = res.data.description;
      // });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          createAdmin(this.ruleForm).then(res => {
            if (res.code == 200 && res.success == true) {
              this.$message({
                type: "success",
                message: "创建成功"
              })
              this.$router.push("accountList")
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
      this.$router.push("accountList");
    }
  },
  created() {
    // getBusinessList().then(res => {
    //   console.log(res, 656565);
    //   this.options = res.data;
    // });
    listAll().then(res => {
      this.options = res.data;
    });
    // this.options = [
    //   {'id':'MLIFE','businessName':'缤纷生活'},
    //   {'id':'DSMS','businessName':'优惠商户'},
    //   {'id':'SPORT','businessName':'运动专区'},
    //   {'id':'BCSP','businessName':'BCSP'},
    // ]
    fetchAllRoleList().then(response => {
      this.allRoleList = response.data;
    });
  }
};
</script>

<style scoped>
.ruleForm {
  width: 50%;
}
.el-footer {
  height: 100% !important;
  display: flex;
  justify-content: center;
}
.reset-btn {
  margin-left: 40px;
}
</style>
