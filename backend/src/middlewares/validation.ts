import { Context, Next } from 'hono';
import { errorResponse } from '../utils/response';

export const validateChatRequest = async (c: Context, next: Next) => {
  try {
    const body = await c.req.json();

    if (!body.message || typeof body.message !== 'string') {
      return errorResponse(
        c,
        'Message is required and must be a string',
        400,
        'VALIDATION_ERROR'
      );
    }

    if (body.message.trim().length === 0) {
      return errorResponse(c, 'Message cannot be empty', 400, 'VALIDATION_ERROR');
    }

    if (body.conversationId && typeof body.conversationId !== 'string') {
      return errorResponse(
        c,
        'ConversationId must be a string',
        400,
        'VALIDATION_ERROR'
      );
    }

    await next();
  } catch (error) {
    return errorResponse(c, 'Invalid request body', 400, 'VALIDATION_ERROR');
  }
};
