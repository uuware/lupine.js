import { getRenderPageProps } from 'lupine.web';

// for mobile app, it needs the url to fetch the config for the first time
export const bindWebConfigApi = (webConfigApi: string) => {
  WebConfig.webConfigApi = webConfigApi;
};

export class WebConfig {
  static webConfigApi = '';
  static initialized = false;
  static cfg: { [key: string]: string } = {};

  // called from generatePage (SSR)
  static initFromData(cfg: { [key: string]: string }) {
    this.initialized = true;
    this.cfg = cfg;
  }

  static async init(force?: boolean) {
    if (this.initialized && !force) {
      return;
    }
    this.initialized = true;

    // For web, it's injected in the html by SSR, but for mobile, it's fetched from api
    if (typeof document === 'object' && !force) {
      const json = document.querySelector('#web-setting')?.textContent;
      if (json) {
        this.cfg = JSON.parse(json);
        return;
      }
    }

    if (!this.webConfigApi) {
      console.error('WebConfig webConfigApi is not set');
      return;
    }
    const url = getRenderPageProps().renderPageFunctions.baseUrl(this.webConfigApi);
    const data = await getRenderPageProps().renderPageFunctions.fetchData(url);
    if (data && data.json && data.json.status === 'ok') {
      this.cfg = data.json.result;
    } else {
      console.error(data?.json?.message || 'Failed to get web config');
    }
  }

  static async get(key: string, defaultValue: number): Promise<number>;
  static async get(key: string, defaultValue: string): Promise<string>;
  static async get(key: string, defaultValue: boolean): Promise<boolean>;
  static async get(key: string, defaultValue: object): Promise<object>;
  static async get(key: string, defaultValue?: any): Promise<any> {
    await WebConfig.init();

    const v = WebConfig.cfg[key];
    if (typeof v === 'undefined') {
      return defaultValue;
    }

    if (typeof defaultValue === 'number') {
      return Number.parseInt(v!);
    }
    if (typeof defaultValue === 'boolean') {
      return v!.toLocaleLowerCase() === 'true' || v === '1';
    }
    if (typeof defaultValue === 'object') {
      if (typeof v === 'object') {
        return v;
      }
      try {
        return JSON.parse(v!);
      } catch (error) {
        console.error(`WebConfig JSON.parse error: `, error);
      }
      return defaultValue;
    }
    // if empty, then return default value
    return v || defaultValue;
  }
}
