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
          <!-- <el-form-item label="账号" prop="username">
            <el-input v-model="ruleForm.username" :disabled="true"></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="账号所属" prop="accountType">
            <el-radio-group v-model="ruleForm.accountType" :disabled="true">
              <el-radio :label="1" v-if="ruleForm.accountType == 1">admin</el-radio>
              <el-radio :label="2" v-if="ruleForm.accountType == 2">部门</el-radio>
            </el-radio-group>
          </el-form-item> -->
          <el-form-item label="用户姓名" prop="realName">
            <el-input v-model="ruleForm.realName"></el-input>
          </el-form-item>
          <!-- <el-form-item label="所属产品" prop="businessId">
            <el-input v-model="ruleForm.businessName" :disabled="true"></el-input>
          </el-form-item> -->
          <el-form-item label="所属产品" prop="businessId">
            <el-select v-model="ruleForm.businessId" placeholder="请选择" @change="accTypeChange" style="width: 100%">
<!--              <el-option-->
<!--                v-for="item in options"-->
<!--                :key="item.id"-->
<!--                :label="item.id"-->
<!--                :value="item.productId"-->
<!--              ></el-option>-->
              <el-option v-for="item in options" :key="item.productId" :label="item.productName" :value="item.productId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="登录名称" prop="mobile">
            <el-input v-model="ruleForm.mobile"></el-input>
          </el-form-item>
<!--          <el-form-item label="登录密码" prop="password">-->
<!--            <el-input v-model="ruleForm.password" placeholder="请输入"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="关联角色" prop="roleId">
            <!-- multiple 多选 -->
            <el-select v-model="ruleForm.roleId" placeholder="请选择" @change="roleIdChange" style="width: 100%">
              <el-option v-for="item in allRoleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="备注" prop="note">
            <el-input type="textarea" v-model="ruleForm.note"></el-input>
          </el-form-item> -->
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
import {updateAdmin,oneUser} from '@/api/login'
import { fetchAllRoleList,admin_updateStatus, resetPassword } from "@/api/role";
import { listAll } from "@/api/businessProduct";
export default {
  name: "accountSet",
  data() {
    return {
      ruleForm: {
        id: "",
        accountType: "",
        businessId: "",
        email: "",
        icon: "",
        mobile: "",
        note: "",
        realName: "",
        status: "",
        username: "",
        businessDescription: "",
        businessName: "",
        // password:"",
        roleId:""
      },
      allRoleList:[],
      rules: {
        // username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        realName: [{ required: true, message: "请输姓名", trigger: "blur" }],
        mobile: [
          {
            required: true,
            message: "请输入字母或数字,长度4-15",
            trigger: "blur"
          },
          {
            // pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,
            pattern: /^[A-Za-z0-9]{4,15}$/,
            message: "请输入字母或数字,长度4-15",
            trigger: "blur"
          }
        ],
        // accountType: [
        //   { required: true, message: "请选择账号所属", trigger: "change" }
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
        //     message: "请输入正确的邮箱",
        //     trigger: "blur"
        //   }
        // ],
        status: [
          { required: true, message: "请选择账号状态", trigger: "change" }
        ]
      },
      options: []
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let id = this.$route.params.data.id
          this.ruleForm.id = id;
          updateAdmin(this.ruleForm).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "修改成功"
              })
              this.$router.push('accountList')
            } else {
              this.$message({
                type: "error",
                message: res.message
              })
            }
          })
        } else {
          this.$message({
            type: "error",
            message: "请填写完整的信息"
          })
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$router.push("accountList");
    },
    accTypeChange(val) {
      console.log("112")
      console.log("test",val)
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
  },
  created() {
    // this.ruleForm = this.$route.params.data
    // this.options = [
    //   {'id':'MLIFE','businessName':'缤纷生活'},
    //   {'id':'DSMS','businessName':'优惠商户'},
    //   {'id':'SPORT','businessName':'运动专区'},
    //   {'id':'BCSP','businessName':'BCSP'},
    // ]

    oneUser(this.$route.params.data).then(res => {
      console.log("test2",res.data)
      this.ruleForm = res.data;

    });

    listAll().then(res => {
      this.options = res.data;
    });
    fetchAllRoleList().then(response => {
      console.log("juese",response.data)
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
