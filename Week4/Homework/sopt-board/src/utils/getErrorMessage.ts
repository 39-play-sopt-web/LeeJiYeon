import { isAxiosError } from 'axios';
import type { ApiResponse } from '../types/common';

export const getErrorMessage = (error: unknown, fallback = '요청에 실패했어요.') => {
  if (isAxiosError<ApiResponse<null>>(error)) {
    return error.response?.data?.message ?? fallback;
  }
  return fallback;
};