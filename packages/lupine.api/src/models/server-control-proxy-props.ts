import { ServerRequest } from './locals-props';

export interface IServerControlProxy {
  processRefreshCache?: (req: ServerRequest) => Promise<void>;
  processRestartApp?: () => Promise<void>;
  processShell?: (req: ServerRequest) => Promise<string>;
  getRequestCount?: () => any;
}
