<script lang="ts" setup>
import { reactive, ref ,computed ,toRaw} from 'vue';
import { Form } from 'ant-design-vue';

import {processedClassGroupList} from '#/types/api/group.ts'
import { fullGroupData, classGroupData} from '#/types/group/newGroupData'
import type {gradeGroup} from '#/types/group/newGroup'

import {
  classColumns,
  personalColumns,
  positionColumns,
} from './group';


const activeKey = ref('classGroup');
const open = ref(false);
const showModal = () => {
  resetFields();
  open.value = true;
}
// const handleOk = () => {
//   open.value = false;
// };

const useForm = Form.useForm;

const labelCol = { span: 4 };
const wrapperCol = { span: 20 };
const modelRef = reactive<{
  name: string;
  member: null | gradeGroup; // 使用gradeGroup接口约束member类型
  type:string;
}>({
  name: '',
  member: null, // 初始值为null
  type: "0",
});
const rulesRef = reactive({
  name: [
    {
      required: true,
      message: 'Please input name',
    },
  ],
  member: [
    {
      required: true,
      message: 'Please select member',
    },
  ],
  type: [
    {
      required: true,
      message: 'Please select type',
    },
  ],
});
const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef);
const onSubmit = () => {
  validate()
    .then(() => {
      open.value = false;
      console.log(toRaw(modelRef));
    })
    .catch((error) => {
      console.error('error', error);
    });
};
// 1. 选中值（单选返回数组，多选返回二维数组）
const selectedValue = ref([]);

// 2. 数据源（使用您提供的四级结构）
const treeOptions = computed(() => {
  switch (modelRef.type) {
    case "1": // 班级
      return classGroupData;
    case "2": // 职位
      return fullGroupData;
    case "3": // 个人
      return fullGroupData;
    default:
      return [];
  }
});
// 3. 选择回调
// const transformToGradeGroup = (value: any[]): gradeGroup => {
//   return {
//     ids: value.flat(), // 或其他转换逻辑
//   };
// };
const handleChange = () => {
  console.log(selectedValue)
};
</script>

<template>
  <div class="group-container">
    <div class="tabs-container">
      <a-tabs v-model:active-key="activeKey">
        <a-tab-pane key="classGroup" tab="班级群组" />
        <a-tab-pane key="positionGroup" tab="职位群组" />
        <a-tab-pane key="personalGroup" tab="个人群组" />
      </a-tabs>
      <div class="add-group-button">
        <a-button type="primary" @click="showModal">新建群组</a-button>
        <a-modal v-model:open="open" title="新建群组" @ok="onSubmit">
          <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-item label="群组类型" v-bind="validateInfos.type">
              <a-radio-group v-model:value="modelRef.type" name="type">
                <a-radio value=1>班级群组</a-radio>
                <a-radio value=2>职位群组</a-radio>
                <a-radio value=3>个人群组</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="群组名称" v-bind="validateInfos.name">
              <a-input v-model:value="modelRef.name" />
            </a-form-item>
            <a-form-item label="成员列表" v-bind="validateInfos.member">
              <a-cascader
                v-model:value="selectedValue"
                :options="treeOptions"
                multiple
                placeholder="请选择年级→专业→班级→学生"
                style="width: 300px"
                @change="handleChange"
              />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
              <a-button style="margin-left: 10px" @click="resetFields">
                重置
              </a-button>
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
    </div>
    <div v-if="activeKey === 'classGroup'">
      <a-table :columns="classColumns" :data-source="processedClassGroupList">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'operation'">
            <a>修改</a>
            <a>删除</a>
          </template>
        </template>
      </a-table>
    </div>
    <div v-if="activeKey === 'positionGroup'">
      <a-table :columns="positionColumns" :data-source="classGroupList">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'operation'">
            <a>修改</a>
            <a>删除</a>
          </template>
        </template>
      </a-table>
    </div>
    <div v-if="activeKey === 'personalGroup'">
      <a-table :columns="personalColumns" :data-source="classGroupList">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'operation'">
            <a>修改</a>
            <a>删除</a>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<style scoped>
.group-container {
  margin:15px;
  margin-top:5px;
}

.tabs-container {
  display: flex;
  justify-content: space-between;
}

.add-group-button {
  margin-top: 10px;
  margin-right: 30px;
}

.group-container a {
  margin-right: 10px;
  color: #1890ff;
}
</style>
