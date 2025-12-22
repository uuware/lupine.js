import { fork, ChildProcess } from 'child_process';
import path from 'path';

let app: ChildProcess | null = null;
const startApp = () => {
  console.log('Loader: starting app...');
  app = fork(path.join(__dirname, './index.js'), [], {
    env: { ...process.env, FROM_LOADER: '1' },
  });

  // child->parent
  app.on('message', async (msg: any) => {
    if (msg?.id === 'debug' && msg?.message === 'restartApp') {
      console.log('Loader: app requested restart.');
      await restartApp();
    }
  });

  // child exit
  app.on('exit', (code) => {
    console.log('Loader: app exited with code', code);
  });
};

const restartApp = async () => {
  if (!app) return;

  return new Promise<void>((resolve) => {
    console.log('Loader: sending shutdown to app...');
    app!.send({ id: 'debug', message: 'shutdown' });

    // wait for app.ts to exit
    app!.once('exit', () => {
      console.log('Loader: app fully exited, restarting...');
      startApp();
      resolve();
    });
  });
};

startApp();
