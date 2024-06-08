export interface StudentInfoVO {
  /**
   * 
   */
  id: string | number;

  /**
   * 
   */
  name: string;

  /**
   * 
   */
  uuid: string | number;

  /**
   * 
   */
  studentNumber: number;

}

export interface StudentInfoForm extends BaseEntity {
  /**
   * 
   */
  id?: string | number;

  /**
   * 
   */
  name?: string;

  /**
   * 
   */
  uuid?: string | number;

  /**
   * 
   */
  studentNumber?: number;

}

export interface StudentInfoQuery extends PageQuery {

  /**
   * 
   */
  name?: string;

  /**
   * 
   */
  uuid?: string | number;

  /**
   * 
   */
  studentNumber?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



