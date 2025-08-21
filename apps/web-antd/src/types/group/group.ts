import type {ClassInfo,ClassGroupInfo,TableGroupList} from './group.d';

const RawClassGroupData: ClassGroupInfo[] = [
    {
      group_id: 1,
      group_name: '班级群组1',
      class_list: [
        { class_id: '13902301', class_name: '13902301' },
        { class_id: '13902302', class_name: '13902302' }
      ]
    },
    {
      group_id: 2,
      group_name: '班级群组2',
      class_list: [
        { class_id: '13902303', class_name: '13902303' },
        { class_id: '13902304', class_name: '13902304' }
      ]
    },
    {
      group_id: 2,
      group_name: '班级群组2',
      class_list: [
        { class_id: '13902303', class_name: '13902303' },
        { class_id: '13902304', class_name: '13902304' }
      ]
    },
  ]
const transformGroupListData = (rawData: ClassGroupInfo[]): TableGroupList[] => {
  // 直接处理数据数组，框架已确保数据合法（若请求失败会进入catch）
  return rawData.map((group, index) => ({
    key: `group_${group.group_id}`, // 唯一key
    index: index + 1, // 序号
    groupName: group.group_name,
    groupMember: group.class_list
      .map((cls: ClassInfo) => cls.class_name) // 提取班级名称
      .join(' '), // 合并班级名称为字符串
    rawData: group // 保留原始数据用于后续操作
  }));
};

export const processedClassGroupList = transformGroupListData(RawClassGroupData);
