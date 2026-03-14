// Colors for console
export const ConsoleColors = {
  Red: '#f44336',
  Pink: '#e81e63',
  Purple: '#9c27b0',
  DeepPurple: '#673ab7',
  Indigo: '#3f51b5',
  Blue: '#2196f3',
  LightBlue: '#03a9f4',
  Cyan: '#00bcd4',
  Teal: '#009688',
  Green: '#4caf50',
  LightGreen: '#8bc34a',
  Lime: '#cddc39',
  DarkYellow: '#bfa40e',
  Amber: '#ffc107',
  Orange: '#ff9800',
  DeepOrange: '#ff5722',
  Silver: '#c0c0c0',
  Gray: '#808080',
  Black: '#000000',
};

// /* @__PURE__ */ on the outer IIFE tells esbuild this export has no side effects
// → the entire Logger class is tree-shaken when not imported.
// Note: TypeScript disallows 'private' on anonymous class types used as exports,
// so namespace/color are left without access modifiers (harmless in practice).
export const Logger = /* @__PURE__ */ (() =>
  class Logger {
    static enabled = true;
    namespace = '';
    color = '';

    constructor(namespace: string, color?: string) {
      this.namespace = namespace ? `[${namespace}] ` : '';
      if (color) {
        this.color = 'color:' + color;
      }
    }

    static setEnabled(enabled: boolean) {
      enabled && !Logger.enabled && console.log(`Logger is enabled.`);
      Logger.enabled = enabled;
    }

    log(message: string, ...data: (string | object | number | undefined)[]) {
      Logger.enabled && console.log(`%c${this.timestamp()} ${this.namespace}${message}`, this.color, ...data);
    }

    timestamp(date?: Date) {
      return (date || new Date()).toJSON().substring(11, 23);
    }

    warn(message: string, ...data: (string | object | number | undefined)[]) {
      console.warn(`%c${this.timestamp()} ${this.namespace}${message}`, this.color, ...data);
    }

    error(message: string, ...data: (string | object | number | undefined)[]) {
      console.error(`%c${this.timestamp()} ${this.namespace}${message}`, this.color, ...data);
    }
  }
)();

export type Logger = InstanceType<typeof Logger>;
