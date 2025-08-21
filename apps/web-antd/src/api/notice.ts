import type {NoticeListInfo, NoticeDetailInfo} from '#/types/api/notice.d'
import { baseRequestClient } from '#/api/request';
import { message } from 'ant-design-vue';

export const getNoticeList = async ():Promise<NoticeListInfo[]> => {
  try {
    // 使用baseRequestClient获取原始响应
    const response = await baseRequestClient.get(
      '/kit/FXvYJaHf79ed0b8eb23474987e8c56ffdd07128c5ff9888?uri=/notice/check/publish/list'
    );
    // 打印完整响应结构用于调试
    console.log('获取通知列表完整API响应:', response.data.noticeList);
    // 处理嵌套的数据结构
    if (response.data?.code === 200 && Array.isArray(response.data.noticeList)) {
      // 返回内层的data数组
      return response.data.noticeList;
    }
    throw new Error(`无效响应结构: ${JSON.stringify(response.data)}`);
  } catch (error) {
    console.error('获取通知列表失败:', error);
    message.error('获取通知列表数据失败，请稍后重试');
    return []
  }
};

export const getNoticeDetail = async (noticeId:number):Promise<NoticeDetailInfo> => {
  try {
    // 使用baseRequestClient获取原始响应
    const response = await baseRequestClient.get(
      '/kit/FXvYJaHf79ed0b8eb23474987e8c56ffdd07128c5ff9888?uri=/notice/check/details'
      ,{
      params: {
        noticeId: noticeId  // 传递通知ID，使用参数而非固定值
      },
      }
    );
    // 打印完整响应结构用于调试
    // console.log('获取通知详情完整API响应:', response.data);
    // 处理嵌套的数据结构
    if (response.data?.code === 200) {
      // 返回内层的data数组
      return response.data;
    }
    throw new Error(`无效响应结构: ${JSON.stringify(response.data)}`);
  } catch (error) {
    console.error('获取通知详情失败:', error);
    message.error('获取通知详情数据失败，请稍后重试');
    throw error;
  }
};

export const oneClickRemind = async(noticeId:number)=>{
  try{
    const response = await baseRequestClient.post(
      '/kit/FXvYJaHf79ed0b8eb23474987e8c56ffdd07128c5ff9888/teacher/remind/notice?responseId=1698930',
      {
        params:{
          noticeId:noticeId
        }
      }
    )
    if (response.data?.code === 200) {
      // 返回内层的data数组
      message.success('一键提醒成功')
      console.log('一键提醒的通知ID:',noticeId)
    }

  }catch(error){
    console.log('一键提醒失败',error)
    message.error('一键提醒失败，请稍后重试')
  }
}
export const deleteNotice = async(noticeId:number)=>{
  try{
    const response = await baseRequestClient.post(
      '/kit/FXvYJaHf79ed0b8eb23474987e8c56ffdd07128c5ff9888/teacher/delete/notice?responseId=1698927',
      {
        params:{
          noticeId:noticeId
        }
      }
    )
    if (response.data?.code === 200) {
      // 返回内层的data数组
      message.success('通知删除成功')
      console.log('删除的通知ID:',noticeId)
    }

  }catch(error){
    console.log('通知删除失败',error)
    message.error('通知删除失败，请稍后重试')
  }
}
