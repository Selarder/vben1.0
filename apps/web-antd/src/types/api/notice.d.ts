//获取通知列表的数据格式
export interface NoticeListInfo{
  noticeId:number,
  noticeTitle:string,
  priority:string,
  deadline:string,
  completion:number
}
//渲染通知列表的数据格式
export interface TablenoticeList{
  key:number,
  index:number,
  noticeTitle:string,
  priority:string,
  deadline:string,
  completion:string,
}
//查看通知详情的数据格式
export interface NoticeDetailInfo{
  code:number,
  msg:string,
  noticeId:number,
  noticeTitle:string,
  noticeText:string,
  priority:string,
  groupList:Array<{
    groupName:string,
    groupId:number
  }>,
  deadline:string,
  receiptStyleId:string,
  receiptStyle:Array<{
    receiptColumnName:string,
    SingleOption:number,
    optionList:[]
  }>,
  reminderTimeList:string,//提醒时间列表
  overtime:string,//超时查看时间
  unfinishedStudents:Array<{
    name:string,
    studentId:string,
  }>
}
// 处理后的数据结构（用于 checkbox 渲染）
interface ProcessedGroup {
  groupId: number; // 对应 groupId，作为 checkbox 的 value
  groupName: string; // 对应 groupName，作为 checkbox 的显示文本
}
//发布通知的数据格式
export interface PublishNoticeInfo{
  noticeTitle:string,
  noticeText:string,
    groupList:Array<{
    groupName:string,
    groupId:number
  }>,
  receiptStyleId:string | null,
  deadline:string,
  priority:string,
  fileList:Array<{
    fileName,
    fileUrl,
  }> | null,
  reminderTimeList:string[],//提醒时间列表
  overtime:string,
}
