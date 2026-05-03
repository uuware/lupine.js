import { apiStorage, CryptoUtils, Logger } from 'lupine.api';
import { adminApiHelper } from './admin-api-helper';

export type TokenProps = {
  id?: string;
  token?: string;
  displayToken?: string;
  description: string;
  timestamp?: number;
};
export class AdminTokenHelper {
  private static instance: AdminTokenHelper;

  private constructor() {}

  public static getInstance(): AdminTokenHelper {
    if (!AdminTokenHelper.instance) {
      AdminTokenHelper.instance = new AdminTokenHelper();
    }
    return AdminTokenHelper.instance;
  }

  async list(search?: string): Promise<TokenProps[]> {
    const tokens = await apiStorage.getApi('access-tokens');
    const tokenJson = JSON.parse(tokens || '[]');

    const searchTexts = (search || '')
      .trim()
      .split(' ')
      .filter((item) => !!item);
    const results = tokenJson.filter((item: TokenProps) =>
      searchTexts.every((text) => item.description.toLowerCase().includes(text.toLowerCase()))
    );

    // Strip the hash from the results before returning them to the API
    return results.map((item: TokenProps) => {
      const { token, ...safeItem } = item;
      return safeItem as TokenProps;
    });
  }
  async add(tokenData: TokenProps) {
    const tokens = await apiStorage.getApi('access-tokens');
    const tokensJson = JSON.parse(tokens || '[]');
    tokenData.timestamp = new Date().getTime();
    tokenData.id = CryptoUtils.uuid();
    
    // Hash the token and create a displayToken before storing
    const plainToken = tokenData.token || '';
    tokenData.displayToken = plainToken.length > 8 
      ? plainToken.substring(0, 8) + '...' + plainToken.substring(plainToken.length - 4)
      : '...';
    tokenData.token = CryptoUtils.sha256(plainToken);

    tokensJson.push(tokenData);
    apiStorage.setApi('access-tokens', JSON.stringify(tokensJson));
    await apiStorage.save();
  }

  async update(tokenData: TokenProps) {
    const tokens = await apiStorage.getApi('access-tokens');
    const tokensJson = JSON.parse(tokens || '[]');
    const idx = tokensJson.findIndex((item: TokenProps) => item.id === tokenData.id);
    if (idx !== -1) {
      tokensJson[idx].description = tokenData.description;
    }
    apiStorage.setApi('access-tokens', JSON.stringify(tokensJson));
    await apiStorage.save();
  }

  async remove(id: string) {
    const tokens = await apiStorage.getApi('access-tokens');
    const tokensJson = JSON.parse(tokens || '[]');
    const idx = tokensJson.findIndex((item: TokenProps) => item.id === id);
    if (idx !== -1) {
      tokensJson.splice(idx, 1);
    }
    apiStorage.setApi('access-tokens', JSON.stringify(tokensJson));
    await apiStorage.save();
  }

  generate() {
    return 'lpt_' + CryptoUtils.randomCharNumberString(36);
  }

  async validateToken(token: string) {
    const tokens = await apiStorage.getApi('access-tokens');
    const tokensJson = JSON.parse(tokens || '[]');
    const hash = CryptoUtils.sha256(token);
    const idx = tokensJson.findIndex((item: TokenProps) => item.token === hash);
    return idx !== -1;
  }
}

// add comment for tree shaking
export const adminTokenHelper = /* @__PURE__ */ AdminTokenHelper.getInstance();
