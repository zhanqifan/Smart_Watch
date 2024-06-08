export interface dataDetail {
  trainingName: string;
  trainingType: string;
  teacherName: string;
  trainingDate: string;
  personNum: number;
  fullDetailsReportVoList: FullDetailsReportVoList[];
}

export interface FullDetailsReportVoList {
  studentName: string;
  averageHeartRate: number;
  averagePace: number;
  averageBloodOxygen: number;
  maxHeartRate: number;
  maxPace: number;
  maxBloodOxygen: number;
  minHeartRate: number;
}
