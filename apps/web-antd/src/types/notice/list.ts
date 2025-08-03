import {ref} from 'vue'
interface RawNoticeList {
  notice_id: number
  notice_title: string
  priority: '重要紧急' | '重要不紧急' | '紧急不重要' | '不重要不紧急'
  deadline: string
  completion: number
}
interface ProcessedNoticeList extends RawNoticeList{
  index?: number // 前端计算的序号
  operation: string // 前端操作按钮文本
}

const noticeListColumns = [
  {
    title: '序号',  //列头显示的文字标题
    key: 'index', //该列的唯一标识符
    width: 80, //列的固定宽度
    align: 'center' as const, //列内容的对齐方式
    customRender: ({ index }: { index: number }) => {
      // 分页计算逻辑（假设每页10条）
      const pageSize = 10
      const currentPage = 1 // 实际应从分页器获取
      return (currentPage - 1) * pageSize + index + 1
    }
  },
  {
    title: '通知标题',
    dataIndex: 'notice_title',
    key: 'notice_title',
    width: 200
  },
  {
    title: '优先级',
    dataIndex: 'priority',
    key: 'priority',
    width: 120,
    align: 'center' as const
  },
  {
    title: '截止时间',
    dataIndex: 'deadline',
    key: 'deadline',
    width: 180,
    align: 'center' as const
  },
  {
    title: '完成度',
    dataIndex: 'completion',
    key: 'completion',
    width: 120,
    align: 'center' as const
  },
  {
    title: '操作',
    key: 'operation',
    width: 100,
    align: 'center' as const
  }
]

const noticeListData = ref<ProcessedNoticeList[]>([
  {
    notice_id: 3,
    notice_title: '期末考试通知',
    priority: '重要紧急',
    deadline: '2021-02-28-20:00:00',
    completion: 50,
    operation: 'ShowDetail'
  },
  {
    notice_id: 2,
    notice_title: '寒假放假通知',
    priority: '重要不紧急',
    deadline: '2020-12-28-20:00:00',
    completion: 100,
    operation: 'ShowDetail'
  },
   {
    notice_id: 2,
    notice_title: '寒假放假通知',
    priority: '重要不紧急',
    deadline: '2020-12-28-20:00:00',
    completion: 100,
    operation: 'ShowDetail'
  },{
    notice_id: 2,
    notice_title: '寒假放假通知',
    priority: '重要不紧急',
    deadline: '2020-12-28-20:00:00',
    completion: 100,
    operation: 'ShowDetail'
  },
   {
    notice_id: 2,
    notice_title: '寒假放假通知',
    priority: '重要不紧急',
    deadline: '2020-12-28-20:00:00',
    completion: 100,
    operation: 'ShowDetail'
  },{
    notice_id: 2,
    notice_title: '寒假放假通知',
    priority: '重要不紧急',
    deadline: '2020-12-28-20:00:00',
    completion: 100,
    operation: 'ShowDetail'
  },
   {
    notice_id: 2,
    notice_title: '寒假放假通知',
    priority: '重要不紧急',
    deadline: '2020-12-28-20:00:00',
    completion: 100,
    operation: 'ShowDetail'
  },{
    notice_id: 2,
    notice_title: '寒假放假通知',
    priority: '重要不紧急',
    deadline: '2020-12-28-20:00:00',
    completion: 100,
    operation: 'ShowDetail'
  },
   {
    notice_id: 2,
    notice_title: '寒假放假通知',
    priority: '重要不紧急',
    deadline: '2020-12-28-20:00:00',
    completion: 100,
    operation: 'ShowDetail'
  },{
    notice_id: 2,
    notice_title: '寒假放假通知',
    priority: '重要不紧急',
    deadline: '2020-12-28-20:00:00',
    completion: 100,
    operation: 'ShowDetail'
  },
   {
    notice_id: 2,
    notice_title: '寒假放假通知',
    priority: '重要不紧急',
    deadline: '2020-12-28-20:00:00',
    completion: 100,
    operation: 'ShowDetail'
  },{
    notice_id: 2,
    notice_title: '寒假放假通知',
    priority: '重要不紧急',
    deadline: '2020-12-28-20:00:00',
    completion: 100,
    operation: 'ShowDetail'
  },
   {
    notice_id: 2,
    notice_title: '寒假放假通知',
    priority: '重要不紧急',
    deadline: '2020-12-28-20:00:00',
    completion: 100,
    operation: 'ShowDetail'
  },
])


export {noticeListData,noticeListColumns}
