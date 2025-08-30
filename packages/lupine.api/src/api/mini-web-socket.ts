import { IncomingMessage } from 'http';
import { Duplex } from 'stream';
import crypto from 'crypto';

// https://github.com/ErickWendel/websockets-with-nodejs-from-scratch/blob/main/nodejs-raw-websocket/server.mjs
// https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers
// https://github.com/websockets/ws/blob/d343a0cf7bba29a4e14217cb010446bec8fdf444/lib/receiver.js

// This is a specification specific to WebSocket protocol
const WEBSOCKET_GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

const MASK_KEY_BYTES_LENGTH = 4;
// opcodes
const OPCODE_CONTINUATION = 0x0;
const OPCODE_TEXT = 0x1;
const OPCODE_BINARY = 0x2;
const OPCODE_CLOSE = 0x8;
const OPCODE_PING = 0x9;
const OPCODE_PONG = 0xa;

// This is only used in debug mode (no clusters)
export type MiniWebSocketMsgProps = (msg: string, socket: Duplex) => void;
export type MiniWebSocketCloseProps = (status: string) => void;
export class MiniWebSocket {
  clientRefreshFlag = Date.now();
  clients = new Set<Duplex>();
  private _onMessage: MiniWebSocketMsgProps;
  private _onClose?: MiniWebSocketCloseProps;

  constructor(onMessage: MiniWebSocketMsgProps, onClose?: MiniWebSocketCloseProps) {
    this._onMessage = onMessage;
    this._onClose = onClose;
  }

  public handleUpgrade(req: IncomingMessage, socket: Duplex, head: Buffer) {
    const key = req.headers['sec-websocket-key'];
    const upgrade = (req.headers.upgrade || '').toString().toLowerCase();
    const connection = (req.headers.connection || '').toString().toLowerCase();

    if (!key || upgrade !== 'websocket' || !connection.includes('upgrade')) {
      socket.write('HTTP/1.1 400 Bad Request\r\n\r\n');
      socket.destroy();
      return;
    }

    const cleanup = (status: string) => {
      if (this.clients.has(socket)) this.clients.delete(socket);
      if (!socket.destroyed) socket.destroy();
      if (this._onClose) this._onClose(status);
    };
    this.clients.add(socket);
    socket.on('close', () => cleanup('close'));
    socket.on('error', () => cleanup('error'));
    socket.on('end', () => cleanup('end'));
    socket.write(this.handleHeaders(key));

    // buffer for cumulative data, parse frame; first append head (possible residual data)
    let buffer = head && head.length ? Buffer.from(head) : Buffer.alloc(0);
    const onData = (chunk: Buffer) => {
      buffer = Buffer.concat([buffer, chunk]);
      // try to parse as many complete frames as possible
      parseFrames();
    };

    const parseFrames = () => {
      while (true) {
        if (buffer.length < 2) return;

        const firstByte = buffer[0];
        const secondByte = buffer[1];

        const fin = (firstByte & 0x80) !== 0; // FIN bit
        const rsv = firstByte & 0x70; // must be 0
        const opcode = firstByte & 0x0f;

        const masked = (secondByte & 0x80) !== 0; // must be 1
        let payloadLen = secondByte & 0x7f;

        let offset = 2;

        // illegal case: RSV set bits; or client not mask
        if (rsv !== 0 || !masked) {
          this.sendClose(socket, 1002); // protocol error
          cleanup('protocol error');
          return;
        }

        // only accept single frame (FIN=1) simple message, ignore fragmented/continuation frame
        if (!fin && opcode !== OPCODE_CONTINUATION) {
          this.sendClose(socket, 1003); // unsupported data
          cleanup('unsupported opcode');
          return;
        }

        if (payloadLen === 126) {
          if (buffer.length < offset + 2) return;
          payloadLen = buffer.readUInt16BE(offset);
          offset += 2;
        } else if (payloadLen === 127) {
          // read 64-bit length: we only take low 32 bits (enough for your scene)
          if (buffer.length < offset + 8) return;
          // ignore high 32
          payloadLen = buffer.readUInt32BE(offset + 4);
          offset += 8;
        }

        const needed = offset + MASK_KEY_BYTES_LENGTH + payloadLen;
        if (buffer.length < needed) return;

        const maskKey = buffer.slice(offset, offset + MASK_KEY_BYTES_LENGTH);
        offset += MASK_KEY_BYTES_LENGTH;

        let payload = buffer.slice(offset, offset + payloadLen);
        // unmask
        for (let i = 0; i < payload.length; i++) {
          payload[i] ^= maskKey[i % MASK_KEY_BYTES_LENGTH];
        }

        // consume this frame
        buffer = buffer.slice(needed);

        switch (opcode) {
          case OPCODE_TEXT: {
            const text = payload.toString('utf8');
            try {
              this._onMessage(text, socket);
            } catch {
              // ignore user callback error
            }
            break;
          }
          case OPCODE_BINARY: {
            // don't support binary, close
            this.sendClose(socket, 1003); // unsupported data
            cleanup('unsupported binary');
            return;
          }
          case OPCODE_PING: {
            // reply Pong, with same payload
            this.safeWrite(socket, this.encodeFrame(payload, OPCODE_PONG));
            break;
          }
          case OPCODE_PONG: {
            // ignore
            break;
          }
          case OPCODE_CLOSE: {
            // parse status code
            let code = 1000;
            if (payload.length >= 2) {
              code = payload.readUInt16BE(0);
            }
            // reply Close, then end
            this.sendClose(socket, code);
            setTimeout(() => {
              try {
                socket.end();
              } catch {}
              cleanup('close');
            }, 20);
            return; // end loop
          }
          case OPCODE_CONTINUATION: {
            // don't support continuation, close
            this.sendClose(socket, 1003);
            cleanup('unsupported continuation');
            return;
          }
          default: {
            // unknown opcode
            this.sendClose(socket, 1002);
            cleanup('unknown opcode');
            return;
          }
        }
      }
    };
    socket.on('data', onData);
  }

