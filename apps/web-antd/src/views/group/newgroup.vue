<template>
  <div class="container p-4">
    <!-- 级联选择器（仅到班级层级） -->
    <a-cascader
      v-model:value="selectedKeys"
      :options="cascaderOptions"
      placeholder="选择年级/专业/班级"
      @change="handleSelect"
      style="width: 300px;"
    />

    <!-- 提交按钮 -->
    <a-button 
      type="primary" 
      @click="submit"
      :disabled="!selectedClass"
      class="mt-4"
    >
      确认选择
    </a-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Cascader as ACascader, Button as AButton } from 'ant-design-vue';

// 模拟API返回数据（仅包含必要字段）
const apiData = {
  "code": 200,
  "data": {
    "grades": {
      "grade": "2023",
      "subjects": [{
        "subject": "软件工程专业",
        "classes": [{
          "class_id": "13002301",
          "student_id": "20231001000"
        },
        {
          "class_id": "13002301",
          "student_id": "20231001001"
        },
        {
          "class_id": "13002302",
          "student_id": "20231001002"
        }]
      }]
    }
  }
};

// 级联选择器选项
const cascaderOptions = ref([]);
// 选中的键值
const selectedKeys = ref([]);
// 选中的班级信息（仅包含学生ID列表）
const selectedClass = ref(null);

// 处理数据：只提取必要的班级和学生ID信息
const processData = () => {
  const { grades } = apiData.data;
  const classMap = {};

  // 按班级ID分组，仅收集学生ID
  grades.subjects.forEach(subject => {
    subject.classes.forEach(item => {
      if (!classMap[item.class_id]) {
        classMap[item.class_id] = {
          classId: item.class_id,
          subject: subject.subject,
          studentIds: [] // 仅存储学生ID
        };
      }
      // 只添加学生ID
      classMap[item.class_id].studentIds.push(item.student_id);
    });
  });

  // 构建级联选择器结构
  const subjectMap = {};
  Object.values(classMap).forEach(item => {
    if (!subjectMap[item.subject]) {
      subjectMap[item.subject] = {
        label: item.subject,
        value: item.subject,
        children: []
      };
    }
    
    // 班级选项中仅保留学生ID列表
    subjectMap[item.subject].children.push({
      label: `班级 ${item.classId}`,
      value: item.classId,
      studentIds: item.studentIds // 关键：仅存储学生ID
    });
  });

  // 最终级联数据
  cascaderOptions.value = [{
    label: `${grades.grade}级`,
    value: grades.grade,
    children: Object.values(subjectMap)
  }];
};

// 初始化数据
processData();

// 处理选择事件
const handleSelect = (keys, options) => {
  // 仅处理到班级层级的选择
  selectedClass.value = options.length === 3 ? options[2] : null;
};

// 提交数据
const submit = () => {
  if (!selectedClass.value) return;

  // 提交给后端的极简数据格式（仅包含必要ID）
  const submitData = {
    class_id: selectedKeys.value[2],
    student_ids: selectedClass.value.studentIds // 仅学生ID数组
  };

  console.log("提交数据:", submitData);
  // 实际调用API
  // api.createGroup(submitData).then(...)
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 20px;
}
</style>
