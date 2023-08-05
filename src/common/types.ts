export interface CommonResponse<T = any> {
  status: number;
  message: string;
  data: T | [];
  error: T | [];
}

export interface JwtPayload {
  email: string;
  uuid: string;
}
