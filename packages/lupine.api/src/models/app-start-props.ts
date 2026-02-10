import { RenderPageFunctionsType } from '../api';
import { AppLoaderProps } from './app-helper-props';

export type InitStartProps = {
  bindIp: string;
  httpPort: number;
  httpsPort: number;
  sslKeyPath: string;
  sslCrtPath: string;
  domainCerts: Record<string, { key: string; cert: string }>;
};

export type AppStartProps = {
  debug: boolean;
  devToken: string;
  appEnvFile: string;
  apiConfig: AppLoaderProps;
  serverConfig: InitStartProps;
  renderPageFunctions: RenderPageFunctionsType;
};
