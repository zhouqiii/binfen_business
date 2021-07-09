<template>
  <div>
    <div class="app-wrapper" :class="classObj">
      <sidebar class="sidebar-container"></sidebar>
      <div class="main-container">
        <navbar></navbar>
        <app-main></app-main>
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";

export default {
  name: "layout",
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.topFlex {
  width: 240px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  // height: 40px;
  color: white;
  // background-color: #42d0a9;
  position: fixed;
  top: 0;
  z-index: 1005;
  .topFlexOne {
    width: 240px;
    height: 50px;
    line-height: 50px;
    background-color: #304156;
    font-size: 20px;
    padding-left: 15px;
  }
  // .topFlexTwo{
  // 	width: 80%;
  // 	padding-left: 15px;
  // }
  // .topFlexThree{
  // 	width:5%;
  // }
  // .topFlexFour{
  // 	width:5%;
  // 	text-align: right;
  // }
}
</style>
