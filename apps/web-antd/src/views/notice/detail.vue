<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getNoticeDetail } from "#/api/notice";
import { useRoute } from "vue-router"; // 导入路由钩子
import type { NoticeDetailInfo } from "#/types/api/notice.d";

import { oneClickRemind } from "#/api/notice";
import { message } from "ant-design-vue";

// 1. 获取路由实例
const route = useRoute();
// 2. 从路由参数中提取noticeId（注意转换为数字类型）
// route.params 包含所有路径参数，对应路由配置中的 :noticeId
const noticeId = Number(route.params.noticeId);
// 3.根据noticeId调用接口获取通知详情数据
const noticeDetailData = ref<NoticeDetailInfo>();
const UseNoticeDetailData = async (noticeId: number) => {
  // 动态导入API避免循环依赖（如果项目存在依赖链）
  noticeDetailData.value = await getNoticeDetail(noticeId);
};
const test = () => {
  console.log(`查询ID为${noticeId}的通知详情`);
  console.log(noticeDetailData);
};
onMounted(() => {
  if (noticeId) UseNoticeDetailData(noticeId);
  test();
});
const labelCol = { style: { width: "150px" } };
const wrapperCol = { span: 16 };
//提醒时间
const reminder_timesOptions = [
  { label: "截止前3天", value: "72h" },
  { label: "截止前2天", value: "48h" },
  { label: "截止前1天", value: "24h" },
  { label: "截止前12小时", value: "12h" },
  { label: "截止前6小时", value: "6h" },
  { label: "截止前3小时", value: "3h" },
  { label: "截止前1小时", value: "1h" },
];
const useoneClickRemind = () => {
  if (noticeDetailData.value?.noticeId) {
    oneClickRemind(noticeDetailData.value.noticeId);
  }
};
</script>
<template>
  <div class="detail-container" v-if="noticeDetailData">
    <div class="title-wrapper">
      <div class="detail-title-container">
        <h1>{{ noticeDetailData.noticeTitle }}</h1>
      </div>
      <div class="detail-return-list">
        <router-link :to="`/notice/list`">
          <a>返回通知列表</a>
        </router-link>
      </div>
    </div>
    <a-divider class="custom-divider" />
    <div class="detail-content-container">
      <a-form
        :model="noticeDetailData"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        class="custom-disabled-form"
      >
        <a-form-item label="通知标题">
          <span>{{ noticeDetailData.noticeTitle }}</span>
        </a-form-item>
        <a-form-item label="通知内容">
          <span>{{ noticeDetailData.noticeText }}</span>
        </a-form-item>
        <a-form-item label="选择群组">
          <span v-for="value in noticeDetailData.groupList"
            >{{ value.groupName }}
            <span> </span>
          </span>
        </a-form-item>
        <a-form-item label="截止时间">
          <span>{{ noticeDetailData.deadline }}</span>
        </a-form-item>
        <a-form-item label="重要程度">
          <a-radio-group
            v-model:value="noticeDetailData.priority"
            name="radioGroup"
            style="display: block; text-align: left"
            disabled
            class="radio-group-readonly"
          >
            <a-radio value="重要紧急">重要紧急</a-radio>
            <a-radio value="重要不紧急">重要不紧急</a-radio>
            <a-radio value="紧急不重要">紧急不重要</a-radio>
            <a-radio value="不重要不紧急">不重要不紧急</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="提醒时间">
          <a-checkbox-group
            v-model:value="noticeDetailData.reminderTimeList"
            :options="reminder_timesOptions"
            style="display: block; text-align: left"
            disabled
          />
        </a-form-item>
        <a-form-item label="未完成">
          <div>
            <span v-for="value in noticeDetailData.unfinishedStudents"
              >{{ value.name }}
              <span> </span>
            </span>
          </div>
          <div>
            <a-button @click="useoneClickRemind">一键提醒</a-button>
          </div>
        </a-form-item>
        <a-form-item label="问卷结果">
          <a-button>查看</a-button>
          <a-button>导出</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<style scoped>
.detail-container {
  padding: 15px;
}

.title-wrapper {
  display: flex;
  justify-content: space-between;
}

.detail-title-container {
  margin-bottom: 18px;
}

h1 {
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  vertical-align: top;
  text-align: left;
  letter-spacing: 0;
}

.detail-return-list {
  padding-top: 22px;
}

a {
  padding-right: 50px;
  font-size: 16px;
  font-weight: 500;
  line-height: 28px;
  vertical-align: top;
  color: rgb(65 20 107 / 100%);
  letter-spacing: 0;
}

.custom-divider {
  top: 122px;
  left: 300px;
  width: 1079px;
  height: 2px;
  margin: 0;
  background: rgb(159 112 212 / 100%);
  opacity: 1;
}

.detail-content-container {
  margin-top: 10px;
}

a-form-item {
  width: 300px;
}
</style>
