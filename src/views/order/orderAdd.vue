<template>
  <div class="index">
    <el-container >
      <el-main>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="180px"
          size="mini"
          class="ruleForm"
        >

          <!--   订单名称    -->
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="15">
              <el-form-item label="订单名称:" prop="orderName" >
                <el-select v-model="ruleForm.orderName"  filterable placeholder="请选择或直接输入名称"  style="width: 100%" >
                    <el-option @click.native="selectRefinesByProjectId(item.id)"
                    v-for="item in projectNames"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 细化 -->
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="15">
              <el-form-item label="细化名称:" prop="refineNames" style="margin-top: 0px;margin-bottom: 0px;">
                <el-checkbox-group v-model="refineName" >
                  <el-checkbox v-for="item in projectRefines " v-model="checked" @change="totalWorkload(item,$event)"
                               :label="item.refineName"
                               :key="item.refineId"
                               :value="item.refineName">{{item.refineName}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>

          <!--工作量和提交订单工作量-->
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="15">
              <el-form-item label="工作量:" prop="workload" >
                <el-input v-model="ruleForm.workload" disabled placeholder=""  ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-form-item label="提交订单工作量:" prop="orderWorkload" >
                <el-input v-model="ruleForm.orderWorkload"  placeholder="" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!--预估订单落地月份和预估订单收入月份      -->
          <el-row type="flex" justify="start" align="middle" >
            <el-col :span="15">
            <el-form-item label="预估订单落地月份" prop="orderDownDate">
                <el-date-picker
                  v-model="ruleForm.orderDownDate"
                  type="month"
                  format="yyyy-MM"
                  value-format="yyyy-MM"
                  size="mini"
                  placeholder="选择月"
                  style="width: 100%"
                >
                </el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-form-item label="预估订单收入月份" prop="orderFinishDate">
                <el-date-picker
                  v-model="ruleForm.orderFinishDate"
                  type="month"
                  format="yyyy-MM"
                  value-format="yyyy-MM"
                  placeholder="选择月"
                  size="mini"
                  style="width: 100%"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <!--订单状态与合计金额          -->
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="15">
              <el-form-item label="订单状态:" prop="orderState" >
                <el-select v-model="ruleForm.orderState" disabled filterable placeholder="请选择" style="width: 100%">
                  <el-option
                    v-for="item in orderStatus"
                    :key="item.id"
                    :label="item.msg"
                    :value="item.msg">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-form-item label="合计金额(¥):" prop="totalAmount"  >
                <el-input v-model="totalAmount" disabled placeholder="" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="start" align="middle" >
            <el-col :span="15">
              <el-form-item label="备注:" prop="workload" >
                <el-input :rows="5" type="textarea" placeholder="请输入备注内容" v-model="ruleForm.remarks" style="width: 100%" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </el-main>
      <el-footer class="el-dialog--center position: fixed;bottom" >
        <el-button @click="submitForm('ruleForm')" class="reset-btn">保存</el-button>
        <el-button @click="resetForm('ruleForm')" class="reset-btn">关闭</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import {getOrderStatus, getProjectNames,selectRefinesByProjectId,createOrder} from "@/api/businessOrder";


export default {
  name: "createOrder",
  data() {
    //校验是否为数字
    const isNum = (rule, value, callback) => {
      const age = /^[0-9]*$/
      if (!age.test(value)) {
        callback(new Error('请输入数字'))
      } else {
        callback()
      }
    };
    return {
      orderStatus:[],   //订单状态列表
      orderNames:[],       //订单名称列表
      projectNames:[],     //项目名称列表
      projectRefines:[],   //项目对应的细化列表
      refineName:[],     //订单对应的细化列表
      totalAmount: "¥0.00",    //显示用，  金额千分位表示 保留两位小数
      isIndeterminate: true,  //细化复选框标识
      checked: false,
      ruleForm: {
        orderDownDate:null, // 订单落地月份
        orderFinishDate:null, // 订单收入月份
        projectId: "",
        orderName:"",
        projectName: "",
        orderWorkload: 0,     //订单工作量
        workload: 0,          //总工作量
        totalAmount: 0.00,        //总金额
        refineName:  "" ,     //细化名称
        orderState: "",         //订单状态
        remarks: ""             //备注
      },

      //表单校验规则
      rules: {
        orderName: [
          { required: true, message: "项目名称必选项", trigger: "blur" },
        ],
        orderWorkload: [
          { required: true, message: "请输入数字", trigger: "blur" },
          {validator:isNum,trigger:"blur"}
        ],
        orderDownDate: [
          { required: true, message: "预估订单落地月份为必选项", trigger: "blur" },
        ],
        orderFinishDate: [
          { required: true, message: "预估订单收入月份为必选项", trigger: "blur" },
        ],
        orderState: [
          { required: true, message: "订单状态为必选项", trigger: "blur" },
        ]

      },
    };
  },

  methods: {
    init(){
      //初始化订单名称查询列表
      this.initSelectOrderNames();
      //初始化订单状态列表
      this.getOrderStatus();
    },

    //初始化项目名称
    initSelectOrderNames(){
      getProjectNames().then(response => {
        this.projectNames = response.data;
      });
    },

    //根据项目名称查询细化名称列表
    selectRefinesByProjectId(id){

      //更改订单名称时，参数重新初始化
      this.totalAmount = "¥0.00";
      this.ruleForm.workload = 0;
      this.ruleForm.totalAmount = "0.00"
      this.ruleForm.refineName = "";
      this.ruleForm.projectId = id;
      this.refineName = [];
      //组装参数变量
      const params = {
        projectId: null
      }
      params.projectId = id;
      selectRefinesByProjectId(params).then(response => {
        this.projectRefines = response.data;
      });
    },

    //获取订单状态
    getOrderStatus(){
      getOrderStatus().then(response => {
        this.orderStatus = response.data;
        this.ruleForm.orderState = this.orderStatus[0].msg;
      });
    },

    //计算工作量总和和金额
    totalWorkload(item,event){
      //计算工作量
      let workload = parseInt(item.workload);
      if (event) {
         this.ruleForm.workload += workload;
        }else {
        this.ruleForm.workload -= workload;
      }

      //新建订单所对应的细化id集
      let id = item.refineId + "-"
      if(event){
        this.ruleForm.refineName += item.refineId + "-"
      }else {
        this.ruleForm.refineName = this.ruleForm.refineName.replace(new RegExp(id,'g'),"");
      }


      //计算总金额 设置为千分位，并保留两位小数
      this.ruleForm.totalAmount = this.ruleForm.workload * 860.00;
      this.totalAmount = this.dealMoney(this.ruleForm.totalAmount);
    },

    submitForm(formName) {
      //提交表单前，对参数校订
      this.ruleForm.projectName = this.ruleForm.orderName;
      this.ruleForm.refineName = this.ruleForm.refineName
                          .substring(0,this.ruleForm.refineName.length-1);
      this.$refs[formName].validate(valid => {
        if (valid) {
          createOrder(this.ruleForm).then(res => {
            console.log("success");
            if (res.code == 200 && res.success == true) {
              this.$message({
                type: "success",
                message: "创建成功"
              })
              this.$router.push("orderList")
            } else {
              this.$message({
                type: "error",
                message: res.message
              })
            }
          });

        } else {
          this.$message({
            type: "error",
            message: "请填写完整的信息"
          })
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$router.push("orderList");
    },

    /**
     * @param {*} money[输入的money]
     * @param {string} [货币符号，sysmbol='¥']
     * @param {number} [小数点位数，places=2]
     * @returns undefined
     */
    dealMoney(money, sysmbol = '¥', places = 2) {
      const zero = `${sysmbol}0.00`;
      if (isNaN(money) || money === '') return zero;

      if(money && money != null){
        money = `${money}`;
        let left=money.split('.')[0]; // 小数点左边部分
        let right=money.split('.')[1]; // 小数点右边
        // 保留places位小数点，当长度没有到places时，用0补足。
        right = right ? (right.length >= places ? '.' + right.substr(0, places) : '.' + right + '0'.repeat(places - right.length)) : ('.' + '0'.repeat(places));
        var temp = left.split('').reverse().join('').match(/(\d{1,3})/g); // 分割反向转为字符串然后最多3个，最少1个，将匹配的值放进数组返回
        return (Number(money) < 0 ? '-' : '') + sysmbol + temp.join(',').split('').reverse().join('') + right; // 补齐正负号和货币符号，数组转为字符串，通过逗号分隔，再分割（包含逗号也分割）反向转为字符串变回原来的顺序
      } else if (money === 0) {
        return zero;
      } else {
        return zero;
      }
    }

  },
  created() {
    this.init();
  }
};
</script>

<style scoped>
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
.el-input{
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
.div-class{
  border:1px solid #DCDFE6;
  width: 350px;
  height: 180px;
}
.text{
  font-size: 16px;
  color: rgba(0, 0, 0, 0.847058823529412);
  line-height: 24px;
  float:left;
  margin-top: 2px;
}
.myBox{
  border-width: 0px;
  width: 3px;
  height: 30px;
  background-color: blue;
  float:left;
  margin-right: 5px;
}
.el-input__inner{
  height: 28px!important;
  line-height: 28px!important;
}

</style>
