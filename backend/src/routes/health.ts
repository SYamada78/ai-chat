import { Hono } from 'hono';
import { prisma } from '../lib/prisma';
import { successResponse, errorResponse } from '../utils/response';
import { HealthCheckResponse } from '../types';

const health = new Hono();

health.get('/', async (c) => {
  try {
    await prisma.$connect();
    const isDatabaseConnected = true;

    const response: HealthCheckResponse = {
      status: 'healthy',
      database: isDatabaseConnected,
      timestamp: new Date().toISOString(),
    };

    return successResponse(c, response);
  } catch (error) {
    const response: HealthCheckResponse = {
      status: 'unhealthy',
      database: false,
      timestamp: new Date().toISOString(),
    };

    return errorResponse(c, 'Health check failed', 503, 'HEALTH_CHECK_FAILED', response);
  }
});

export default health;
