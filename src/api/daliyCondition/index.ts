import { AxiosResponse } from '@/types/common';
import { DataRusult } from '@/types/daliyCondition';
import { LineData } from '@/types/daliyCondition';
// import service from '@/utils/request';
export const getDaily = (): Promise<AxiosResponse<DataRusult>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response: AxiosResponse<DataRusult> = {
        code: '200',
        msg: 'success',
        data: {
          trainingTeamName: 'Team A', //训练队名称
          trainingTeamId: 123, //训练队ID
          trainingPeopleNumber: 20, //训练队人数
          braceletOnlineNumber: 15, //手环在线人数
          averageHeartRate: 80, //平均心率
          averageBloodOxygen: 95, //平均血氧
          averageSpeed: 5, //平均配速
          maxHeartRate: 120, //最高心率
          maxBloodOxygen: 98, //最高血氧
          maxSpeed: 10, //最高配速
          minHeartRate: 60, //最小心率
          minBloodOxygen: 92, //最小血样
          minSpeed: 3 //最小配速
        },
        total: 100
      };
      resolve(response);
    }, 500); // 模拟请求延迟1秒钟
  });
};

// type lineType = {
//   trainingTeamId: string;
//   startTime: string;
//   endTime: string;
// };

// export const getLine = (data: lineType) => {
//   return service({
//     url: '/teacher/dailyData/line',
//     method: 'POST',
//     data
//   });
// };
export const getLineData = (): Promise<AxiosResponse<LineData>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response: AxiosResponse<LineData> = {
        code: '200',
        msg: 'success',
        data: {
          bloodOxygenDataToDay: {
            maxBloodOxygen: [10, 29, 34, 33, 52, 45, 38], // 数组长度为7
            avgBloodOxygen: [20, 25, 28, 27, 22, 24, 26], // 数组长度为7
            minBloodOxygen: [30, 27, 24, 22, 28, 26, 29], // 数组长度为7
            statisticalTime: 'string'
          },
          heartRateDataToDay: {
            maxHeartRate: [30, 32, 31, 29, 34, 33, 35], // 数组长度为7
            avgHeartRate: [20, 21, 22, 23, 24, 25, 26], // 数组长度为7
            minHeartRate: [10, 12, 11, 9, 13, 14, 15], // 数组长度为7
            statisticalTime: 'string'
          },
          bloodOxygenDataToRealTime: {
            maxBloodOxygen: [10, 15, 12, 14, 16, 17, 18], // 数组长度为7
            avgBloodOxygen: [20, 18, 19, 21, 22, 20, 23], // 数组长度为7
            minBloodOxygen: [30, 28, 26, 27, 29, 31, 32], // 数组长度为7
            statisticalTime: 'string'
          },
          heartRateDataToRealTime: {
            maxHeartRate: [30, 31, 29, 33, 34, 32, 35], // 数组长度为7
            avgHeartRate: [20, 22, 21, 23, 24, 25, 26], // 数组长度为7
            minHeartRate: [10, 11, 9, 13, 14, 12, 15], // 数组长度为7
            statisticalTime: 'string'
          }
        },
        total: 100
      };
      resolve(response);
    }, 1000); // 模拟请求延迟1秒钟
  });
};
