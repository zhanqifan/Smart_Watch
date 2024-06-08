import request from '@/utils/request';
import { AxiosResponse } from '@/types/common';

// 获取学生列表
// export const getStudentList = (params) => {
//   return request({
//     method: 'GET',
//     url: '/teacher/studentInfo/list',
//     params
//   });
// };
interface RootObject {
  createDept: null;
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime: string;
  tenantId: string;
  id: number;
  name: string;
  uuid: string;
}
// 学生列表数据mock
export const getStudentList = (): Promise<AxiosResponse<RootObject[]>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response: AxiosResponse<RootObject[]> = {
        code: '200',
        msg: 'success',
        data: [
          {
            createDept: null,
            createBy: 'user1',
            createTime: '2023-05-14T12:34:56',
            updateBy: 'user2',
            updateTime: '2023-06-15T14:20:30',
            tenantId: 'tenantA',
            id: 1,
            name: '姬咏霞',
            uuid: '550e8400-e29b-41d4-a716-446655440000'
          },
          {
            createDept: null,
            createBy: 'user3',
            createTime: '2023-04-10T09:15:20',
            updateBy: 'user4',
            updateTime: '2023-05-20T11:10:15',
            tenantId: 'tenantB',
            id: 2,
            name: '刑安光',
            uuid: '550e8400-e29b-41d4-a716-446655440001'
          },
          {
            createDept: null,
            createBy: 'user5',
            createTime: '2023-03-22T08:00:45',
            updateBy: 'user6',
            updateTime: '2023-04-25T10:30:05',
            tenantId: 'tenantC',
            id: 3,
            name: '郦爱固',
            uuid: '550e8400-e29b-41d4-a716-446655440002'
          },
          {
            createDept: null,
            createBy: 'user7',
            createTime: '2023-02-18T07:45:30',
            updateBy: 'user8',
            updateTime: '2023-03-22T09:20:50',
            tenantId: 'tenantD',
            id: 4,
            name: '宰育锦',
            uuid: '550e8400-e29b-41d4-a716-446655440003'
          },
          {
            createDept: null,
            createBy: 'user9',
            createTime: '2023-01-14T06:30:25',
            updateBy: 'user10',
            updateTime: '2023-02-18T08:15:35',
            tenantId: 'tenantE',
            id: 5,
            name: '欧阳端部 ',
            uuid: '550e8400-e29b-41d4-a716-446655440004'
          },
          {
            createDept: null,
            createBy: 'user9',
            createTime: '2023-01-14T06:30:25',
            updateBy: 'user10',
            updateTime: '2023-02-18T08:15:35',
            tenantId: 'tenantE',
            id: 5,
            name: '欧阳端部 ',
            uuid: '550e8400-e29b-41d4-a716-446655440004'
          },
          {
            createDept: null,
            createBy: 'user9',
            createTime: '2023-01-14T06:30:25',
            updateBy: 'user10',
            updateTime: '2023-02-18T08:15:35',
            tenantId: 'tenantE',
            id: 5,
            name: '欧阳端部 ',
            uuid: '550e8400-e29b-41d4-a716-446655440004'
          },
          {
            createDept: null,
            createBy: 'user9',
            createTime: '2023-01-14T06:30:25',
            updateBy: 'user10',
            updateTime: '2023-02-18T08:15:35',
            tenantId: 'tenantE',
            id: 5,
            name: '欧阳端部 ',
            uuid: '550e8400-e29b-41d4-a716-446655440004'
          }
        ],
        total: 100
      };
      resolve(response);
    }, 500); // 模拟请求延迟1秒钟
  });
};
