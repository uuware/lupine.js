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

  await t.test('Parses multipart payloads with LF (\\n) line endings and unquoted filenames', async () => {
    const boundary = 'LFBoundary123';
    // Payloads with LF only
    const bodyString =
      `--${boundary}\n` +
      `Content-Disposition: form-data; name="title"\n\n` +
      `LF Title Value\n` +
      `--${boundary}\n` +
      `Content-Disposition: form-data; name="doc"; filename=unquoted_document.pdf\n` +
      `Content-Type: application/pdf\n\n` +
      `%PDF-1.4 mock content\n` +
      `--${boundary}--`;

    const req = {
      headers: {
        'content-type': `multipart/form-data; boundary=${boundary}`,
      },
    } as unknown as IncomingMessage;

    const result = await parseFormData(req, Buffer.from(bodyString, 'utf8'));
    assert.strictEqual(result.fields['title'], 'LF Title Value');
    assert.ok(result.files['doc'], 'unquoted filename must be parsed as a file');
    assert.strictEqual(result.files['doc'].filename, 'unquoted_document.pdf');
    assert.strictEqual(result.files['doc'].mimeType, 'application/pdf');
    assert.strictEqual(result.files['doc'].data.toString('utf8'), '%PDF-1.4 mock content');
  });
});
