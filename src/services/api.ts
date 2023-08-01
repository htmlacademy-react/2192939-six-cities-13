import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getToken } from './token';
import { APIRoute } from '../settings';

const BASE_URL = 'https://13.design.pages.academy/six-cities';
const TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }
    return config;
  });

  return api;
};
