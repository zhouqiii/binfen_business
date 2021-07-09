<template>
  <div class="index">
    <el-container v-show="workLateInfo.applicantName">
      <el-main>
        <el-form label-width="180px" size="mini" class="ruleForm">
          <el-row type="flex" justify="start" align="middle">
            <el-col>
              <el-form-item label="姓名:"
                >{{ workLateInfo.applicantName }}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="start" align="middle">
            <el-col>
              <el-form-item label="提交日期:" prop="refineName"
                >{{ workLateInfo.createDate }}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="start" align="middle">
            <el-col>
              <el-form-item label="所属产品:" prop="workload"
                >{{ workLateInfo.projectName }}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="start" align="middle">
            <el-col>
              <el-form-item label="任务:" prop="workload"
                >{{ workLateInfo.taskName }}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="start" align="middle">
            <el-col>
              <el-form-item label="申请情况:" prop="workload">
                <span v-if="workLateInfo.flag == '0'">正常申报</span>
                <span v-else>补报</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="start" align="middle">
            <el-col>
              <el-form-item label="申请日期:" prop="workload"
                >{{ workLateInfo.workerDate }}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="start" align="middle">
            <el-col>
              <el-form-item label="加班时间段:" prop="workload"
                >{{ workLateInfo.workerStartTime }}-{{
                  workLateInfo.workerEndTime
                }}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="start" align="middle">
            <el-col>
              <el-form-item label="工作内容:" prop="workload"
                >{{ workLateInfo.workerInfo }}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row
            type="flex"
            justify="start"
            align="middle"
            v-if="workLateInfo.flag == '1'"
          >
            <el-col>
              <el-form-item label="原因:" prop="workload"
                >{{ workLateInfo.remark }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-main>
      <el-footer class="el-dialog--center position: fixed;bottom">
        <el-button @click="goBack" class="reset-btn">返回</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { workLateInfo } from '@/api/workLate';

export default {
  name: 'workLateInfo',
  data() {
    return {
      id: '',
      workLateInfo: {}
    };
  },

  methods: {
    goBack() {
      this.$router.back();
    },
    getInfo() {
      //获取详情
      workLateInfo(this.id).then(res => {
        this.workLateInfo = res.data;
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
.ruleForm {
  width: 90%;
  margin-left: 40px;
}
.el-footer {
  height: 100% !important;
  display: flex;
  justify-content: center;
}
.reset-btn {
  margin-left: 40px;
  margin-bottom: 20px;
}
.el-input {
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
.div-class {
  border: 1px solid #dcdfe6;
  width: 350px;
  height: 180px;
}
.text {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.847058823529412);
  line-height: 24px;
  float: left;
  margin-top: 2px;
}
.myBox {
  border-width: 0px;
  width: 3px;
  height: 30px;
  background-color: blue;
  float: left;
  margin-right: 5px;
}
</style>
