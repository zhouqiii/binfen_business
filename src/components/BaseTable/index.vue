<template>
  <div>
    <div class="table-container">
      <el-table
        ref="Table"
        :data="sourceData"
        style="width:100%;"
        v-loading="listLoading"
        @selection-change="handleSelectionChange"
        border
      >
        <el-table-column
          v-if="selection"
          type="selection"
          width="55"
          fixed
        ></el-table-column>
        <slot></slot>
        
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="pagination.pageNum"
        :page-size="pagination.pageSize"
        :page-sizes="pages"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'baseTable',
  props: {
    itemId: {
      type: String,
      default: 'id'
    },
    selection: {
      type: Boolean,
      default: false
    },
    listLoading: {
      type: Boolean,
      default: false
    },
    sourceData: {
      type: Array,
      default() {
        return [];
      }
    },
    total: {
      type: Number,
      default: null
    },
    pagination: {
      type: Object,
      default() {
        return {
          pageNum: 1,
          pageSize: 10
        };
      }
    }
  },
  data() {
    return {
      pages: [10, 15, 20, 30, 50, 100],
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pagination.pageNum = 1;
      this.pagination.pageSize = val;
      // 更新数据
      this.$emit('reloadList', { pageSize: val });
    },
    handleCurrentChange(val) {
      this.pagination.pageNum = val;
      // 更新数据
      this.$emit('reloadList', { pageNum: val });
    },
    handleSelectionChange(val) {
      const idList = [];
      for (let i = 0; i < val.length; i++) {
        idList.push(val[i][this.itemId]);
      }
      this.$emit('selectList', idList);
      console.log('idList===', idList);
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  padding: 40px 0;
}
</style>
