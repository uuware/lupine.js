import { DbConfig } from './db-config';

export type HostToPathProps = {
  hosts: string[];
  // path: string;
  webPath: string;
  dataPath: string;
  apiPath: string;
  appName: string;
  dbType: string;
  dbConfig: DbConfig;
};
