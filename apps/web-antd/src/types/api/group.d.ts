//群组相关接口类型

//1.获取班级群组列表
export interface ClassInfo {
  class_id: string;
  class_name: string;
}
export interface ClassGroupInfo {
  group_id: number;
  group_name: string;
  class_list: ClassInfo[];
}
export interface ClassGroupData {
  code: number;
  msg?:string;
  data: ClassGroupInfo[];
}

//2.3.获取职位/个人群组列表
export interface StudentInfo {
  student_id: string;
  student_name: string;
}
export interface GroupInfo {
  group_id: number;
  group_name: string;
  person_list: StudentInfo[];
}
export interface GroupData{
  code: number;
  msg?:string;
  data: GroupInfo[];
}

export interface TableGroupList {
  key: string;
  index: number;
  groupName: string;
  groupMember: string;
  rawData: ApiGroupItem; // 保留原始数据
}
