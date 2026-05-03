import crypto from 'crypto';
import { Buffer } from 'node:buffer';

// Hex takes two characters for each byte - Base64 takes 4 characters for every 3 bytes, so it's more efficient than hex
// https://github.com/luke-park/SecureCompatibleEncryptionExamples/blob/master/JavaScript/SCEE-Node.js
export class CryptoUtils {
  static ALGORITHM_NAME = 'aes-256-cbc';
  static ALGORITHM_NONCE_SIZE = 16; // need 16 for aes-256-cbc
  static ALGORITHM_MAC_SIZE = 32; // sha256 hmac size

  private static getEncryptionKey(key: string) {
    return crypto.createHash('sha256').update(`enc:${key}`).digest();
  }

  private static getMacKey(key: string) {
    return crypto.createHash('sha256').update(`mac:${key}`).digest();
  }

  static encrypt(text: string, key: string) {
    const nonce = crypto.randomBytes(this.ALGORITHM_NONCE_SIZE);
    const cipher = crypto.createCipheriv(this.ALGORITHM_NAME, this.getEncryptionKey(key), nonce);

    // cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
    const encrypted = Buffer.concat([nonce, cipher.update(Buffer.from(text, 'utf8')), cipher.final()]);
    const mac = crypto.createHmac('sha256', this.getMacKey(key)).update(encrypted).digest();
    const buf = Buffer.concat([encrypted, mac]);
    return buf.toString('base64');
  }

  static decrypt(encryptedWithNonce: string, key: string) {
    const buf = Buffer.from(encryptedWithNonce, 'base64');
    if (buf.length <= this.ALGORITHM_NONCE_SIZE + this.ALGORITHM_MAC_SIZE) {
      throw new Error('Invalid encrypted data.');
    }

    const encrypted = buf.subarray(0, -this.ALGORITHM_MAC_SIZE);
    const mac = buf.subarray(-this.ALGORITHM_MAC_SIZE);
    const expectedMac = crypto.createHmac('sha256', this.getMacKey(key)).update(encrypted).digest();
    if (!crypto.timingSafeEqual(mac, expectedMac)) {
      throw new Error('Invalid encrypted data signature.');
    }

    const nonce = encrypted.subarray(0, this.ALGORITHM_NONCE_SIZE);
    const cipherText = encrypted.subarray(this.ALGORITHM_NONCE_SIZE);

    const cipher = crypto.createDecipheriv(this.ALGORITHM_NAME, this.getEncryptionKey(key), nonce);
    const buf2 = Buffer.concat([cipher.update(cipherText), cipher.final()]);
    return buf2.toString('utf8');
  }

  static hash(text: string) {
    return crypto.createHash('md5').update(text).digest('hex');
  }

  static sha256(text: string) {
    return crypto.createHash('sha256').update(text).digest('hex');
  }

  static randomString(len: number) {
    return crypto.randomBytes(len).toString('hex');
  }

  static randomNumberString(len: number) {
    return crypto.randomInt(10 ** (len - 1), 10 ** len - 1).toString();
  }

  // first char is alpha, the rest are alpha or number
  static randomCharNumberString(len: number) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const chars = letters + '0123456789';
    return Array.from(crypto.randomBytes(len))
      .map((b, index) => (index === 0 ? letters[b % letters.length] : chars[b % chars.length]))
      .join('');
  }

  static uuid() {
    return crypto.randomUUID();
  }
}
