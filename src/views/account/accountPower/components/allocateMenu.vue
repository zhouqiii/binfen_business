<template>
  <el-card class="form-container" shadow="never">
    <el-tree
      :data="menuTreeList"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current
      :props="defaultProps"
    ></el-tree>
    <div style="margin-top: 20px" align="center">
      <el-button type="primary" @click="handleSave()">保存</el-button>
      <el-button @click="handleClear()">清空</el-button>
      <el-button type="primary" @click="goBack()">返回</el-button>
    </div>
  </el-card>
</template>

<script>
import { fetchTreeList } from "@/api/menu";
import { listMenuByRole, allocMenu } from "@/api/role";

export default {
  name: "allocMenu",
  data() {
    return {
      menuTreeList: [],
      defaultProps: {
        children: "children",
        label: "title"
      },
      roleId: null
    };
  },
  created() {
    this.roleId = this.$route.params.roleId;
    this.treeList(this.roleId);
    this.getRoleMenu(this.roleId);
  },
  methods: {
    treeList(roleId) {
      fetchTreeList(roleId).then(response => {
        this.menuTreeList = response.data;
      });
    },
    getRoleMenu(roleId) {
      listMenuByRole(roleId).then(response => {
        let menuList = response.data;
        let checkedMenuIds = [];
        if (menuList != null && menuList.length > 0) {
          for (let i = 0; i < menuList.length; i++) {
            let menu = menuList[i];
            if (menu.level == 2) {
              checkedMenuIds.push(menu.id);
            }
          }
        }
        this.$refs.tree.setCheckedKeys(checkedMenuIds);
      });
    },
    handleSave() {
      let checkedNodes = this.$refs.tree.getCheckedNodes();
      let checkedParentNodes = this.$refs.tree.getHalfCheckedKeys();
      let checkedMenuIds = new Set();
      if (checkedNodes != null && checkedNodes.length > 0) {
        for (let i = 0; i < checkedNodes.length; i++) {
          let checkedNode = checkedNodes[i];
          checkedMenuIds.add(checkedNode.id);
          if (checkedNode.parentId !== 0) {
            checkedMenuIds.add(checkedNode.parentId);
          }
        }
        for(let j = 0;j<checkedParentNodes.length;j++){
          let checkedParentNode = checkedParentNodes[j];
          checkedMenuIds.add(checkedParentNode);
        }
      }
      this.$confirm("是否分配菜单？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // let params = new URLSearchParams();
        // params.append("roleId", this.roleId);
        // params.append("menuIds", Array.from(checkedMenuIds));
        let params = {
          roleId: this.roleId,
          list: Array.from(checkedMenuIds)
        }
        allocMenu(params).then(response => {
          this.$message({
            message: "分配成功",
            type: "success",
            duration: 1000
          });
          this.$router.back();
        });
      });
    },
    handleClear() {
      this.$refs.tree.setCheckedKeys([]);
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
</style>
