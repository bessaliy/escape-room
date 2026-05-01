import axios from 'axios';
import {API_CONFIG, TOKEN_KEY} from '../const.ts';

export const createAPI = () => {
  const api = axios.create({
    baseURL: API_CONFIG.BaseUrl,
    timeout: API_CONFIG.RequestTimeout,
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }

    return config;
  });

  return api;
};


