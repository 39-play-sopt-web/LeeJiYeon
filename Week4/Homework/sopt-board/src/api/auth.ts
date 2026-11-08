import { instance } from './instance';
import type { ApiResponse } from '../types/common';
import type { AuthorizationCodeRequest, AuthorizationCodeResponse } from '../types/auth';

export const issueAuthorizationCode = async (body: AuthorizationCodeRequest) => {
  const { data } = await instance.post<ApiResponse<AuthorizationCodeResponse>>(
    '/api/v1/members/authorization-code',
    body,
  );
  return data.data;
};