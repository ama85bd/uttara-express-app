export interface IResponseBase<T extends object> {
    status: boolean;
    message: string;
    data: T;
  }