 // 基础节点（泛型支持不同层级的value类型）
  interface BaseGroup<T = string> {
    label: string;
    value: T;
  }
  // 各层级节点（严格约束children类型）
  interface gradeGroup extends BaseGroup {
    children: MajorGroup[]; // 年级必须包含专业
  }

  interface MajorGroup extends BaseGroup {
    children: ClassGroup[]; // 专业必须包含班级
  }

  interface ClassGroup extends BaseGroup {
    children?: StudentGroup[]; // 班级可选包含学生
  }

  interface StudentGroup extends BaseGroup {
    studentId: string; // 学生专属字段
  }
export type {gradeGroup}

