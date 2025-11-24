import cluster from 'cluster';
import { spawn } from 'child_process';
import { appStorage } from './app-shared-storage';
import { AppMessageProps, processMessageFromWorker } from './app-message';

export const _restartApp = {
  isRestarting: false,
};
export const restartApp = async () => {
  if (!cluster.isPrimary) {
    console.warn(`restartApp: shouldn't come here`);
    return;
  }

  await appStorage.save('', true);
  console.log(`Old app ${process.pid} sends SIGTERM to all workors.`);
  // const closeAll = () => {
  //   _restartApp.isRestarting = true;

  //   return Object.values(cluster.workers!).map(
  //     (w) =>
  //       new Promise((resolve) => {
  //         console.log(`Sending SIGTERM to workor ${w!.id}.`);
  //         w!.once('exit', resolve);
  //         w!.kill('SIGTERM');
  //       })
  //   );
  // };
  // await Promise.all(closeAll());

  console.log(`Old app ${process.pid} starts new app ${process.execPath}`, process.argv);
  // spawn(process.execPath, process.argv.slice(1), {
  //   stdio: 'inherit',
  //   env: { ...process.env, RESTARTING: '1' },
  // });

  console.log(`Old app ${process.pid} exists.`);
  // setTimeout(process.exit, 3000);
  if (!process.send) {
    console.log(`The primary process is not focked from loader, so cannot restart.`);
  } else {
    process.send({ id: 'debug', message: 'restartApp' });
  }
};

// this is primary, and receive messages from loader
export const receiveMessageFromLoader = () => {
  process.on('message', async (msg: AppMessageProps) => {
    if (msg?.id === 'debug' && msg?.message === 'shutdown') {
      console.log(`App ${process.pid}: received shutdown message from loader.`);
      processMessageFromWorker(msg);
    }
  });
};
