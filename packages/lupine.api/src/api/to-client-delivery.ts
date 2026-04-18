import { IToClientDelivery } from '../models/to-client-delivery-props';
import { IRequestContextProps } from '../models';

export class ToClientDelivery implements IToClientDelivery {
  private webEnv: { [k: string]: string };
  private webSetting: { [k: string]: string };
  private requestContext: IRequestContextProps;

  constructor(
    webEnv: { [k: string]: string },
    webSetting: { [k: string]: string },
    requestContext: IRequestContextProps
  ) {
    this.webEnv = webEnv;
    this.webSetting = webSetting;
    this.requestContext = requestContext;
  }

  public getWebEnv() {
    return this.webEnv;
  }

  public getWebSetting() {
    return this.webSetting;
  }

  public getRequestContext() {
    return this.requestContext;
  }
}
