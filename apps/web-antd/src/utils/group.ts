
import type {ClassGroupInfo,ClassInfo, GroupInfo,StudentInfo,
  TableGroupList,
  GradeStructureInfo,
  createGroupDataInfo,
  TreeNode,
  RawGrade
} from '#/types/api/group.d'
export const processedClassGroupListData = (rawData: ClassGroupInfo[]): TableGroupList[] => {
  // 直接处理数据数组，框架已确保数据合法（若请求失败会进入catch）
  return rawData.map((group, index) => ({
    key: `group_${group.groupId}`, // 唯一key
    index: index + 1, // 序号
    groupName: group.groupName,
    groupMember: group.classList
      .map((cls: ClassInfo) => cls.className) // 提取班级名称
      .join(' '), // 合并班级名称为字符串
    rawData: group // 保留原始数据用于后续操作
  }));
};

export const processedPositionGroupListData = (rawData: GroupInfo[]): TableGroupList[] => {
  // 直接处理数据数组，框架已确保数据合法（若请求失败会进入catch）
  return rawData.map((group , index) => ({
    key: `group_${group.groupId}`, // 唯一key
    index: index + 1, // 序号
    groupName: group.groupName,
    groupMember: group.personList
      .map((cls: StudentInfo) => cls.studentName) // 提取人员名称
      .join(' '), // 合并班级名称为字符串
    rawData: group // 保留原始数据用于后续操作
  }));
};

export const processedPersonGroupListData = (rawData: GroupInfo[]): TableGroupList[] => {
  // 直接处理数据数组，框架已确保数据合法（若请求失败会进入catch）
  return rawData.map((group , index) => ({
    key: `group_${group.groupId}`, // 唯一key
    index: index + 1, // 序号
    groupName: group.groupName,
    groupMember: group.personList
      .map((cls: StudentInfo) => cls.studentName) // 提取人员名称
      .join(' '), // 合并班级名称为字符串
    rawData: group // 保留原始数据用于后续操作
  }));
};


export const processedGradeStructureData = (rawData: GradeStructureInfo[]) => {
  return rawData.map(grade => ({
    // 1. 修正字段名为下划线（与接口匹配）
    key: grade.gradeId, // 2. 增加前缀确保唯一
    title: `${grade.gradeId}级`,
    checkable: true,
    children: grade.subjects.map(subject => ({
      key: `subject_${grade.gradeId}_${subject.subjectName}`,
      title: subject.subjectName,
      checkable: true,
      children: subject.classes.map(classItem => ({
        key: `class_${classItem.classId}`, // 班级ID本身唯一，可加前缀更清晰
        title: classItem.className,
        checkable: true,
      }))
    }))
  }));
};




export const processedOldGroupData = (rawData:createGroupDataInfo): TreeNode[] =>  { // 明确返回值是 TreeNode 数组
  const treeData: TreeNode[] = []; // 显式指定 treeData 类型

  // 遍历年级（第一级）
  rawData.gradeLevel.forEach(grade => {
    // 构造年级节点（显式指定类型为 TreeNode）
    const gradeNode: TreeNode = {
      key:grade.gradeId,
      title: `${grade.gradeId}级`,
      level: 1,
      children: [], // 此时 children 类型为 TreeNode[]（而非 never[]）
      rawData: grade
    };
    // 遍历专业（第二级）
    grade.subjects.forEach(subject => {
      const subjectNode: TreeNode = {
        key:`subject-${grade.gradeId}-${subject.subjectName}`,
        title: subject.subjectName,
        level: 2,
        children: [],
        rawData: subject
      };
      // 遍历班级（第三级）
      subject.classes.forEach(classItem => {
        const classNode: TreeNode = {
          key: classItem.classId,
          title: classItem.className,
          level: 3,
          children: [],
          rawData: classItem
        };
        // 查找班级对应的学生（第四级）
        const targetClass = rawData.classInfoList.find(item => item.classId === classItem.classId);
        if (targetClass?.students) {
          targetClass.students.forEach(student => {
            // 构造学生节点（叶子节点，isLeaf: true）
            const studentNode: TreeNode = {
              key: `student-${student.studentId}`,
              title: student.studentName,
              level: 4,
              isLeaf: true, // 学生节点无children，标记为叶子
              children: [], // 即使无数据，也显式声明为 TreeNode[]
              rawData: student
            };
            // 往班级节点的 children 中推入学生节点（此时类型匹配）
            classNode.children.push(studentNode);
          });
        }

        // 往专业节点的 children 中推入班级节点
        subjectNode.children.push(classNode);
      });

      // 往年级节点的 children 中推入专业节点
      gradeNode.children.push(subjectNode);
    });

    // 往最外层推入年级节点
    treeData.push(gradeNode);
  });

  return treeData;
}
export const processedInitialCheckedKeys = (rawData: createGroupDataInfo) => {
  const checkedKeys: string[] = [];

  // 遍历年级-专业-班级（和 processedOldGroupData 的遍历逻辑完全一致）
  rawData.gradeLevel.forEach(grade => {
    grade.subjects.forEach(subject => {
      subject.classes.forEach(classItem => {
        // 关键：和 processedOldGroupData 一样，先找“班级是否存在于 classInfoList 中”
        const targetClass = rawData.classInfoList.find(c => c.classId === classItem.classId);

        // 只有找到班级，且班级有学生时，才收集学生 key（和 treeData 中添加学生节点的条件一致）
        if (targetClass?.students) {
          targetClass.students.forEach(student => {
            if (student.check) {
              checkedKeys.push(`student-${student.studentId}`);
            }
          });
        }
      });
    });
  });

  return checkedKeys;
};
