// _webEnv is from process.env and _webSetting is from config.json (public and can be changed)
// _webEnv is for env variables used by the FE
// For SSR, the initWebEnv needs to be called from server side
const _webEnv: { [key: string]: string } = {};
let _webEnvInitialized = false;
function webEnv(key: string, defaultValue: number): number;
function webEnv(key: string, defaultValue: string): string;
function webEnv(key: string, defaultValue: boolean): boolean;
function webEnv(key: string, defaultValue: object): object;
function webEnv(key: string, defaultValue: any): any {
  // for SSR, the webEnv should be initialized. But for the FE, it should be initialized by the webEnv script tag
  if (!_webEnvInitialized && typeof document !== 'undefined') {
    const json = document.querySelector('#web-env')?.textContent;
    if (json) {
      _webEnvInitialized = true;
      initWebEnv(JSON.parse(json));
    }
  }

  let envStore: { [key: string]: string } | undefined;
  const gThis = globalThis as any;
  if (gThis.__SSR_ALS_PROPS__) {
    const store = gThis.__SSR_ALS_PROPS__.getStore();
    if (store && store.webEnv) {
      envStore = store.webEnv;
    }
  }
  const currentEnv = envStore || _webEnv;

  if (!envStore && !_webEnvInitialized) {
    console.warn('webEnv has not been initialized yet!');
  }

  if (typeof currentEnv[key] === 'undefined') {
    return defaultValue;
  }

  if (typeof defaultValue === 'number') {
    return Number.parseInt(currentEnv[key]!);
  }
  if (typeof defaultValue === 'boolean') {
    return currentEnv[key]!.toLocaleLowerCase() === 'true' || currentEnv[key] === '1';
  }
  if (typeof defaultValue === 'object') {
    if (typeof currentEnv[key] === 'object') {
      return currentEnv[key];
    }
    try {
      return JSON.parse(currentEnv[key]!);
    } catch (error) {
      console.error(`webEnv JSON.parse error: `, error);
    }
    return defaultValue;
  }
  return currentEnv[key] || defaultValue;
}
// this is only called from the server side for SSR
function initWebEnv(webEnv: { [key: string]: string }) {
  Object.assign(_webEnv, webEnv);
  _webEnvInitialized = true;
}

// _webSetting is removed to WebConfig because for mobile app, it's async to load webconfig from an api
// // _webSetting is for dynamic settings that can be changed without redeploying the app
// // _webSetting is json format so the returning can be an object
// const _webSetting: { [key: string]: string } = {};
// let _webSettingInitialized = false;
// function webSetting(key: string, defaultValue: number): number;
// function webSetting(key: string, defaultValue: string): string;
// function webSetting(key: string, defaultValue: boolean): boolean;
// function webSetting(key: string, defaultValue: object): object;
// function webSetting(key: string, defaultValue: any): any {
//   // for SSR, the webSetting should be initialized. But for the FE, it should be initialized by the webSetting script tag
//   if (!_webSettingInitialized) {
//     const json = document.querySelector('#web-setting')?.textContent;
//     if (json) {
//       _webSettingInitialized = true;
//       initWebSetting(JSON.parse(json));
//     }
//   }

//   !_webSettingInitialized && console.warn('webSetting has not been initialized yet!');
//   if (typeof _webSetting[key] === 'undefined') {
//     return defaultValue;
//   }

//   if (typeof defaultValue === 'number') {
//     return Number.parseInt(_webSetting[key]!);
//   }
//   if (typeof defaultValue === 'boolean') {
//     return _webSetting[key]!.toLocaleLowerCase() === 'true' || _webSetting[key] === '1';
//   }
//   if (typeof defaultValue === 'object') {
//     if (typeof _webSetting[key] === 'object') {
//       return _webSetting[key];
//     }
//     try {
//       return JSON.parse(_webSetting[key]!);
//     } catch (error) {
//       console.error(`webSetting JSON.parse error: `, error);
//     }
//     return defaultValue;
//   }
//   return _webSetting[key] || defaultValue;
// }
// // this is only called from the server side for SSR
// function initWebSetting(webSetting: { [key: string]: string }) {
//   Object.assign(_webSetting, webSetting);
//   _webSettingInitialized = true;
// }

export { initWebEnv, webEnv };
