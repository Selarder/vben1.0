<script lang="ts" setup>
import { reactive, ref, computed, onMounted, watch } from "vue";
import {
  getClassGroupList,
  getPositionGroupList,
  getPersonGroupList,
  getGradeStructure,
  getClassStructure,
  getOldGroupData,
} from "#/api/group";
import type {
  TableGroupList,
  GradeStructureInfo,
  ClassStructureInfo,
  createGroupDataInfo,
  TreeNode,
} from "#/types/api/group.d";
import {
  processedClassGroupListData,
  processedPositionGroupListData,
  processedPersonGroupListData,
  processedGradeStructureData,
  processedOldGroupData,
  processedInitialCheckedKeys,
} from "#/utils/group";
import { classColumns, personalColumns, positionColumns } from "./group";
import { refWithControl } from "@vueuse/core";

//一.渲染列表
const activeKey = ref("classGroup");
const classGroupListData = ref<TableGroupList[]>([]);
const positionGroupListData = ref<TableGroupList[]>([]);
const personGroupListData = ref<TableGroupList[]>([]);
const UseClassGroupListData = async () => {
  // 动态导入API避免循环依赖（如果项目存在依赖链）
  const rawData = await getClassGroupList();
  classGroupListData.value = processedClassGroupListData(rawData);
  // console.log("UseClassGroupListData执行");
};
const UsePositionGroupListData = async () => {
  // 动态导入API避免循环依赖（如果项目存在依赖链）
  const rawData = await getPositionGroupList();
  positionGroupListData.value = processedPositionGroupListData(rawData);
  // console.log("UsePositionGroupListData执行");
};
const UsePersonGroupListData = async () => {
  // 动态导入API避免循环依赖（如果项目存在依赖链）
  const rawData = await getPersonGroupList();
  personGroupListData.value = processedPersonGroupListData(rawData);
  // console.log("UsePersonGroupListData执行");
};
onMounted(UseClassGroupListData);
onMounted(UsePositionGroupListData);
onMounted(UsePersonGroupListData);

//二.新建/修改群组
const originalData = ref<[]>([]);
const gardeStructureData = ref();
const treeData = ref<any[]>([]);
const checkedKeys = ref<string[]>([]); //存储被勾选的节点
const selectedKeys = ref<string[]>([]);
const expandedKeys = ref<string[]>([]); //存储展开的节点
const isRadioDisabled = ref(false);
//1.表单布局配置
const labelCol = { span: 4 };
const wrapperCol = { span: 20 };

//2.表单相关
const formRef = ref();
const open = ref(false);
const modelRef = reactive<{
  name: string;
  member: any[]; // 使用gradeGroup接口约束member类型
  type: string;
}>({
  name: "",
  member: [], // 初始值为null
  type: "0",
});
//3.表单验证规则
const rules = {
  type: [{ required: true, message: "请选择群组类型", trigger: "change" }],
  name: [{ required: true, message: "请输入群组名称", trigger: "blur" }],
  member: [{ required: true, message: "请选择群组成员", trigger: "change" }],
};
//4. 显示模态框
const UseClassStructureData = async () => {
  // 动态导入API避免循环依赖（如果项目存在依赖链）
  const rawData = await getGradeStructure();
  treeData.value = processedGradeStructureData(rawData);
};

//三、修改群组
const UseOldGroupData = async () => {
  // 动态导入API避免循环依赖（如果项目存在依赖链）
  const rawData = await getOldGroupData();
  treeData.value = processedOldGroupData(rawData);
  checkedKeys.value = processedInitialCheckedKeys(rawData);
  modelRef.type = String(rawData.groupInfo.category);
  modelRef.name = rawData.groupInfo.groupName;
};
const handleShowModal = (operation: string) => {
  open.value = true;
  if (operation === "newGroup") {
    console.log("newGroup");
    UseClassStructureData();
    console.log(treeData);
  } else if (operation === "updateGroup") {
    console.log("updateGroup");
    UseOldGroupData();
    console.log(treeData.value);
    isRadioDisabled.value = true;
  }
};
// 3. 监听 open 变化：当 open 从 true 变为 false 时清空数据
watch(
  () => open.value, // 监听 open 的值
  (newVal, oldVal) => {
    // 仅当“之前是打开的，现在关闭了”才执行清空
    if (oldVal === true && newVal === false) {
      clearModalData();
    }
  }
);

// 4. 定义清空函数：集中重置所有需要清空的数据
const clearModalData = () => {
  treeData.value = []; // 清空树形数据
  modelRef.type = "";
  modelRef.name = "";
  isRadioDisabled.value = false; // 重置禁用状态（可选，根据需求）
};
watch(expandedKeys, () => {
  console.log("expandedKeys", expandedKeys);
});
watch(selectedKeys, () => {
  console.log("selectedKeys", selectedKeys);
});
watch(checkedKeys, () => {
  console.log("checkedKeys", checkedKeys);
});
//9. 提交表单
const onSubmit = () => {
  // 表单验证
  formRef.value.validate();
  // 准备提交给后端的数据
  const submitData = {
    type: modelRef.type,
    name: modelRef.name,
    // 包含完整结构，仅修改了check属性的成员数据
    members: modelRef.member,
  };
  // 实际项目中替换为真实API调用
  console.log("提交给后端的数据:", submitData);
  open.value = false;
};
// 处理展开事件，更新expandedKeys
const handleExpand = (expandedKeysValue: string[]) => {
  expandedKeys.value = expandedKeysValue;
};

// 处理勾选事件，更新checkedKeys
const handleCheck = (checkedKeysValue: string[], info: any) => {
  checkedKeys.value = checkedKeysValue;
  modelRef.member = checkedKeys.value;
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
        <a-button type="primary" @click="handleShowModal('newGroup')">新建群组</a-button>
        <a-modal v-model:open="open" title="新建群组" @ok="onSubmit">
          <a-form
            :model="modelRef"
            :rules="rules"
            ref="formRef"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-item label="群组类型" name="type">
              <a-radio-group
                v-model:value="modelRef.type"
                name="type"
                :disabled="isRadioDisabled"
              >
                <a-radio value="0">班级群组</a-radio>
                <a-radio value="1">职位群组</a-radio>
                <a-radio value="2">个人群组</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="群组名称" name="name">
              <a-input v-model:value="modelRef.name" />
            </a-form-item>
            <a-form-item label="成员列表" name="member">
              <a-tree
                :tree-data="treeData"
                checkable
                :checkedKeys="checkedKeys"
                :selectedKeys="selectedKeys"
                :expandedKeys="expandedKeys"
                :autoExpandParent="true"
                @expand="handleExpand"
                @check="handleCheck"
              >
              </a-tree>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
              <a-button style="margin-left: 10px">重置 </a-button>
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
    </div>
    <div v-if="activeKey === 'classGroup'">
      <a-table :columns="classColumns" :data-source="classGroupListData">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'operation'">
            <a @click="handleShowModal('updateGroup')">修改</a>
            <a>删除</a>
          </template>
        </template>
      </a-table>
    </div>
    <div v-if="activeKey === 'positionGroup'">
      <a-table :columns="positionColumns" :data-source="positionGroupListData">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'operation'">
            <a @click="handleShowModal('updateGroup')">修改</a>
            <a>删除</a>
          </template>
        </template>
      </a-table>
    </div>
    <div v-if="activeKey === 'personalGroup'">
      <a-table :columns="personalColumns" :data-source="personGroupListData">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'operation'">
            <a @click="handleShowModal('updateGroup')">修改</a>
            <a>删除</a>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<style scoped>
.group-container {
  margin: 15px;
  margin-top: 5px;
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
