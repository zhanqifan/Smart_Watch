// import { AxiosResponse } from '@/types/common';
import { TeamList, TrainType, addTeam, addTeamResponse } from '@/types/daliyManage';
import request from '@/utils/request';

// 查询训练队列表
export const getTeamList = () => {
  return request<TeamList[]>({
    method: 'GET',
    url: '/teacher/trainingTeam/list'
  });
};

// 查询训练类型
export const getTrainType = () => {
  return request<TrainType[]>({
    method: 'GET',
    url: '/teacher/exerciseType/list'
  });
};
// 新增训练
export const addTrainTest = (data: addTeam) => {
  return request<addTeamResponse>({
    url: '/teacher/trainingTask/add',
    method: 'POST',
    data
  });
};
// 查询训练任务
export const getTrainId = (taskId: string) => {
  return request<addTeamResponse>({
    url: `/teacher/trainingTask/taskBaseInfo/${taskId}`,
    method: 'GET'
  });
};

// 一键开始
export const startAtOneButton = (data: object) => {
  return request({
    url: '/teacher/trainingTask/detectionData',
    method: 'POST',
    data
  });
};

// 重置
export const resetWatch = (taskId: string) => {
  return request({
    url: `/teacher/trainingTask/reset/${taskId}`,
    method: 'GET'
  });
};
// 导出报告
export const exportReport = (taskId: string) => {
  return request({
    url: `/teacher/training/report/exportFullDetails/${taskId}`,
    method: 'POST'
  });
};
