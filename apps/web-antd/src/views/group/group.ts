const classColumns = [
  { title: '序号', dataIndex: 'index', key: 'index' },
  { title: '班级群组名', dataIndex: 'groupName', key: 'groupName' },
  { title: '包含班级', dataIndex: 'groupMember', key: 'groupMember' },
  { title: '操作', key: 'operation' },
];
const positionColumns = [
  { title: '序号', dataIndex: 'index', key: 'index' },
  {
    title: '职位群组名',
    dataIndex: 'positionGroupName',
    key: 'positionGroupName',
  },
  { title: '包含人员', dataIndex: 'includedPerson', key: 'includedPerson' },
  { title: '操作', key: 'operation' },
];
const personalColumns = [
  { title: '序号', dataIndex: 'index', key: 'index' },
  {
    title: '个人群组名',
    dataIndex: 'personalGroupName',
    key: 'personalGroupName',
  },
  { title: '包含人员', dataIndex: 'includedPerson', key: 'includedPerson' },
  { title: '操作', key: 'operation' },
];
const classGroupList = [
  {
    key: '1',
    index: 1,
    classGroupName: '班级A',
    includedClasses: '班级1, 班级2',
  },
  {
    key: '2',
    index: 2,
    classGroupName: '班级B',
    includedClasses: '班级3, 班级4',
  },
  {
    key: '2',
    index: 2,
    classGroupName: '班级B',
    includedClasses: '班级3, 班级4',
  },
];
export { classColumns, classGroupList, personalColumns, positionColumns };
