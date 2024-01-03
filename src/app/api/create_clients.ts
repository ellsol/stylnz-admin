import { Env, Environment, getEnvironment } from './config';
import { IPClient } from './ip_client';
import { LocalStorageStore } from './token_store';
import { ApiClient } from './voting_client';


export const createTestClients = (env: Environment, shouldLog: boolean): [ApiClient, IPClient] => {
  const ipClient = new IPClient(env, new LocalStorageStore(), shouldLog)
  const apiClient = new ApiClient(env, ipClient, shouldLog)

  return [apiClient, ipClient]
}

export const clients = createTestClients(getEnvironment(Env.Production), true)