import test from 'node:test';
import assert from 'node:assert';
import { CryptoUtils } from './crypto';

test('CryptoUtils', async (t) => {
  await t.test('encrypts and decrypts text with the same key', () => {
    const key = 'test-secret-key';
    const text = 'hello 中文 🚀';

    const encrypted = CryptoUtils.encrypt(text, key);

    assert.notStrictEqual(encrypted, text);
    assert.strictEqual(CryptoUtils.decrypt(encrypted, key), text);
  });

  await t.test('uses a random nonce so the same plaintext encrypts differently', () => {
    const key = 'test-secret-key';
    const text = 'same plaintext';

    const encrypted1 = CryptoUtils.encrypt(text, key);
    const encrypted2 = CryptoUtils.encrypt(text, key);

    assert.notStrictEqual(encrypted1, encrypted2);
    assert.strictEqual(CryptoUtils.decrypt(encrypted1, key), text);
    assert.strictEqual(CryptoUtils.decrypt(encrypted2, key), text);
  });

  await t.test('rejects ciphertext modified after encryption', () => {
    const key = 'test-secret-key';
    const encrypted = CryptoUtils.encrypt('protected text', key);
    const buf = Buffer.from(encrypted, 'base64');

    buf[CryptoUtils.ALGORITHM_NONCE_SIZE] ^= 1;

    assert.throws(
      () => CryptoUtils.decrypt(buf.toString('base64'), key),
      /Invalid encrypted data signature\./
    );
  });

  await t.test('rejects MAC modified after encryption', () => {
    const key = 'test-secret-key';
    const encrypted = CryptoUtils.encrypt('protected text', key);
    const buf = Buffer.from(encrypted, 'base64');

    buf[buf.length - 1] ^= 1;

    assert.throws(
      () => CryptoUtils.decrypt(buf.toString('base64'), key),
      /Invalid encrypted data signature\./
    );
  });

  await t.test('rejects a wrong decryption key', () => {
    const encrypted = CryptoUtils.encrypt('protected text', 'right-key');

    assert.throws(
      () => CryptoUtils.decrypt(encrypted, 'wrong-key'),
      /Invalid encrypted data signature\./
    );
  });

  await t.test('rejects data that is too short', () => {
    assert.throws(
      () => CryptoUtils.decrypt(Buffer.from('short').toString('base64'), 'key'),
      /Invalid encrypted data\./
    );
  });

  await t.test('hash and sha256 return expected hex digests', () => {
    assert.strictEqual(CryptoUtils.hash('abc'), '900150983cd24fb0d6963f7d28e17f72');
    assert.strictEqual(
      CryptoUtils.sha256('abc'),
      'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
    );
  });

  await t.test('randomString returns hex with double requested byte length', () => {
    const value = CryptoUtils.randomString(16);

    assert.match(value, /^[0-9a-f]+$/);
    assert.strictEqual(value.length, 32);
  });

  await t.test('randomNumberString returns requested digit length for normal lengths', () => {
    const value = CryptoUtils.randomNumberString(6);

    assert.match(value, /^\d{6}$/);
  });

  await t.test('randomCharNumberString starts with a letter', () => {
    const value = CryptoUtils.randomCharNumberString(12);

    assert.match(value, /^[A-Za-z][A-Za-z0-9]{11}$/);
  });

  await t.test('uuid returns a valid UUID string', () => {
    assert.match(
      CryptoUtils.uuid(),
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
  });
});