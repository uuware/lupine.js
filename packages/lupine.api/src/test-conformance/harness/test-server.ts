import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { serveStaticFileStream } from '../../api/static-server-helper';
import { ServerRequest } from '../../models';

export type CustomRouteHandler = (req: http.IncomingMessage, res: http.ServerResponse) => void | Promise<void>;

/**
 * High-performance, ephemeral Test Server Harness.
 * Provides isolated file fixtures, dynamic port binding, and route mounting
 * to enable running hundreds of protocol conformance test cases reliably.
 */
export class ConformanceTestServer {
  public server!: http.Server;
  public port = 0;
  public baseUrl = '';
  public tmpDir: string;
  private routes: Map<string, { method: string; handler: CustomRouteHandler }> = new Map();

  constructor() {
    this.tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'lupine-conformance-'));
  }

  /**
   * Creates a file in the isolated fixture directory.
   */
  createFixture(filename: string, content: string | Buffer): string {
    const fullPath = path.join(this.tmpDir, filename);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(fullPath, content);
    return fullPath;
  }

  /**
   * Generates a binary fixture file with arbitrary size and an optional embedded trailer (e.g. MOOV or XREF).
   */
  createBinaryFixture(filename: string, size: number, trailerText = ''): { fullPath: string; md5: string } {
    const fullPath = path.join(this.tmpDir, filename);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const buf = Buffer.alloc(size, 0x41); // 'A'
    if (trailerText) {
      const trailerBuf = Buffer.from(trailerText, 'utf8');
      trailerBuf.copy(buf, size - trailerBuf.length);
    }
    fs.writeFileSync(fullPath, buf);

    const md5 = crypto.createHash('md5').update(buf).digest('hex');
    return { fullPath, md5 };
  }

  /**
   * Computes the MD5 of a fixture file.
   */
  getFixtureMd5(filename: string): string {
    const fullPath = path.join(this.tmpDir, filename);
    const buf = fs.readFileSync(fullPath);
    return crypto.createHash('md5').update(buf).digest('hex');
  }

  /**
   * Mounts a custom endpoint handler.
   */
  route(method: string, routePath: string, handler: CustomRouteHandler): this {
    this.routes.set(`${method.toUpperCase()} ${routePath}`, { method: method.toUpperCase(), handler });
    return this;
  }

  /**
   * Starts the server on an ephemeral port (port 0).
   */
  async start(): Promise<void> {
    this.server = http.createServer(async (req, res) => {
      const method = (req.method || 'GET').toUpperCase();
      const urlPath = req.url?.split('?')[0] || '/';
      const routeKey = `${method} ${urlPath}`;

      if (this.routes.has(routeKey)) {
        await this.routes.get(routeKey)!.handler(req, res);
        return;
      }

      // Default fallback: static file serving from fixture directory
      const relativePath = urlPath.replace(/^\//, '');
      const fixturePath = path.join(this.tmpDir, relativePath);

      if (fs.existsSync(fixturePath) && fs.statSync(fixturePath).isFile()) {
        await serveStaticFileStream(req as any as ServerRequest, res, fixturePath, urlPath);
      } else {
        res.statusCode = 404;
        res.end('Not Found');
      }
    });

    await new Promise<void>((resolve) => {
      this.server.keepAliveTimeout = 500;
      this.server.listen(0, '127.0.0.1', () => {
        this.port = (this.server.address() as any).port;
        this.baseUrl = `http://127.0.0.1:${this.port}`;
        resolve();
      });
    });
  }

  /**
   * Gracefully shuts down the server and cleans up all temporary fixture files.
   */
  async close(): Promise<void> {
    if (this.server) {
      if (typeof (this.server as any).closeAllConnections === 'function') {
        (this.server as any).closeAllConnections();
      }
      await new Promise<void>((resolve) => this.server.close(() => resolve()));
    }
    try {
      fs.rmSync(this.tmpDir, { recursive: true, force: true });
    } catch {}
  }

  /**
   * Alias for close()
   */
  async stop(): Promise<void> {
    return this.close();
  }
}
