import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  console.info(`[request] [${JSON.stringify(config)}]`);
  return config;
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.info(`[response] [${JSON.stringify(response.data)}]`);
  console.info(response.status)
  return response;
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
}

export function addLogger(axiosInstance: AxiosInstance, log: boolean): AxiosInstance {
  if (log) {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
  }
  return axiosInstance;
}

export const validateRequestStatusCode = (status: number) => {
  return status < 300;
}

//InternalAxiosRequestConfig