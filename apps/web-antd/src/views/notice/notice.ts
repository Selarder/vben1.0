const noticeListColumns = [
  {title: '序号',dataIndex:'index',key: 'index', width: 80,  align: 'center' as const,   },
  {title: '通知标题',dataIndex: 'noticeTitle', key: 'noticeTitle', width: 200,align: 'center' as const },
  {title: '优先级',dataIndex: 'priority',key: 'priority', width: 120,align: 'center' as const},
  {title: '截止时间',dataIndex: 'deadline',key: 'deadline',width: 180,align: 'center' as const},
  {title: '完成度',dataIndex: 'completion', key: 'completion',width: 120,align: 'center' as const  },
  {title: '操作',key: 'operation',width: 100,align: 'center' as const }
]
export {noticeListColumns}
