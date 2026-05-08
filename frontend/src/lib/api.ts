import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

/**
 * SIH 25199 - API Configuration
 * Release Target: May 18
 * Enterprise-grade Axios instance for backend synchronization.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/**
 * Request Interceptor
 * Injects JWT from local storage into headers for authenticated routes.
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handles global error states and session expiration for project SIH 25199.
 */
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Global logout logic on unauthorized response
          if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken');
            localStorage.removeItem('authUser');
            // Prevent infinite loop if we are already on login
            if (!window.location.pathname.includes('/login')) {
              window.location.href = '/login?reason=expired';
            }
          }
          break;
        case 403:
          console.error('[SIH-25199] Access Forbidden: Insufficient Permissions');
          break;
        case 500:
          console.error('[SIH-25199] Internal Server Error: Contact DevOps');
          break;
        default:
          break;
      }
    }

    return Promise.reject(error);
  }
);

export default api;