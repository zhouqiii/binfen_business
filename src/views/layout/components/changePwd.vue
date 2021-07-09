<template>
  <div>
    <!-- 更改密码 -->
    <el-card class="login-form-layout">
      <el-form class="user-account-key" ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="用户名：">
          <el-input type="text" disabled v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="原密码" prop="oldPassword">
            <el-input type="password" placeholder="请输入原密码" v-model="form.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
            <el-input type="password" placeholder="请设置新密码" v-model="form.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="newPassword2">
            <el-input type="password" placeholder="请确认新密码" v-model="form.newPassword2"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">保存</el-button>
<!--            <el-button @click="resetForm('ruleForm')">关闭</el-button>-->
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { updatePassword } from '@/api/login'
import { getCookie } from "@/utils/support";
export default {
    data () {
    	//此处即表单发送之前验证
        let validateNewPassword = (rule, value, callback) => {
            if (value === this.form.oldPassword) {
                callback(new Error('新密码不能与原密码相同!'))
            } else {
                callback()
            }
        }
        let validateNewPassword2 = (rule, value, callback) => {
            if (value !== this.form.newPassword) {
                callback(new Error('与新密码不一致!'))
            } else {
                callback()
            }
        }
        return {
            form: {
              name:"",
              username: "",
              oldPassword: "",
              newPassword: ""
            },
            rules: {
              oldPassword: [
                { required: true, message: '请输入原密码', trigger: 'blur' },
              ],
                newPassword: [
                  { required: true, message: '请设置新密码', trigger: 'blur' },
                  { validator: validateNewPassword, trigger: 'blur' },
                  {
                    type: 'string',
                    message: '请输入不包含空格的字符',
                    trigger: 'blur',
                    transform(value) {
                      if (value && value.indexOf(' ') === -1) {
                        return value
                      } else {
                        return false
                      }
                    }
                  },
                  {
                    trigger: 'blur',
                    validator: (rule, value, callback) => {
                      var passwordreg = /(?=.*\d)(?=.*[a-zA-Z]).{6,12}/
                      // var passwordreg = /^(?![^a-zA-Z]+$)(?!\D+$).{6,12}/
                      if (!passwordreg.test(value)) {
                        callback(new Error('密码长度6-12位，含数字、字母'))
                      }else{
                        callback()
                      }
                    }
                  }
                ],
                newPassword2: [
                    { required: true, message: '请确认新密码', trigger: 'blur' },
                    { validator: validateNewPassword2, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
      onSubmit (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            updatePassword(this.form).then(() => {
              this.$message.success('密码已修改');
              this.resetForm(formName);
              this.$store.dispatch('LogOut').then(() => {
              location.reload()
          })
            })
          } else {
            this.$message.error('请正确填写表单')
            return false
          }
        })
      },
      // 重置
      resetForm(formName) {

        console.log(222)
       this.form.newPassword='';
      this.form.oldPassword='';
      this.form.newPassword2='';
      }
    },
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    created(){
       this.form.username = this.name;
    }
}
</script>
<style scoped>
.el-card.is-always-shadow {
  -webkit-box-shadow: 0 0 0 0 rgb(0,0,0);
  box-shadow: 0 0 0 0 rgb(0,0,0);
}

.el-card {
  border: none;
}
</style>
