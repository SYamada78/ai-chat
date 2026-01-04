import { prisma } from '../lib/prisma';
import { claudeService } from './claude.service';
import { logger } from '../utils/logger';

export class ChatService {
  async createConversation(title?: string): Promise<string> {
    try {
      const conversation = await prisma.conversation.create({
        data: {
          title: title || 'New Conversation',
        },
      });

      logger.info('Created new conversation', { conversationId: conversation.id });
      return conversation.id;
    } catch (error) {
      logger.error('Error creating conversation', error);
      throw error;
    }
  }

  async sendMessage(conversationId: string, userMessage: string) {
    try {
      const conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
        include: {
          messages: {
            orderBy: { createdAt: 'asc' },
          },
        },
      });

      if (!conversation) {
        throw new Error('Conversation not found');
      }

      const savedUserMessage = await prisma.message.create({
        data: {
          conversationId,
          role: 'user',
          content: userMessage,
        },
      });

      const conversationHistory = conversation.messages.map((msg) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      }));

      const assistantResponse = await claudeService.sendMessage(
        userMessage,
        conversationHistory
      );

      const savedAssistantMessage = await prisma.message.create({
        data: {
          conversationId,
          role: 'assistant',
          content: assistantResponse,
        },
      });

      await prisma.conversation.update({
        where: { id: conversationId },
        data: { updatedAt: new Date() },
      });

      logger.info('Message exchange completed', {
        conversationId,
        userMessageId: savedUserMessage.id,
        assistantMessageId: savedAssistantMessage.id,
      });

      return {
        conversationId,
        userMessage: savedUserMessage,
        assistantMessage: savedAssistantMessage,
      };
    } catch (error) {
      logger.error('Error in chat service', error);
      throw error;
    }
  }

  async getConversations() {
    try {
      const conversations = await prisma.conversation.findMany({
        orderBy: { updatedAt: 'desc' },
        include: {
          _count: {
            select: { messages: true },
          },
        },
      });

      return conversations.map((conv) => ({
        id: conv.id,
        title: conv.title,
        createdAt: conv.createdAt,
        updatedAt: conv.updatedAt,
        messageCount: conv._count.messages,
      }));
    } catch (error) {
      logger.error('Error fetching conversations', error);
      throw error;
    }
  }

  async getConversationById(conversationId: string) {
    try {
      const conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
        include: {
          messages: {
            orderBy: { createdAt: 'asc' },
          },
        },
      });

      if (!conversation) {
        throw new Error('Conversation not found');
      }

      return {
        id: conversation.id,
        title: conversation.title,
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
        messages: conversation.messages.map((msg) => ({
          id: msg.id,
          content: msg.content,
          role: msg.role,
          createdAt: msg.createdAt,
        })),
      };
    } catch (error) {
      logger.error('Error fetching conversation', error);
      throw error;
    }
  }

  async deleteConversation(conversationId: string) {
    try {
      await prisma.message.deleteMany({
        where: { conversationId },
      });

      await prisma.conversation.delete({
        where: { id: conversationId },
      });

      logger.info('Deleted conversation', { conversationId });
    } catch (error) {
      logger.error('Error deleting conversation', error);
      throw error;
    }
  }
}

export const chatService = new ChatService();
