<template>
  <div class="app-container monthly-box">
    <div class="table-container">
      <el-table
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
      >
        <template v-for="item in columns">
          <el-table-column
            :label="item.label"
            :prop="item.prop"
            align="center"
            :width="item.width || 'auto'"
          >
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getInfo } from '@/api/monthlySettlement';

export default {
  name: 'monthlySettlementInfo',
  data() {
    return {
      id: '',
      list: null,
      listLoading: false,
      columns: [
        {
          label: '姓名',
          width: '80',
          prop: 'applicantName'
        },
        {
          label: '级别',
          prop: 'workerPlace'
        },
        {
          label: '月份',
          prop: 'projectName'
        },
        {
          label: '休假',
          width: '280',
          prop: 'taskName'
        },
        {
          label: 'OT',
          prop: 'createDate'
        },
        {
          label: 'RC',
          prop: 'workerDate'
        }
      ]
    };
  },

  methods: {
    goBack() {
      this.$router.back();
    },
    getInfo() {
      //获取详情
      getInfo(this.id).then(res => {
        this.list = res.data.list;
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

</style>
