import cluster from 'cluster';
import { appStorage } from './app-shared-storage';

export const _exitApp = {
  isExiting: false,
};
export const cleanupAndExit = async () => {
  if (_exitApp.isExiting) return;
  _exitApp.isExiting = true;

  console.log(`${process.pid} - Process on SIGINT, exit.`);
  // save shared storage first
  if (cluster.isPrimary) {
    // save only happens once
    await appStorage.save('', true);
  }

  process.exit(0);
};
