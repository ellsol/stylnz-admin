import { Token } from "./models";

const TOKEN_KEY = "token"

export interface TokenStore {
  getToken(): Token | undefined;
  setToken(token: Token): void;
  clearToken(): void;
}

export class MemoryTokenStore implements TokenStore {
  token?: Token;

  getToken(): Token | undefined {
    return this.token;
  }

  setToken(token: Token): void {
    this.token = token;
  }

  clearToken(): void {
    this.token = undefined;
  }
}

export class LocalStorageStore implements TokenStore {
  getToken(): Token | undefined {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? JSON.parse(token) : undefined;
  }

  setToken(token: Token): void {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  }

  clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }
}