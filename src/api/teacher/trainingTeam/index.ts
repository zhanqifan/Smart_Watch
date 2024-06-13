import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { TrainingTeamVO, TrainingTeamForm, TrainingTeamQuery } from '@/api/teacher/trainingTeam/types';

/**
 * 查询训练队列表
 * @param query
 * @returns {*}
 */

export const listTrainingTeam = (query?: TrainingTeamQuery): AxiosPromise<TrainingTeamVO[]> => {
  return request({
    url: '/teacher/trainingTeam/page',
    method: 'get',
    params: query
  });
};

/**
 * 查询训练队详细
 * @param id
 */
export const getTrainingTeam = (id: string | number): AxiosPromise<TrainingTeamVO> => {
  return request({
    url: '/teacher/trainingTeam/' + id,
    method: 'get'
  });
};

/**
 * 新增训练队
 * @param data
 */
export const addTrainingTeam = (data: TrainingTeamForm) => {
  return request({
    url: '/teacher/trainingTeam/add',
    method: 'post',
    data: data
  });
};

/**
 * 修改训练队
 * @param data
 */
export const updateTrainingTeam = (data: TrainingTeamForm) => {
  return request({
    url: '/teacher/trainingTeam/update',
    method: 'post',
    data: data
  });
};

/**
 * 删除训练队
 * @param id
 */
export const delTrainingTeam = (id: string | number | Array<string | number>) => {
  return request({
    url: '/teacher/trainingTeam/delete/' + id,
    method: 'delete'
  });
};
