import axios, {AxiosInstance, InternalAxiosRequestConfig, AxiosError} from 'axios';
import {BACKEND_URL, REQUEST_TIMEOUT, StatusCodes} from '../const';
import {getToken} from './token';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['X-Token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response, // Если всё хорошо, просто возвращаем ответ
    (error: AxiosError<{error: string}>) => {
      // Проверяем, есть ли ответ от сервера и статус 401
      if (error.response?.status === StatusCodes.UNAUTHORIZED){
        // Axios (через перехватчик) получает ошибку от сервера.
        // Перехватчик делает throw error (пробрасывает её дальше)
        // Ошибка «прилетает» экшен, например в checkAuthAction.
        // Там срабатывает блок catch
      }

      throw error;
    }
  );

  return api;
};

