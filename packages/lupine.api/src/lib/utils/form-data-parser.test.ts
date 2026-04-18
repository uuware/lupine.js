import test from 'node:test';
import assert from 'node:assert';
import { parseFormData } from './form-data-parser';
import { IncomingMessage } from 'http';

test('Native Multipart/Form-Data Parser', async (t) => {
  await t.test('Successfully unpacks fields and nested Buffer binary blobs', async () => {
    const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
    const bodyString = 
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="username"\r\n\r\n` +
      `john_doe\r\n` +
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="profile_pic"; filename="avatar.png"\r\n` +
      `Content-Type: image/png\r\n\r\n` +
      `[binary_png_data_mock]\r\n` +
      `--${boundary}--`;

    const bodyBuffer = Buffer.from(bodyString, 'utf8');

    // Mock an IncomingMessage locally
    const req = {
      headers: {
        'content-type': `multipart/form-data; boundary=${boundary}`,
      },
    } as unknown as IncomingMessage;

    const result = await parseFormData(req, bodyBuffer);

    // Validate textual fields
    assert.strictEqual(result.fields['username'], 'john_doe');
    
    // Validate file payloads
    assert.ok(result.files['profile_pic']);
    assert.strictEqual(result.files['profile_pic'].filename, 'avatar.png');
    assert.strictEqual(result.files['profile_pic'].mimeType, 'image/png');
    assert.strictEqual(result.files['profile_pic'].data.toString('utf8'), '[binary_png_data_mock]');
  });

  await t.test('Rejects gracefully on invalid content types', async () => {
    const req = { headers: { 'content-type': 'application/json' } } as unknown as IncomingMessage;
    await assert.rejects(parseFormData(req, Buffer.alloc(0)), /Content-Type is not multipart/);
  });
});
