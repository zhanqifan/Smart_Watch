// 日常基础数据
export interface DataRusult {
  trainingTeamName: string; //训练队名称
  trainingTeamId: number; //训练队ID
  trainingPeopleNumber: number; //训练队人数
  braceletOnlineNumber: number; //手环在线人数
  averageHeartRate: number; //平均心率
  averageBloodOxygen: number; //平均血氧
  averageSpeed: number; //平均配速
  maxHeartRate: number; //最高心率
  maxBloodOxygen: number; //最高血氧
  maxSpeed: number; //最高配速
  minHeartRate: number; //最低心率
  minBloodOxygen: number; //最低血氧
  minSpeed: number; //最低配速
}

// 折线图数据
export interface LineData {
  bloodOxygenDataToDay: BloodOxygenDataToDay; //当日血氧数据
  heartRateDataToDay: HeartRateDataToDay; //当日心率数据
  bloodOxygenDataToRealTime: BloodOxygenDataToDay; //实时血氧数据
  heartRateDataToRealTime: HeartRateDataToDay; //实时心率数据
}

interface HeartRateDataToDay {
  maxHeartRate: number[];
  avgHeartRate: number[];
  minHeartRate: number[];
  statisticalTime: string;
}

interface BloodOxygenDataToDay {
  maxBloodOxygen: number[];
  avgBloodOxygen: number[];
  minBloodOxygen: number[];
  statisticalTime: string;
}
