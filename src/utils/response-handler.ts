import { CommonResponse } from '../common/types';

export class ResponseHandler {
  public static success<T = any>(
    data: T,
    message: string,
    status: number,
  ): CommonResponse<T> {
    return {
      data,
      error: [],
      message,
      status,
    };
  }

  public static error(
    error: string | any,
    message: string,
    status: number,
  ): CommonResponse<string> {
    return {
      data: [],
      error,
      message,
      status,
    };
  }
}
