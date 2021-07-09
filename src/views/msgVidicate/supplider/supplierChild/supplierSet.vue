<template>
  <div class="supplier-add">
    <el-container>
      <el-main>
        <el-form
          :model="supplierForm"
          :rules="rules"
          ref="supplierForm"
          label-width="100px"
          class="demo-supplierForm"
        >
          <el-form-item label="部门名称" prop="businessName">
            <el-col :span="15">
              <el-input v-model="supplierForm.businessName" size="small" placeholder="请输入" maxlength="12"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="部门ID" prop="businessCode">
            <el-col :span="15">
              <el-input v-model="supplierForm.businessCode" size="small" :disabled=true placeholder="请输入四位大写英文字母"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="部门简介" prop="description">
            <el-col :span="15">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入"
                size="small"
                v-model="supplierForm.description"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
    <div class="footer">
      <el-button class="reset" @click="goback('supplierForm')">取消</el-button>
      <el-button type="primary" @click="sub('supplierForm')">保存</el-button>
    </div>
  </div>
</template>

<script>
import {
  createBmsBusiness,
  getRegionList,
  getProvinceList,
  getCityList,
  getDistrict,
  submitBmsBusiness,
  getBmsBusiness
} from "@/api/msgVdcApi";

export default {
  name: "supplierSet",
  data() {
    return {
      supplierForm: {
        businessCode: "",
        businessMobile: "",
        businessName: "",
        businessId: "",
        provinceCode: "",
        provinceName: "",
        cityCode: "",
        cityName: "",
        description: "",
        detailAddress: "",
        districtCode: "",
        districtName: "",
        website: "",
        createName: "",
        createTime: "",
        editState: 0,
        id: 0,
        createBy: 0,
        isDelete: 0,
        updateBy: 0,
        updateName: "",
        updateTime: ""
      },
      rules: {
        businessName: [
          { required: true, message: "请输入部门名称，最长12个字符", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请填写部门简介，最长100个字符", trigger: "blur" }
        ],
        website: [
        ]
      },
      province: [],
      cityArr: [],
      countyArr: []
    };
  },
  methods: {
    // 取消
    goback(supplierForm) {
      this.$router.push("supplier");
      this.$refs[supplierForm].resetFields();
    },
    //保存
    sub(supplierForm) {
      this.$refs[supplierForm].validate(valid => {
        if (valid) {
          submitBmsBusiness(this.supplierForm).then(
          
            res => {
              if (res.code == 200) {
                this.$router.push("supplier");
                this.$refs[supplierForm].resetFields();
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
              } else {
                this.$message({
                  message: "保存失败",
                  type: "error"
                });
              }
            }
          );
        } else {
          this.$message({
            message: "请填写必填项",
            type: "error"
          });
        }
      });
    },
    getSetSupplier() {
      getBmsBusiness(this.$route.query.id).then(res => {
        this.supplierForm = res.data;
        let provinceCode = {
          parentCode: this.supplierForm.provinceCode
        }
      });
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.getSetSupplier();
  }
};
</script>

<style scoped>
.main-header {
  text-align: center;
  align-items: center;
  display: flex;
}
.main-header >>> .el-input {
  width: 200px;
  margin-right: 20px;
}
.main-content {
  margin: 40px;
}
.footer {
  /* margin: 0 auto; */
  display: flex;
  justify-content: center;
}
.reset {
  margin-right: 20px;
}
</style>