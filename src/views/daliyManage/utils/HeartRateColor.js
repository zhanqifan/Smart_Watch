// 心率颜色变化
export const getHeartRateColor = (heartRate) => {
  if (heartRate >= 40 && heartRate <= 150) {
    return 'green'; // 绿色
  } else if (heartRate > 150 && heartRate <= 180) {
    return 'yellow'; // 黄色
  } else if (heartRate > 180) {
    return 'red'; // 红色
  } else if (heartRate <= 40 || heartRate >= 200) {
    return 'purple'; // 紫色
  } else {
    return ''; // 默认样式
  }
};

// 电池块显示
export const findInterval = (num) => {
  const intervalSize = 100 / 5;
  const interval = Math.floor(num / intervalSize);
  return interval === 5 ? interval : interval + 1;
};
// 电量颜色计算
export const getBatteryColor = (num) => {
  const interval = findInterval(num);
  if (interval >= 0 && interval <= 1) {
    return '#FE5F69';
  } else if (interval > 1 && interval <= 4) {
    return '#FFC95C';
  } else {
    return '#64BA8C';
  }
};
