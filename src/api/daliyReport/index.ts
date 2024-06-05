import { dataDetail } from '@/types/daliyReport';
import request from '@/utils/request';
// 分页查询训练报告列表
export const getDaliyReport = () => {
  return request({
    method: 'GET',
    url: '/teacher/training/report/page'
  });
};
// 查询训练报告明细
export const getReportDetail = (taskId: any) => {
  return request<dataDetail[]>({
    method: 'GET',
    url: `/teacher/training/report/fullDetails/${taskId}`
  });
};
