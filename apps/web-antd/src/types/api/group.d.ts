import { Check } from '@vben/icons';
import { cac } from 'cac';
import { Checkbox } from 'ant-design-vue';
import CheckboxRootProps from 'radix-vue';
//群组相关接口类型

//1.获取班级群组列表
export interface ClassInfo {
  classId: string;
  className: string;
}
export interface ClassGroupInfo {
  groupId: number;
  groupName: string;
  classList: ClassInfo[];
}
export interface ClassGroupData{
  code: number;
  msg?:string;
  data: ClassGroupInfo[];
}

//2.3.获取职位/个人群组列表
export interface StudentInfo {
  studentId: string;
  studentName: string;
}
export interface GroupInfo {
  groupId: number;
  groupName: string;
  personList: StudentInfo[];
}
export interface GroupData{
  code: number;
  msg?:string;
  data: GroupInfo[];
}
//群组列表渲染的数据格式
export interface TableGroupList {
  key: string;
  index: number;
  groupName: string;
  groupMember: string;
  rawData: ApiGroupItem; // 保留原始数据
}
//获取年级-专业-班级数据结构：
export interface GradeStructureInfo {
    gradeId: string;
    check: boolean;
    subjects: Array<{
      subjectName: string;
      check: boolean;
      classes: Array<{
        classId: string;
        className: string;
        check: boolean;
      }>;
    }>;
}
//获取班级-个人数据结构：
export interface ClassStructureInfo {
    gradeId: string;
    subjectName: string;
    classId: string;
    className: string;
    students: Array<{
      studentId: string;
      studentName: string;
      check: boolean;
    }>;
  };
   



//涉及群组的POST接口提交的完整数据格式：
export interface createGroupDataInfo {
    groupInfo: {
      groupId: number;
      groupName: string;
      category: number;
    };
    // 年级信息数组
    gradeLevel: Array<{
      gradeId: string;
      check: boolean;
      // 学科信息数组
      subjects: Array<{
        subjectName: string;
        check: boolean;
        // 班级信息数组
        classes: Array<{
          classId: string;
          className: string;
          check: boolean;
        }>;
      }>;
    }>;
    // 班级详情列表（含学生）
    classInfoList: Array<{
      gradeId: string;
      subjectName: string;
      classId: string;
      className: string;
      // 学生信息数组
      students: Array<{
        studentId: string;
        studentName: string;
        check: boolean;
      }>;
    }>;
}
//群组数据在a-tree组件中的四级渲染格式
// 定义原始数据中各层级的类型（与后端返回格式对应）
export interface RawGrade {
  gradeId: string;
  check: boolean;
  subjects: RawSubject[];
}

export interface RawSubject {
  subjectName: string;
  check: boolean;
  classes: RawClass[];
}

export interface RawClass {
  classId: string;
  className: string;
  check: boolean;
}

export interface RawStudent {
  studentId: string;
  studentName: string;
  check: boolean;
}

// 定义 a-tree 节点的统一类型（包含各层级节点的共性）
export interface TreeNode {
  key: string;
  title: string;
  level: 1 | 2 | 3 | 4; // 层级固定为1-4（年级-专业-班级-学生）
  isLeaf?: boolean; // 仅学生节点需要（叶子节点）
  children: TreeNode[]; // 关键：明确 children 是 TreeNode 数组（而非 never[]）
  rawData: RawGrade | RawSubject | RawClass | RawStudent; // 原始数据引用的类型
}
