<script lang="ts" setup>
import { ref, onMounted, reactive, watch } from "vue";
import { message } from "ant-design-vue";
import type { PublishNoticeInfo, ProcessedGroup } from "#/types/api/notice.d";
import { getClassGroupList, getPositionGroupList, getPersonGroupList } from "#/api/group";
import { processedSelectClassData, processedSelectData } from "#/utils/notice";


//发布通知三步分页布局
const current = ref<number>(0);
const next = () => {
  current.value++;
};
const prev = () => {
  current.value--;
};
const steps = [{ title: "通知内容" }, { title: "发布对象" }, { title: "截止时间" }];
const items = steps.map((item) => ({ key: item.title, title: item.title }));

const labelCol = { style: { width: "150px" } };
const wrapperCol = { span: 16 };

//发布通知数据双向绑定
const publishNoticeData = ref<PublishNoticeInfo>({
  noticeTitle: "",
  noticeText: "",
  groupList: [],
  receiptStyleId: null,
  deadline: "",
  priority: "",
  fileList: [],
  reminderTimeList: [], //提醒时间列表
  overtime: "",
});

//选择群组渲染
const activeKey = ref("classGroup");
const classSelectData = ref<ProcessedGroup[]>([]);
const positionSelectData = ref<ProcessedGroup[]>([]);
const personSelectData = ref<ProcessedGroup[]>([]);
const UseClassSelectData = async () => {
  const rawData = await getClassGroupList();
  classSelectData.value = processedSelectClassData(rawData);
};
const UsePositionSelectData = async () => {
  const rawData = await getPositionGroupList();
  positionSelectData.value = processedSelectData(rawData);
};
const UsepersonSelectData = async () => {
  const rawData = await getPersonGroupList();
  personSelectData.value = processedSelectData(rawData);
};
//勾选群组并存入相应数据
// 响应式变量 - 存储所有选中的群组ID
const checkedGroupIds = ref({
  classGroup: [] as number[], // 班级类型选中的ID
  positionGroup: [] as number[], // 职位类型选中的ID
  personalGroup: [] as number[], // 个人类型选中的ID
});
const handleCheckChange = (checkedValues: number[]) => {
  // 根据当前激活的标签页，给对应的群组类型赋值
  if (activeKey.value === "classGroup") {
    checkedGroupIds.value.classGroup = checkedValues;
  } else if (activeKey.value === "positionGroup") {
    checkedGroupIds.value.positionGroup = checkedValues;
  } else if (activeKey.value === "personalGroup") {
    checkedGroupIds.value.personalGroup = checkedValues;
  }

  // 合并所有群组数据
  const allGroups = [
    ...classSelectData.value,
    ...positionSelectData.value,
    ...personSelectData.value,
  ];

  // 汇总所有选中项到groupList
  const allSelectedIds = [
    ...checkedGroupIds.value.classGroup,
    ...checkedGroupIds.value.positionGroup,
    ...checkedGroupIds.value.personalGroup,
  ];
  // 注意这里使用 .value 访问ref的值
  publishNoticeData.value.groupList = [];

  publishNoticeData.value.groupList = allGroups
    .filter((group) => allSelectedIds.includes(group.groupId))
    .map((group) => ({
      groupId: group.groupId,
      groupName: group.groupName,
    }));
};

