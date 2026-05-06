import axios, {AxiosInstance, InternalAxiosRequestConfig, AxiosError} from 'axios';
import {BACKEND_URL, REQUEST_TIMEOUT, StatusCode} from '../const';
import {getToken} from './token';
import {processErrorHandle} from './process-error-handle';
import {ErrorResponseData} from '../types/error';

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
    (response) => response,
    (error: AxiosError<ErrorResponseData>) => {
      if (error.response) {
        const status = error.response.status as StatusCode;
        const {data} = error.response;
        const shouldShowError = (
          status === StatusCode.BadRequest ||
          status === StatusCode.Conflict ||
          (status !== StatusCode.Unauthorized && status !== StatusCode.NotFound)
        );
        if (shouldShowError && data) {
          processErrorHandle(data.message);
        }
      }

      throw error;
    }
  );

  return api;
};

