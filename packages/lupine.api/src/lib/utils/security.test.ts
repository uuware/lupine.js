import test from 'node:test';
import assert from 'node:assert';
import { parseFormData } from './form-data-parser';
import { IncomingMessage } from 'http';
import { CryptoUtils } from './crypto';

const buildMultipart = (boundary: string, filename: string, mimeType: string, data: Buffer | string) => {
    const bodyString =
        `--${boundary}\r\n` +
        `Content-Disposition: form-data; name="file"; filename="${filename}"\r\n` +
        `Content-Type: ${mimeType}\r\n\r\n`;
    const head = Buffer.from(bodyString, 'utf8');
    const payload = Buffer.isBuffer(data) ? data : Buffer.from(data, 'utf8');
    const tail = Buffer.from(`\r\n--${boundary}--`, 'utf8');
    return Buffer.concat([head, payload, tail]);
};

const mockReq = (boundary: string) =>
    ({ headers: { 'content-type': `multipart/form-data; boundary=${boundary}` } } as unknown as IncomingMessage);

test('form-data-parser security hardening', async (t) => {
    const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';

    await t.test('sanitizes path traversal in filenames', async () => {
        const body = buildMultipart(boundary, '../../etc/passwd', 'text/plain', 'x');
        const result = await parseFormData(mockReq(boundary), body);
        const name = result.files['file'].filename;
        assert.ok(!name.includes('..'), 'filename must not contain ..');
        assert.ok(!name.includes('/'), 'filename must not contain /');
        assert.ok(!name.includes('\\'), 'filename must not contain \\');
    });

    await t.test('removes null bytes from filenames', async () => {
        const body = buildMultipart(boundary, 'avatar\u0000.png', 'image/png', 'x');
        const result = await parseFormData(mockReq(boundary), body);
        assert.ok(!result.files['file'].filename.includes('\0'));
    });

    await t.test('rejects files exceeding maxFileSize', async () => {
        const big = Buffer.alloc(2048, 0x41);
        const body = buildMultipart(boundary, 'big.txt', 'text/plain', big);
        await assert.rejects(parseFormData(mockReq(boundary), body, { maxFileSize: 1024 }), /exceeds maximum size/);
    });

    await t.test('rejects bodies exceeding maxBodySize', async () => {
        const body = buildMultipart(boundary, 'a.txt', 'text/plain', 'hello');
        await assert.rejects(parseFormData(mockReq(boundary), body, { maxBodySize: 10 }), /exceeds maximum size/);
    });

    await t.test('rejects disallowed MIME types', async () => {
        const body = buildMultipart(boundary, 'evil.exe', 'application/x-msdownload', 'MZ');
        await assert.rejects(parseFormData(mockReq(boundary), body), /not allowed/);
    });

    await t.test('allows MIME types when allowAllMimeTypes is true', async () => {
        const body = buildMultipart(boundary, 'custom.bin', 'application/x-custom', 'data');
        const result = await parseFormData(mockReq(boundary), body, { allowAllMimeTypes: true });
        assert.strictEqual(result.files['file'].mimeType, 'application/x-custom');
    });

    await t.test('accepts a valid image upload', async () => {
        const body = buildMultipart(boundary, 'photo.png', 'image/png', 'PNGDATA');
        const result = await parseFormData(mockReq(boundary), body);
        assert.strictEqual(result.files['file'].filename, 'photo.png');
        assert.strictEqual(result.files['file'].mimeType, 'image/png');
    });
});

test('CryptoUtils password hashing', async (t) => {
    await t.test('hashPassword produces a salted scrypt hash and verifies', () => {
        const hash = CryptoUtils.hashPassword('correct horse battery staple');
        assert.match(hash, /^scrypt\$[0-9a-f]+\$[0-9a-f]+$/);
        assert.strictEqual(CryptoUtils.verifyPassword('correct horse battery staple', hash), true);
        assert.strictEqual(CryptoUtils.verifyPassword('wrong password', hash), false);
    });

    await t.test('hashPassword uses a random salt (same password → different hash)', () => {
        const h1 = CryptoUtils.hashPassword('same-password');
        const h2 = CryptoUtils.hashPassword('same-password');
        assert.notStrictEqual(h1, h2);
        assert.strictEqual(CryptoUtils.verifyPassword('same-password', h1), true);
        assert.strictEqual(CryptoUtils.verifyPassword('same-password', h2), true);
    });

    await t.test('verifyPassword rejects malformed hashes', () => {
        assert.strictEqual(CryptoUtils.verifyPassword('x', 'not-a-valid-hash'), false);
        assert.strictEqual(CryptoUtils.verifyPassword('x', 'scrypt$onlytwo'), false);
    });
});
