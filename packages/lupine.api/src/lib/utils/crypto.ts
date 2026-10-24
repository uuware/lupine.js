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

  /**
   * @deprecated MD5 is cryptographically broken for password storage and is NOT salted.
   * This is retained ONLY for backward compatibility with existing stored password hashes
   * (changing it would invalidate all existing user credentials).
   * New code MUST use hashPassword() / verifyPassword() which use scrypt with a random salt.
   */
  static hash(text: string) {
    return crypto.createHash('md5').update(text).digest('hex');
  }

  static sha256(text: string) {
    return crypto.createHash('sha256').update(text).digest('hex');
  }

  // ─── Salted password hashing (scrypt) ───
  // Uses Node.js built-in crypto.scrypt — no external dependencies required.
  // Output format: "scrypt$<saltHex>$<hashHex>"

  static readonly SCRYPT_SALT_SIZE = 16;
  static readonly SCRYPT_KEY_SIZE = 32;
  static readonly SCRYPT_N = 16384; // CPU/memory cost factor
  static readonly SCRYPT_R = 8; // block size
  static readonly SCRYPT_P = 1; // parallelization

  /**
   * Hashes a password using scrypt with a random salt.
   * Returns a string in the format: "scrypt$<saltHex>$<hashHex>"
   */
  static hashPassword(password: string): string {
    const salt = crypto.randomBytes(this.SCRYPT_SALT_SIZE);
    const hash = crypto.scryptSync(password, salt, this.SCRYPT_KEY_SIZE, {
      N: this.SCRYPT_N,
      r: this.SCRYPT_R,
      p: this.SCRYPT_P,
      maxmem: 64 * 1024 * 1024, // 64 MB max memory
    });
    return `scrypt$${salt.toString('hex')}$${hash.toString('hex')}`;
  }

  /**
   * Verifies a password against a scrypt hash in the format: "scrypt$<saltHex>$<hashHex>"
   * Uses timing-safe comparison to prevent timing attacks.
   */
  static verifyPassword(password: string, storedHash: string): boolean {
    const parts = storedHash.split('$');
    if (parts.length !== 3 || parts[0] !== 'scrypt') {
      return false;
    }
    const salt = Buffer.from(parts[1], 'hex');
    const expectedHash = Buffer.from(parts[2], 'hex');
    const hash = crypto.scryptSync(password, salt, this.SCRYPT_KEY_SIZE, {
      N: this.SCRYPT_N,
      r: this.SCRYPT_R,
      p: this.SCRYPT_P,
      maxmem: 64 * 1024 * 1024,
    });
    if (hash.length !== expectedHash.length) {
      return false;
    }
    return crypto.timingSafeEqual(hash, expectedHash);
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
