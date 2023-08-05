import { CommonResponse } from '../common/types';

export type CreateUserResponse = Promise<CommonResponse<{ email: string }>>;
