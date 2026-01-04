import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import dotenv from 'dotenv';
import healthRoutes from './routes/health';
import chatRoutes from './routes/chat';
import conversationsRoutes from './routes/conversations';
import { errorHandler } from './middlewares/error';
import { logger } from './utils/logger';

dotenv.config();

const app = new Hono();

// CORS設定
app.use('/*', cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

// ルートエンドポイント
app.get('/', (c) => {
  return c.json({
    message: 'AI Chat Backend API',
    version: '1.0.0',
  });
});

// API ルート
app.route('/api/health', healthRoutes);
app.route('/api/chat', chatRoutes);
app.route('/api/conversations', conversationsRoutes);

// エラーハンドリング
app.onError(errorHandler);

const port = Number(process.env.PORT) || 3001;

logger.info(`Server is starting on port ${port}`);

serve({
  fetch: app.fetch,
  port
});
