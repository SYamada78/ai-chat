import { Context } from 'hono';
import { logger } from '../utils/logger';
import { errorResponse } from '../utils/response';

export const errorHandler = async (err: Error, c: Context) => {
  logger.error('Error occurred', {
    message: err.message,
    stack: err.stack,
    path: c.req.path,
    method: c.req.method,
  });

  if (err.message.includes('not found')) {
    return errorResponse(c, err.message, 404, 'NOT_FOUND');
  }

  if (err.message.includes('validation')) {
    return errorResponse(c, err.message, 400, 'VALIDATION_ERROR');
  }

  return errorResponse(c, 'Internal server error', 500, 'INTERNAL_ERROR');
};
