import { fork, ChildProcess } from 'child_process';

export class ServerLoader {
  private app: ChildProcess | null = null;
  private mainFile: string = '';

  public startApp = (mainFile?: string) => {
    if (mainFile) {
      this.mainFile = mainFile;
    }

    if (!this.mainFile) {
      throw new Error('Loader: mainFile is not defined. Cannot start the application.');
    }

    console.log('Loader: starting app...', this.mainFile);
    this.app = fork(this.mainFile, [], {
      env: { ...process.env, FROM_LOADER: '1' },
    });

    // child->parent
    this.app.on('message', async (msg: any) => {
      if (msg?.id === 'debug' && msg?.message === 'restartApp') {
        console.log('Loader: app requested restart.');
        await this.restartApp();
      }
    });

    // child exit
    this.app.on('exit', (code) => {
      console.log('Loader: app exited with code', code);
    });
  };

  public restartApp = async () => {
    if (!this.app) return;

    return new Promise<void>((resolve) => {
      console.log('Loader: sending shutdown to app...');
      this.app!.send({ id: 'debug', message: 'shutdown' });

      // wait for app.ts to exit
      this.app!.once('exit', () => {
        console.log('Loader: app fully exited, restarting...');
        this.startApp();
        resolve();
      });
    });
  };
}

export const serverLoader = /* @__PURE__ */ new ServerLoader();
