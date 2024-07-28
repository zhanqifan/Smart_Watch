export interface TrainingTeamVO {
  /**
   * 唯一标识
   */
  id: string | number;

  /**
   * 训练队名
   */
  teamName: string;
}

export interface TrainingTeamForm extends BaseEntity {
  /**
   * 唯一标识
   */
  id?: string | number;

  /**
   * 训练队名
   */
  teamName?: string;
}

export interface TrainingTeamQuery extends PageQuery {
  /**
   * 训练队名
   */
  teamName?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}

export interface StudentParams {
  /**
   * 训练队Id
   */
  trainingTeamId: string | number;
  /**
   * 学生Id
   */
  studentId: string[];
}