  private handleHeaders(key: string) {
    const acceptKey = crypto
      .createHash('sha1')
      .update(key + WEBSOCKET_GUID)
      .digest('base64');
    const headers = [
      'HTTP/1.1 101 Switching Protocols',
      // 'Content-Type: text/html',
      'Upgrade: websocket',
      'Connection: Upgrade',
      `Sec-WebSocket-Accept: ${acceptKey}`,
      '\r\n',
    ];
    return headers.join('\r\n');
  }

  public broadcast(msg: string) {
    const payload = Buffer.from(msg);
    const frame = this.encodeFrame(payload, OPCODE_TEXT);
    for (const socket of this.clients) {
      this.safeWrite(socket, frame);
    }
  }
  public sendMessage(socket: Duplex, msg: string) {
    const payload = Buffer.from(msg);
    this.safeWrite(socket, this.encodeFrame(payload, OPCODE_TEXT));
  }

  encodeFrame(payload: Buffer, opcode: number) {
    const len = payload.length;

    // 0x80 === 128 in binary
    // FIN=1 + opcode
    if (len <= 125) {
      const header = Buffer.from([0x80 | opcode, len]);
      return Buffer.concat([header, payload]);
    }

    if (len < 0x10000) {
      // alloc 4 bytes
      // [0] - 128 + 1 - 10000001  fin + opcode
      // [1] - 126 + 0 - payload length marker + mask indicator
      // [2] 0 - content length
      // [3] 113 - content length
      // [ 4 - ..] - the message itself
      const header = Buffer.allocUnsafe(4);
      header[0] = 0x80 | opcode;
      header[1] = 126;
      header.writeUInt16BE(len, 2);
      return Buffer.concat([header, payload]);
    }

    // 64-bit length：write high 32 bits as 0, low 32 bits as len (enough for your scene)
    const header = Buffer.allocUnsafe(10);
    header[0] = 0x80 | opcode;
    header[1] = 127;
    header.writeUInt32BE(0, 2); // high 32
    header.writeUInt32BE(len, 6); // low 32
    return Buffer.concat([header, payload]);
  }

  sendClose(socket: Duplex, code = 1000) {
    const payload = Buffer.allocUnsafe(2);
    payload.writeUInt16BE(code, 0);
    this.safeWrite(socket, this.encodeFrame(payload, OPCODE_CLOSE));
  }

  safeWrite(socket: Duplex, data: Buffer) {
    try {
      if (!socket.destroyed) socket.write(data);
    } catch {
      // ignore
    }
  }

  close(socket: Duplex, code = 1000) {
    this.sendClose(socket, code);
    setTimeout(() => {
      try {
        socket.end();
      } catch {}
    }, 20);
  }

  closeAll(code = 1000) {
    for (const s of this.clients) {
      this.close(s, code);
    }
  }
}
