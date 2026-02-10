import { ISimpleStorage } from './simple-storage-props';
import { IRequestContextProps } from './use-request-context-props';

// client side (browser) should be as the same as SSR's requestContext
export interface IToClientDelivery {
  getWebEnv(): { [k: string]: string };
  getWebSetting(): { [k: string]: string };
  getServerCookie(): ISimpleStorage;
  getRequestContext(): IRequestContextProps;
  // getLang(): { [k: string]: string };
}
