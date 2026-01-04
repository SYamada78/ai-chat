import { Hono } from 'hono';
import { chatService } from '../services/chat.service';
import { successResponse, errorResponse } from '../utils/response';
import { ConversationListResponse, ConversationDetailResponse } from '../types';

const conversations = new Hono();

conversations.get('/', async (c) => {
  try {
    const conversationList = await chatService.getConversations();

    const response: ConversationListResponse = {
      conversations: conversationList.map(conv => ({
        ...conv,
        title: conv.title || 'Untitled Conversation',
      })),
      total: conversationList.length,
    };

    return successResponse(c, response);
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse(c, error.message, 500, 'FETCH_ERROR');
    }
    return errorResponse(c, 'Failed to fetch conversations', 500, 'FETCH_ERROR');
  }
});

conversations.get('/:id', async (c) => {
  try {
    const conversationId = c.req.param('id');
    const conversation = await chatService.getConversationById(conversationId);

    const response: ConversationDetailResponse = {
      id: conversation.id,
      title: conversation.title || 'Untitled Conversation',
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt,
      messages: conversation.messages.map(msg => ({
        ...msg,
        role: msg.role as 'user' | 'assistant',
      })),
    };

    return successResponse(c, response);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('not found')) {
        return errorResponse(c, 'Conversation not found', 404, 'NOT_FOUND');
      }
      return errorResponse(c, error.message, 500, 'FETCH_ERROR');
    }
    return errorResponse(c, 'Failed to fetch conversation', 500, 'FETCH_ERROR');
  }
});

conversations.delete('/:id', async (c) => {
  try {
    const conversationId = c.req.param('id');
    await chatService.deleteConversation(conversationId);

    return successResponse(c, { message: 'Conversation deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse(c, error.message, 500, 'DELETE_ERROR');
    }
    return errorResponse(c, 'Failed to delete conversation', 500, 'DELETE_ERROR');
  }
});

export default conversations;
