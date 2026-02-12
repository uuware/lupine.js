import { Logger } from './logger';

const fs = require('fs/promises');
const vm = require('vm');

export class RuntimeRequire {
  logger: Logger;
  constructor() {
    this.logger = new Logger('RuntimeRequire');
  }

  // static require(p: string) {
  //   logger.debug('require: ' + p);
  //   return eval('require')(p);
  // }

  // static requireRelative(rootPath: string, relativePath: string) {
  //   const p = path.resolve(rootPath, relativePath);
  //   logger.debug('require: ' + p);
  //   return eval('require')(p);
  // }

  static async loadModuleIsolated(path: string, globalThis?: any): Promise<any> {
    const code = await fs.readFile(path, 'utf-8');
    const context = {
      globalThis: globalThis || {},
      console,
      setTimeout,
      clearTimeout,
      URL,
      URLSearchParams,
    };
    vm.createContext(context);
    // for debug in Javascript Debug Terminal
    const script = new vm.Script(code, {
      filename: path,
      lineOffset: 0,
    });
    script.runInContext(context);
    return context.globalThis;
  }
}
