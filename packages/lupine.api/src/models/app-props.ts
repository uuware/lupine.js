import { HostToPathProps } from './host-to-path-props';

export type ApiConfigProps = {
  serverRoot: string;
  webHostMap: HostToPathProps[];
};

export type ServerConfigProps = {
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
  apiConfig: ApiConfigProps;
  serverConfig: ServerConfigProps;
  // renderPageFunctions: RenderPageFunctionsType;
};
