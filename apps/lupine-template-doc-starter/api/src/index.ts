import { IApiBase, ApiRouter, StaticServer, ApiModule } from 'lupine.api';

class DocApi implements IApiBase {
  protected router = new ApiRouter();

  constructor() {
    this.router.use('*', new StaticServer().processRequest.bind(new StaticServer()));
  }

  public getRouter(): ApiRouter {
    return this.router;
  }
}

export const apiModule = new ApiModule(new DocApi());
