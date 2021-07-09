<template>
  <div class="index">
    <el-container>
      <el-main>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="180px"
          size="mini"
          class="ruleForm"
        >
          <!-- 姓名 提交日期 -->
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="15">
              <el-form-item label="姓名:" prop="applicantName">
                <el-input
                  v-model="ruleForm.applicantName"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-form-item label="提交日期:">
                <el-input
                  v-model="dataLocal"
                  disabled
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 所属产品 任务 -->
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="15">
              <el-form-item label="所属产品:" prop="projectId">
                <el-select
                  v-model="ruleForm.projectId"
                  filterable
                  placeholder="请选择"
                  style="width: 100%"
                  @change="projectChange"
                >
                  <el-option
                    v-for="item in projectList"
                    :key="item.id"
                    :label="item.productName"
                    :value="item.productId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-form-item label="任务:" prop="taskId">
                <el-select
                  v-model="ruleForm.taskId"
                  filterable
                  placeholder="请选择"
                  style="width: 100%"
                  @change="taskChange"
                >
                  <el-option
                    v-for="item in taskList"
                    :key="item.id"
                    :label="item.taskName"
                    :value="item.taskId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 申请情况 -->
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="15">
              <el-form-item label="申请情况:" prop="flag">
                <el-radio-group v-model="ruleForm.flag" @change="flagChange">
                  <el-radio label="0" checked>正常申报</el-radio>
                  <el-radio label="1">补报</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 申请日期 延时时间段 -->
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="15">
              <el-form-item label="申请日期:" prop="workerDate">
                <el-date-picker
                  :disabled="flagDisable"
                  v-model="ruleForm.workerDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-form-item prop="timeRange" label="加班时间段:">
                <el-time-picker
                  is-range
                  v-model="ruleForm.timeRange"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  placeholder="选择时间范围"
                  @change="
                    [ruleForm.workerStartTime, ruleForm.workerEndTime] = $event
                  "
                  value-format="HH:mm"
                  format="HH:mm"
                >
                </el-time-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 工作内容 -->
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="15">
              <el-form-item label="工作内容:" prop="workerInfo">
                <el-input
                  :rows="5"
                  type="textarea"
                  placeholder="请输入备注内容"
                  v-model="ruleForm.workerInfo"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 补报原因 -->
          <el-row
            type="flex"
            justify="start"
            align="middle"
            v-if="ruleForm.flag == '1'"
          >
            <el-col :span="15">
              <el-form-item label="补报原因:" prop="remark">
                <el-input
                  :rows="5"
                  type="textarea"
                  placeholder="请输入备注内容"
                  v-model="ruleForm.remark"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-main>
      <el-footer class="el-dialog--center position: fixed;bottom">
        <el-button
          @click="submitForm('ruleForm')"
          type="primary"
          class="reset-btn"
          >保存</el-button
        >
        <el-button @click="resetForm('ruleForm')" class="reset-btn"
          >返回</el-button
        >
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { workLateAdd } from '@/api/workLate';
import { listAll } from '@/api/businessProduct';
import { taskFullList } from '@/api/businessTask';
import { formateDateLocal } from '@/utils/date';
const page = {
  pageNum: 1,
  pageSize: 10,
  keyword: null,
  batchNo: null,
  taskId: null,
  taskName: null,
  taskState: null,
  productId: null
};
export default {
  name: 'workLateAdd',
  data() {
    return {
      projectList: [], //项目名称列表
      taskList: [],
      listQuery: Object.assign({}, page),
      dataLocal: formateDateLocal(),
      checked: false,
      flagDisable: true,
      ruleForm: {
        applicantName: '',
        timeRange: '',
        taskId: '', // 任务id
        projectId: '', // 项目id
        projectName: '', // 项目名称
        flag: '0', // 0正常申报 1补报
        workerDate: formateDateLocal(),
        // remark: "", // 补报原因
        workerInfo: '' // 工作内容
      },

      //表单校验规则
      rules: {
        applicantName: [
          { required: true, message: '姓名必填', trigger: 'blur' }
        ],
        workerDate: [
          { required: true, message: '补报日期必填', trigger: 'blur' }
        ],
        timeRange: [
          { required: true, message: '加班时间段必填', trigger: 'blur' }
        ],
        flag: [{ required: true, message: '申请情况必选项', trigger: 'blur' }],
        projectId: [
          { required: true, message: '产品名称必选项', trigger: 'blur' }
        ],
        taskId: [{ required: true, message: '任务必选项', trigger: 'blur' }],
        remark: [{ required: true, message: '补报原因必填', trigger: 'blur' }],
        workerInfo: [
          { required: true, message: '工作内容必填', trigger: 'blur' }
        ]
      }
    };
  },

  methods: {
    init() {
      this.initProjectList();
      this.initTaskList();
    },
    //初始化项目名称
    initProjectList() {
      //产品列表
      listAll().then(response => {
        this.projectList = response.data;
      });
    },
    initTaskList() {
      this.ruleForm.taskId = '';
      this.ruleForm.taskName = '';
      // 任务列表
      taskFullList({ productId: this.ruleForm.projectId }).then(response => {
        this.taskList = response.data.list;
      });
    },
    projectChange(res) {
      this.initTaskList();
      console.log('this.ruleForm');
      console.log(res);
      // console.log(this.ruleForm.productId)
      let obj = this.projectList.find(item => {
        // 遍历的数据源
        return item.productId === res; // 筛选出匹配数据
      });
      this.ruleForm.projectName = obj.productName;
      // console.log(this.ruleForm.projectName);// 获取的 name
    },
    flagChange(res) {
      console.log('flagChange', res);
      if (this.ruleForm.flag == '0') {
        this.flagDisable = true;
        this.ruleForm.workerDate = formateDateLocal();
      } else {
        this.flagDisable = false;
      }
    },
    taskChange(res) {
      let obj = this.taskList.find(item => {
        return item.taskId === res;
      });
      this.ruleForm.taskName = obj.taskName;
      // console.log(this.ruleForm.projectName);// 获取的 name
    },
    submitForm(formName) {
      //提交表单前，对参数校订
      this.$refs[formName].validate(valid => {
        console.log('this.form===', this.ruleForm);
        console.log('valid,valid', valid);
        if (valid) {
          workLateAdd(this.ruleForm).then(res => {
            console.log('success');
            if (res.code == 200 && res.success == true) {
              this.$message({
                type: 'success',
                message: '创建成功'
              });
              this.$router.push('workLateList');
            } else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          });
        } else {
          this.$message({
            type: 'error',
            message: '请填写完整的信息'
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$router.push('workLateList');
    }
  },
  created() {
    this.$nextTick(item => {
      this.init();
    });
  }
};
</script>

<style scoped>
.el-checkbox-button__inner,
.el-radio {
  font-weight: normal !important;
}
.ruleForm {
  width: 90%;
  margin-left: 40px;
}
/*.textarea-class{*/
/*  width: 500px;*/
/*  height: 100px;*/
/*}*/
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
  /*width: 80%;*/
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
.el-input__inner {
  height: 28px !important;
  line-height: 28px !important;
}
</style>
