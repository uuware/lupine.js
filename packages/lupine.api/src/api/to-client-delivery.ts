import { IToClientDelivery } from '../models/to-client-delivery-props';
import { ISimpleStorage } from '../models/simple-storage-props';
import { IRequestContextProps } from '../models';

export class ToClientDelivery implements IToClientDelivery {
  private webEnv: { [k: string]: string };
  private webSetting: { [k: string]: string };
  private cookies: ISimpleStorage;
  private requestContext: IRequestContextProps;

  constructor(
    webEnv: { [k: string]: string },
    webSetting: { [k: string]: string },
    cookies: ISimpleStorage,
    requestContext: IRequestContextProps
  ) {
    this.webEnv = webEnv;
    this.webSetting = webSetting;
    this.cookies = cookies;
    this.requestContext = requestContext;
  }

  public getWebEnv() {
    return this.webEnv;
  }

  public getWebSetting() {
    return this.webSetting;
  }

  public getServerCookie() {
    return this.cookies;
  }

  public getRequestContext() {
    return this.requestContext;
  }
}
