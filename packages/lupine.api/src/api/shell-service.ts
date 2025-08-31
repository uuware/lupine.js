import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import os from 'os';
import { MiniWebSocket } from './mini-web-socket';
import { Duplex } from 'stream';

// This is only used in debug mode (no clusters)
export class ShellService {
  private _shell?: ChildProcessWithoutNullStreams;
  private _socket: Duplex;
  private _miniWebSocket: MiniWebSocket;

  constructor(socket: Duplex, miniWebSocket: MiniWebSocket) {
    this._socket = socket;
    this._miniWebSocket = miniWebSocket;
    try {
      const shellCmd: string = this.getDefaultShell();
      this._shell = spawn(shellCmd, [], {
        stdio: ['pipe', 'pipe', 'pipe'],
      });
    } catch (error) {
      console.error(error);
      this._miniWebSocket.sendMessage(this._socket!, JSON.stringify({ error: error }));
      return;
    }

    this._shell.stdout.on('data', (data) => {
      this._miniWebSocket.sendMessage(this._socket!, data.toString());
    });
    this._shell.stderr.on('data', (data) => {
      this._miniWebSocket.sendMessage(this._socket!, data.toString());
    });
    this._shell.on('exit', (code, signal) => {
      this._miniWebSocket.sendMessage(this._socket!, `Shell exited with code ${code}, signal ${signal}`);
      this._shell = undefined;
    });
  }

  getDefaultShell() {
    const platform = os.platform();
    if (platform === 'win32') {
      return process.env.COMSPEC || 'cmd.exe';
    }
    return process.env.SHELL || 'bash';
  }

  public stop() {
    this._shell?.kill();
    this._shell = undefined;
  }

  public isRunning() {
    return this._shell !== undefined;
  }

  public getShell() {
    return this._shell;
  }

  public cmd(cmd: string) {
    if (this._shell && this._shell.stdin.writable) {
      this._shell.stdin.write(cmd + '\n');
    } else {
      this._miniWebSocket.sendMessage(this._socket!, 'Shell is not available.');
    }
  }
}
