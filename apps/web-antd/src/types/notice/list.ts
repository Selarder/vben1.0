import {ref} from 'vue'

const noticeListColumns = [
  {title: '序号',key: 'index', width: 80,  align: 'center' as const,   },
  {title: '通知标题', dataIndex: 'notice_title', key: 'notice_title', width: 200  },
  { title: '优先级', dataIndex: 'priority',key: 'priority', width: 120,align: 'center' as const},
  {title: '截止时间',dataIndex: 'deadline',key: 'deadline',width: 180,align: 'center' as const},
  { title: '完成度',dataIndex: 'completion', key: 'completion',width: 120,align: 'center' as const  },
  {title: '操作',key: 'operation',width: 100,align: 'center' as const  }
]

const noticeListData = ref([
  {
    notice_id: 3,
    notice_title: '期末考试通知',
    priority: '重要紧急',
    deadline: '2021-02-28-20:00:00',
    completion: 50,
    operation: 'ShowDetail'
  }
])


export {noticeListData,noticeListColumns}
