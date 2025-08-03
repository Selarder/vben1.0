<template>
  <div class="publish-notice-container">
    <div class="publish-notice-title">
      <h1>发布通知</h1>
    </div>
    <a-divider style="height: 3px; background-color: white" />
    <div>
      <a-steps :current="current" :items="items"></a-steps>
      <div class="publish-notice-content">
        <!-- 发布通知编写页面 -->
        <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
          <!-- 1.通知内容 -->
          <template v-if="current === 0" class="notice-content">
            <a-form-item label="通知标题">
              <a-input v-model:value="formState.notice_title" />
            </a-form-item>
            <a-form-item label="通知内容">
              <a-textarea v-model:value="formState.notice_context" />
            </a-form-item>
            <a-form-item label="附件">
              <a-upload
                v-model:file-list="formState.file_list"
                name="file"
                action="#"
                :headers="headers"
                @change="handleChange"
                style="display: block; text-align: left"
              >
                <a-button>
                  <upload-outlined></upload-outlined>
                  Click to Upload
                </a-button>
              </a-upload>
            </a-form-item>
          </template>
          <!-- 2.发布对象 -->
          <template v-if="current === 1">
            <a-form-item label="选择群组">
              <a-tabs v-model:active-key="activeKey">
                <a-tab-pane key="classGroup" tab="班级群组" />
                <a-tab-pane key="positionGroup" tab="职位群组" />
                <a-tab-pane key="personalGroup" tab="个人群组" />
              </a-tabs>
            </a-form-item>
          </template>
          <!-- 3.截止时间 -->
          <template v-if="current === 2">
            <a-form-item label="截止时间">
              <a-date-picker
                v-model:value="formState.deadline"
                show-time
                format="YYYY-MM-DD HH:mm"
                placeholder="选择截止日期和时间"
                style="display: block; text-align: right"
              />
            </a-form-item>
            <a-form-item label="优先级">
              <a-radio-group
                v-model:value="formState.priority"
                name="radioGroup"
                style="display: block; text-align: left"
              >
                <a-radio value="重要紧急">重要紧急</a-radio>
                <a-radio value="重要不紧急">重要不紧急</a-radio>
                <a-radio value="紧急不重要">紧急不重要</a-radio>
                <a-radio value="不重要不紧急">不重要不紧急</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="提醒时间">
              <a-checkbox-group
                v-model:value="formState.reminder_times"
                :options="reminder_timesOptions"
                style="display: block; text-align: left"
              />
            </a-form-item>
          </template>
          <!-- 4.设置问卷 -->
          <template v-if="current === 3">
            <h1>设置问卷</h1>
          </template>
        </a-form>
      </div>
      <div class="publish-steps-action">
        <a-button v-if="current < steps.length - 1" type="primary" @click="next"
          >下一步</a-button
        >
        <a-button
          v-if="current == steps.length - 1"
          type="primary"
          @click="message.success('通知发布成功!')"
        >
          保存并发布
        </a-button>
        <a-button v-if="current > 0" style="margin-left: 8px" @click="prev"
          >返回</a-button
        >
        <a-button
          v-if="current == steps.length - 2"
          style="margin-left: 8px"
          type="primary"
          @click="message.success('通知发布成功!')"
        >
          无需问卷 直接发布
        </a-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { message } from "ant-design-vue";
// import {
//   classColumns,
//   classGroupList,
//   personalColumns,
//   positionColumns,
// } from "../group/group";
const current = ref<number>(0);
const next = () => {
  current.value++;
};
const prev = () => {
  current.value--;
};
const steps = [
  {
    title: "通知内容",
  },
  {
    title: "发布对象",
  },
  {
    title: "截止时间",
  },
  {
    title: "设置问卷",
  },
];
const items = steps.map((item) => ({ key: item.title, title: item.title }));

const labelCol = { style: { width: "150px" } };
const wrapperCol = { span: 16 };

//附件上传
headers: {
  ("Authorization");
  ("Bearer xxx");
}
const handleChange = (info) => {
  // info.file 当前操作的文件对象
  // info.fileList 更新后的文件列表
  if (info.file.status === "done") {
    console.log("上传成功", info.file.response);
  }
};

//选择群组
const activeKey = ref("classGroup");

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

// 通知内容data
const formState = reactive({
  notice_title: "",
  notice_context: "",
  file_list: [
    {
      file_name: "",
      file_url: "",
    },
  ],
  group_list: [
    {
      group_id: "",
      group_name: "",
    },
  ],
  deadline: "",
  priority: "",
  reminder_times: [],
});
</script>
<style scoped>
.publish-notice-container {
  padding: 15px;
}

.publish-notice-title h1 {
  font-size: 24px;
  font-weight: 600;
  color: #262626;
}

.publish-notice-content {
  min-height: 500px;
  padding-top: 80px;
  margin: 20px;
  text-align: center;
  background-color: #fafafa;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
}

.publish-steps-action {
  margin-top: 24px;
}

[data-theme="dark"] .publish-notice-content {
  background-color: #2f2f2f;
  border: 1px dashed #404040;
}
</style>
