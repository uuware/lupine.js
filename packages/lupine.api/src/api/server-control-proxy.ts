import { IServerControlProxy } from '../models';

export let ServerControlProxy: IServerControlProxy = {};

export const assignFromServerControlProxy = (proxyFromServer: IServerControlProxy) => {
  // We MUST mutate the original exported object so that all early imports
  // across the API layer instantly see the newly populated server handles!
  Object.assign(ServerControlProxy, proxyFromServer);
};
