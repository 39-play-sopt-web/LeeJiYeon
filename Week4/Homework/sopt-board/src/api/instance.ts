import axios from 'axios';
import { storage } from '../utils/storage';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const authCode = storage.getAuthCode();

  if (authCode) {
    config.headers.Authorization = authCode;
  }

  return config;
});