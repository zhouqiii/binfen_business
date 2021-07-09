<template>
  <div class="index">
    <el-container v-show="workLeaveInfo.realName">
      <el-main>
        <el-form label-width="120px" size="mini">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名:" >
                {{ workLeaveInfo.realName }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属产品:" >
                {{ workLeaveInfo.productName }}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="休假类型:" >
                <span v-if="workLeaveInfo.vacationType == '0'">年假</span>
                <span v-if="workLeaveInfo.vacationType == '1'">事假</span>
                <span v-if="workLeaveInfo.vacationType == '2'">婚假</span>
                <span v-if="workLeaveInfo.vacationType == '3'">产假</span>
                <span v-if="workLeaveInfo.vacationType == '4'">陪产假</span>
                <span v-if="workLeaveInfo.vacationType == '5'">病假</span>
                <span v-if="workLeaveInfo.vacationType == '6'">丧假</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="休假日期:" >
                {{ workLeaveInfo.vacationStartDate }} ~ {{
                  workLeaveInfo.vacationEndDate
                }}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="休假时间:" >
                {{ workLeaveInfo.vacationStartTime }} ~ {{
                  workLeaveInfo.vacationEndTime
                }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="提交日期:" >
                {{ workLeaveInfo.createDate }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="休假原因:" >
                {{ workLeaveInfo.vacationReason }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="工作交接:" >
                {{ workLeaveInfo.workHandover }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-main>
      <el-footer class="el-dialog--center">
        <el-button @click="goBack" class="reset-btn">返回</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { workLeaveInfo } from '@/api/workLeave';

export default {
  name: 'workLeaveInfo',
  data() {
    return {
      id: '',
      workLeaveInfo: {},
    };
  },

  methods: {
    goBack() {
      this.$router.back();
    },
    getInfo() {
      //获取详情
      workLeaveInfo(this.id).then(res => {
        this.workLeaveInfo = res.data;
      });
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.$nextTick(item => {
      this.getInfo();
    });
  }
};
</script>

<style scoped>
.demo-image__preview{
  display: flex;
}
.el-image{
  margin:0 15px 15px 0;
  width: 100px;
  height: 100px;
  border-radius: 4px;
}
.reset-btn {
  margin-left: 40px;
  margin-bottom: 20px;
}
.el-row {
  margin-top: 25px;
}

</style>
