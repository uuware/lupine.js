import http from 'node:http';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';

export interface TestResponse {
  statusCode: number;
  headers: http.IncomingHttpHeaders;
  rawBody: Buffer;
  text: string;
  abortedEarly: boolean;
  expectStatus(status: number): this;
  expectHeader(name: string, expected: string | RegExp): this;
  expectBody(expected: string | Buffer): this;
  getMd5(): string;
}

export class TestRequestBuilder {
  private method: string;
  private path: string;
  private baseUrl: string;
  private headers: Record<string, string> = {};
  private bodyData?: Buffer | string;
  private abortBytes = 0;
  private expectedStatus?: number;
  private expectedHeaders: Array<{ name: string; expected: string | RegExp }> = [];
  private expectedBody?: string | Buffer;

  constructor(baseUrl: string, method: string, path: string) {
    this.baseUrl = baseUrl;
    this.method = method;
    this.path = path;
  }

  set(name: string, value: string): this {
    this.headers[name.toLowerCase()] = value;
    return this;
  }

  send(body: Buffer | string): this {
    this.bodyData = body;
    return this;
  }

  /**
   * Simulates premature client disconnect (e.g. video timeline scrub or user cancelling download)
   * by destroying the underlying socket after receiving N bytes.
   */
  abortAfterBytes(bytes: number): this {
    this.abortBytes = bytes;
    return this;
  }

  expectStatus(status: number): this {
    this.expectedStatus = status;
    return this;
  }

  expectHeader(name: string, expected: string | RegExp): this {
    this.expectedHeaders.push({ name, expected });
    return this;
  }

  expectBody(expected: string | Buffer): this {
    this.expectedBody = expected;
    return this;
  }

  async execute(): Promise<TestResponse> {
    const url = new URL(this.path, this.baseUrl);
    const headers = { connection: 'close', ...this.headers };

    return new Promise((resolve, reject) => {
      let finished = false;

      const req = http.request(
        {
          hostname: url.hostname,
          port: url.port,
          path: url.pathname + url.search,
          method: this.method,
          headers,
          agent: false,
        },
        (res) => {
          const chunks: Buffer[] = [];
          let bytesReceived = 0;
          let abortedEarly = false;

          res.on('data', (chunk: Buffer) => {
            bytesReceived += chunk.length;
            chunks.push(chunk);

            if (this.abortBytes > 0 && bytesReceived >= this.abortBytes) {
              abortedEarly = true;
              req.destroy(); // Abort client connection mid-stream
              finish();
            }
          });

          res.on('end', () => finish());

          const finish = () => {
            if (finished) return;
            finished = true;
            const rawBody = Buffer.concat(chunks);
            const text = rawBody.toString('utf8');

            const testRes: TestResponse = {
              statusCode: res.statusCode ?? 0,
              headers: res.headers,
              rawBody,
              text,
              abortedEarly,
              expectStatus(code: number) {
                assert.equal(
                  this.statusCode,
                  code,
                  `Expected HTTP ${code} but got ${this.statusCode} for ${url.pathname}`
                );
                return this;
              },
              expectHeader(name: string, expected: string | RegExp) {
                const actual = this.headers[name.toLowerCase()];
                if (typeof expected === 'string') {
                  assert.equal(
                    actual,
                    expected,
                    `Header [${name}] mismatch. Expected "${expected}", received "${actual}"`
                  );
                } else {
                  assert.match(
                    String(actual),
                    expected,
                    `Header [${name}] does not match RegExp ${expected}`
                  );
                }
                return this;
              },
              expectBody(expected: string | Buffer) {
                if (typeof expected === 'string') {
                  assert.equal(this.text, expected, 'Response text body does not match expected');
                } else {
                  assert.ok(
                    this.rawBody.equals(expected),
                    'Response binary body does not match expected Buffer'
                  );
                }
                return this;
              },
              getMd5() {
                return crypto.createHash('md5').update(this.rawBody).digest('hex');
              },
            };

            try {
              if (this.expectedStatus !== undefined) {
                testRes.expectStatus(this.expectedStatus);
              }
              for (const h of this.expectedHeaders) {
                testRes.expectHeader(h.name, h.expected);
              }
              if (this.expectedBody !== undefined) {
                testRes.expectBody(this.expectedBody);
              }
              resolve(testRes);
            } catch (err) {
              reject(err);
            }
          }
        }
      );

      req.setTimeout(5000, () => {
        req.destroy();
        reject(new Error(`Test request to ${this.path} timed out after 5000ms`));
      });

      req.on('error', (err) => {
        // If we intentionally aborted the connection, resolve with what we received
        if (this.abortBytes > 0) {
          return;
        }
        reject(err);
      });

      if (this.bodyData) {
        req.write(this.bodyData);
      }
      req.end();
    });
  }

  // Convenient chaining to directly await the builder
  then<TResult1 = TestResponse, TResult2 = never>(
    onfulfilled?: ((value: TestResponse) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2> {
    return this.execute().then(onfulfilled, onrejected);
  }
}

/**
 * Fluent Test Client for dispatching conforming HTTP requests.
 */
export class ConformanceTestClient {
  constructor(private baseUrl: string) {}

  get(path: string): TestRequestBuilder {
    return new TestRequestBuilder(this.baseUrl, 'GET', path);
  }

  head(path: string): TestRequestBuilder {
    return new TestRequestBuilder(this.baseUrl, 'HEAD', path);
  }

  post(path: string): TestRequestBuilder {
    return new TestRequestBuilder(this.baseUrl, 'POST', path);
  }
}