//是否需要收集表相关
const selectedValue = ref("option2");

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
onMounted(UseClassSelectData);
onMounted(UsePositionSelectData);
onMounted(UsepersonSelectData);
// 监听全局状态中的noticeId变化
// const groupListWatcher = watch(
//   // 监听的目标：publishNoticeData中的groupList
//   () => publishNoticeData.value.overtime,
//   // 变化时的回调函数
//   (newVal, oldVal) => {
//     console.log("新值:", newVal);
//     console.log("旧值:", oldVal);
//   },
//   // 配置项：深度监听（因为groupList是数组，内部元素变化也需要监听）
//   { deep: true }
// );
const usePublishNotice = () => {
  console.log("发布通知的数据示例：");
  console.log(publishNoticeData.value);
};
</script>
<template>
  <div class="publish-notice-container">
    <div class="publish-notice-title">
      <h1>发布通知</h1>
    </div>
    <a-divider style="height: 3px; background-color: white" />
    <div class="publish-notice-content-container">
      <a-steps :current="current" :items="items" class="steps"></a-steps>
      <div class="publish-notice-content">
        <!-- 发布通知编写页面 -->
        <div>
          <a-form
            :model="publishNoticeData"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <!-- 1.通知内容 -->
            <template v-if="current === 0">
              <a-form-item label="通知标题">
                <a-input v-model:value="publishNoticeData.noticeTitle" />
              </a-form-item>
              <a-form-item label="通知内容">
                <a-textarea v-model:value="publishNoticeData.noticeText" />
              </a-form-item>
              <!-- <a-form-item label="附件">
                <a-upload>
                  <a-button>
                    <upload-outlined></upload-outlined>
                    Click to Upload
                  </a-button>
                </a-upload>
              </a-form-item> -->
            </template>
            <!-- 2.发布对象 -->
            <template v-if="current === 1">
              <a-form-item label="选择群组">
                <a-tabs v-model:active-key="activeKey" style="margin-bottom: 16px">
                  <a-tab-pane key="classGroup" tab="按班级选择" />
                  <a-tab-pane key="positionGroup" tab="按职位选择" />
                  <a-tab-pane key="personalGroup" tab="按个人选择" />
                </a-tabs>
                <div class="group-content">
                  <div v-if="activeKey === 'classGroup'">
                    <a-checkbox-group
                      @change="handleCheckChange"
                      :value="checkedGroupIds.classGroup"
                    >
                      <a-checkbox
                        v-for="group in classSelectData"
                        :key="group.groupId"
                        :value="group.groupId"
                      >
                        {{ group.groupName }}
                      </a-checkbox>
                    </a-checkbox-group>
                  </div>
                  <div v-if="activeKey === 'positionGroup'">
                    <a-checkbox-group
                      @change="handleCheckChange"
                      :value="checkedGroupIds.positionGroup"
                    >
                      <a-checkbox
                        v-for="group in positionSelectData"
                        :key="group.groupId"
                        :value="group.groupId"
                      >
                        {{ group.groupName }}
                      </a-checkbox>
                    </a-checkbox-group>
                  </div>
                  <div v-if="activeKey === 'personalGroup'">
                    <a-checkbox-group
                      @change="handleCheckChange"
                      :value="checkedGroupIds.positionGroup"
                    >
                      <a-checkbox
                        v-for="group in personSelectData"
                        :key="group.groupId"
                        :value="group.groupId"
                      >
                        {{ group.groupName }}
                      </a-checkbox>
                    </a-checkbox-group>
                  </div>
                </div>
              </a-form-item>
              <a-form-item label="是否需要提交问卷">
                <a-radio-group v-model:value="selectedValue">
                  <a-radio value="option1">是</a-radio>
                  <a-radio value="option2">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </template>
            <!-- 3.截止时间 -->
            <template v-if="current === 2">
              <a-form-item label="截止时间">
                <a-date-picker
                  v-model:value="publishNoticeData.deadline"
                  show-time
                  format="YYYY-MM-DD HH:mm"
                  placeholder="选择截止日期和时间"
                  style="display: block; text-align: right"
                />
              </a-form-item>
              <a-form-item label="优先级">
                <a-radio-group
                  v-model:value="publishNoticeData.priority"
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
                  v-model:value="publishNoticeData.reminderTimeList"
                  :options="reminder_timesOptions"
                  style="display: block; text-align: left"
                />
              </a-form-item>
              <a-form-item label="发布后提醒时间">
                <a-radio-group
                  v-model:value="publishNoticeData.overtime"
                  name="radioGroup"
                  style="display: block; text-align: left"
                >
                  <a-radio value="10m">10分钟</a-radio>
                  <a-radio value="30m">30分钟</a-radio>
                  <a-radio value="1h">1小时</a-radio>
                  <a-radio value="3h">3小时</a-radio>
                  <a-radio value="6h">6小时</a-radio>
                  <a-radio value="12h">12小时</a-radio>
                  <a-radio value="24h">24小时</a-radio>
                </a-radio-group>
              </a-form-item>
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
            @click="usePublishNotice"
          >
            保存并发布
          </a-button>
          <a-button v-if="current > 0" style="margin-left: 8px" @click="prev"
            >返回</a-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.publish-notice-container {
  padding: 15px;
}

.publish-notice-title h1 {
  font-size: 24px;
  font-weight: 600;
}

.notice-content {
  height: 200px;
}

/* 在原样式基础上修改以下内容 */
.publish-steps-action {
  position: fixed;
  bottom: 20px; /* 距离底部20px */
  z-index: 10; /* 确保在内容上方 */
  box-sizing: border-box; /* 盒模型计算方式 */

  /* 移除原padding-left，改为固定定位 */
  display: flex;
  width: 100%; /* 宽度占满屏幕 */
  max-width: 1200px; /* 限制最大宽度，与内容区匹配 */
  padding: 12px 20px; /* 增加内边距 */
  padding-left: 60%; /* 水平居中 */
  transform: translateX(-50%); /* 水平居中修正 */
}

/* 调整内容区底部间距，避免被按钮遮挡 */
.publish-notice-content {
  /* 原height: 600px; 改为min-height，允许内容撑开 */
  min-height: 600px;
  padding: 80px 150px 120px; /* 底部padding加大，预留按钮空间 */
}

[data-theme="dark"] .publish-notice-content {
  background-color: #2f2f2f;
  border: 1px dashed #404040;
}

.steps {
  padding: 0 200px;
}
</style>
