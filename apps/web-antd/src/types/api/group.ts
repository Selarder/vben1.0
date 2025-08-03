import type {ClassGroupData,GroupData,TableGroupList} from './group.d';
import { classGroupData } from '#/types/group/newGroupData';

const RawClassGroupData: ClassGroupData = {
  code: 200,
  msg: 'Success',
  data: [
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
}
const transformGroupListData = (RawClassGroupData: ClassGroupData): TableGroupList[] => {
  if (RawClassGroupData.code !== 200) return []; // 错误处理
  return RawClassGroupData.data.map((group, index) => ({
    key: `group_${group.group_id}`, // 唯一key
    index: index + 1, // 序号
    groupName: group.group_name,
    groupMember: group.class_list
      .map(cls => cls.class_name) // 提取班级名称
      .join(', '), // 合并班级名称
    rawData: group // 保留原始数据
  }));
};

export const processedClassGroupList = transformGroupListData(RawClassGroupData);