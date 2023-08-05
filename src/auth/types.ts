import { CommonResponse } from '../common/types';

export interface LoginResponseData {
  token: string;
  email: string;
}
export type LoginResponseModel = Promise<CommonResponse<LoginResponseData>>;
