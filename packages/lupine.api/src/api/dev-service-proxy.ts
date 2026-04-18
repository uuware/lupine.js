import { IDevServiceProxy } from '../models';

export let DevServiceProxy: IDevServiceProxy = {};

export const assignToServerDevServiceProxy = (proxyFromServer: IDevServiceProxy) => {
  // 1. Copy API handles into the server's tracking object
  Object.assign(proxyFromServer, DevServiceProxy);
};
