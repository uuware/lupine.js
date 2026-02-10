import { IRequestContextProps } from '../models/use-request-context-props';

// Default context for Browser (singleton)
const defaultContext: IRequestContextProps = {
  pageTitle: { value: '', defaultValue: '' },
  metaDescription: { value: '', defaultValue: '' },
  metaData: {},
  theme: { defaultTheme: 'light', themes: {} },
  globalStyles: new Map(),
  devData: {},
};

let _contextGetter: () => IRequestContextProps | undefined;
export const initRequestContext = (getter: () => IRequestContextProps | undefined) => {
  _contextGetter = getter;
};

export const getRequestContext = (): IRequestContextProps => {
  if (_contextGetter) {
    const ctx = _contextGetter();
    if (ctx) return ctx;
  }
  return defaultContext;
};
