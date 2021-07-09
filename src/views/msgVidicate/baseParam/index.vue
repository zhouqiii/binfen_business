<template>
  <div class="baseParam-content">
    <div class="main-header">
      <el-button size="small" type="primary" @click="addTypeBtnClick">+ 新增参数</el-button>
    </div>
    <el-dialog
      title="新增参数"
      top="40vh"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="50%"
      :before-close="handleClose"
    >
      <el-form :model="paramData" ref="paramData" :rules="rules" label-width="150px">
        <el-form-item label="参数key" prop="paramKey">
          <el-col :span="16">
            <el-input placeholder="请输入" size="small" maxlength="10" v-model="paramData.paramKey"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="参数值" prop="paramValue">
          <el-col :span="16">
            <el-input placeholder="请输入" size="small" v-model="paramData.paramValue"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="参数说明" prop="remark">
          <el-col :span="16">
            <el-input placeholder="请输入" size="small" v-model="paramData.remark"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div class="save-btn">
        <el-button type="primary" class="save-btn" size="small" @click="saveBtnClick('paramData')">保存</el-button>
      </div>
    </el-dialog>
    <div class="main-content">
      <div class="table-data">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="编号" align="center"></el-table-column>
          <el-table-column prop="paramKey" label="参数key" align="center"></el-table-column>
          <el-table-column prop="paramValue" label="参数值" align="center"></el-table-column>
          <el-table-column prop="remark" label="参数描述" align="center"></el-table-column>
          <el-table-column align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="resetResource(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="deleteBtnClick(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog
        title="编辑分类名称"
        top="40vh"
        :visible.sync="dialogVisible1"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="50%"
        :before-close="handleClose"
      >
        <el-form :model="setData" ref="setData" :rules="rules" label-width="150px">
          <el-form-item label="编号" prop="id">
            <el-col :span="16">
              <el-input placeholder="请输入" size="small" maxlength="10" v-model="setData.id"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="参数key" prop="paramKey">
            <el-col :span="16">
              <el-input placeholder="请输入" size="small" maxlength="10" v-model="setData.paramKey"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="参数值" prop="paramValue">
            <el-col :span="16">
              <el-input placeholder="请输入" size="small" v-model="setData.paramValue"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="参数说明" prop="remark">
            <el-col :span="16">
              <el-input placeholder="请输入" size="small" v-model="setData.remark"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <div class="save-btn">
          <el-button type="primary" class="save-btn" size="small" @click="resetSaveBtnClick('setData')">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getbaseParamList,
  creatParam,
  delParam,
  updateParam
} from "@/api/msgVdcApi";

export default {
  name: "prdtClassify",
  data() {
    return {
      // 顶部搜索框
      input: "",
      // 回显数据
      tableData: [],
      dialogVisible: false,
      dialogVisible1: false,
      paramData: {
        paramKey: "",
        paramValue: "",
        remark: ""
      },
      setID: "",
      setData: {
        paramKey: "",
        paramValue: "",
        remark: ""
      },
      rules: {
        paramKey: [{ required: true, message: "请输入参数key", trigger: "blur" }],
        paramValue: [{ required: true, message: "请输入参数值", trigger: "blur" }]
      }
    };
  },
  methods: {
    getParamList() {
      getbaseParamList().then(res => {
        console.log(res, 22222);
        this.tableData = res.data;
      });
    },
    // 新增并保存
    addTypeBtnClick() {
      console.log("新增参数");
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          this.dialogVisible = false;
          this.$refs['paramData'].resetFields();
          this.paramData.file = []
        })
        .catch(_ => {});
    },
    saveBtnClick(paramData) {
      // console.log("保存");
      this.$refs[paramData].validate((valid) => {
        if (valid) {
          creatParam(this.paramData).then(res => {
            // console.log(res, 5555555);
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "保存成功"
              });
              (this.dialogVisible = false), (this.paramData.title = "");
              this.getParamList();
            } else {
              this.$message({
                type: "error",
                message: res.message
              });
            }
          });
        }
      })  
    },
    // 编辑并保存
    resetResource(row) {
      console.log(row, "编辑");
      this.setID = row.id;
      this.dialogVisible1 = true;
      this.setData= row;
      this.getParamList();
    },
    // 编辑弹框中的保存
    resetSaveBtnClick(formName) {
      console.log(formName);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateParam(this.setData).then(res => {
            // console.log(res, "保存")
            if (res.code == 200 && res.success ==true ) {
              this.$message({
                type: "success",
                message: "保存成功"
              });
              this.dialogVisible1 = false;
              this.getParamList();
              this.setData.title = "";
            } else {
              this.$message({
                type: "error",
                message: res.message
              });
              this.getParamList();
            }
          });
        }
      })
      
    },
    // 删除
    deleteBtnClick(row) {
      console.log(row, "删除");
      this.$confirm("确认删除？")
        .then(() => {
          console.log(row.id);
          delParam(row.id).then(res => {
            // console.log(res, 32222);
            if (res.code == 200 && res.success == true) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.getParamList();
            } else {
              this.$message({
                type: "error",
                message: res.message
              });
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getParamList();
  }
};
</script>

<style scoped>
.baseParam-content {
  margin: 20px;
}
.main-header {
  margin-bottom: 20px;
}
.el-dialog__body {
  position: relative;
}
.save-btn {
  position: absolute;
  right: 20px;
  bottom: 10px;
}
</style>