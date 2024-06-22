// 训练队列表 返回
export interface TeamList {
  createDept: string;
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime: string;
  tenantId: string;
  id: string;
  teamName: string;
}
// 训练队类型 返回
export interface TrainType {
  id: string;
  exerciseName: string;
  number: number;
  remarks: string;
}

// 新增训练 请求参数
export interface addTeam {
  trainingTeamId: string;
  trainingTeamName: string;
  exerciseTypeName: string;
  number: number;
  teacherName: string;
}

// 新增训练 返回
export interface addTeamResponse {
  createDept: number;
  createBy: number;
  createTime: string;
  updateBy: number;
  updateTime: string;
  tenantId: null;
  id: string;
  personNum: number;
  trainingTeamId: string;
  trainingTeamName: string;
  exerciseTypeName: string;
  number: number;
  teacherName: string;
  trainingTime: null;
  taskName: string;
  studentInfoList: studenList[];
  students: number[];
  trainingPeopleNumber: null;
}

interface studenList {
  bloodOxygen: number;
  bloodPressure: number;
  braceletId: number;
  heartRate: number;
  id: string;
  matchingSpeed: number;
  number: number;
  studentId: number;
  studentName: string;
  taskId: number;
  timestamp: Date;
  totalCalories: number;
  totalDistance: number;
  totalSteps: number;
}
