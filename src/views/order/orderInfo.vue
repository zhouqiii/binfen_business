<template>
  <div class="index">
    <el-container >
      <el-main>
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="180px"
          size="mini"
          class="ruleForm"
        >
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="15">
              <div class="myBox"></div>
              <span class="text">订单信息</span>
            </el-col>
          </el-row>

          <el-row type="flex" justify="start" align="middle">
            <el-col :span="15">
              <el-form-item label="订单名称:" prop="orderName">{{ruleForm.orderName}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="start" align="middle">
            <el-col :span="15">
              <el-form-item label="细化名称:" prop="refineName">{{ruleForm.refineName}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="start" align="middle">
            <el-col :span="15">
              <el-form-item label="工作量:" prop="workload">{{ruleForm.workload}}
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-form-item label="提交订单工作量:" prop="">{{ruleForm.orderWorkload}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="15">
              <el-form-item label="预估订单落地月份:" prop="orderDownDate">{{ruleForm.orderDownDate}}
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-form-item  label="预估订单收入月份:" prop="orderFinishDate">{{ruleForm.orderFinishDate}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="15">
              <el-form-item label="订单状态:" prop="msg" >{{ruleForm.msg}}
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-form-item label="合计金额:" prop="leadManagerTel" >{{totalAmount}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="15">
              <el-form-item label="备注:" prop="remarks" >{{ruleForm.remarks}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="start" align="middle">
            <el-col :span="15">
              <div class="myBox"></div>
              <span class="text">细化信息</span>
            </el-col>
          </el-row>

          <el-row >
            <el-col  style="width: 100%">
              <template>
                <div>
                  <el-table
                    :data="tableData"
                    style="width: 100%;margin-bottom: 20px;"
                    row-key="id"
                    stripe
                    fit
                    empty-text
                    highlight-current-row
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                    <el-table-column
                      prop="name"
                      label="细化"
                      width="300">
                    </el-table-column>
                    <el-table-column
                      prop="batchNo"
                      label="排期批次"
                      width="200">
                    </el-table-column>
                    <el-table-column
                      prop="workload"
                      label="排期工作量"
                      width="200">
                    </el-table-column>
                    <el-table-column
                      prop="button"
                      label="操作"
                      >
                      <template slot-scope="scope">
                        <el-button  v-if="scope.row.workload!=null" type="primary" size="small" @click="download(scope.row.id)">下载方案</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </template>
            </el-col>
          </el-row>


        </el-form>
      </el-main>
      <el-footer class="el-dialog--center position: fixed;bottom" >
        <el-button @click="editForm()" class="reset-btn">修改</el-button>
        <el-button @click="resetForm('ruleForm')" class="reset-btn">关闭</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { infoById } from "@/api/businessOrder";
import { download } from "@/api/businessZipFile";

export default {
  name: "orderInfo",
  data() {
    return {
      radio: "1",
      id: "",
      orderId: "",
      totalAmount: "",
      ruleForm: {
        id: "",
        projectId: "",
        orderId:"",
        orderName:"",
        refineName: "",
        workload: "",
        orderDownDate: "",
        orderFinishDate: "",
        orderWorkload: "",
        orderState:"",
        orderStatus:"",
        msg:"",
        totalAmount:"",
        remarks:""
      },


      tableData: [ {
        id: 3,
        name: '细化xp-01',
        children: [{
          id: 3,
          name: 'xihua-xp-01-01',
          children: [{
            id: 35,
            name: 'xihua-xp-01-01-01',
            batchNo: '10010',
            workload: "100000",
            button: ""
          }, {
            id: 36,
            name: 'xihua-xp-01-01-01-02',
            batchNo: '10011',
            workload: "10000",
            app:"222"
          }]
        }, {
          id: 32,
          name: 'xihua-xp-01-02',
        }]
      },
        {
          id: 40,
          name: 'xihua-xp-02',
        }],
    };
  },

  methods: {
    resetForm(formName) {
      this.$router.push("orderList");
    },
    editForm(){
      this.$router.push({
        // path:'/orderEdit',
        name:'orderEdit',
        query: this.ruleForm
      })
    },

    //下载文件
    download(programmeId){
      download(programmeId)/*.then(response => {
          console.log("====>>>"+response.code)
          if(response.code == "200"){
            this.$message({
              message: "下载成功！",
              type: "success"
            });
          }

        })*/;
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
    this.ruleForm.id = this.$route.query.id;
    this.ruleForm.orderId = this.$route.query.orderId;
    //获取任务详情
    let params = {
      orderId: this.ruleForm.orderId
    }
    infoById(params).then(res => {
      this.ruleForm = res.data;
      this.tableData = res.data.refineList;
      //计算总金额 设置为千分位，并保留两位小数
      this.totalAmount = this.dealMoney(this.ruleForm.totalAmount);
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
.el-input{
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
</style>
