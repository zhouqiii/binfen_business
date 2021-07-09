<template>
  <div class="index">
    <el-container>
      <el-main>
        <el-form label-width="180px" size="mini" class="ruleForm">
          <el-row type="flex" justify="start" align="middle">
            <el-col>
              <el-form-item label="姓名:"
                >{{ userInfo.realName }}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="start" align="middle">
            <el-col>
              <el-form-item label="工作日期:"
                >{{ userInfo.workDate }}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="start" align="middle">
            <el-col>
              <el-form-item label="提交日期:"
                >{{ userInfo.createDate }}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="start" align="middle">
            <el-col>
              <el-form-item label="报送情况:"
                >{{ userInfo.status == '0' ? '正常申报' : '补报' }}
              </el-form-item>
            </el-col>
          </el-row>

          <div v-for="item in workDailyInfo" :key="item.id">
            <el-divider></el-divider>
            <el-row type="flex" justify="start" align="middle">
              <el-col>
                <el-form-item label="项目组:"
                  >{{ item.productName }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="start" align="middle">
              <el-col>
                <el-form-item label="任务:"
                  >{{ item.taskName }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="start" align="middle">
              <el-col>
                <el-form-item label="工时:"
                  >{{ item.workerLength }} 小时
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="start" align="middle">
              <el-col>
                <el-form-item label="今日工作:"
                  >{{ item.workerInfo }}
                </el-form-item>
              </el-col>
            </el-row>
          </div>

        </el-form>
      </el-main>
      <el-footer class="el-dialog--center position: fixed;bottom">
        <el-button @click="goBack" class="reset-btn">返回</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { workDailyInfo } from '@/api/workDaily';

export default {
  name: 'workDailyInfo',
  data() {
    return {
      id: '',
      workDailyInfo: {}
    };
  },

  methods: {
    goBack() {
      this.$router.back();
    },
    getInfo() {
      //获取详情
      workDailyInfo(this.id).then(res => {
        this.workDailyInfo = res.data;
      });
    }
  },
  created() {
    console.log('this.$route',this.$route)
    this.id = this.$route.query.id;
    this.userInfo = JSON.parse(this.$route.query.info);
    console.log('this.userInfo===', this.userInfo)
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
