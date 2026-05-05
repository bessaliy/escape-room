import axios from 'axios';
import {API_CONFIG, TOKEN_KEY_STORAGE, TOKEN_KEY_SERVER} from '../const.ts';

export const createAPI = () => {
  const api = axios.create({
    baseURL: API_CONFIG.BaseUrl,
    timeout: API_CONFIG.RequestTimeout,
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY_STORAGE);
    if (token && config.headers) {
      config.headers[TOKEN_KEY_SERVER] = token;
    }

    return config;
  });

  return api;
};


