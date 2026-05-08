import { CssProps } from 'lupine.web';

export type CssVariableItem = {
  name?: string;
  value?: string;
};

export const normalizeCssVariableName = (name: string) => {
  const trimmed = String(name || '').trim();
  if (!trimmed) {
    return '--variable-name';
  }
  return trimmed.startsWith('--') ? trimmed : `--${trimmed}`;
};

export const buildCssVariables = (cssVars: any): CssProps => {
  const result: CssProps = {};
  if (!Array.isArray(cssVars)) {
    return result;
  }

  cssVars.forEach((item: CssVariableItem) => {
    const name = normalizeCssVariableName(item?.name || '');
    const value = String(item?.value ?? '').trim();
    if (name && name !== '--variable-name' && value) {
      (result as any)[name] = value;
    }
  });

  return result;
};
