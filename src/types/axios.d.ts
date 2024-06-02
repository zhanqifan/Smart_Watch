import axios from 'axios';

declare module 'axios' {
  export interface AxiosResponse<T = any> {
    code: string;
    msg: string;
    data: T;
    total?: number; // 为了兼容可能没有 total 属性的情况，将其声明为可选属性
  }
}
