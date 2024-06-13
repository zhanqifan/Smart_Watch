import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ExerciseTypeVO, ExerciseTypeForm, ExerciseTypeQuery } from '@/api/teacher/exerciseType/types';

/**
 * 查询运动类型列表
 * @param query
 * @returns {*}
 */

export const listExerciseType = (query?: ExerciseTypeQuery): AxiosPromise<ExerciseTypeVO[]> => {
  return request({
    url: '/teacher/exerciseType/page',
    method: 'get',
    params: query
  });
};

/**
 * 查询运动类型详细
 * @param id
 */
export const getExerciseType = (id: string | number): AxiosPromise<ExerciseTypeVO> => {
  return request({
    url: '/teacher/exerciseType/' + id,
    method: 'get'
  });
};

/**
 * 新增运动类型
 * @param data
 */
export const addExerciseType = (data: ExerciseTypeForm) => {
  return request({
    url: '/teacher/exerciseType/add',
    method: 'post',
    data: data
  });
};

/**
 * 修改运动类型
 * @param data
 */
export const updateExerciseType = (data: ExerciseTypeForm) => {
  return request({
    url: '/teacher/exerciseType/update',
    method: 'put',
    data: data
  });
};

/**
 * 删除运动类型
 * @param idList
 */
export const delExerciseType = (idList: string | number | Array<string | number>) => {
  return request({
    url: '/teacher/exerciseType/delete',
    method: 'delete',
    params: {
      idList
    }
  });
};
