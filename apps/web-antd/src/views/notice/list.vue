<script setup lang="ts">
// import { useTable } from "/@/components/Table";
import { ref, reactive } from "vue";
import { noticeListData, noticeListColumns } from "#/types/notice/list";

const searchText = ref("");

const selectValue = ref("全部");
const focus = () => {
  console.log("focus");
};

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};
</script>

<template>
  <div class="list-container">
    <div class="notice-title-container">
      <h1>查询通知</h1>
    </div>
    <div class="notice-search-container">
      <div class="notice-search-title">
        <span>通知标题</span>
        <a-input-search
          v-model:value="searchText"
          placeholder="input search loading deault"
          loading
          style="width: 300px; margin-right: 30px"
        />
        <span>完成状况</span>
        <a-select
          ref="select"
          v-model:value="selectValue"
          style="width: 120px"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="全部">全部</a-select-option>
          <a-select-option value="已完成">已完成</a-select-option>
          <a-select-option value="未完成">未完成</a-select-option>
        </a-select>
      </div>
      <div class="notice-new-button">
        <router-link to="/notice/publish">
          <a-button type="primary">发布通知</a-button>
        </router-link>
      </div>
    </div>
    <a-divider style="height: 3px; background-color: white" />
    <div class="show-list-container">
      <div v-if="selectValue === '全部'">
        <a-table :columns="noticeListColumns" :data-source="noticeListData">
          <template #bodyCell="{ column }">
            <template v-if="column.key === 'operation'">
              <router-link to="/notice/detail">
                <a-button type="primary">查看</a-button>
              </router-link>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-container {
  padding: 15px;
}

.list-container a {
  margin-right: 10px;
  color: #1890ff;
}

.notice-title-container h1 {
  font-size: 24px;
  font-weight: 600;
  color: #262626;
}

.notice-search-container {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.notice-search-title {
  display: flex;
  width: 1000px;
}

.notice-search-title span {
  width: 80px;
  font-size: 16px;
  line-height: 32px;
}
</style>
