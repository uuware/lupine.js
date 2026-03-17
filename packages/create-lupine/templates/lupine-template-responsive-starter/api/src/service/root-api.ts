import { IApiBase, StaticServer, ApiRouter } from 'lupine.api';

export class RootApi implements IApiBase {
  protected router = new ApiRouter();

  constructor() {
    this.mountDashboard();
  }

  public getRouter(): ApiRouter {
    return this.router;
  }

  protected mountDashboard() {
    const staticServer = new StaticServer();
    this.router.use('*', staticServer.processRequest.bind(staticServer));
  }
}
