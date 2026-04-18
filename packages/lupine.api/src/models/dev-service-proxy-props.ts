import { IncomingMessage } from 'http';
import { Duplex } from 'stream';

export interface IDevServiceProxy {
  handleUpgrade?: (req: IncomingMessage, socket: Duplex, head: Buffer) => void;
  broadcastRefresh?: () => void;
  shellDirectCmd?: (cmd: string) => Promise<string>;
}
