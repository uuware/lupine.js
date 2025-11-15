import { RefProps, VNode } from 'lupine.web';

export type HtmlVarValueProps = string | VNode<any> | (() => Promise<VNode<any>>);
export type HtmlVarResult = { value: HtmlVarValueProps; ref: RefProps; node: VNode<any> };
export class HtmlVar implements HtmlVarResult {
  private _value: HtmlVarValueProps;
  private _dirty = false;
  private _ref: RefProps;
  private resolve!: () => void;
  private promise: Promise<void>;

  constructor(initial?: HtmlVarValueProps) {
    this.promise = new Promise<void>((res) => {
      this.resolve = res;
    });

    this._value = initial || '';
    this._ref = {
      onLoad: async (el: Element) => {
        // in case new resolve is created while updating
        const res = this.resolve;
        if (this._dirty) {
          await this.update();
        }
        res();
      },
    };
  }

  private async update(): Promise<void> {
    const v = typeof this._value === 'function' ? await this._value() : this._value;
    await this._ref.mountInnerComponent!(v);
    this._dirty = false;
    this._value = '';
  }

  // need to wait before use ref.current
  async waitUpdate() {
    await this.promise;
  }

  set value(value: HtmlVarValueProps) {
    this._value = value;
    if (this._dirty) {
      return;
    }

    this._dirty = true;
    if (!this._ref.current) {
      return;
    }
    this.promise = new Promise<void>(async (res) => {
      this.resolve = res;
      await this.update();
      this.resolve();
    });
  }

  get value(): HtmlVarValueProps {
    return this._ref.current ? this._ref.current.innerHTML : this._value;
  }

  get ref(): RefProps {
    return this._ref;
  }

  get node(): VNode<any> {
    // if value is a function, it will be loaded later in onLoad
    const delayLoad = typeof this._value === 'function';
    this._dirty = delayLoad ? true : false;
    // the Fragment Tag will be present in the html if ref is assigned
    return {
      type: 'Fragment',
      props: {
        ref: this._ref,
        children: delayLoad ? '' : this._value,
      },
      html: [],
    };
  }
}
