export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

export interface ChatRequest {
  message: string;
  conversationId?: string;
}

export interface ChatResponse {
  conversationId: string;
  message: {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    createdAt: Date;
  };
}

export interface ConversationListResponse {
  conversations: Array<{
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    messageCount: number;
  }>;
  total: number;
}

export interface ConversationDetailResponse {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Array<{
    id: string;
    content: string;
    role: 'user' | 'assistant';
    createdAt: Date;
  }>;
}

export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy';
  database: boolean;
  timestamp: string;
}
