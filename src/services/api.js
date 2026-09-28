import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach auth token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('idToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Unwrap errors into clean messages
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('idToken');
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    const message =
      error.response?.data?.message || error.message || 'Unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

export default api;