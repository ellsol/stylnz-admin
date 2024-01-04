export type Environment = {
  ipServiceURL: string;
  apiBaseURL: string;
  audience: string;
};

export enum Env {
  Local,
  Production,
}

const devEnvironment = {
  ipServiceURL: 'https://api.auth-three.com',
  apiBaseURL: 'http://localhost:8080', // this is the default port for the voting service development
  audience: 'https://api.stylnz.io',
};

const prodEnvironment = {
  ipServiceURL: 'https://api.auth-three.com',
  apiBaseURL: 'https://api.stylnz.io',
  audience: 'https://api.stylnz.io',
};

export const getEnvironment = (e: Env): Environment => {
  switch (e) {
    case Env.Local:
      return devEnvironment;
    case Env.Production:
      return prodEnvironment;
    default:
      return devEnvironment;
  }
};

export const CURRENT_ENV = getEnvironment(Env.Production);
