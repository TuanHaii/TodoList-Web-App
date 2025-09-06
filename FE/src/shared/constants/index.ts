// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  USERS: {
    PROFILE: '/user/profile',
    UPDATE: '/user/update',
  },
  TASKS: {
    LIST: '/todos/user',
    CREATE: '/todos',
    SELECT: (id: string) => `/todos/${id}`,
    UPDATE: (id: string) => `/todos/${id}`,
    DELETE: (id: string) => `/todos/${id}`,
  },
} as const;

// App routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  NOT_FOUND: '/404',
} as const;

// Common constants
export const APP_CONFIG = {
  APP_NAME: 'TODO LIST',
  VERSION: '1.0.0',
  DESCRIPTION: '',
} as const;
