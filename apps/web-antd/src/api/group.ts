//用户相关API函数

import type { ClassGroupInfo,GradeStructureInfo,ClassStructureInfo,createGroupDataInfo} from '#/types/api/group.d';
import { requestClient,baseRequestClient } from '#/api/request';
// 引入 Ant Design Vue 的消息提示组件

import { message } from 'ant-design-vue';
// export const getClassGroupList = async () => 
//   try {
//     const response = await requestClient.get(
//       '/kit/FXvYJaHf79ed0b8eb23474987e8c56ffdd07128c5ff9888?uri=/group/check/list/class'
//     );
    
//     // 检查响应结构
//      if (response.data?.code === 200 && Array.isArray(response.data.data)) {
//       console.log('完整响应:', JSON.stringify(response, null, 2));
//       return response.data; // 返回实际数据数组
//     }
    
//     // 如果结构不符合预期，手动抛出错误
//     throw new Error('结构不符合预期')
    
//   } catch (error) {
//     console.error('获取班级列表失败:', error);
//     message.error('获取班级数据失败，请稍后重试');
//     return [];
//   }
// };

//


export const getClassGroupList = async () => {
  try {
    // 使用baseRequestClient获取原始响应
    const response = await baseRequestClient.get(
      '/kit/FXvYJaHf79ed0b8eb23474987e8c56ffdd07128c5ff9888?uri=/group/check/list/class'
    );
    
    // 打印完整响应结构用于调试
    // console.log('完整API响应:', response.data.data);
    
    // 处理嵌套的数据结构
    if (response.data?.code === 0 && Array.isArray(response.data.data)) {
      // 返回内层的data数组
      return response.data.data;
    }
    
    throw new Error(`无效响应结构: ${JSON.stringify(response.data)}`);
  } catch (error) {
    console.error('获取班级列表失败:', error);
    message.error('获取班级列表数据失败，请稍后重试');
    return [];
  }
};
export const getPositionGroupList = async () => {
  try {
    // 使用baseRequestClient获取原始响应
    const response = await baseRequestClient.get(
      '/kit/FXvYJaHf79ed0b8eb23474987e8c56ffdd07128c5ff9888?uri=/group/check/list/position'
    );
    
    // 打印完整响应结构用于调试
    // console.log('完整API响应:', response.data.data);
    
    // 处理嵌套的数据结构
    if (response.data?.code === 0 && Array.isArray(response.data.data)) {
      // 返回内层的data数组
      return response.data.data;
    }
    
    throw new Error(`无效响应结构: ${JSON.stringify(response.data)}`);
  } catch (error) {
    console.error('获取职位列表失败:', error);
    message.error('获取职位列表数据失败，请稍后重试');
    return [];
  }
};
export const getPersonGroupList = async () => {
  try {
    // 使用baseRequestClient获取原始响应
    const response = await baseRequestClient.get(
      '/kit/FXvYJaHf79ed0b8eb23474987e8c56ffdd07128c5ff9888?uri=/group/check/list/personal'
    );
    
    // 打印完整响应结构用于调试
    // console.log('完整API响应:', response.data.data);
    
    // 处理嵌套的数据结构
    if (response.data?.code === 0 && Array.isArray(response.data.data)) {
      // 返回内层的data数组
      return response.data.data;
    }
    
    throw new Error(`无效响应结构: ${JSON.stringify(response.data)}`);
  } catch (error) {
    console.error('获取个人列表失败:', error);
    message.error('获取个人列表数据失败，请稍后重试');
    return [];
  }
};


export const getGradeStructure = async ():Promise<GradeStructureInfo[]> => {
  try {
    // 使用baseRequestClient获取原始响应
    const response = await baseRequestClient.get(
      '/kit/FXvYJaHf79ed0b8eb23474987e8c56ffdd07128c5ff9888?uri=/group/check/grade-structure'
    );
    
    // 打印完整响应结构用于调试
    console.log('完整API响应:', response.data.data);
    
    // 处理嵌套的数据结构
    if (response.data?.code === 200 && Array.isArray(response.data.data)) {
      // 返回内层的data数组
      return response.data.data;
    }
    
    throw new Error(`无效响应结构: ${JSON.stringify(response.data)}`);
  } catch (error) {
    console.error('获取年级-专业-班级分层结构失败:', error);
    message.error('获取年级-专业-班级分层结构数据失败，请稍后重试');
    return [];
  }
};
export const getClassStructure = async (classId:number):Promise<ClassStructureInfo[]> => {
  try {
    // 使用baseRequestClient获取原始响应
    const response = await baseRequestClient.get(
      '/kit/FXvYJaHf79ed0b8eb23474987e8c56ffdd07128c5ff9888?uri=/group/check/class/details',
      {
        params:{
          classId:classId
        }
      }
    );
    // 打印完整响应结构用于调试
    console.log('获取班级-学生分层结构:', response.data.data);
    
    // 处理嵌套的数据结构
    if (response.data?.code === 200 && Array.isArray(response.data.data)) {
      // 返回内层的data数组
      return response.data.data;
    }
    
    throw new Error(`无效响应结构: ${JSON.stringify(response.data)}`);
  } catch (error) {
    console.error('获取班级-学生分层结构失败:', error);
    message.error('获取班级-学生分层结构数据失败，请稍后重试');
    return [];
  }
};


export const getOldGroupData = async ():Promise<createGroupDataInfo> => {
  try {
    // 使用baseRequestClient获取原始响应
    const response = await baseRequestClient.get(
      '/kit/FXvYJaHf79ed0b8eb23474987e8c56ffdd07128c5ff9888?uri=/group/check/detail'
    );
    // 打印完整响应结构用于调试
    console.log('获取单个旧群组信息:', response.data.data);
    
    // 处理嵌套的数据结构
    if (response.data?.code === 200) {
      // 返回内层的data数组
      return response.data.data;
    }
    
    throw new Error(`无效响应结构: ${JSON.stringify(response.data)}`);
  } catch (error) {
    console.error('获取单个旧群组信息失败:', error);
    message.error('获取单个旧群组信息失败，请稍后重试');
    throw new Error(`error`);
  }
};
