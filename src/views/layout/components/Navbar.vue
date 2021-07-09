<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" src="@/assets/images/user.svg">
        <span style="display: inline-block; margin-left:10px">{{name}}</span>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            <span @click="changePwd" style="display:block;">更改密码</span>
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="LogOut" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>

    <el-dialog title="更改密码" :visible.sync="dialogFormVisible">
      <changePw></changePw>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { updatePassword, logout } from "@/api/login";
import changePw from '@/views/layout/components/changePwd'
import { getCookie } from "@/utils/support";

export default {
  components: {
    Breadcrumb,
    Hamburger,
     changePw
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  data(){
    return{
      dialogFormVisible:false,
      form:{},
      formLabelWidth:'120px'
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    // 更改密码
    changePwd() {
      console.log("更改密码");
      this.dialogFormVisible = true

    },
    // 退出
    LogOut() {
      logout().then(res=>{
        if (res.code == 200 && res.success == true){
          this.$store.dispatch('LogOut').then(() => {
            location.reload()
          })
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

