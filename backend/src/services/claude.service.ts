import Anthropic from '@anthropic-ai/sdk';
import { logger } from '../utils/logger';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export class ClaudeService {
  private model = 'claude-3-5-sonnet-20241022';
  private maxTokens = 1024;

  async sendMessage(
    userMessage: string,
    conversationHistory: Message[] = []
  ): Promise<string> {
    try {
      logger.info('Sending message to Claude API', {
        messageLength: userMessage.length,
        historyLength: conversationHistory.length,
      });

      const messages: Anthropic.MessageParam[] = [
        ...conversationHistory.map((msg) => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
        {
          role: 'user' as const,
          content: userMessage,
        },
      ];

      const response = await anthropic.messages.create({
        model: this.model,
        max_tokens: this.maxTokens,
        messages,
      });

      if (response.content[0].type === 'text') {
        const assistantMessage = response.content[0].text;
        logger.info('Received response from Claude API', {
          responseLength: assistantMessage.length,
        });
        return assistantMessage;
      }

      throw new Error('Unexpected response format from Claude API');
    } catch (error) {
      logger.error('Error sending message to Claude API', error);
      throw error;
    }
  }
}

export const claudeService = new ClaudeService();
