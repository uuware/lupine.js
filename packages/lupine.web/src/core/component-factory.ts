import { RefProps } from '../jsx';
import { mountComponents } from './mount-components';

export class ComponentFactory {
  private static _session: Map<Function, { [key: string]: any }> = new Map<Function, { [key: string]: any }>();

  static getSession(fn: Function) {
    let ret = this._session.get(fn);
    if (!ret) {
      ret = {};
      this._session.set(fn, ret);
    }
    return ret;
  }

  static async refresh(fn: Function, props: any, ref: RefProps) {
    mountComponents(ref.current!, await fn(props));
  }
}
