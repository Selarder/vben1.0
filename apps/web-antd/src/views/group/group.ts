const classColumns = [
  { title: '序号', dataIndex: 'index', key: 'index' },
  { title: '班级群组名', dataIndex: 'groupName', key: 'groupName' },
  { title: '包含班级', dataIndex: 'groupMember', key: 'groupMember' },
  { title: '操作', key: 'operation' },
];
const positionColumns = [
  { title: '序号', dataIndex: 'index', key: 'index' },
  { title: '职位群组名',dataIndex: 'groupName',key: 'groupName',  },
  { title: '包含人员', dataIndex: 'groupMember', key: 'groupMember' },
  { title: '操作', key: 'operation' },
];
const personalColumns = [
  { title: '序号', dataIndex: 'index', key: 'index' },
  { title: '个人群组名',dataIndex: 'groupName',key: 'groupName',},
  { title: '包含人员', dataIndex: 'groupMember', key: 'groupMember'},
  { title: '操作', key: 'operation' },
];
export { classColumns, personalColumns, positionColumns };
