import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import dotenv from 'dotenv';

dotenv.config();

const app = new Hono();

// CORS設定
app.use('/*', cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

// ヘルスチェック
app.get('/api/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// ルートエンドポイント
app.get('/', (c) => {
  return c.json({
    message: 'AI Chat Backend API',
    version: '1.0.0',
  });
});

const port = Number(process.env.PORT) || 3001;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});
