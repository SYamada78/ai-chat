import { Context } from 'hono';
import { ApiResponse, ApiError } from '../types';

export const successResponse = <T>(c: Context, data: T, status: number = 200): Response => {
  const response: ApiResponse<T> = {
    success: true,
    data,
  };
  return c.json(response, status as any);
};

export const errorResponse = (
  c: Context,
  message: string,
  status: number = 500,
  code?: string,
  details?: any
): Response => {
  const error: ApiError = {
    message,
    code,
    details,
  };

  const response: ApiResponse = {
    success: false,
    error,
  };

  return c.json(response, status as any);
};
