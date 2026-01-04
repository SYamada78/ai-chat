import { Hono } from 'hono';
import { chatService } from '../services/chat.service';
import { successResponse, errorResponse } from '../utils/response';
import { validateChatRequest } from '../middlewares/validation';
import { ChatRequest, ChatResponse } from '../types';

const chat = new Hono();

chat.post('/', validateChatRequest, async (c) => {
  try {
    const body: ChatRequest = await c.req.json();
    const { message, conversationId } = body;

    let activeConversationId = conversationId;

    if (!activeConversationId) {
      activeConversationId = await chatService.createConversation();
    }

    const result = await chatService.sendMessage(activeConversationId, message);

    const response: ChatResponse = {
      conversationId: result.conversationId,
      message: {
        id: result.assistantMessage.id,
        content: result.assistantMessage.content,
        role: result.assistantMessage.role as 'assistant',
        createdAt: result.assistantMessage.createdAt,
      },
    };

    return successResponse(c, response);
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse(c, error.message, 500, 'CHAT_ERROR');
    }
    return errorResponse(c, 'An unexpected error occurred', 500, 'CHAT_ERROR');
  }
});

export default chat;
