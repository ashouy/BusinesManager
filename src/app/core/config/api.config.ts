/**
 * API Configuration
 * Centralized API base URL and endpoint configuration
 */

// Get API URL from environment or default to localhost:8080
const API_BASE_URL = typeof window !== 'undefined' && (window as any).__API_BASE_URL__
  ? (window as any).__API_BASE_URL__
  : 'http://localhost:8080';

export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  auth: {
    login: `${API_BASE_URL}/api/auth/login`,
    refresh: `${API_BASE_URL}/api/auth/refresh`,
    logout: `${API_BASE_URL}/api/auth/logout`,
  },
} as const;
