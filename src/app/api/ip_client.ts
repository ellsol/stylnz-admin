import {Environment} from "./config";
import axios, {AxiosRequestConfig} from "axios";
import {TokenStore} from "./token_store";
import {Token} from "./models";
import {addLogger, validateRequestStatusCode} from "./axios_helper";


export interface Authenticator {
  refreshToken(refreshToken: string): Promise<Token>

  getToken(): Token | undefined

  addAuthHeader(config: AxiosRequestConfig): any
}

export class IPClient implements Authenticator {

  /*
      client that targets public api
  */
  ipClient = addLogger(axios.create({
    validateStatus: validateRequestStatusCode,
    baseURL: this.env.ipServiceURL,
    headers: {'Content-Type': 'application/json'}
  }), this.shouldLog);

  constructor(private env: Environment, private tokenStore: TokenStore, private shouldLog: boolean) {
  }



  /*
      refreshToken

      refreshes the token with refreshToken when token has expired
  */
  async refreshToken(refreshToken: string): Promise<Token> {
    return await this.ipClient.post('/api/v1/auth/token/refresh', {
      refreshToken: refreshToken,
    }).then(response => {
      const token = response.data
      this.tokenStore.setToken(token)
      return token
    });
  }

  /*
      signIn

      signs in with credentials

      email
      password
  */
  async signIn(email: string, password: string) : Promise<Token> {
    console.log([this.env.audience])
    return await this.ipClient.post('/api/v1/admin/users/token', {
      email: email,
      password: password,
      audiences: [this.env.audience]
    }).then(response => {
      const token = response.data
      this.tokenStore.setToken(token)
      return token
    });
  }

  getToken(): Token | undefined {
    return this.tokenStore.getToken()
  }

  /*
      adding an authorisation header with token
  */
  addAuthHeader = (config: AxiosRequestConfig) => {
    let token = this.tokenStore.getToken()
    if (token) {
      // @ts-ignore
      config.headers['Authorization'] = 'Bearer ' + token.token;
    }
  }

  clearToken() {
    this.tokenStore.clearToken()
  }

}