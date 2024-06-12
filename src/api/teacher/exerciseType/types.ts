export interface ExerciseTypeVO {
  /**
   * 唯一标识
   */
  id: string | number;

  /**
   * 运动名称
   */
  exerciseName: string;

  /**
   * 组数
   */
  number: number;

  /**
   * 备注
   */
  remarks: string;

  /**
   * 租户号
   */
  tenantId: string | number;
}

export interface ExerciseTypeForm extends BaseEntity {
  /**
   * 唯一标识
   */
  id?: string | number;

  /**
   * 运动名称
   */
  exerciseName?: string;

  /**
   * 组数
   */
  number?: number;

  /**
   * 备注
   */
  remarks?: string;

  /**
   * 租户号
   */
  tenantId?: string | number;
}

export interface ExerciseTypeQuery extends PageQuery {
  /**
   * 运动名称
   */
  exerciseName?: string;

  /**
   * 组数
   */
  number?: number;

  /**
   * 备注
   */
  remarks?: string;

  /**
   * 租户号
   */
  tenantId?: string | number;

  /**
   * 日期范围参数
   */
  params?: any;
}
