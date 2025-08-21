<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getNoticeList } from "#/api/notice";
import { processedNoticeListData } from "#/utils/notice";
import { noticeListColumns } from "#/views/notice/notice";
import type { TablenoticeList } from "#/types/api/notice.d";
import { deleteNotice } from "#/api/notice";

const searchText = ref("");

const selectValue = ref("全部");
const focus = () => {
  console.log("focus");
};

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

//一.渲染通知列表
const noticeListData = ref<TablenoticeList[]>([]);
const UseNoticeListData = async () => {
  // 动态导入API避免循环依赖（如果项目存在依赖链）
  const rawData = await getNoticeList();
  noticeListData.value = processedNoticeListData(rawData);
  // console.log("UsePersonGroupListData执行");
};
onMounted(UseNoticeListData);

//删除通知
const showDeleteModal = ref(false);
// 存储当前要删除的noticeId
const currentNoticeId = ref(null);
const handleDelete = () => {
  if (currentNoticeId.value) {
    console.log("handleDelete");
    deleteNotice(currentNoticeId.value);
  }
  showDeleteModal.value = false;
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
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'operation'">
              <router-link :to="`/notice/detail/${record.key}`">
                <a type="primary">查看</a>
              </router-link>
              <a
                @click="
                  () => {
                    currentNoticeId = record.key;
                    showDeleteModal = true;
                  }
                "
                >删除</a
              >
              <a-modal
                v-model:open="showDeleteModal"
                title="确认删除"
                ok-text="确认"
                cancel-text="取消"
                @ok="handleDelete"
              >
                <p>确定要删除 {{ record.noticeTitle }} ？此操作不可撤销。</p>
              </a-modal>
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
