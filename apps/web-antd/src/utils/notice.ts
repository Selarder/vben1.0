import type {NoticeListInfo} from '#/types/api/notice.d'

import type {ClassGroupInfo,GroupInfo
} from '#/types/api/group.d'

export const processedNoticeListData = (rawData:NoticeListInfo[] )=> {
  // 直接处理数据数组，框架已确保数据合法（若请求失败会进入catch）
  return rawData.map((noticeList, index) => ({
    key:noticeList.noticeId, // 唯一key
    index: index + 1, // 序号
    noticeTitle: noticeList.noticeTitle,
    priority:noticeList.priority,
    deadline:noticeList.deadline,
    completion:`${noticeList.completion}%`,
}));
};

//发布通知按班级选择
export const processedSelectClassData = (rawData:ClassGroupInfo[] )=> {
  // 直接处理数据数组，框架已确保数据合法（若请求失败会进入catch）
  return rawData.map((groupList) => ({
    groupId:groupList.groupId,
    groupName:groupList.groupName,
}));
};

//发布通知按个人和职位选择
export const processedSelectData = (rawData:GroupInfo[] )=> {
  // 直接处理数据数组，框架已确保数据合法（若请求失败会进入catch）
  return rawData.map((groupList) => ({
    groupId:groupList.groupId,
    groupName:groupList.groupName,
}));
};
