import { AxiosResponse } from '@/types/common';
import request from '@/utils/request';

export const getUserInfo = () => {
  return request({
    url: '/teacher/info',
    method: 'GET'
  });
};
