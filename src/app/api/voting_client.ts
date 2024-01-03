import {Environment} from "./config";
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import {addLogger, validateRequestStatusCode} from "./axios_helper";
import {Authenticator} from "./ip_client";
import { MeResponse, UsersResponse } from './models';

export class ApiClient {
  /*
       client that requires a token
   */
  apiClient = addLogger(
    axios.create({
      validateStatus: validateRequestStatusCode,
      baseURL: this.env.apiBaseURL,
      headers: {"Content-Type": "application/json"},
    }),
    this.shouldLog
  );

  constructor(
    private env: Environment,
    private authenticator: Authenticator,
    private shouldLog: boolean
  ) {
    // set auth header
    this.apiClient.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        authenticator.addAuthHeader(config);
        return config;
      }
    );

    // refresh token on expired
    this.apiClient.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const originalRequest = error.config;
        let token = this.authenticator.getToken();
        if (error.response.status === 401 && !originalRequest._retry && token) {
          originalRequest._retry = true;
          return this.authenticator
            .refreshToken(token.refreshToken)
            .then((response) => {
              authenticator.addAuthHeader(originalRequest);
              return axios(originalRequest);
            });
        }

        return Promise.reject(error);
      }
    );
  }

  /*
        me

        get the user behind the token
    */
  async me(): Promise<MeResponse> {
    return await this.apiClient.get("/admin/me").then((response) => {

      console.log(response.data)
      return response.data;
    });
  }

  /*
        users

        get the users that registered with the app (NOTE: != admin users)
    */
  async users(): Promise<UsersResponse> {
    return await this.apiClient.get("/admin/users").then((response) => {

      console.log(response.data)
      return response.data;
    });
  }
}